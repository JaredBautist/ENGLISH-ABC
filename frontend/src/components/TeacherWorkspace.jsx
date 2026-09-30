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
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2';

function statusTone(status) {
  if (status === 'completed') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  if (status === 'in_progress') return 'bg-sky-100 text-sky-700 border-sky-200';
  return 'bg-slate-100 text-slate-500 border-slate-200';
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
        dashboardHref={isAdmin ? '/admin' : `/docente/${activeGrade.id}`}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      <a
        href="#teacher-main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-indigo-600 focus:text-white focus:font-bold"
      >
        Saltar al contenido
      </a>

      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white" aria-hidden="true">
            <GraduationCap size={20} />
          </div>
          <div className="mr-auto min-w-0">
            <p className="font-black leading-tight text-sm sm:text-base truncate">Plataforma Docente DBA</p>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">Hola, {user?.username} {isAdmin ? '• Administración' : ''}</p>
          </div>
          <a
            href="/admin"
            aria-label="Panel administrativo"
            title="Panel administrativo"
            className={`p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors ${focusRing} ${isAdmin ? '' : 'hidden'}`}
          >
            <Layers size={18} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Modo claro' : 'Modo oscuro'}
            className={`p-2.5 rounded-xl text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 ${focusRing}`}
          >
            {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={logout}
            aria-label="Cerrar sesión"
            className={`p-2.5 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 ${focusRing}`}
          >
            <LogOut size={20} aria-hidden="true" />
          </button>
        </div>
      </header>

      <main id="teacher-main" className="max-w-6xl mx-auto px-3 sm:px-6 py-5 sm:py-8">
        {error && (
          <div role="alert" className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-500/30 text-rose-800 dark:text-rose-300 font-semibold">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-24" role="status" aria-label="Cargando grados">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-teal-500" />
          </div>
        ) : assignedGrades.length === 0 ? (
          <div className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center">
            <p className="text-4xl mb-3" aria-hidden="true">🎓</p>
            <p className="font-black text-lg">No tienes grados asignados todavía.</p>
            <p className="text-slate-500 dark:text-slate-400 mt-1">La administración puede asignarte Jardín, Transición, 1° o 2°.</p>
          </div>
        ) : (
          <>
            {/* Selector de grados */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8" role="tablist" aria-label="Grados asignados">
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
                    className={`text-left rounded-[1.6rem] border-2 p-3.5 sm:p-5 transition-all ${focusRing} ${
                      active
                        ? `border-transparent text-white bg-gradient-to-br ${grade.accent} shadow-lg`
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300'
                    }`}
                  >
                    <p className={`text-[10px] sm:text-xs font-black uppercase tracking-widest ${active ? 'text-white/80' : 'text-slate-400'}`}>
                      Grado
                    </p>
                    <p className="text-xl sm:text-2xl font-black">{grade.name}</p>
                    <p className={`text-xs sm:text-sm font-bold mt-0.5 sm:mt-1 ${active ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'}`}>
                      {entry ? `${entry.completed_units}/${entry.total_units} vistas` : `${grade.units.length} unidades`}
                    </p>
                  </button>
                );
              })}
            </div>

            {activeGrade && (
              <>
                {/* DBA del grado */}
                <section aria-labelledby="dba-heading" className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 flex items-center justify-center" aria-hidden="true">
                      <Target size={22} />
                    </span>
                    <div>
                      <h2 id="dba-heading" className="text-2xl font-black">Derechos Básicos de Aprendizaje — {activeGrade.name}</h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Cartilla MEN · Inglés, grados Transición a 5º de primaria</p>
                    </div>
                  </div>
                  <ul className="space-y-2.5 sm:space-y-3">
                    {activeGrade.dbas.map((dba) => (
                      <li key={dba.number} className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                        <span className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-indigo-600 text-white font-black text-sm sm:text-base flex items-center justify-center" aria-hidden="true">
                          {dba.number}
                        </span>
                        <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-700 dark:text-slate-200">{dba.text}</p>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Unidades agrupadas por periodo */}
                <section aria-labelledby="units-heading" className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 flex items-center justify-center" aria-hidden="true">
                      <BookOpenCheck size={22} />
                    </span>
                    <div>
                      <h2 id="units-heading" className="text-2xl font-black">Plan anual por periodos</h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Abre las slides listas para proyectar; el resto está en preparación</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {unitsByPeriod(activeGrade).map((bucket) => (
                      <div key={bucket.period}>
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                          {bucket.label}
                        </h3>
                        <ul className="space-y-4">
                          {bucket.units.map((unit) => {
                            const state = activeSummaryGrade?.modules?.find((m) => m.week_number === unit.week);
                            const percent = Math.round(state?.completion_percent || 0);
                            return (
                              <li key={unit.week} className={`p-3.5 sm:p-5 rounded-2xl border-2 transition-all ${
                                unit.ready === false
                                  ? 'border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50'
                                  : 'border-slate-100 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500'
                              }`}>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                  <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-black bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
                                        Unidad {unit.week}
                                      </span>
                                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-black bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                                        DBA {unit.dba}
                                      </span>
                                      {unit.ready === false ? (
                                        <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-black bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                          🛠 En preparación
                                        </span>
                                      ) : (
                                        <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-black border ${statusTone(state?.status)}`}>
                                          {percent}% visto
                                        </span>
                                      )}
                                    </div>
                                    <p className="font-black text-base sm:text-lg leading-tight">{unit.title}</p>
                                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{unit.subtitle}</p>
                                  </div>
                                  {unit.ready === false ? (
                                    <button
                                      type="button"
                                      disabled
                                      title="Contenido en preparación"
                                      className="shrink-0 inline-flex items-center gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-black text-sm sm:text-base bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                                    >
                                      <Presentation size={17} aria-hidden="true" /> Pronto
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => setDeckUnit(unit)}
                                      className={`w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-black text-sm sm:text-base text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 active:scale-95 transition-all ${focusRing}`}
                                    >
                                      <Presentation size={17} aria-hidden="true" /> Abrir slides
                                      <ChevronRight size={15} aria-hidden="true" />
                                    </button>
                                  )}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {activeSummaryGrade && (
                    <p className="mt-6 text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2">
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
