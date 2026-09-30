from django.contrib.auth import get_user_model
from django.db import transaction
from django.utils import timezone
from rest_framework.exceptions import PermissionDenied, ValidationError

from .models import Grade, Module, StudentProgress, TeacherGrade

User = get_user_model()


def create_teacher_with_grades(*, actor, username, email, password, grade_codes, is_active=True):
    """La administración general crea un docente y le asigna su(s) grado(s)."""
    if not (actor.is_superuser or getattr(actor, 'role', None) == User.Role.SUPERADMIN):
        raise PermissionDenied('Only platform admins can create teachers.')

    grades = Grade.objects.filter(code__in=grade_codes, is_active=True)
    if len(grade_codes) != grades.count():
        raise ValidationError({'grade_codes': 'One or more grades were not found.'})

    with transaction.atomic():
        teacher = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            role=User.Role.TEACHER,
        )
        TeacherGrade.objects.bulk_create(
            [TeacherGrade(teacher=teacher, grade=grade, assigned_by=actor) for grade in grades]
        )
        if not is_active:
            teacher.is_active = False
            teacher.save(update_fields=['is_active'])
    return teacher


def update_teacher_account(*, actor, teacher, username=None, email=None, password=None, grade_codes=None, is_active=None):
    """Actualiza datos de un docente y reasigna grados si se indican."""
    if not (actor.is_superuser or getattr(actor, 'role', None) == User.Role.SUPERADMIN):
        raise PermissionDenied('Only platform admins can update teachers.')
    if getattr(teacher, 'role', None) != User.Role.TEACHER:
        raise ValidationError({'detail': 'User is not a teacher.'})

    update_user_fields = []
    if username is not None:
        teacher.username = username
        update_user_fields.append('username')
    if email is not None:
        teacher.email = email
        update_user_fields.append('email')
    if password:
        teacher.set_password(password)
    if is_active is not None:
        teacher.is_active = is_active
        update_user_fields.append('is_active')
    if update_user_fields or password:
        teacher.save()

    if grade_codes is not None:
        grades = Grade.objects.filter(code__in=grade_codes, is_active=True)
        if len(grade_codes) != grades.count():
            raise ValidationError({'grade_codes': 'One or more grades were not found.'})
        with transaction.atomic():
            TeacherGrade.objects.filter(teacher=teacher).exclude(grade__in=grades).delete()
            for grade in grades:
                TeacherGrade.objects.get_or_create(
                    teacher=teacher,
                    grade=grade,
                    defaults={'assigned_by': actor},
                )
    return teacher


def upsert_module_progress(*, teacher, module_id=None, grade_code=None, week_number=None,
                           completion_percent=None, status=None, score=None):
    """El docente marca el avance de una unidad en clase (para su planificador)."""
    module = None
    if module_id is not None:
        module = Module.objects.select_related('grade').filter(
            id=module_id,
            is_active=True,
            grade__is_active=True,
        ).first()
        if not module:
            raise ValidationError({'module_id': 'Module not found.'})
    else:
        if not grade_code or week_number is None:
            raise ValidationError({'module': 'Provide module_id or grade_code + week_number.'})
        grade = Grade.objects.filter(code=grade_code, is_active=True).first()
        if not grade:
            raise ValidationError({'grade_code': 'Grade not found.'})
        module = (
            Module.objects.select_related('grade')
            .filter(grade=grade, week_number=week_number, is_active=True, grade__is_active=True)
            .order_by('order', 'id')
            .first()
        )
        if not module:
            module = Module.objects.create(
                grade=grade,
                week_number=week_number,
                title=f'Unidad {week_number}',
                subtitle='Unidad creada automáticamente',
                slide_route=f'/{grade.code}/unidad-{week_number}',
                order=week_number,
                is_active=True,
            )

    from .selectors import get_staff_grades
    if grade_code is None:
        grade_code = module.grade.code
    if grade_code not in [g.code for g in get_staff_grades(teacher)]:
        raise PermissionDenied('Grado no asignado a este docente.')

    progress, _ = StudentProgress.objects.get_or_create(teacher=teacher, module=module)
    if completion_percent is not None:
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
