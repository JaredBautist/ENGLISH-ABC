import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import TeacherDashboard from '../../../pages/TeacherDashboard';
import { AuthProvider } from '../context/AuthContext';

// Mock authService
vi.mock('../../../utils/api', () => ({
  apiFetch: vi.fn(async (path) => {
    console.log(`[API] Fetching: ${path}`);
    
    if (path === '/levels/') {
      return [
        { id: 1, code: 'a1-1', name: 'A1-1 Beginner', is_active: true },
        { id: 2, code: 'a1-2', name: 'A1-2 Advanced', is_active: true }
      ];
    }
    
    if (path === '/teacher/students/') {
      return [
        { id: 1, username: 'monica', email: 'monica@gmail.com', level: { code: 'a1-1' } },
        { id: 2, username: 'juan', email: 'juan@gmail.com', level: { code: 'a1-2' } }
      ];
    }
    
    if (path.includes('/progress/')) {
      return [
        { id: 1, status: 'in_progress', completion_percent: 50, module: { title: 'Week 1', level: { code: 'a1-1' }, week_number: 1 } }
      ];
    }
    
    throw new Error(`Unknown path: ${path}`);
  })
}));

describe('TeacherDashboard - Integration Tests', () => {
  it('should render the teacher dashboard with header', async () => {
    render(
      <AuthProvider>
        <TeacherDashboard />
      </AuthProvider>
    );

    // Check header
    expect(screen.getByText(/Panel Docente/i)).toBeInTheDocument();
    expect(screen.getByText(/Monitorea estudiantes/i)).toBeInTheDocument();
  });

  it('should load and display levels and students', async () => {
    render(
      <AuthProvider>
        <TeacherDashboard />
      </AuthProvider>
    );

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByDisplayValue('a1-1')).toBeInTheDocument();
    }, { timeout: 3000 });

    // Check if select has options
    const levelSelect = screen.getByRole('combobox');
    expect(levelSelect).toBeInTheDocument();
    expect(levelSelect.children.length).toBeGreaterThan(1);
  });

  it('should display students list after loading', async () => {
    render(
      <AuthProvider>
        <TeacherDashboard />
      </AuthProvider>
    );

    // Wait for students to appear
    await waitFor(() => {
      expect(screen.getByText('monica')).toBeInTheDocument();
    }, { timeout: 3000 });

    expect(screen.getByText('monica@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('juan')).toBeInTheDocument();
  });

  it('should have functional buttons and inputs', async () => {
    render(
      <AuthProvider>
        <TeacherDashboard />
      </AuthProvider>
    );

    // Check for buttons
    const createButton = screen.getByText(/Crear Estudiante/i);
    expect(createButton).toBeInTheDocument();

    const logoutLink = screen.getByText(/Cerrar sesión/i);
    expect(logoutLink).toBeInTheDocument();

    // Check for form inputs
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('should display progress section', async () => {
    render(
      <AuthProvider>
        <TeacherDashboard />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Progreso del Estudiante/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('should show error state handling', async () => {
    // Test with mock that returns error
    vi.mock('../../../utils/api', () => ({
      apiFetch: vi.fn(async () => {
        throw new Error('Failed to fetch');
      })
    }));

    render(
      <AuthProvider>
        <TeacherDashboard />
      </AuthProvider>
    );

    // Error should appear
    await waitFor(() => {
      expect(screen.getByText(/No se pudo cargar/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
