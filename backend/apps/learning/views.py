import hashlib
import urllib.parse
import urllib.request

from django.conf import settings
from django.contrib.auth import get_user_model
from django.db.models import Avg, Count, Q
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
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
                    'coverage_percent': round((completed / assigned_total) * 100, 2) if assigned_total else 0,
                }
            )

        # Cobertura por grado (ponderada exactamente según la cantidad de docentes asignados)
        grade_rows = []
        for grade in grades:
            modules_count = Module.objects.filter(grade=grade, is_active=True).count()
            assigned_teachers = [
                tg.teacher
                for tg in TeacherGrade.objects.filter(
                    grade=grade,
                    teacher__role=User.Role.TEACHER,
                    teacher__is_active=True,
                ).select_related('teacher').order_by('teacher__username')
            ]
            teacher_count = len(assigned_teachers)

            teacher_details = []
            total_grade_units_done = 0

            if teacher_count > 0:
                for t in assigned_teachers:
                    t_completed = StudentProgress.objects.filter(
                        teacher=t,
                        module__grade=grade,
                        completion_percent__gte=100,
                    ).count()
                    t_percent = round((t_completed / modules_count) * 100, 2) if modules_count else 0
                    total_grade_units_done += t_completed
                    teacher_details.append(
                        {
                            'id': t.id,
                            'username': t.username,
                            'email': t.email,
                            'units_completed': t_completed,
                            'total_units': modules_count,
                            'completion_percent': t_percent,
                        }
                    )

                expected_units = modules_count * teacher_count
                avg_percent = round((total_grade_units_done / expected_units) * 100, 2) if expected_units else 0
            else:
                expected_units = 0
                avg_percent = 0.0

            grade_rows.append(
                {
                    'code': grade.code,
                    'name': grade.name,
                    'teacher_count': teacher_count,
                    'curriculum_units': modules_count,
                    'total_units': expected_units if teacher_count > 0 else modules_count,
                    'expected_units': expected_units,
                    'units_completed': total_grade_units_done,
                    'avg_completion': avg_percent,
                    'teachers': teacher_details,
                }
            )

        active_teacher_ids = [
            t['id']
            for t in teacher_rows
            if t['units_touched'] > 0 or t['units_completed'] > 0
        ]

        total_assigned_targets = sum(g['expected_units'] for g in grade_rows)
        total_assigned_completed = sum(g['units_completed'] for g in grade_rows)
        institutional_coverage = (
            round((total_assigned_completed / total_assigned_targets) * 100, 2)
            if total_assigned_targets > 0
            else 0.0
        )

        return Response(
            {
                'totals': {
                    'teachers': teachers.count(),
                    'active_teachers': len(active_teacher_ids),
                    'grades': grades.count(),
                    'total_units': total_modules,
                    'assigned_units': total_assigned_targets,
                    'units_completed': total_assigned_completed,
                    'institutional_coverage': institutional_coverage,
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


class TTSView(APIView):
    """
    Endpoint de síntesis de voz natural en inglés / español.
    Utiliza el motor neural de Google para entregar audio MP3 nítido y cálido,
    con almacenamiento en caché para reproducción instantánea y cero latencia.
    """

    permission_classes = [AllowAny]

    def get(self, request):
        text = (request.query_params.get('text') or '').strip()
        if not text:
            return Response({'error': 'Parameter "text" is required.'}, status=status.HTTP_400_BAD_REQUEST)

        if len(text) > 300:
            return Response(
                {'error': 'Parameter "text" cannot exceed 300 characters.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        lang = request.query_params.get('lang', 'en').strip().lower()
        if lang not in ('en', 'es'):
            lang = 'en'

        cache_dir = settings.BASE_DIR / '.tts_cache'
        cache_dir.mkdir(exist_ok=True)
        text_hash = hashlib.md5(f'{lang}:{text.lower()}'.encode('utf-8')).hexdigest()
        cache_file = cache_dir / f'{text_hash}.mp3'

        if cache_file.exists():
            with open(cache_file, 'rb') as f:
                audio_bytes = f.read()
        else:
            encoded_text = urllib.parse.quote(text)
            url = f'https://translate.google.com/translate_tts?ie=UTF-8&q={encoded_text}&tl={lang}&client=tw-ob'
            req = urllib.request.Request(
                url,
                headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'},
            )
            try:
                with urllib.request.urlopen(req, timeout=6) as response:
                    audio_bytes = response.read()
                with open(cache_file, 'wb') as f:
                    f.write(audio_bytes)
            except Exception as e:
                return Response(
                    {'error': f'TTS service unavailable: {str(e)}'},
                    status=status.HTTP_502_BAD_GATEWAY,
                )

        response = HttpResponse(audio_bytes, content_type='audio/mpeg')
        response['Cache-Control'] = 'public, max-age=604800, immutable'
        return response

