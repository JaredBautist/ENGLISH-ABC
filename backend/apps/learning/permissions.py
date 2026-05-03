from django.contrib.auth import get_user_model
from rest_framework.permissions import BasePermission

from .models import TeacherStudent

User = get_user_model()


class IsTeacherOrAdmin(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False
        if not getattr(user, 'is_active', True):
            return False
        if getattr(user, 'is_superuser', False) or getattr(user, 'role', None) == User.Role.SUPERADMIN:
            return True
        return getattr(user, 'role', None) == User.Role.TEACHER


class IsStudent(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False
        if not getattr(user, 'is_active', True):
            return False
        return getattr(user, 'role', None) == User.Role.STUDENT


class IsTeacherOfStudent(BasePermission):
    message = 'Not allowed.'

    def has_object_permission(self, request, view, obj):
        user = request.user
        if not user or not user.is_authenticated:
            return False
        if not getattr(user, 'is_active', True):
            return False
        if getattr(user, 'is_superuser', False) or getattr(user, 'role', None) == User.Role.SUPERADMIN:
            return True
        if getattr(user, 'role', None) != User.Role.TEACHER:
            return False

        student = None
        if isinstance(obj, User):
            student = obj
        elif hasattr(obj, 'user'):
            student = obj.user
        elif hasattr(obj, 'student'):
            student = obj.student

        if not student or getattr(student, 'role', None) != User.Role.STUDENT:
            return False

        return TeacherStudent.objects.filter(teacher=user, student=student).exists()
