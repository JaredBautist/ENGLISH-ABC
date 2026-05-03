import { createContext, useState, useCallback, useEffect } from 'react';
import authService from '../services/authService';
import { tokenStorage } from '../utils/tokenStorage';
import { handleError } from '../utils/errorHandling';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, setState] = useState({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
    status: 'idle',
  });

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const tokens = tokenStorage.getStoredTokens();
        if (tokens?.access) {
          // Validate token with backend
          const userData = await authService.me(tokens.access);
          setState({
            user: userData,
            token: tokens.access,
            isLoading: false,
            isAuthenticated: true,
            error: null,
            status: 'success',
          });
        } else {
          setState((prev) => ({
            ...prev,
            isLoading: false,
          }));
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        tokenStorage.clearTokens();
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }));
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (email, password, rememberMe = false) => {
    setState((prev) => ({
      ...prev,
      status: 'loading',
      error: null,
      isLoading: true,
    }));

    try {
      const response = await authService.login(email, password);
      const { access, refresh, user } = response;

      // Store tokens
      tokenStorage.saveTokens({ access, refresh }, rememberMe);

      setState({
        user,
        token: access,
        isLoading: false,
        isAuthenticated: true,
        error: null,
        status: 'success',
      });

      return { success: true, user };
    } catch (err) {
      const errorMessage = handleError(err);
      setState((prev) => ({
        ...prev,
        status: 'error',
        error: errorMessage,
        isLoading: false,
      }));
      return { success: false, error: errorMessage };
    }
  }, []);

  const logout = useCallback(() => {
    tokenStorage.clearTokens();
    setState({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,
      status: 'idle',
    });
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({
      ...prev,
      error: null,
    }));
  }, []);

  const value = {
    ...state,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
