from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from apps.learning.models import Level, StudentProfile, TeacherStudent

User = get_user_model()


class Command(BaseCommand):
    help = 'Seed initial levels and demo users.'

    def handle(self, *args, **options):
        level_a11, _ = Level.objects.get_or_create(
            code='a1-1',
            defaults={'name': 'English A1.1', 'order': 1}
        )
        level_a12, _ = Level.objects.get_or_create(
            code='a1-2',
            defaults={'name': 'English A1.2', 'order': 2}
        )

        teacher, created_teacher = User.objects.get_or_create(
            email='dylanjared@gmail.com',
            defaults={
                'username': 'dylan',
                'role': User.Role.TEACHER,
            },
        )
        if created_teacher:
            teacher.set_password('teacher123')
            teacher.save(update_fields=['password'])

        student, created_student = User.objects.get_or_create(
            email='monica@gmail.com',
            defaults={
                'username': 'monica',
                'role': User.Role.STUDENT,
            },
        )
        if created_student:
            student.set_password('student123')
            student.save(update_fields=['password'])

        profile, _ = StudentProfile.objects.get_or_create(
            user=student,
            defaults={
                'current_level': level_a12,
                'assigned_by': teacher,
            },
        )
        if profile.current_level != level_a12:
            profile.current_level = level_a12
            profile.assigned_by = teacher
            profile.save(update_fields=['current_level', 'assigned_by'])

        TeacherStudent.objects.get_or_create(teacher=teacher, student=student)

        self.stdout.write(self.style.SUCCESS('Seed data created.'))
