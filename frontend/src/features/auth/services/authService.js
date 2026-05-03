// Auth Service - Manejo de todas las operaciones de autenticación con backend
import axios from 'axios';

const API_BASE = '/api/auth';

/**
 * Realiza login con email y password
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<{access: string, refresh: string, user: Object}>}
 */
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE}/token/`, {
      email,
      password
    });
    return response.data; // { access, refresh, user }
  } catch (error) {
    throw handleAuthError(error);
  }
};

/**
 * Refresca el access token usando el refresh token
 * @param {string} refreshToken - Refresh token obtendido en login
 * @returns {Promise<{access: string}>}
 */
export const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${API_BASE}/token/refresh/`, {
      refresh: refreshToken
    });
    return response.data; // { access }
  } catch (error) {
    throw handleAuthError(error);
  }
};

/**
 * Obtiene datos del usuario autenticado
 * @param {string} accessToken - Access token JWT
 * @returns {Promise<Object>} - Datos del usuario
 */
export const me = async (accessToken) => {
  try {
    const response = await axios.get(`${API_BASE}/me/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    throw handleAuthError(error);
  }
};

/**
 * Valida que un token sea válido contactando con el backend
 * @param {string} accessToken - Access token a validar
 * @returns {Promise<Object>} - Datos del usuario si es válido
 */
export const validateToken = async (accessToken) => {
  if (!accessToken) {
    throw new Error('No token provided');
  }
  
  try {
    return await me(accessToken);
  } catch (error) {
    throw new Error('Token validation failed');
  }
};

/**
 * Maneja errores de autenticación y los convierte en mensajes user-friendly
 * @param {Error} error - Error de axios
 * @returns {Error} - Error con mensaje amigable
 */
const handleAuthError = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    
    switch (status) {
      case 401:
        return new Error('Correo o contraseña incorrectos. Revisa tus datos e intenta de nuevo.');
      case 400:
        return new Error(data?.detail || 'Verifica el correo y la contraseña.');
      case 429:
        return new Error('Demasiados intentos. Intenta más tarde.');
      case 500:
        return new Error('Error del servidor. Intenta más tarde.');
      default:
        return new Error(data?.detail || 'Error de autenticación');
    }
  }
  
  if (error.request) {
    return new Error('No se puede conectar al servidor. Verifica tu conexión.');
  }
  
  return error;
};

export default {
  login,
  refreshToken,
  me,
  validateToken
};
