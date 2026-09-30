from django.contrib.auth import get_user_model
from django.db.models import Avg, Count, Q
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Grade, Module, StudentProgress, TeacherGrade
from .permissions import IsPlatformAdmin, IsStaffMember
from .selectors import (
    get_grade_modules,
    get_staff_grades,
    get_teacher_module_progress,
    get_teacher_progress_summary,
)
from .serializers import (
    CreateTeacherSerializer,
    GradeSerializer,
    ModuleProgressSerializer,
    ModuleProgressUpdateSerializer,
    ModuleSerializer,
    TeacherAccountSerializer,
    TeacherUpdateSerializer,
)
from .services import create_teacher_with_grades, update_teacher_account, upsert_module_progress

User = get_user_model()


class GradeListView(generics.ListAPIView):
    """Grados visibles: todos para admins, solo los asignados para docentes."""

    serializer_class = GradeSerializer

    def get_queryset(self):
        return get_staff_grades(self.request.user)


class ModuleListView(generics.ListAPIView):
    """Unidades del grado consultado (?grade=code). Docentes solo ven grados asignados."""

    serializer_class = ModuleSerializer

    def get_queryset(self):
        grade_code = self.request.query_params.get('grade')
        grade = get_object_or_404(Grade, code=grade_code, is_active=True) if grade_code else None
        if grade is None:
            return Module.objects.none()
        return get_grade_modules(grade, self.request.user)


class TeacherMeSummaryView(APIView):
    """Resumen de planificación del docente: grados, unidades y avance."""

    permission_classes = [IsStaffMember]

    def get(self, request):
        return Response(get_teacher_progress_summary(request.user))


class TeacherProgressMeView(APIView):
    """Historial de avance marcado por el docente."""

    permission_classes = [IsStaffMember]

    def get(self, request):
        progress = get_teacher_module_progress(request.user)
        serializer = ModuleProgressSerializer(progress, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ModuleProgressUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        progress = upsert_module_progress(
            teacher=request.user,
            module_id=data.get('module_id'),
            grade_code=data.get('grade_code'),
            week_number=data.get('week_number'),
            completion_percent=data.get('completion_percent'),
            status=data.get('status'),
            score=data.get('score'),
        )
        return Response(ModuleProgressSerializer(progress).data)


class AdminOverviewView(APIView):
    """Resumen institucional: métricas globales, avance de cada docente y cobertura por grado."""

    permission_classes = [IsPlatformAdmin]

    def get(self, request):
        teachers = User.objects.filter(role=User.Role.TEACHER).order_by('username')
        grades = Grade.objects.filter(is_active=True).order_by('order')
        total_modules = Module.objects.filter(is_active=True).count()

        # Progreso por docente (grados asignados y unidades marcadas)
        teacher_rows = []
        progress_by_teacher = {
            p['teacher_id']: p
            for p in StudentProgress.objects.values('teacher_id').annotate(
                units_touched=Count('id'),
                completed=Count('id', filter=Q(completion_percent__gte=100)),
                avg_completion=Avg('completion_percent'),
            )
        }
        for teacher in teachers:
            grade_codes = list(
                TeacherGrade.objects.filter(teacher=teacher)
                .order_by('grade__order')
                .values_list('grade__code', flat=True)
            )
            stats = progress_by_teacher.get(teacher.id, {})
            touched = stats.get('units_touched', 0)
            completed = stats.get('completed', 0)
            avg = stats.get('avg_completion')
            assigned_total = len(grade_codes) * 8
            teacher_rows.append(
                {
                    'id': teacher.id,
                    'username': teacher.username,
                    'email': teacher.email,
                    'is_active': teacher.is_active,
                    'date_joined': teacher.date_joined,
                    'grade_codes': grade_codes,
                    'units_touched': touched,
                    'units_completed': completed,
                    'avg_completion': round(float(avg), 2) if avg is not None else 0,
                    'coverage_percent': round((touched / assigned_total) * 100, 2) if assigned_total else 0,
                }
            )

        # Cobertura por grado (docentes asignados y progreso agregado)
        grade_rows = []
        for grade in grades:
            modules_count = Module.objects.filter(grade=grade, is_active=True).count()
            assignment_count = TeacherGrade.objects.filter(grade=grade).count()
            grade_progress = StudentProgress.objects.filter(module__grade=grade).aggregate(
                avg_completion=Avg('completion_percent'),
                completed=Count('id', filter=Q(completion_percent__gte=100)),
            )
            grade_rows.append(
                {
                    'code': grade.code,
                    'name': grade.name,
                    'teacher_count': assignment_count,
                    'total_units': modules_count,
                    'avg_completion': round(float(grade_progress['avg_completion']), 2)
                    if grade_progress['avg_completion'] is not None
                    else 0,
                    'units_completed': grade_progress['completed'] or 0,
                }
            )

        active_teacher_ids = [
            t['id']
            for t in teacher_rows
            if t['units_touched'] > 0
        ]
        return Response(
            {
                'totals': {
                    'teachers': teachers.count(),
                    'active_teachers': len(active_teacher_ids),
                    'grades': grades.count(),
                    'total_units': total_modules,
                    'units_completed': StudentProgress.objects.filter(completion_percent__gte=100).count(),
                },
                'teachers': teacher_rows,
                'grades': grade_rows,
            }
        )


class AdminTeacherListCreateView(APIView):
    """Panel administrativo: crear y listar docentes con sus grados."""

    permission_classes = [IsPlatformAdmin]

    def get(self, request):
        teachers = User.objects.filter(role=User.Role.TEACHER).order_by('date_joined')
        serializer = TeacherAccountSerializer(teachers, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CreateTeacherSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        teacher = create_teacher_with_grades(
            actor=request.user,
            username=data['username'],
            email=data['email'],
            password=data['password'],
            grade_codes=data['grade_codes'],
        )
        return Response(TeacherAccountSerializer(teacher).data, status=status.HTTP_201_CREATED)


class AdminTeacherDetailView(APIView):
    """Panel administrativo: editar docente (datos, contraseña, grados, estado)."""

    permission_classes = [IsPlatformAdmin]

    def patch(self, request, teacher_id):
        teacher = get_object_or_404(
            User, id=teacher_id, role=User.Role.TEACHER
        )
        serializer = TeacherUpdateSerializer(data=request.data, context={'teacher_id': teacher_id})
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        teacher = update_teacher_account(
            actor=request.user,
            teacher=teacher,
            username=data.get('username'),
            email=data.get('email'),
            password=data.get('password'),
            grade_codes=data.get('grade_codes'),
            is_active=data.get('is_active'),
        )
        return Response(TeacherAccountSerializer(teacher).data)

    def delete(self, request, teacher_id):
        teacher = get_object_or_404(User, id=teacher_id, role=User.Role.TEACHER)
        count, _ = TeacherGrade.objects.filter(teacher=teacher).delete()
        return Response({'detail': f'Teacher unassigned from {count} grade(s).'})
