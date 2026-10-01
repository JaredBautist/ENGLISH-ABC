import { createContext, useState, useCallback, useEffect } from 'react';
import authService from '../services/authService';
import { tokenStorage } from '../utils/tokenStorage';
import { handleError } from '../utils/errorHandling';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, setState] = useState(() => {
    const tokens = tokenStorage.getStoredTokens();
    const cachedUser = tokenStorage.getUser();
    if (tokens?.access && cachedUser) {
      return {
        user: cachedUser,
        token: tokens.access,
        isLoading: false,
        isAuthenticated: true,
        error: null,
        status: 'success',
      };
    }
    return {
      user: null,
      token: tokens?.access || null,
      isLoading: Boolean(tokens?.access),
      isAuthenticated: false,
      error: null,
      status: 'idle',
    };
  });

  // Revalidate auth state in background or fetch if no cached user
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        const tokens = tokenStorage.getStoredTokens();
        if (!tokens?.access) {
          if (isMounted) {
            setState((prev) => ({
              ...prev,
              isLoading: false,
            }));
          }
          return;
        }

        // Validate token with backend
        const userData = await authService.me(tokens.access);
        if (!isMounted) return;

        tokenStorage.saveUser(userData);
        setState({
          user: userData,
          token: tokens.access,
          isLoading: false,
          isAuthenticated: true,
          error: null,
          status: 'success',
        });
      } catch (err) {
        if (!isMounted) return;
        console.error('Auth background validation error:', err);
        // Only clear tokens if unauthorized (401/403)
        const isUnauthorized = err.response?.status === 401 || err.response?.status === 403;
        if (isUnauthorized) {
          tokenStorage.clearTokens();
          setState({
            user: null,
            token: null,
            isLoading: false,
            isAuthenticated: false,
            error: null,
            status: 'idle',
          });
        } else {
          // If network glitch but had cached user, keep optimistic auth
          setState((prev) => ({
            ...prev,
            isLoading: false,
          }));
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (email, password, rememberMe = false) => {
    setState((prev) => ({
      ...prev,
      status: 'loading',
      error: null,
      isLoading: !prev.user,
    }));

    try {
      const response = await authService.login(email, password);
      const { access, refresh, user } = response;

      // Store tokens and cached user
      tokenStorage.saveTokens({ access, refresh }, rememberMe, user);
      tokenStorage.saveUser(user, rememberMe);
      tokenStorage.saveRememberedEmail(email, rememberMe);

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
    tokenStorage.clearTokens(true);
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
