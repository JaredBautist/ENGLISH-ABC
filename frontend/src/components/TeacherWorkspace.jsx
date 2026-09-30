import { useEffect, useMemo, useState } from 'react';
import {
  BookOpenCheck, ChevronRight, GraduationCap, Layers, LogOut, Moon, Presentation, Sun, Target,
} from 'lucide-react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useTheme } from '../features/theme/ThemeProvider';
import { apiFetch } from '../utils/api';
import { getGrade, grades, unitsByPeriod } from '../data/grados';
import DBADeck from './DBADeck';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2';

function statusTone(status) {
  if (status === 'completed') return 'badge-clay badge-clay-green';
  if (status === 'in_progress') return 'badge-clay badge-clay-blue';
  return 'badge-clay badge-clay-slate';
}

export default function TeacherWorkspace() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const isAdmin = user?.role === 'superadmin';

  const [assignedGradeIds, setAssignedGradeIds] = useState([]);
  const [activeGradeId, setActiveGradeId] = useState(null);
  const [summary, setSummary] = useState(null);
  const [deckUnit, setDeckUnit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const assignedGrades = useMemo(
    () => assignedGradeIds.map((code) => getGrade(code)).filter(Boolean),
    [assignedGradeIds]
  );

  useEffect(() => {
    let isActive = true;
    const load = async () => {
      setLoading(true);
      try {
        const list = await apiFetch('/grades/');
        const codes = (Array.isArray(list) ? list : list?.results || []).map((g) => g.code);
        if (!isActive) return;
        setAssignedGradeIds(codes);
        setActiveGradeId((prev) => prev || codes[0] || null);
        const data = await apiFetch('/teachers/me/summary/');
        if (isActive) setSummary(data);
        setError('');
      } catch (err) {
        if (isActive) setError('No pudimos cargar tus grados asignados.');
        console.error(err);
      } finally {
        if (isActive) setLoading(false);
      }
    };
    load();
    return () => {
      isActive = false;
    };
  }, []);

  const activeGrade = activeGradeId ? getGrade(activeGradeId) : null;
  const activeSummaryGrade = summary?.grades?.find((g) => g.grade_code === activeGradeId) || null;

  if (deckUnit && activeGrade) {
    return (
      <DBADeck
        slidesKey={deckUnit.slides}
        title={`${activeGrade.name} • Unidad ${deckUnit.week}: ${deckUnit.title}`}
        subtitle={deckUnit.subtitle}
        dashboardHref={isAdmin ? '/admin' : '/docente'}
      />
    );
  }

  return (
    <div className="bg-blobs min-h-screen bg-[#eff6ff] text-slate-900 transition-colors duration-300 dark:bg-[#0b1224] dark:text-slate-100">
      <a
        href="#teacher-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-blue-600 focus:px-4 focus:py-2 focus:font-bold focus:text-white"
      >
        Saltar al contenido
      </a>

      <header className="sticky top-0 z-40 border-b-2 border-blue-100 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-6xl items-center gap-2.5 px-3 py-2.5 sm:gap-3 sm:px-6 sm:py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-[0_4px_0_rgba(29,78,216,0.3)]">
            <GraduationCap size={21} aria-hidden="true" />
          </div>
          <div className="mr-auto min-w-0">
            <p className="truncate text-sm font-black leading-tight sm:text-base">Plataforma Docente DBA</p>
            <p className="truncate text-[11px] font-semibold text-slate-500 dark:text-slate-400 sm:text-xs">
              Hola, {user?.username} {isAdmin ? '• Administración' : ''}
            </p>
          </div>
          {isAdmin && (
            <a
              href="/admin"
              aria-label="Panel administrativo"
              title="Panel administrativo"
              className={`rounded-2xl bg-indigo-600 p-2.5 text-white shadow-[0_4px_0_rgba(76,29,149,0.35)] transition-all hover:-translate-y-0.5 ${focusRing}`}
            >
              <Layers size={18} aria-hidden="true" />
            </a>
          )}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Modo claro' : 'Modo oscuro'}
            className={`rounded-2xl border-2 border-blue-100 bg-white p-2.5 text-slate-600 transition-all hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-900 dark:text-amber-300 ${focusRing}`}
          >
            {isDark ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={logout}
            aria-label="Cerrar sesión"
            className={`rounded-2xl border-2 border-rose-100 bg-white p-2.5 text-rose-600 transition-all hover:-translate-y-0.5 dark:border-rose-500/20 dark:bg-slate-900 dark:text-rose-400 ${focusRing}`}
          >
            <LogOut size={19} aria-hidden="true" />
          </button>
        </div>
      </header>

      <main id="teacher-main" className="relative z-10 mx-auto max-w-6xl px-3 py-5 sm:px-6 sm:py-8">
        {error && (
          <div role="alert" className="card-clay mb-6 border-rose-200 bg-rose-50 p-4 font-bold text-rose-800 dark:bg-rose-950/40 dark:text-rose-300">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-24" role="status" aria-label="Cargando grados">
            <div className="h-11 w-11 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
          </div>
        ) : assignedGrades.length === 0 ? (
          <div className="card-clay mx-auto max-w-md p-10 text-center">
            <p className="mb-3 text-5xl" aria-hidden="true">🎓</p>
            <p className="text-lg font-black">No tienes grados asignados todavía.</p>
            <p className="mt-1 text-slate-500 dark:text-slate-400">
              La administración puede asignarte Jardín, Transición, 1° o 2°.
            </p>
          </div>
        ) : (
          <>
            {/* Selector de grados */}
            <div className="mb-6 grid grid-cols-2 gap-3 sm:mb-8 sm:gap-4 lg:grid-cols-4" role="tablist" aria-label="Grados asignados">
              {assignedGrades.map((grade) => {
                const active = grade.id === activeGradeId;
                const entry = summary?.grades?.find((g) => g.grade_code === grade.id);
                return (
                  <button
                    key={grade.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveGradeId(grade.id)}
                    className={`rounded-[1.6rem] border-[3px] p-3.5 text-left transition-all sm:p-5 ${focusRing} ${
                      active
                        ? `-translate-y-1 border-transparent bg-gradient-to-br ${grade.accent} shadow-[0_10px_24px_rgba(15,23,42,0.2)]`
                        : 'border-blue-100 bg-white hover:-translate-y-0.5 hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900'
                    }`}
                  >
                    <p className={`text-[10px] font-black uppercase tracking-widest sm:text-xs ${active ? 'text-white/85' : 'text-slate-400'}`}>
                      Grado
                    </p>
                    <p className={`text-xl font-black sm:text-2xl ${active ? 'text-white' : ''}`}>{grade.name}</p>
                    <p className={`mt-0.5 text-xs font-bold sm:mt-1 sm:text-sm ${active ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'}`}>
                      {entry ? `${entry.completed_units}/${entry.total_units} vistas` : `${grade.units.length} unidades`}
                    </p>
                  </button>
                );
              })}
            </div>

            {activeGrade && (
              <>
                {/* DBA del grado */}
                <section aria-labelledby="dba-heading" className="card-clay mb-6 p-4 sm:mb-8 sm:p-6 lg:p-8">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-[0_4px_0_rgba(29,78,216,0.3)]">
                      <Target size={22} aria-hidden="true" />
                    </span>
                    <div>
                      <h2 id="dba-heading" className="text-xl font-black sm:text-2xl">
                        Derechos Básicos de Aprendizaje — {activeGrade.name}
                      </h2>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 sm:text-sm">
                        Cartilla MEN · Inglés, grados Transición a 5º de primaria
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2.5 sm:space-y-3">
                    {activeGrade.dbas.map((dba) => (
                      <li
                        key={dba.number}
                        className="flex gap-3 rounded-2xl border-2 border-blue-50 bg-blue-50/60 p-3 sm:gap-4 sm:p-4 dark:border-slate-800 dark:bg-slate-800/60"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white shadow-[0_3px_0_rgba(29,78,216,0.4)] sm:h-9 sm:w-9 sm:text-base">
                          {dba.number}
                        </span>
                        <p className="text-sm font-semibold leading-relaxed text-slate-700 dark:text-slate-200 sm:text-base">{dba.text}</p>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Unidades agrupadas por periodo */}
                <section aria-labelledby="units-heading" className="card-clay p-4 sm:p-6 lg:p-8">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-[0_4px_0_rgba(4,120,87,0.3)]">
                      <BookOpenCheck size={22} aria-hidden="true" />
                    </span>
                    <div>
                      <h2 id="units-heading" className="text-xl font-black sm:text-2xl">Plan anual por periodos</h2>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 sm:text-sm">
                        Abre las slides para proyectar en clase
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {unitsByPeriod(activeGrade).map((bucket) => (
                      <div key={bucket.period}>
                        <h3 className="mb-3 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 sm:text-sm">
                          {bucket.label}
                        </h3>
                        <ul className="space-y-3.5 sm:space-y-4">
                          {bucket.units.map((unit) => {
                            const state = activeSummaryGrade?.modules?.find((m) => m.week_number === unit.week);
                            const percent = Math.round(state?.completion_percent || 0);
                            return (
                              <li
                                key={unit.week}
                                className="rounded-2xl border-[3px] border-blue-50 bg-white p-3.5 transition-all hover:-translate-y-0.5 hover:border-blue-300 sm:p-5 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-indigo-500"
                              >
                                <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:gap-4">
                                  <div className="min-w-0 flex-1">
                                    <div className="mb-1.5 flex flex-wrap items-center gap-1.5 sm:gap-2">
                                      <span className="badge-clay badge-clay-blue">Unidad {unit.week}</span>
                                      <span className="badge-clay badge-clay-amber">DBA {unit.dba}</span>
                                      <span className={statusTone(state?.status)}>{percent}% visto</span>
                                    </div>
                                    <p className="text-base font-black leading-tight sm:text-lg">{unit.title}</p>
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 sm:text-sm">{unit.subtitle}</p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => setDeckUnit(unit)}
                                    className={`w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-3 text-sm font-black text-white shadow-[0_4px_0_rgba(67,56,202,0.4)] transition-all hover:-translate-y-0.5 hover:from-blue-700 hover:to-violet-700 active:translate-y-0.5 active:shadow-none sm:w-auto sm:px-5 sm:text-base ${focusRing} inline-flex`}
                                  >
                                    <Presentation size={17} aria-hidden="true" /> Abrir slides
                                    <ChevronRight size={15} aria-hidden="true" />
                                  </button>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {activeSummaryGrade && (
                    <p className="mt-6 flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400">
                      <Presentation size={15} aria-hidden="true" />
                      Avance del grado: {activeSummaryGrade.overall_percent}%
                    </p>
                  )}
                </section>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export { grades };
