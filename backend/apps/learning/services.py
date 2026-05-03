from django.contrib.auth import get_user_model
from django.db import transaction
from django.utils import timezone
from rest_framework.exceptions import PermissionDenied, ValidationError

from .models import Level, Module, StudentProfile, StudentProgress, TeacherStudent

User = get_user_model()


def create_student_with_profile(*, teacher, username, email, password, level_code):
    if not teacher.is_superuser and getattr(teacher, 'role', None) not in {User.Role.TEACHER, User.Role.SUPERADMIN}:
        raise PermissionDenied('Only teachers can create students.')

    level = Level.objects.filter(code=level_code, is_active=True).first()
    if not level:
        raise ValidationError({'level_code': 'Level not found.'})

    with transaction.atomic():
        student = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            role=User.Role.STUDENT,
        )
        profile = StudentProfile.objects.create(
            user=student,
            current_level=level,
            assigned_by=teacher,
        )
        if getattr(teacher, 'role', None) == User.Role.TEACHER:
            TeacherStudent.objects.create(teacher=teacher, student=student)

    return profile


create_student = create_student_with_profile


def update_student_profile(*, actor, student, username=None, email=None, password=None, level_code=None, is_active=None):
    if not actor.is_superuser and getattr(actor, 'role', None) not in {User.Role.TEACHER, User.Role.SUPERADMIN}:
        raise PermissionDenied('Only teachers can update students.')

    profile, _ = StudentProfile.objects.get_or_create(user=student)
    update_user_fields = []

    if username is not None:
        student.username = username
        update_user_fields.append('username')

    if email is not None:
        student.email = email
        update_user_fields.append('email')

    if password:
        student.set_password(password)
        # set_password calls save() internally but let's be explicit with update_fields if possible
        # Actually set_password doesn't take update_fields. It just modifies the object.

    if level_code is not None:
        level = Level.objects.filter(code=level_code, is_active=True).first()
        if not level:
            raise ValidationError({'level_code': 'Level not found.'})
        profile.current_level = level
        profile.assigned_by = actor

    if is_active is not None:
        profile.is_active = is_active
        if student.is_active != is_active:
            student.is_active = is_active
            update_user_fields.append('is_active')

    if update_user_fields or password:
        student.save()

    profile.save()
    return profile


def upsert_student_progress(*, student, module_id=None, level_code=None, week_number=None, completion_percent=None, status=None, score=None):
    module = None
    if module_id is not None:
        module = Module.objects.select_related('level').filter(
            id=module_id,
            is_active=True,
            level__is_active=True,
        ).first()
        if not module:
            raise ValidationError({'module_id': 'Module not found.'})
    else:
        if not level_code or week_number is None:
            raise ValidationError({'module': 'Provide module_id or level_code + week_number.'})
        level = Level.objects.filter(code=level_code, is_active=True).first()
        if not level:
            raise ValidationError({'level_code': 'Level not found.'})
        module = (
            Module.objects.select_related('level')
            .filter(level=level, week_number=week_number, is_active=True, level__is_active=True)
            .order_by('order', 'id')
            .first()
        )
        if not module:
            module = Module.objects.create(
                level=level,
                week_number=week_number,
                title=f'Week {week_number}',
                subtitle='Auto-created module',
                slide_route=f'/{level.code}/week-{week_number}',
                order=week_number,
                is_active=True,
            )

    profile = (
        StudentProfile.objects.filter(user=student, is_active=True)
        .select_related('current_level')
        .first()
    )
    if not profile or not profile.current_level or module.level_id != profile.current_level_id:
        raise PermissionDenied('Module not available for this student.')

    # Enforce unlock order: week N can be updated only if it is currently unlocked.
    from .selectors import get_student_progress_summary
    summary = get_student_progress_summary(student)
    week_state = next((w for w in summary.get('weeks', []) if w.get('week_number') == module.week_number), None)
    if week_state and not week_state.get('unlocked', False):
        raise PermissionDenied('Week is locked. Complete previous week first.')

    progress, _ = StudentProgress.objects.get_or_create(student=student, module=module)
    if completion_percent is not None:
        # Normalize and avoid unexpected jumps down.
        normalized = max(0.0, min(100.0, float(completion_percent)))

        progress.completion_percent = normalized
        if normalized >= 100:
            progress.status = StudentProgress.Status.COMPLETED
        elif normalized > 0:
            progress.status = StudentProgress.Status.IN_PROGRESS
        else:
            progress.status = StudentProgress.Status.NOT_STARTED
    elif status is not None:
        progress.status = status
    if score is not None:
        progress.score = score
    progress.last_activity = timezone.now()
    progress.save()

    return progress
