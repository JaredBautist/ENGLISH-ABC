import { apiFetch } from '../utils/api';

/**
 * Fetch levels with defensive handling
 */
export const fetchLevels = async () => {
  try {
    const response = await apiFetch('/levels/');
    return Array.isArray(response) ? response : response.results || [];
  } catch (error) {
    console.error('Error fetching levels:', error);
    return [];
  }
};

/**
 * Fetch students with defensive handling
 */
export const fetchStudents = async () => {
  try {
    const response = await apiFetch('/teacher/students/');
    return Array.isArray(response) ? response : response.results || [];
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
};

export const createStudent = (payload) =>
  apiFetch('/teacher/students/', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

export const updateStudent = (studentId, payload) =>
  apiFetch(`/teacher/students/${studentId}/`, {
    method: 'PATCH',
    body: JSON.stringify(payload)
  });

export const fetchStudentProgress = (studentId) =>
  apiFetch(`/teacher/students/${studentId}/progress/`);

/**
 * Obtener estadísticas agregadas del dashboard
 */
export const fetchDashboardStats = async () => {
  try {
    return await apiFetch('/teacher/dashboard/stats/');
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return null;
  }
};

/**
 * Obtener resumen de progreso de cada estudiante
 */
export const fetchStudentProgressSummary = async () => {
  try {
    return await apiFetch('/teacher/students-progress-summary/');
  } catch (error) {
    console.error('Error fetching student progress summary:', error);
    return [];
  }
};

/**
 * Obtener métricas de actividad de los últimos 7 días
 */
export const fetchActivityMetrics = async () => {
  try {
    return await apiFetch('/teacher/activity-metrics/');
  } catch (error) {
    console.error('Error fetching activity metrics:', error);
    return [];
  }
};

/**
 * Obtener estudiantes con bajo progreso (< 25%)
 */
export const fetchLowProgressStudents = async () => {
  try {
    const response = await apiFetch('/teacher/low-progress-students/');
    return Array.isArray(response) ? response : response.results || [];
  } catch (error) {
    console.error('Error fetching low progress students:', error);
    return [];
  }
};

const teacherService = {
  fetchLevels,
  fetchStudents,
  createStudent,
  fetchStudentProgress,
  fetchDashboardStats,
  fetchStudentProgressSummary,
  fetchActivityMetrics,
  fetchLowProgressStudents,
  updateStudent
};

export default teacherService;
