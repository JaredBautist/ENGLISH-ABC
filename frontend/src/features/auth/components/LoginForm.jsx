import { useState } from 'react';
import { AlertCircle, ArrowRight, Eye, EyeOff, Loader, LockKeyhole, Mail } from 'lucide-react';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import { Alert, AlertDescription } from '@/shared/ui/Alert';
import { useLogin } from '../hooks/useLogin';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm({ darkMode = false }) {
  const { formState, error, isLoading, handleSubmit, updateField } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});

  const emailError = touched.email && !emailPattern.test(formState.email)
    ? 'Escribe un correo válido.'
    : '';
  const passwordError = touched.password && !formState.password
    ? 'La contraseña es obligatoria.'
    : '';
  const hasAuthError = Boolean(error);
  const emailDescription = [emailError ? 'email-error' : '', hasAuthError ? 'auth-error' : ''].filter(Boolean).join(' ') || undefined;
  const passwordDescription = [passwordError ? 'password-error' : '', hasAuthError ? 'auth-error' : ''].filter(Boolean).join(' ') || undefined;

  const fieldBase = `h-12 rounded-2xl !pl-12 pr-4 text-base shadow-sm transition-colors focus:ring-2 ${
    darkMode
      ? 'bg-[#0f172a]/75 text-slate-100 placeholder:text-slate-500 focus:border-[#818cf8] focus:ring-[#6366f1]/25'
      : 'bg-white text-slate-950 placeholder:text-slate-400 focus:border-[#0f766e] focus:ring-[#0f766e]/20'
  }`;
  const fieldNormal = darkMode ? 'border-slate-700' : 'border-slate-300';
  const fieldInvalid = 'border-red-400 focus:border-red-400 focus:ring-red-500/20';
  const iconTone = darkMode ? 'text-slate-400' : 'text-slate-500';
  const labelTone = darkMode ? 'text-slate-200' : 'text-slate-800';

  const onSubmit = async (event) => {
    setTouched({ email: true, password: true });

    if (!emailPattern.test(formState.email) || !formState.password) {
      event.preventDefault();
      return false;
    }

    return handleSubmit(event);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="space-y-2">
        <label htmlFor="email" className={`text-sm font-semibold ${labelTone}`}>
          Correo electrónico
        </label>
        <div className="relative">
          <Mail size={18} className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${iconTone}`} />
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="nombre@ejemplo.com"
            value={formState.email}
            onChange={(event) => updateField('email', event.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            disabled={isLoading}
            required
            aria-invalid={Boolean(emailError || hasAuthError)}
            aria-describedby={emailDescription}
            className={`${fieldBase} ${emailError || hasAuthError ? fieldInvalid : fieldNormal}`}
          />
        </div>
        {emailError && (
          <p id="email-error" className={`flex items-center gap-1.5 text-sm font-medium ${darkMode ? 'text-red-300' : 'text-red-600'}`}>
            <AlertCircle size={15} />
            {emailError}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className={`text-sm font-semibold ${labelTone}`}>
          Contraseña
        </label>
        <div className="relative">
          <LockKeyhole size={18} className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${iconTone}`} />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Ingresa tu contraseña"
            value={formState.password}
            onChange={(event) => updateField('password', event.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            disabled={isLoading}
            required
            aria-invalid={Boolean(passwordError || hasAuthError)}
            aria-describedby={passwordDescription}
            className={`${fieldBase} !pr-12 ${passwordError || hasAuthError ? fieldInvalid : fieldNormal}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
            className={`absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl transition-colors disabled:opacity-50 ${
              darkMode ? 'text-stone-400 hover:bg-white/10 hover:text-stone-100' : 'text-stone-500 hover:bg-stone-100 hover:text-stone-800'
            }`}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {passwordError && (
          <p id="password-error" className={`flex items-center gap-1.5 text-sm font-medium ${darkMode ? 'text-red-300' : 'text-red-600'}`}>
            <AlertCircle size={15} />
            {passwordError}
          </p>
        )}
      </div>

      {error && (
        <Alert
          variant="destructive"
          id="auth-error"
          className={`rounded-2xl border p-4 shadow-[0_14px_32px_rgba(239,68,68,0.14)] ${
            darkMode
              ? 'border-red-400/35 bg-red-500/10 text-red-100'
              : 'border-red-200 bg-red-50 text-red-800'
          }`}
        >
          <AlertDescription className="flex gap-3 text-sm leading-6">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>
              <span className="block font-bold">No pudimos iniciar sesión</span>
              <span className={darkMode ? 'text-red-100/90' : 'text-red-700'}>{error}</span>
            </span>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex items-center gap-3 pt-1">
        <label className="flex min-h-11 cursor-pointer items-center gap-3">
          <input
            id="rememberMe"
            type="checkbox"
            checked={formState.rememberMe}
            onChange={(event) => updateField('rememberMe', event.target.checked)}
            disabled={isLoading}
            className={`h-5 w-5 rounded-md border text-[#0f766e] focus:ring-[#0f766e] ${
              darkMode ? 'border-slate-600 bg-[#0f172a]' : 'border-slate-300 bg-white'
            }`}
            aria-label="Recordarme"
          />
          <span className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            Recordarme
          </span>
        </label>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="h-12 w-full rounded-2xl bg-gradient-to-r from-[#0f766e] to-[#0ea5a4] text-base font-bold text-white shadow-[0_14px_28px_rgba(15,118,110,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:from-[#0d9488] hover:to-[#14b8a6] hover:shadow-[0_18px_32px_rgba(15,118,110,0.36)] disabled:translate-y-0"
      >
        {isLoading ? (
          <>
            <Loader size={18} className="animate-spin" />
            Verificando...
          </>
        ) : (
          <>
            Entrar
            <ArrowRight size={18} />
          </>
        )}
      </Button>
    </form>
  );
}
