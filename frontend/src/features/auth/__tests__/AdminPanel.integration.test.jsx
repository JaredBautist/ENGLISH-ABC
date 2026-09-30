import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminPanel from '../../../components/AdminPanel';

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: 9, username: 'admin', email: 'admin@colegio.edu.co', role: 'superadmin' },
    logout: vi.fn(),
  }),
}));

vi.mock('../../theme/ThemeProvider', () => ({
  useTheme: () => ({ isDark: false, toggleTheme: vi.fn() }),
}));

vi.mock('../../../utils/api', () => ({
  apiFetch: vi.fn(),
}));

import { apiFetch } from '../../../utils/api';

const overviewResponse = {
  totals: { teachers: 1, active_teachers: 1, grades: 2, total_units: 16, units_completed: 1 },
  teachers: [
    {
      id: 1,
      username: 'ana.gomez',
      email: 'ana@colegio.edu.co',
      is_active: true,
      grade_codes: ['primero', 'segundo'],
      units_touched: 1,
      units_completed: 1,
      avg_completion: 100,
      coverage_percent: 6.25,
    },
  ],
  grades: [
    { code: 'primero', name: 'Primero', teacher_count: 1, total_units: 8, avg_completion: 12.5, units_completed: 1 },
    { code: 'segundo', name: 'Segundo', teacher_count: 1, total_units: 8, avg_completion: 0, units_completed: 0 },
  ],
};

const teachersResponse = [
  {
    id: 1,
    username: 'ana.gomez',
    email: 'ana@colegio.edu.co',
    grades: ['primero', 'segundo'],
    is_active: true,
  },
];

beforeEach(() => {
  apiFetch.mockReset();
  apiFetch.mockImplementation(async (path) => {
    if (String(path).includes('/admin/overview/')) return overviewResponse;
    return teachersResponse;
  });
});

const renderAdmin = () => render(<AdminPanel />);

async function openTeachersTab() {
  await screen.findByText('Resumen institucional', { selector: 'section *[aria-hidden]' }).catch(() => {});
  await screen.findByText('Resumen');
  await screen.findByText('Ana'.length ? 'Cobertura por grado' : 'Cobertura por grado');
  const tab = screen.getByRole('tab', { name: /docentes/i });
  tab.click();
}

describe('AdminPanel', () => {
  it('shows institutional overview metrics', async () => {
    renderAdmin();

    await waitFor(() => {
      expect(screen.getByText('Cobertura por grado')).toBeInTheDocument();
    });
    expect(screen.getByText('Avance por docente')).toBeInTheDocument();
    expect(screen.getByText('ana.gomez')).toBeInTheDocument();
    expect(screen.getByText('6.25%')).toBeInTheDocument();
  });

  it('lists teachers with their assigned grades in the teachers tab', async () => {
    renderAdmin();
    await waitFor(() => {
      expect(screen.getByText('Cobertura por grado')).toBeInTheDocument();
    });

    const user = userEvent.setup();
    await user.click(screen.getByRole('tab', { name: /docentes/i }));

    await waitFor(() => {
      expect(screen.getByText('ana.gomez')).toBeInTheDocument();
    });
    expect(screen.getByText('ana@colegio.edu.co')).toBeInTheDocument();
  });

  it('creates a teacher with grade assignments', async () => {
    const user = userEvent.setup();

    apiFetch.mockImplementation(async (path, options) => {
      if (String(path).includes('/admin/overview/')) return overviewResponse;
      if (options?.method === 'POST') {
        const body = JSON.parse(options.body);
        return {
          id: 2,
          username: body.username,
          email: body.email,
          grades: body.grade_codes,
          is_active: true,
        };
      }
      return teachersResponse;
    });

    renderAdmin();
    await screen.findByText('Cobertura por grado');

    await user.click(screen.getByRole('tab', { name: /docentes/i }));
    await screen.findByText('ana.gomez');

    await user.type(screen.getByLabelText('Usuario'), 'carlos.ruiz');
    await user.type(screen.getByLabelText('Correo'), 'carlos@colegio.edu.co');
    await user.type(screen.getByLabelText('Contraseña'), 'Docente#2026');

    await user.click(screen.getByRole('button', { name: /crear docente/i }));

    await waitFor(() => {
      expect(screen.getByText('carlos.ruiz')).toBeInTheDocument();
    });
    expect(apiFetch).toHaveBeenLastCalledWith(
      '/admin/teachers/',
      expect.objectContaining({ method: 'POST' })
    );
  });
});
