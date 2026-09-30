import { useEffect } from 'react';
import { BookOpen, GraduationCap, Palette, Shapes, Sparkles, Sun, Moon } from 'lucide-react';
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
      <div className="flex min-h-dvh items-center justify-center bg-[#eff6ff] dark:bg-[#0b1224]">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"
          role="status"
          aria-label="Cargando"
        />
      </div>
    );
  }

  return (
    <main className="bg-blobs relative min-h-dvh overflow-hidden bg-[#eff6ff] px-4 py-8 text-slate-900 transition-colors duration-300 dark:bg-[#0b1224] dark:text-slate-100">
      {/* Theme toggle */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        title={isDark ? 'Modo claro' : 'Modo oscuro'}
        className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-blue-100 bg-white text-slate-600 shadow-[0_4px_0_rgba(37,99,235,0.12)] transition-all hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-900 dark:text-amber-300"
      >
        {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
      </button>

      <section className="relative z-10 mx-auto grid min-h-[calc(100dvh-4rem)] w-full max-w-6xl items-center gap-10 py-4 lg:grid-cols-[1fr_440px] lg:gap-14">
        {/* Brand side */}
        <div className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left">
          <div className="mx-auto mb-7 inline-flex h-20 w-20 rotate-3 items-center justify-center rounded-[1.8rem] bg-gradient-to-br from-blue-500 to-blue-700 shadow-[0_10px_0_rgba(29,78,216,0.35),0_18px_32px_rgba(37,99,235,0.35)] transition-transform hover:rotate-0 lg:mx-0">
            <GraduationCap size={38} className="text-white" aria-hidden="true" />
          </div>

          <p className="badge-clay badge-clay-blue mb-5 px-4 py-2 text-xs sm:text-sm">
            <Sparkles size={15} aria-hidden="true" />
            Herramienta institucional · Colegios de Colombia
          </p>

          <h1 className="text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
            Plataforma
            <span className="block bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
              Docente DBA
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300 lg:mx-0">
            Apoya tus clases de inglés con lecciones listas para proyectar, alineadas a los{' '}
            <strong className="font-extrabold text-slate-800 dark:text-slate-100">Derechos Básicos de Aprendizaje</strong>{' '}
            del MEN.
          </p>

          {/* Grade chips */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            {[
              { name: 'Jardín', emoji: '🧸', tone: 'bg-amber-100 text-amber-800 border-amber-300' },
              { name: 'Transición', emoji: '🎨', tone: 'bg-violet-100 text-violet-800 border-violet-300' },
              { name: '1°', emoji: '✏️', tone: 'bg-sky-100 text-sky-800 border-sky-300' },
              { name: '2°', emoji: '📚', tone: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
            ].map((grade) => (
              <span
                key={grade.name}
                className={`inline-flex items-center gap-2 rounded-2xl border-2 px-4 py-2.5 text-sm font-extrabold shadow-[0_4px_0_rgba(15,23,42,0.06)] transition-transform hover:-translate-y-0.5 ${grade.tone}`}
              >
                <span aria-hidden="true">{grade.emoji}</span> {grade.name}
              </span>
            ))}
          </div>

          <div className="mt-8 hidden items-center gap-6 text-sm font-bold text-slate-500 dark:text-slate-400 lg:flex">
            <span className="inline-flex items-center gap-2">
              <BookOpen size={16} aria-hidden="true" /> 32 unidades listas
            </span>
            <span className="inline-flex items-center gap-2">
              <Palette size={16} aria-hidden="true" /> Slides para proyectar
            </span>
            <span className="inline-flex items-center gap-2">
              <Shapes size={16} aria-hidden="true" /> DBA oficiales MEN
            </span>
          </div>
        </div>

        {/* Login card */}
        <div className="card-clay mx-auto w-full max-w-[440px] p-6 sm:p-9">
          <div className="mb-7">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 shadow-[0_4px_0_rgba(180,83,9,0.3)]">
              <BookOpen size={23} className="text-amber-950" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-extrabold leading-tight">Iniciar sesión</h2>
            <p className="mt-2 text-base leading-7 text-slate-600 dark:text-slate-400">
              Usa tu correo institucional y contraseña.
            </p>
          </div>

          <LoginForm darkMode={isDark} />
        </div>
      </section>
    </main>
  );
}
