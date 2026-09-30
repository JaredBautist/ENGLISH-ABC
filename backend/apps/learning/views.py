from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Grade, Module, TeacherGrade
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
