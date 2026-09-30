from django.contrib import admin
from .models import Grade, Module, StudentProgress, TeacherGrade


@admin.register(Grade)
class GradeAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'order', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('code', 'name')


@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ('grade', 'week_number', 'title', 'period', 'dba_number', 'order', 'is_active')
    list_filter = ('grade', 'is_active', 'period')
    search_fields = ('title', 'subtitle', 'dba_text')


@admin.register(TeacherGrade)
class TeacherGradeAdmin(admin.ModelAdmin):
    list_display = ('teacher', 'grade', 'assigned_by', 'created_at')
    search_fields = ('teacher__username', 'grade__code')


@admin.register(StudentProgress)
class StudentProgressAdmin(admin.ModelAdmin):
    list_display = ('teacher', 'module', 'status', 'completion_percent', 'last_activity')
    list_filter = ('status', 'module__grade')
    search_fields = ('teacher__username', 'module__title')
