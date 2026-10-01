import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { tokenStorage } from '../utils/tokenStorage';
import { useLogin } from '../hooks/useLogin';
import React from 'react';
import { AuthContext } from '../context/AuthContext';

describe('Remember Me (Recordarme) Functionality', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  it('saves remembered email and preference to localStorage when rememberMe is true', () => {
    tokenStorage.saveRememberedEmail('profe@escuela.edu.co', true);
    expect(tokenStorage.getRememberedEmail()).toBe('profe@escuela.edu.co');
    expect(tokenStorage.getRememberPreference()).toBe(true);
  });

  it('clears remembered email when rememberMe is false', () => {
    tokenStorage.saveRememberedEmail('profe@escuela.edu.co', true);
    expect(tokenStorage.getRememberedEmail()).toBe('profe@escuela.edu.co');

    tokenStorage.saveRememberedEmail('profe@escuela.edu.co', false);
    expect(tokenStorage.getRememberedEmail()).toBe('');
    expect(tokenStorage.getRememberPreference()).toBe(false);
  });

  it('stores tokens in localStorage when rememberMe is true', () => {
    tokenStorage.saveTokens({ access: 'access_123', refresh: 'refresh_123' }, true, { id: 1, role: 'teacher' });
    expect(localStorage.getItem('access_token')).toBe('access_123');
    expect(tokenStorage.getAccessToken()).toBe('access_123');
  });

  it('preserves remembered email on logout / clearTokens', () => {
    tokenStorage.saveRememberedEmail('docente@colombia.edu.co', true);
    tokenStorage.saveTokens({ access: 'access_123', refresh: 'refresh_123' }, true, { id: 1, role: 'teacher' });

    tokenStorage.clearTokens(true); // default on logout

    // Tokens and user are cleared
    expect(tokenStorage.getAccessToken()).toBeNull();
    expect(tokenStorage.getUser()).toBeNull();
    // Remembered email stays for quick re-login
    expect(tokenStorage.getRememberedEmail()).toBe('docente@colombia.edu.co');
    expect(tokenStorage.getRememberPreference()).toBe(true);
  });

  it('initializes useLogin hook with remembered email and checked rememberMe state', () => {
    tokenStorage.saveRememberedEmail('recordarme@test.edu.co', true);

    const mockAuth = {
      login: vi.fn().mockResolvedValue({ success: true, user: { role: 'teacher' } }),
      logout: vi.fn(),
    };

    const wrapper = ({ children }) => (
      <AuthContext.Provider value={mockAuth}>{children}</AuthContext.Provider>
    );

    const { result } = renderHook(() => useLogin(), { wrapper });

    expect(result.current.formState.email).toBe('recordarme@test.edu.co');
    expect(result.current.formState.rememberMe).toBe(true);
  });
});
