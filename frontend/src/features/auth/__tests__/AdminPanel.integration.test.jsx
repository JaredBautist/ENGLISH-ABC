import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
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

beforeEach(() => {
  apiFetch.mockReset();
});

const renderAdmin = () => render(<AdminPanel />);

describe('AdminPanel', () => {
  it('lists teachers with their assigned grades', async () => {
    apiFetch.mockResolvedValueOnce([
      {
        id: 1,
        username: 'ana.gomez',
        email: 'ana@colegio.edu.co',
        grades: ['primero', 'segundo'],
        is_active: true,
      },
    ]);

    renderAdmin();

    await waitFor(() => {
      expect(screen.getByText('ana.gomez')).toBeInTheDocument();
    });
    expect(screen.getByText('ana@colegio.edu.co')).toBeInTheDocument();
    expect(screen.getAllByText('Primero').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Segundo').length).toBeGreaterThan(0);
  });

  it('creates a teacher with grade assignments', async () => {
    const userEvent = await import('@testing-library/user-event');
    const user = userEvent.default.setup();

    apiFetch.mockResolvedValueOnce([
      {
        id: 1,
        username: 'ana.gomez',
        email: 'ana@colegio.edu.co',
        grades: ['primero'],
        is_active: true,
      },
    ]);
    apiFetch.mockResolvedValueOnce({
      id: 2,
      username: 'carlos.ruiz',
      email: 'carlos@colegio.edu.co',
      grades: ['primero', 'segundo'],
      is_active: true,
    });

    renderAdmin();
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
