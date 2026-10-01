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

  // El estilo clay (borde 3px, esquinas redondeadas, foco azul) vive ahora
  // en el primitivo shared/ui/Input; aquí solo los overrides del formulario.
  const fieldBase = '!pl-12 pr-4';
  const fieldInvalid = '!border-red-400 focus:!border-red-400 focus:ring-red-500/20';
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
            className={`${fieldBase} ${emailError || hasAuthError ? fieldInvalid : ''}`}
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
            className={`${fieldBase} !pr-12 ${passwordError || hasAuthError ? fieldInvalid : ''}`}
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
        <label htmlFor="rememberMe" className="flex min-h-11 cursor-pointer select-none items-center gap-3">
          <input
            id="rememberMe"
            type="checkbox"
            checked={formState.rememberMe}
            onChange={(event) => updateField('rememberMe', event.target.checked)}
            disabled={isLoading}
            className={`h-5 w-5 rounded-lg border text-blue-600 focus:ring-blue-500/40 cursor-pointer ${
              darkMode ? 'border-slate-600 bg-[#0f172a]' : 'border-blue-200 bg-white'
            }`}
            aria-label="Recordarme"
          />
          <span className={`text-sm font-semibold cursor-pointer ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            Recordarme
          </span>
        </label>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="h-12 w-full rounded-2xl border-2 border-blue-300 bg-gradient-to-br from-blue-100 via-sky-100 to-cyan-100 text-base font-black text-blue-800 shadow-[0_4px_0_rgba(37,99,235,0.25),0_10px_20px_rgba(59,130,246,0.25),inset_0_2px_0_rgba(255,255,255,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-200 hover:via-sky-200 hover:to-cyan-200 hover:shadow-[0_6px_0_rgba(37,99,235,0.25),0_14px_24px_rgba(59,130,246,0.3),inset_0_2px_0_rgba(255,255,255,0.7)] active:translate-y-0.5 active:shadow-[0_2px_0_rgba(37,99,235,0.25)] disabled:translate-y-0"
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
