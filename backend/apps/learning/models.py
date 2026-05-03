from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class Level(models.Model):
    code = models.SlugField(unique=True)
    name = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return f'{self.name} ({self.code})'


class Module(models.Model):
    level = models.ForeignKey(Level, on_delete=models.CASCADE, related_name='modules')
    week_number = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    title = models.CharField(max_length=160)
    subtitle = models.CharField(max_length=200, blank=True)
    slide_route = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['level', 'order', 'week_number']
        unique_together = ('level', 'week_number', 'title')

    def __str__(self):
        return f'{self.level.code} - Week {self.week_number}: {self.title}'


class TeacherStudent(models.Model):
    teacher = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='students_assigned')
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='teachers')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('teacher', 'student')

    def __str__(self):
        return f'{self.teacher.username} -> {self.student.username}'


class StudentProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='student_profile')
    current_level = models.ForeignKey(Level, on_delete=models.SET_NULL, null=True, blank=True)
    assigned_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='level_assignments'
    )
    assigned_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.user.username} - {self.current_level.code if self.current_level else "Unassigned"}'


class StudentProgress(models.Model):
    class Status(models.TextChoices):
        NOT_STARTED = 'not_started', 'Not Started'
        IN_PROGRESS = 'in_progress', 'In Progress'
        COMPLETED = 'completed', 'Completed'

    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='progress')
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='progress')
    completion_percent = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
    )
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.NOT_STARTED)
    last_activity = models.DateTimeField(null=True, blank=True)
    score = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
    )

    class Meta:
        unique_together = ('student', 'module')

    def __str__(self):
        return f'{self.student.username} - {self.module}'
