from django.urls import path
from .views import (
    LevelListView,
    ModuleListView,
    StudentProgressListView,
    StudentProgressMeView,
    StudentProgressSummaryMeView,
    TeacherStudentDetailView,
    TeacherStudentListCreateView,
    TeacherDashboardStatsView,
    TeacherStudentProgressSummaryView,
    TeacherActivityMetricsView,
    LowProgressStudentsView,
)

urlpatterns = [
    path('levels/', LevelListView.as_view(), name='levels-list'),
    path('modules/', ModuleListView.as_view(), name='modules-list'),
    path('teacher/students/', TeacherStudentListCreateView.as_view(), name='teacher-students'),
    path('teacher/students/<int:student_id>/', TeacherStudentDetailView.as_view(), name='teacher-student-detail'),
    path('teacher/students/<int:student_id>/progress/', StudentProgressListView.as_view(), name='student-progress'),
    path('students/me/progress/', StudentProgressMeView.as_view(), name='student-progress-me'),
    path('students/me/progress-summary/', StudentProgressSummaryMeView.as_view(), name='student-progress-summary-me'),
    path('teacher/dashboard/stats/', TeacherDashboardStatsView.as_view(), name='teacher-dashboard-stats'),
    path('teacher/students-progress-summary/', TeacherStudentProgressSummaryView.as_view(), name='teacher-students-summary'),
    path('teacher/activity-metrics/', TeacherActivityMetricsView.as_view(), name='activity-metrics'),
    path('teacher/low-progress-students/', LowProgressStudentsView.as_view(), name='low-progress-students'),
]
