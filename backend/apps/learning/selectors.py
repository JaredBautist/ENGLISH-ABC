from django.contrib.auth import get_user_model
from .models import Module, StudentProfile, StudentProgress

User = get_user_model()


def get_teacher_student_profiles(teacher):
    queryset = StudentProfile.objects.select_related('user', 'current_level')
    if getattr(teacher, 'is_superuser', False) or getattr(teacher, 'role', None) == User.Role.SUPERADMIN:
        return queryset
    return queryset.filter(user__teachers__teacher=teacher)


def get_student_progress(student):
    return StudentProgress.objects.select_related('module', 'module__level').filter(student=student)


def get_student_progress_summary(student):
    profile = (
        StudentProfile.objects.select_related('current_level')
        .filter(user=student, is_active=True)
        .first()
    )
    if not profile or not profile.current_level_id:
        return {
            'level_code': None,
            'total_weeks': 0,
            'current_week': 1,
            'overall_percent': 0,
            'weeks': [],
        }

    modules = list(
        Module.objects.filter(
            level_id=profile.current_level_id,
            is_active=True,
            level__is_active=True,
        )
        .order_by('week_number', 'order')
    )
    level_code = profile.current_level.code
    default_total_weeks = 8 if level_code in {'a1-1', 'a1-2'} else max((m.week_number for m in modules), default=0)

    progress_map = {
        item.module_id: item
        for item in StudentProgress.objects.filter(student=student, module_id__in=[m.id for m in modules])
    }
    module_by_week = {}
    for module in modules:
        module_by_week.setdefault(module.week_number, module)

    weeks = []
    unlocked_previous = True
    completion_values = []

    for index in range(default_total_weeks):
        week_number = index + 1
        module = module_by_week.get(week_number)
        progress = progress_map.get(module.id) if module else None
        raw_completion = float(progress.completion_percent) if progress else 0.0
        raw_completion = max(0.0, min(100.0, raw_completion))
        status = progress.status if progress else StudentProgress.Status.NOT_STARTED
        if index == 0:
            unlocked = True
        else:
            unlocked = unlocked_previous

        # Locked weeks should not contribute progress in summary.
        completion_percent = raw_completion if unlocked else 0.0
        if not unlocked:
            status = StudentProgress.Status.NOT_STARTED

        weeks.append(
            {
                'week_number': week_number,
                'module_id': module.id if module else None,
                'completion_percent': round(completion_percent, 2),
                'status': status,
                'unlocked': unlocked,
                'slide_route': module.slide_route if module else f'/{level_code}/week-{week_number}',
            }
        )
        completion_values.append(completion_percent)
        unlocked_previous = completion_percent >= 80

    overall_percent = round(sum(completion_values) / len(completion_values), 2) if completion_values else 0
    current_week = next((w['week_number'] for w in weeks if w['unlocked'] and w['completion_percent'] < 80), weeks[-1]['week_number'])

    return {
        'level_code': level_code,
        'total_weeks': len(weeks),
        'current_week': current_week,
        'overall_percent': overall_percent,
        'weeks': weeks,
    }
