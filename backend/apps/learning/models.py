from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class Grade(models.Model):
    """Grado escolar colombiano (Jardín, Transición, 1°, 2°) con currículo por DBA."""

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
    """Unidad temática dentro de un grado, alineada a un DBA del MEN."""

    grade = models.ForeignKey(Grade, on_delete=models.CASCADE, related_name='modules')
    week_number = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    title = models.CharField(max_length=160)
    subtitle = models.CharField(max_length=200, blank=True)
    slide_route = models.CharField(max_length=200, blank=True)
    period = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1)])
    dba_number = models.PositiveIntegerField(null=True, blank=True, validators=[MinValueValidator(1)])
    dba_text = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['grade', 'order', 'week_number']
        unique_together = ('grade', 'week_number', 'title')

    def __str__(self):
        return f'{self.grade.code} - Unidad {self.week_number}: {self.title}'


class TeacherGrade(models.Model):
    """Asignación de un grado a un docente (quién dicta qué grado)."""

    teacher = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='grade_assignments',
    )
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE, related_name='teacher_assignments')
    assigned_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='grade_assignments_made',
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('teacher', 'grade')

    def __str__(self):
        return f'{self.teacher.username} -> {self.grade.code}'


class StudentProgress(models.Model):
    """Registro de avance de un docente en un módulo/unidad (marcación de clase vista)."""

    class Status(models.TextChoices):
        NOT_STARTED = 'not_started', 'Not Started'
        IN_PROGRESS = 'in_progress', 'In Progress'
        COMPLETED = 'completed', 'Completed'

    teacher = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='module_progress')
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
        unique_together = ('teacher', 'module')

    def __str__(self):
        return f'{self.teacher.username} - {self.module}'
