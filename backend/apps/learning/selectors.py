from django.contrib.auth import get_user_model
from .models import Grade, Module, StudentProgress, TeacherGrade

User = get_user_model()


def is_platform_admin(user):
    return bool(
        user
        and user.is_authenticated
        and (
            getattr(user, 'is_superuser', False)
            or getattr(user, 'role', None) == User.Role.SUPERADMIN
        )
    )


def get_staff_grades(user):
    """Grados visibles para un docente; todos para la administración."""
    queryset = Grade.objects.filter(is_active=True)
    if is_platform_admin(user):
        return queryset
    assigned_ids = TeacherGrade.objects.filter(
        teacher=user,
        grade__is_active=True,
    ).values_list('grade_id', flat=True)
    return queryset.filter(id__in=assigned_ids)


def get_grade_modules(grade, user):
    """Módulos de un grado. Para docentes, solo si tienen el grado asignado."""
    if grade not in get_staff_grades(user):
        return Module.objects.none()
    return Module.objects.filter(grade=grade, is_active=True, grade__is_active=True)


def get_teacher_module_progress(teacher):
    return StudentProgress.objects.select_related('module', 'module__grade').filter(teacher=teacher)


def get_teacher_progress_summary(teacher):
    """Resumen de avance del docente por grado (unidades vistas / totales)."""
    grades = get_staff_grades(teacher)
    modules = list(
        Module.objects.filter(grade__in=grades, is_active=True, grade__is_active=True)
        .order_by('grade__order', 'grade__id', 'week_number', 'order')
    )
    progress_map = {
        item.module_id: item
        for item in StudentProgress.objects.filter(teacher=teacher, module_id__in=[m.id for m in modules])
    }

    grades_summary = []
    total_completion = []
    for grade in grades:
        grade_modules = [m for m in modules if m.grade_id == grade.id]
        module_states = []
        for module in grade_modules:
            progress = progress_map.get(module.id)
            completion = float(progress.completion_percent) if progress else 0.0
            completion = max(0.0, min(100.0, completion))
            status = progress.status if progress else StudentProgress.Status.NOT_STARTED
            module_states.append(
                {
                    'module_id': module.id,
                    'week_number': module.week_number,
                    'title': module.title,
                    'subtitle': module.subtitle,
                    'period': module.period,
                    'dba_number': module.dba_number,
                    'dba_text': module.dba_text,
                    'slide_route': module.slide_route,
                    'completion_percent': round(completion, 2),
                    'status': status,
                }
            )
            total_completion.append(completion)
        completed = sum(1 for m in module_states if m['status'] == StudentProgress.Status.COMPLETED)
        grades_summary.append(
            {
                'grade_code': grade.code,
                'grade_name': grade.name,
                'total_units': len(module_states),
                'completed_units': completed,
                'overall_percent': round(sum(m['completion_percent'] for m in module_states) / len(module_states), 2)
                if module_states
                else 0,
                'modules': module_states,
            }
        )

    return {
        'grades': grades_summary,
        'overall_percent': round(sum(total_completion) / len(total_completion), 2) if total_completion else 0,
    }
