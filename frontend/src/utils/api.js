import { tokenStorage } from '../features/auth/utils/tokenStorage';

const API_BASE = '/api';

const parseBody = async (response) => {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

let refreshPromise = null;

const requestNewAccessToken = async () => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) {
      tokenStorage.clearTokens();
      throw new Error('No hay sesión activa.');
    }

    try {
      const refreshRes = await fetch(`${API_BASE}/auth/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!refreshRes.ok) {
        tokenStorage.clearTokens();
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth:expired'));
        }
        throw new Error('Sesión expirada.');
      }

      const refreshData = await parseBody(refreshRes);
      if (refreshData?.access) {
        tokenStorage.updateTokens(refreshData.access, refreshData.refresh);
        return refreshData.access;
      }
      throw new Error('Respuesta inválida del servidor.');
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

export const apiFetch = async (path, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const accessToken = tokenStorage.getAccessToken();
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  // Handle silent token refresh on 401 Unauthorized
  if (response.status === 401 && !options._retry && !path.includes('/auth/')) {
    try {
      const newAccess = await requestNewAccessToken();
      if (newAccess) {
        return apiFetch(path, {
          ...options,
          _retry: true,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newAccess}`,
          },
        });
      }
    } catch (refreshErr) {
      console.warn('Silent token refresh failed:', refreshErr);
    }
  }

  const data = await parseBody(response);
  if (!response.ok) {
    const message = data?.detail || data?.message || 'Error de servidor.';
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export default apiFetch;
