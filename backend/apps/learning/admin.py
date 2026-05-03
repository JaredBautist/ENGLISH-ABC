from django.contrib import admin
from .models import Level, Module, StudentProfile, StudentProgress, TeacherStudent


@admin.register(Level)
class LevelAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'order', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('code', 'name')


@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ('level', 'week_number', 'title', 'order', 'is_active')
    list_filter = ('level', 'is_active')
    search_fields = ('title', 'subtitle')


@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'current_level', 'assigned_by', 'assigned_at', 'is_active')
    list_filter = ('current_level', 'is_active')
    search_fields = ('user__username', 'user__email')


@admin.register(StudentProgress)
class StudentProgressAdmin(admin.ModelAdmin):
    list_display = ('student', 'module', 'status', 'completion_percent', 'last_activity')
    list_filter = ('status', 'module__level')
    search_fields = ('student__username', 'module__title')


@admin.register(TeacherStudent)
class TeacherStudentAdmin(admin.ModelAdmin):
    list_display = ('teacher', 'student', 'created_at')
    search_fields = ('teacher__username', 'student__username')
