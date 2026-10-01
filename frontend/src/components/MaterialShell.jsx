import { GraduationCap, Home, LogOut, Moon, Sun } from 'lucide-react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useTheme } from '../features/theme/ThemeProvider';
import { gradeOrder, grades } from '../data/grados';

/**
 * Grados que puede ver el docente: solo los que le asignó la administración
 * (user.grades viene del login / /me). La administración los ve todos.
 */
export function allowedGradesFor(user) {
  const assigned = Array.isArray(user?.grades) ? user.grades : [];
  const isAdmin = user?.role === 'superadmin';
  if (isAdmin || assigned.length === 0) return gradeOrder;
  return gradeOrder.filter((code) => assigned.includes(code));
}

function useAllowedGrades() {
  const { user } = useAuth();
  return allowedGradesFor(user);
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2';

const gradeTone = {
  jardin: 'from-amber-400 to-orange-500',
  transicion: 'from-violet-500 to-fuchsia-500',
  primero: 'from-sky-500 to-cyan-500',
  segundo: 'from-emerald-500 to-teal-500',
};

export default function MaterialShell({ materialTitle, materialIcon: MaterialIcon, activeGrade, onGradeChange, backHref = '/docente', children }) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const allowedGrades = useAllowedGrades();

  return (
    <div className="bg-blobs min-h-screen bg-[#eff6ff] text-slate-900 transition-colors duration-300 dark:bg-[#0b1224] dark:text-slate-100">
      <a
        href="#material-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-blue-600 focus:px-4 focus:py-2 focus:font-bold focus:text-white"
      >
        Saltar al contenido
      </a>

      <header className="sticky top-0 z-40 border-b-2 border-blue-100 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-6xl items-center gap-2.5 px-3 py-2.5 sm:gap-3 sm:px-6 sm:py-3">
          <a
            href={backHref}
            aria-label="Volver al panel"
            title="Volver al panel"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-blue-300 bg-blue-100 p-0 text-blue-700 shadow-[0_4px_0_rgba(37,99,235,0.25),0_10px_20px_rgba(59,130,246,0.25),inset_0_2px_0_rgba(255,255,255,0.65)] transition-all hover:-translate-y-0.5 ${focusRing}`}
          >
            <Home size={18} aria-hidden="true" />
          </a>
          <div className="mr-auto flex min-w-0 items-center gap-2">
            {MaterialIcon && (
              <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:flex dark:bg-blue-500/10 dark:text-blue-300">
                <MaterialIcon size={19} aria-hidden="true" />
              </span>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-black leading-tight sm:text-base">{materialTitle}</p>
              <p className="truncate text-[11px] font-semibold text-slate-500 dark:text-slate-400 sm:text-xs">
                {user?.username} · Material para clase
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Modo claro' : 'Modo oscuro'}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-blue-100 bg-white p-0 text-slate-600 transition-all hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-900 dark:text-amber-300 ${focusRing}`}
          >
            {isDark ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={logout}
            aria-label="Cerrar sesión"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-rose-100 bg-white p-0 text-rose-600 transition-all hover:-translate-y-0.5 dark:border-rose-500/20 dark:bg-slate-900 dark:text-rose-400 ${focusRing}`}
          >
            <LogOut size={19} aria-hidden="true" />
          </button>
        </div>
      </header>

      <main id="material-main" className="relative z-10 mx-auto max-w-6xl px-3 py-4 sm:px-6 sm:py-8">
        {/* Grade tabs — solo si el docente tiene más de un grado asignado;
            con un solo grado la barra no aporta y el contenido sube */}
        {allowedGrades.length > 1 && (
        <div
          className={`mb-5 grid gap-2.5 sm:mb-8 sm:gap-3 ${
            allowedGrades.length === 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'
          }`}
          role="tablist"
          aria-label="Grado"
        >
          {allowedGrades.map((code) => {
            const active = code === activeGrade;
            return (
              <button
                key={code}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onGradeChange(code)}
                className={`rounded-2xl border-[3px] px-3 py-3 text-center text-sm font-black transition-all sm:text-base ${focusRing} ${
                  active
                    ? `-translate-y-0.5 border-transparent bg-gradient-to-br ${gradeTone[code]} text-white shadow-[0_6px_16px_rgba(15,23,42,0.18)]`
                    : 'border-blue-100 bg-white text-slate-500 hover:-translate-y-0.5 hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                }`}
              >
                {grades[code].name}
              </button>
            );
          })}
        </div>
        )}

        {children}
      </main>
    </div>
  );
}

export { GraduationCap };
