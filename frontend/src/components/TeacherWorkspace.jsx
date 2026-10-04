import { useEffect, useMemo, useState } from 'react';
import {
  BookOpenCheck, CheckCircle2, ChevronRight, GraduationCap, Headphones, Layers, LogOut, Moon, PenLine, Play,
  Presentation, RefreshCw, Sun, Target,
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');

  const assignedGrades = useMemo(
    () => assignedGradeIds.map((code) => getGrade(code)).filter(Boolean),
    [assignedGradeIds]
  );

  const loadSummary = async (silent = false) => {
    if (!silent) setIsRefreshing(true);
    try {
      const data = await apiFetch('/teachers/me/summary/');
      setSummary(data);
    } catch (err) {
      if (!silent) {
        console.error('Error al actualizar resumen docente:', err);
      }
    } finally {
      if (!silent) setIsRefreshing(false);
    }
  };

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

    // Auto-sync polling every 10 seconds and on window focus
    const interval = setInterval(() => {
      loadSummary(true);
    }, 10000);

    const onFocus = () => {
      loadSummary(true);
    };
    window.addEventListener('focus', onFocus);

    return () => {
      isActive = false;
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  const toggleUnitCompletion = async (unit, currentState) => {
    if (!activeGradeId) return;
    const isCompleted = currentState?.status === 'completed' || currentState?.completion_percent === 100;
    const nextStatus = isCompleted ? 'in_progress' : 'completed';
    const nextPercent = isCompleted ? 50 : 100;

    // Optimistic local state update for instant UI feedback
    setSummary((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        grades: prev.grades?.map((g) => {
          if (g.grade_code !== activeGradeId) return g;
          const currentMods = g.modules || [];
          const exists = currentMods.some((m) => m.week_number === unit.week);
          const updatedMods = exists
            ? currentMods.map((m) =>
                m.week_number === unit.week
                  ? { ...m, status: nextStatus, completion_percent: nextPercent }
                  : m
              )
            : [...currentMods, { week_number: unit.week, status: nextStatus, completion_percent: nextPercent }];
          const completedCount = updatedMods.filter((m) => m.status === 'completed' || m.completion_percent === 100).length;
          return {
            ...g,
            modules: updatedMods,
            completed_units: completedCount,
            overall_percent: Math.round((completedCount / (g.total_units || 8)) * 100),
          };
        }),
      };
    });

    try {
      await apiFetch('/teachers/me/progress/', {
        method: 'POST',
        body: JSON.stringify({
          grade_code: activeGradeId,
          week_number: unit.week,
          completion_percent: nextPercent,
          status: nextStatus,
        }),
      });
      loadSummary(true);
    } catch (err) {
      console.error('Error actualizando progreso de la unidad:', err);
      loadSummary(true);
    }
  };

  const activeGrade = activeGradeId ? getGrade(activeGradeId) : null;
  const activeSummaryGrade = summary?.grades?.find((g) => g.grade_code === activeGradeId) || null;

  if (deckUnit && activeGrade) {
    return (
      <DBADeck
        slidesKey={deckUnit.slides}
        title={`${activeGrade.name} • Unidad ${deckUnit.week}: ${deckUnit.title}`}
        subtitle={deckUnit.subtitle}
        dashboardHref={isAdmin ? '/admin' : '/docente'}
        gradeCode={activeGrade.id}
        weekNumber={deckUnit.week}
        onBack={() => {
          setDeckUnit(null);
          loadSummary(true);
        }}
        onCompleted={() => {
          loadSummary(true);
        }}
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
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border-2 border-blue-300 bg-blue-100 text-blue-700 shadow-[0_4px_0_rgba(37,99,235,0.25),0_10px_20px_rgba(59,130,246,0.25),inset_0_2px_0_rgba(255,255,255,0.65)]">
            <GraduationCap size={21} aria-hidden="true" />
          </div>
          <div className="mr-auto min-w-0">
            <p className="truncate text-sm font-black leading-tight sm:text-base">English From Scratch</p>
            <p className="truncate text-[11px] font-semibold text-slate-500 dark:text-slate-400 sm:text-xs">
              Hola, {user?.username} {isAdmin ? '• Administración' : ''}
            </p>
          </div>
          {isAdmin && (
            <a
              href="/admin"
              aria-label="Panel administrativo"
              title="Panel administrativo"
              className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-indigo-300 bg-indigo-100 p-0 text-indigo-700 shadow-[0_4px_0_rgba(99,102,241,0.25),0_10px_20px_rgba(99,102,241,0.25),inset_0_2px_0_rgba(255,255,255,0.65)] transition-all hover:-translate-y-0.5 ${focusRing}`}
            >
              <Layers size={18} aria-hidden="true" />
            </a>
          )}
          <button
            type="button"
            onClick={() => loadSummary(false)}
            aria-label="Actualizar datos en tiempo real"
            title="Actualizar datos en tiempo real"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-blue-100 bg-white p-0 text-slate-600 transition-all hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 ${focusRing}`}
          >
            <RefreshCw size={18} className={isRefreshing ? 'animate-spin text-blue-600' : ''} aria-hidden="true" />
          </button>
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
            {/* Material didáctico del grado activo */}
            {activeGrade && (() => {
              const isPreescolar = activeGrade.id === 'jardin' || activeGrade.id === 'transicion';
              const materials = [
                { href: `/docente/videos?grado=${activeGrade.id}`, icon: Play, title: 'Videos', description: 'Canciones y videos para proyectar', tone: 'border-2 border-rose-300 bg-rose-100 text-rose-700', shadow: 'rgba(244,114,182,0.4)', glow: 'rgba(236,72,153,0.28)' },
                { href: `/docente/listening?grado=${activeGrade.id}`, icon: Headphones, title: 'Listening', description: 'Actividades de escucha interactivas', tone: 'border-2 border-sky-300 bg-sky-100 text-sky-700', shadow: 'rgba(96,165,250,0.4)', glow: 'rgba(59,130,246,0.28)' },
                ...(!isPreescolar
                  ? [{ href: `/docente/writing?grado=${activeGrade.id}`, icon: PenLine, title: 'Writing', description: 'Escritura guiada y libre con modelos', tone: 'border-2 border-emerald-300 bg-emerald-100 text-emerald-700', shadow: 'rgba(52,211,153,0.4)', glow: 'rgba(20,184,166,0.28)' }]
                  : []),
              ];

              return (
                <section aria-labelledby="material-heading" className="mb-6 sm:mb-8">
                  <div className="mb-3">
                    <h2 id="material-heading" className="text-xs font-black uppercase tracking-widest text-slate-400 sm:text-sm dark:text-slate-500">
                      Material didáctico — {activeGrade.name}
                    </h2>
                  </div>
                  <div className={`grid grid-cols-1 gap-3 ${materials.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} sm:gap-4`}>
                    {materials.map((material) => {
                      const Icon = material.icon;
                      return (
                        <a
                          key={material.href}
                          href={material.href}
                          className={`card-clay card-clay-hover flex items-center gap-3.5 p-4 sm:flex-col sm:items-start sm:gap-3 sm:p-5 ${focusRing}`}
                        >
                          <span
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${material.tone} shadow-[0_4px_0_var(--mat-shadow),0_10px_22px_var(--mat-glow),inset_0_2px_0_rgba(255,255,255,0.65)] sm:h-12 sm:w-12`}
                            style={{ '--mat-shadow': material.shadow, '--mat-glow': material.glow }}
                          >
                            <Icon size={21} aria-hidden="true" />
                          </span>
                          <span className="min-w-0">
                            <span className="block font-black sm:text-lg">{material.title}</span>
                            <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 sm:text-sm">{material.description}</span>
                          </span>
                          <ChevronRight size={18} className="ml-auto shrink-0 text-slate-300 sm:hidden" aria-hidden="true" />
                        </a>
                      );
                    })}
                  </div>
                </section>
              );
            })()}

            {/* Selector de grados */}
            <div className="mb-6 grid grid-cols-2 gap-3 sm:mb-8 sm:gap-4 md:grid-cols-4" role="tablist" aria-label="Grados asignados">
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
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-2 border-blue-300 bg-blue-100 text-blue-700 shadow-[0_4px_0_rgba(37,99,235,0.25),0_10px_20px_rgba(59,130,246,0.25),inset_0_2px_0_rgba(255,255,255,0.65)]">
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
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border-2 border-blue-300 bg-blue-100 text-sm font-black text-blue-800 shadow-[0_3px_0_rgba(37,99,235,0.2),inset_0_1px_0_rgba(255,255,255,0.6)] sm:h-9 sm:w-9 sm:text-base">
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
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-2 border-emerald-300 bg-emerald-100 text-emerald-700 shadow-[0_4px_0_rgba(16,185,129,0.25),0_10px_20px_rgba(16,185,129,0.25),inset_0_2px_0_rgba(255,255,255,0.65)]">
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
                            const isCompleted = state?.status === 'completed' || percent === 100;
                            return (
                              <li
                                key={unit.week}
                                className={`rounded-2xl border-[3px] p-3.5 transition-all sm:p-5 ${
                                  isCompleted
                                    ? 'border-emerald-100 bg-emerald-50/30 dark:border-emerald-950/60 dark:bg-emerald-950/20'
                                    : 'border-blue-50 bg-white hover:-translate-y-0.5 hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-indigo-500'
                                }`}
                              >
                                <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:gap-4">
                                  <div className="min-w-0 flex-1">
                                    <div className="mb-1.5 flex flex-wrap items-center gap-1.5 sm:gap-2">
                                      <span className="badge-clay badge-clay-blue">Unidad {unit.week}</span>
                                      <span className="badge-clay badge-clay-amber">DBA {unit.dba}</span>
                                      <span className={statusTone(isCompleted ? 'completed' : state?.status)}>
                                        {isCompleted ? '✓ 100% completada' : `${percent}% visto`}
                                      </span>
                                    </div>
                                    <p className="text-base font-black leading-tight sm:text-lg">{unit.title}</p>
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 sm:text-sm">{unit.subtitle}</p>
                                  </div>
                                  <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => toggleUnitCompletion(unit, state)}
                                      title={isCompleted ? 'Marcar como en progreso' : 'Marcar unidad como completada'}
                                      aria-label={isCompleted ? `Unidad ${unit.week} completada. Clic para desmarcar` : `Marcar Unidad ${unit.week} como completada`}
                                      className={`inline-flex items-center gap-1.5 rounded-2xl border-2 px-3.5 py-2.5 text-xs font-extrabold transition-all hover:-translate-y-0.5 sm:text-sm ${focusRing} ${
                                        isCompleted
                                          ? 'border-emerald-300 bg-emerald-100 text-emerald-800 shadow-[0_3px_0_rgba(16,185,129,0.3)] dark:border-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                                          : 'border-slate-200 bg-white text-slate-600 shadow-[0_3px_0_rgba(203,213,225,0.4)] hover:border-emerald-300 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                                      }`}
                                    >
                                      <CheckCircle2 size={16} className={isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'} aria-hidden="true" />
                                      <span>{isCompleted ? 'Completada' : 'Completar'}</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setDeckUnit(unit)}
                                      className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2.5 text-sm font-black text-white shadow-[0_4px_0_rgba(67,56,202,0.4)] transition-all hover:-translate-y-0.5 hover:from-blue-700 hover:to-violet-700 active:translate-y-0.5 active:shadow-none sm:px-5 sm:text-base ${focusRing}`}
                                    >
                                      <Presentation size={17} aria-hidden="true" />
                                      <span>Abrir slides</span>
                                      <ChevronRight size={15} aria-hidden="true" />
                                    </button>
                                  </div>
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
