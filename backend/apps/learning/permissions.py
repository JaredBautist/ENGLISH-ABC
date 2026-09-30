from django.contrib.auth import get_user_model
from rest_framework.permissions import BasePermission

from .models import TeacherGrade

User = get_user_model()


def _is_platform_admin(user):
    return bool(
        user
        and user.is_authenticated
        and getattr(user, 'is_active', True)
        and (
            getattr(user, 'is_superuser', False)
            or getattr(user, 'role', None) == User.Role.SUPERADMIN
        )
    )


class IsPlatformAdmin(BasePermission):
    """Administración general de la institución: gestiona docentes y grados."""

    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False
        return _is_platform_admin(user)


class IsStaffMember(BasePermission):
    """Docentes y administradores (todo el personal institucional)."""

    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False
        if not getattr(user, 'is_active', True):
            return False
        return _is_platform_admin(user) or getattr(user, 'role', None) == User.Role.TEACHER


class IsTeacherOfGrade(BasePermission):
    """Permite el acceso solo si el docente tiene asignado el grado consultado."""

    message = 'Grado no asignado a este docente.'

    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False
        if _is_platform_admin(user):
            return True
        if getattr(user, 'role', None) != User.Role.TEACHER:
            return False
        grade_code = (
            view.kwargs.get('grade_code')
            or request.query_params.get('grade')
            or request.data.get('grade_code')
            if isinstance(request.data, dict)
            else view.kwargs.get('grade_code') or request.query_params.get('grade')
        )
        if not grade_code:
            return True
        return TeacherGrade.objects.filter(
            teacher=user,
            grade__code=grade_code,
            grade__is_active=True,
        ).exists()
