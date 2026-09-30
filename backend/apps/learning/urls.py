from django.urls import path
from .views import (
    AdminOverviewView,
    AdminTeacherDetailView,
    AdminTeacherListCreateView,
    GradeListView,
    ModuleListView,
    TeacherMeSummaryView,
    TeacherProgressMeView,
)

urlpatterns = [
    path('grades/', GradeListView.as_view(), name='grades-list'),
    path('modules/', ModuleListView.as_view(), name='modules-list'),
    path('teachers/me/summary/', TeacherMeSummaryView.as_view(), name='teacher-me-summary'),
    path('teachers/me/progress/', TeacherProgressMeView.as_view(), name='teacher-progress-me'),
    path('admin/overview/', AdminOverviewView.as_view(), name='admin-overview'),
    path('admin/teachers/', AdminTeacherListCreateView.as_view(), name='admin-teachers'),
    path('admin/teachers/<int:teacher_id>/', AdminTeacherDetailView.as_view(), name='admin-teacher-detail'),
]
