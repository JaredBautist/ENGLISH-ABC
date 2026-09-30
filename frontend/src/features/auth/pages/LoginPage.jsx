import { useEffect } from 'react';
import { BookOpen, GraduationCap, Sparkles, Sun, Moon } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../../theme/ThemeProvider';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  const { isAuthenticated, user, isLoading, status } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    if (isAuthenticated && user && !isLoading) {
      const redirectPath = user.role === 'superadmin' ? '/admin' : '/docente';
      window.location.replace(redirectPath);
    }
  }, [isAuthenticated, user, isLoading]);

  if (isLoading && status === 'idle') {
    return (
      <div
        className={`flex min-h-dvh items-center justify-center ${
          isDark ? 'bg-slate-950' : 'bg-[#f8faf7]'
        }`}
        role="status"
        aria-label="Cargando"
      >
        <div
          className={`h-11 w-11 animate-spin rounded-full border-2 ${
            isDark ? 'border-indigo-400/40 border-t-indigo-400' : 'border-[#99f6e4] border-t-[#0f766e]'
          }`}
        />
      </div>
    );
  }

  const tone = {
    page: isDark ? 'bg-slate-950 text-slate-100' : 'bg-[#f8faf7] text-slate-800',
    badge: isDark
      ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300'
      : 'border-[#99f6e4] bg-white text-[#115e59]',
    heading: isDark ? 'text-white' : 'text-[#134e4a]',
    body: isDark ? 'text-slate-400' : 'text-slate-600',
    card: isDark
      ? 'border-slate-700/80 bg-slate-900/90 shadow-[0_28px_80px_rgba(2,6,23,0.6)]'
      : 'border-[#ccfbf1] bg-white/95 shadow-[0_28px_80px_rgba(15,118,110,0.16)]',
    cardIcon: isDark
      ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300'
      : 'border-[#99f6e4] bg-[#f0fdfa] text-[#0f766e]',
  };

  return (
    <main
      className={`relative min-h-dvh overflow-hidden px-4 py-8 transition-colors duration-300 ${tone.page}`}
    >
      {/* Decorative background */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,118,110,0.12),transparent_50%),radial-gradient(circle_at_90%_85%,rgba(234,88,12,0.10),transparent_42%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,118,110,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,118,110,0.06)_1px,transparent_1px)] bg-[size:40px_40px]"
        aria-hidden="true"
      />

      {/* Theme toggle */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        title={isDark ? 'Modo claro' : 'Modo oscuro'}
        className={`absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-2xl border backdrop-blur transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 sm:right-6 sm:top-6 ${
          isDark
            ? 'border-slate-700 bg-slate-900/80 text-amber-300 hover:bg-slate-800'
            : 'border-slate-200 bg-white/80 text-slate-600 hover:bg-white'
        }`}
      >
        {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
      </button>

      <section className="relative mx-auto grid min-h-[calc(100dvh-4rem)] w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_460px]">
        <div className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left">
          <div
            className={`mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-[1.6rem] shadow-[0_18px_45px_rgba(15,118,110,0.24)] lg:mx-0 ${
              isDark
                ? 'bg-gradient-to-br from-indigo-500 to-cyan-500 text-white'
                : 'bg-gradient-to-br from-[#0f766e] to-[#0ea5a4] text-white'
            }`}
            aria-hidden="true"
          >
            <GraduationCap size={30} />
          </div>

          <p
            className={`mb-4 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold shadow-sm ${tone.badge}`}
          >
            <Sparkles size={16} aria-hidden="true" />
            Colombianos · Preescolar y Primaria
          </p>

          <h1 className={`text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl ${tone.heading}`}>
            Plataforma Docente DBA
          </h1>
          <p className={`mt-6 max-w-xl text-lg leading-8 ${tone.body}`}>
            Herramienta institucional de apoyo para la enseñanza del inglés con los DBA del MEN: Jardín, Transición, 1° y 2°.
          </p>
        </div>

        <div className={`mx-auto w-full max-w-[460px] rounded-[2rem] border backdrop-blur-sm ${tone.card}`}>
          <div className="p-6 sm:p-9">
            <div className="mb-7">
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border shadow-[0_12px_30px_rgba(15,118,110,0.12)] ${tone.cardIcon}`}
                aria-hidden="true"
              >
                <BookOpen size={23} />
              </div>
              <h2 className={`text-3xl font-extrabold leading-tight ${tone.heading}`}>Iniciar sesión</h2>
              <p className={`mt-2 text-base leading-7 ${tone.body}`}>
                Usa tu correo y contraseña para entrar.
              </p>
            </div>

            <LoginForm darkMode={isDark} />
          </div>
        </div>
      </section>
    </main>
  );
}
