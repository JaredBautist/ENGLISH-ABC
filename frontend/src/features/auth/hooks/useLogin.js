import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { tokenStorage } from '../utils/tokenStorage';

export function useLogin() {
  const { login } = useAuth();
  const [formState, setFormState] = useState(() => {
    const rememberedEmail = tokenStorage.getRememberedEmail();
    const rememberPref = tokenStorage.getRememberPreference();
    return {
      email: rememberedEmail || '',
      password: '',
      rememberMe: Boolean(rememberedEmail || rememberPref),
    };
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault?.();
      setError(null);
      setIsLoading(true);

      const result = await login(formState.email, formState.password, formState.rememberMe);

      if (!result.success) {
        setError(result.error);
      } else {
        // Sync remembered email preference
        tokenStorage.saveRememberedEmail(formState.email, formState.rememberMe);
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
    const rememberedEmail = tokenStorage.getRememberedEmail();
    setFormState({
      email: rememberedEmail || '',
      password: '',
      rememberMe: Boolean(rememberedEmail),
    });
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
