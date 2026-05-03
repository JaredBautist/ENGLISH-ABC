import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';

export function useLogin() {
  const { login } = useAuth();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);
      setIsLoading(true);

      const result = await login(formState.email, formState.password, formState.rememberMe);

      if (!result.success) {
        setError(result.error);
      }

      setIsLoading(false);
      return result.success;
    },
    [formState, login]
  );

  const updateField = useCallback((field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setError(null);
  }, []);

  const resetForm = useCallback(() => {
    setFormState({ email: '', password: '', rememberMe: false });
    setError(null);
  }, []);

  return {
    formState,
    error,
    isLoading,
    handleSubmit,
    updateField,
    resetForm,
    setEmail: (email) => updateField('email', email),
    setPassword: (password) => updateField('password', password),
    setRememberMe: (rememberMe) => updateField('rememberMe', rememberMe),
  };
}
