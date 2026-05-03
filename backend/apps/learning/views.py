from datetime import timedelta

from django.contrib.auth import get_user_model
from django.db.models import Avg, Count, Q
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Level, Module, StudentProgress
from .permissions import IsStudent, IsTeacherOrAdmin, IsTeacherOfStudent
from .selectors import get_student_progress, get_student_progress_summary, get_teacher_student_profiles
from .services import create_student_with_profile, update_student_profile, upsert_student_progress
from .serializers import (
    CreateStudentSerializer,
    LevelSerializer,
    ModuleSerializer,
    StudentProfileSerializer,
    StudentProgressSerializer,
    StudentProgressUpdateSerializer,
    StudentUpdateSerializer,
)

User = get_user_model()


class LevelListView(generics.ListAPIView):
    serializer_class = LevelSerializer

    def get_queryset(self):
        queryset = Level.objects.filter(is_active=True)
        user = self.request.user
        if getattr(user, 'role', None) == User.Role.STUDENT:
            profile = getattr(user, 'student_profile', None)
            if profile and profile.is_active and profile.current_level_id:
                return queryset.filter(id=profile.current_level_id)
            return queryset.none()
        return queryset


class ModuleListView(generics.ListAPIView):
    serializer_class = ModuleSerializer

    def get_queryset(self):
        queryset = Module.objects.select_related('level').filter(is_active=True, level__is_active=True)
        level_code = self.request.query_params.get('level')
        user = self.request.user
        if getattr(user, 'role', None) == User.Role.STUDENT:
            profile = getattr(user, 'student_profile', None)
            if profile and profile.is_active and profile.current_level_id:
                return queryset.filter(level_id=profile.current_level_id)
            return queryset.none()
        if level_code:
            queryset = queryset.filter(level__code=level_code)
        return queryset


class TeacherStudentListCreateView(APIView):
    permission_classes = [IsTeacherOrAdmin]

    def get(self, request):
        profiles = get_teacher_student_profiles(request.user)
        serializer = StudentProfileSerializer(profiles, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CreateStudentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        profile = create_student_with_profile(
            teacher=request.user,
            username=data['username'],
            email=data['email'],
            password=data['password'],
            level_code=data['level_code'],
        )
        return Response(StudentProfileSerializer(profile).data, status=status.HTTP_201_CREATED)


class TeacherStudentDetailView(APIView):
    permission_classes = [IsTeacherOrAdmin, IsTeacherOfStudent]

    def patch(self, request, student_id):
        student = get_object_or_404(User, id=student_id)

        self.check_object_permissions(request, student)

        serializer = StudentUpdateSerializer(
            data=request.data, 
            context={'student_id': student_id}
        )
        serializer.is_valid(raise_exception=True)
        
        profile = update_student_profile(
            actor=request.user,
            student=student,
            **serializer.validated_data
        )
        return Response(StudentProfileSerializer(profile).data)


class StudentProgressListView(APIView):
    permission_classes = [IsTeacherOrAdmin, IsTeacherOfStudent]

    def get(self, request, student_id):
        student = get_object_or_404(User, id=student_id)

        self.check_object_permissions(request, student)
        progress = get_student_progress(student)
        serializer = StudentProgressSerializer(progress, many=True)
        return Response(serializer.data)


class StudentProgressMeView(APIView):
    permission_classes = [IsStudent]

    def get(self, request):
        progress = get_student_progress(request.user)
        serializer = StudentProgressSerializer(progress, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = StudentProgressUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        progress = upsert_student_progress(
            student=request.user,
            module_id=data.get('module_id'),
            level_code=data.get('level_code'),
            week_number=data.get('week_number'),
            completion_percent=data.get('completion_percent'),
            status=data.get('status'),
            score=data.get('score'),
        )
        return Response(StudentProgressSerializer(progress).data)


class StudentProgressSummaryMeView(APIView):
    permission_classes = [IsStudent]

    def get(self, request):
        summary = get_student_progress_summary(request.user)
        return Response(summary)


class TeacherDashboardStatsView(APIView):
    """Estadísticas agregadas del dashboard del profesor"""
    permission_classes = [IsTeacherOrAdmin]

    def get(self, request):
        teacher = request.user
        
        # Obtener estudiantes del profesor
        students = get_teacher_student_profiles(teacher)
        student_ids = [s.user_id for s in students]
        
        if not student_ids:
            return Response({
                'total_students': 0,
                'avg_progress': 0,
                'completed_tasks': 0,
                'active_today': 0,
                'low_progress_count': 0
            })
        
        today = timezone.now().date()
        
        # Estadísticas de progreso
        progress_data = StudentProgress.objects.filter(
            student_id__in=student_ids
        ).aggregate(
            avg_completion=Avg('completion_percent'),
            completed_count=Count('id', filter=Q(completion_percent__gte=100))
        )
        
        # Estudiantes activos hoy
        active_today = StudentProgress.objects.filter(
            student_id__in=student_ids,
            last_activity__date=today
        ).values('student_id').distinct().count()
        
        # Estudiantes con bajo progreso (< 25%)
        low_progress = StudentProgress.objects.filter(
            student_id__in=student_ids,
            completion_percent__lt=25
        ).values('student_id').distinct().count()
        
        return Response({
            'total_students': len(student_ids),
            'avg_progress': round(progress_data['avg_completion'] or 0, 2),
            'completed_tasks': progress_data['completed_count'] or 0,
            'active_today': active_today,
            'low_progress_count': low_progress
        })


class TeacherStudentProgressSummaryView(APIView):
    """Resumen de progreso para cada estudiante"""
    permission_classes = [IsTeacherOrAdmin]

    def get(self, request):
        teacher = request.user
        students = get_teacher_student_profiles(teacher)
        
        result = []
        for student in students:
            progress = StudentProgress.objects.filter(student=student.user).aggregate(
                avg_completion=Avg('completion_percent'),
                total_modules=Count('id'),
                completed_modules=Count('id', filter=Q(completion_percent__gte=100))
            )
            
            result.append({
                'student_id': student.user_id,
                'student_name': student.user.username,
                'student_email': student.user.email,
                'level': student.current_level.name if student.current_level else 'Sin asignar',
                'level_code': student.current_level.code if student.current_level else '',
                'avg_completion': round(progress['avg_completion'] or 0, 2),
                'total_modules': progress['total_modules'] or 0,
                'completed_modules': progress['completed_modules'] or 0,
                'is_active': student.is_active
            })
        
        return Response(result)


class TeacherActivityMetricsView(APIView):
    """Métricas de actividad de los últimos 7 días"""
    permission_classes = [IsTeacherOrAdmin]

    def get(self, request):
        teacher = request.user
        students = get_teacher_student_profiles(teacher)
        student_ids = [s.user_id for s in students]
        
        if not student_ids:
            return Response([])
        
        today = timezone.now().date()
        activity_data = []
        
        day_names = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
        
        for i in range(7):
            current_date = today - timedelta(days=6-i)
            day_name = day_names[current_date.weekday()]
            
            # Contar logins (last_activity) en el día
            logins = StudentProgress.objects.filter(
                student_id__in=student_ids,
                last_activity__date=current_date
            ).values('student_id').distinct().count()
            
            # Contar tareas completadas ese día
            completions = StudentProgress.objects.filter(
                student_id__in=student_ids,
                last_activity__date=current_date,
                completion_percent__gte=100
            ).count()
            
            activity_data.append({
                'day': day_name,
                'date': current_date.isoformat(),
                'logins': logins,
                'completions': completions
            })
        
        return Response(activity_data)


class LowProgressStudentsView(APIView):
    """Lista de estudiantes con bajo progreso"""
    permission_classes = [IsTeacherOrAdmin]

    def get(self, request):
        teacher = request.user
        students = get_teacher_student_profiles(teacher)
        
        low_progress_students = []
        
        for student in students:
            avg_progress = StudentProgress.objects.filter(
                student=student.user
            ).aggregate(avg=Avg('completion_percent'))['avg'] or 0
            
            if avg_progress < 25:
                low_progress_students.append({
                    'student_id': student.user_id,
                    'student_name': student.user.username,
                    'student_email': student.user.email,
                    'level': student.current_level.name if student.current_level else 'Sin asignar',
                    'avg_progress': round(avg_progress, 2),
                    'is_active': student.is_active,
                    'assigned_at': student.assigned_at.isoformat() if student.assigned_at else None
                })
        
        # Ordenar por progreso (menor primero)
        low_progress_students.sort(key=lambda x: x['avg_progress'])
        
        return Response(low_progress_students)
