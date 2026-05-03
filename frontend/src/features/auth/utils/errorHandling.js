/**
 * Error Handling Utilities
 * Converts API errors to user-friendly messages
 */

export const handleError = (error) => {
  console.error('Auth Error:', error);

  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case 401:
        return 'Correo o contraseña incorrectos. Revisa tus datos e intenta de nuevo.';
      case 400:
        return data?.detail || 'Solicitud inválida. Verifica los datos.';
      case 429:
        return 'Demasiados intentos. Intenta más tarde.';
      case 500:
      case 502:
      case 503:
        return 'Error del servidor. Intenta más tarde.';
      default:
        return data?.detail || 'Error de autenticación';
    }
  }

  if (error.request) {
    return 'No se puede conectar al servidor. Verifica tu conexión.';
  }

  return error.message || 'Error desconocido';
};

export const isNetworkError = (error) => {
  return !error.response && error.request;
};

export const isAuthError = (error) => {
  return error.response?.status === 401;
};

export const isValidationError = (error) => {
  return error.response?.status === 400;
};

export const isServerError = (error) => {
  const status = error.response?.status;
  return status && status >= 500;
};

export const isRateLimitError = (error) => {
  return error.response?.status === 429;
};
