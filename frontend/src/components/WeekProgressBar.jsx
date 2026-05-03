import { useEffect, useState } from 'react';
import { apiFetch } from '../utils/api';
import ProgressBar from './ui/ProgressBar';
import Badge from './ui/Badge';
import { Trophy, Lock, CheckCircle, Circle } from 'lucide-react';

/**
 * WeekProgressBar - Barra de progreso estilo Duolingo adaptada para Dark Theme
 * Muestra el progreso global y desbloquea semanas secuencialmente
 */
export default function WeekProgressBar({ levelCode = 'a1-2', onProgressUpdate, progressData: externalProgressData = null }) {
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasExternalProgress = externalProgressData != null;

  const fetchProgress = async () => {
    try {
      const data = await apiFetch('/students/me/progress-summary/');
      setProgressData(data);
      if (onProgressUpdate) {
        onProgressUpdate(data);
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasExternalProgress) {
      setProgressData(externalProgressData);
      setLoading(false);
      return;
    }

    fetchProgress();
    
    // Actualizar cada 5 segundos cuando el usuario está activo
    const interval = setInterval(fetchProgress, 5000);
    
    return () => clearInterval(interval);
  }, [levelCode, hasExternalProgress, externalProgressData]);

  if (loading) {
    return (
      <div className="rounded-3xl bg-[#1e293b] border border-slate-700 p-6 animate-pulse shadow-lg">
        <div className="h-4 bg-slate-700 rounded w-1/4 mb-4"></div>
        <div className="h-8 bg-slate-700 rounded w-full"></div>
      </div>
    );
  }

  if (!progressData) {
    return null;
  }

  const { overall_percent = 0, current_week = 1, total_weeks = 8, weeks = [] } = progressData;
  const safeCurrentWeek = Math.max(1, Math.min(Number(total_weeks) || 8, Number(current_week) || 1));
  const sortedWeeks = [...weeks]
    .filter((w) => w && Number.isFinite(Number(w.week_number)))
    .sort((a, b) => Number(a.week_number) - Number(b.week_number))
    .map((w) => {
      const weekNumber = Number(w.week_number);
      const rawCompletion = Math.max(0, Math.min(100, Number(w.completion_percent) || 0));
      const unlocked = weekNumber <= safeCurrentWeek;
      const completion = unlocked ? rawCompletion : 0;
      return {
        ...w,
        week_number: weekNumber,
        completion_percent: completion,
        unlocked,
      };
    });

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-slate-700 p-6 shadow-xl" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
               style={{ 
                 background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                 boxShadow: '0 4px 15px rgba(79, 70, 229, 0.4)'
               }}>
            <Trophy size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Your Progress
            </h3>
            <p className="text-sm text-slate-300">
              You're on <strong className="text-white">Week {safeCurrentWeek} of {total_weeks}</strong>. Keep going! 🚀
            </p>
          </div>
        </div>
        <Badge variant="success" size="lg" className="text-lg shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          {Math.round(overall_percent)}% Complete
        </Badge>
      </div>

      {/* Progress Bar */}
      <ProgressBar 
        value={overall_percent} 
        max={100}
        size="lg"
        className="mb-6 bg-slate-800"
      />

      {/* Week Milestones */}
      <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
        {sortedWeeks.map((week, index) => {
          const isCompleted = week.completion_percent >= 100;
          const isUnlocked = week.unlocked;
          const isCurrent = week.week_number === safeCurrentWeek;
          const completionPercent = Math.round(week.completion_percent);

          return (
            <div key={week.week_number} className="flex-1 flex flex-col items-center gap-2 relative">
              {/* Milestone Circle */}
              <div 
                className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer group bg-[#0f172a]"
                style={{
                  background: isCompleted 
                    ? 'linear-gradient(135deg, var(--color-cta), #10B981)'
                    : isUnlocked
                    ? 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))'
                    : '#1e293b',
                  boxShadow: isCompleted || isCurrent
                    ? '0 0 20px rgba(79, 70, 229, 0.4), inset 0 2px 4px rgba(255,255,255,0.2)'
                    : 'inset 0 2px 4px rgba(0,0,0,0.5)',
                  border: isCurrent ? '3px solid #60a5fa' : !isUnlocked ? '1px solid #334155' : 'none',
                  transform: isCurrent ? 'scale(1.1)' : 'scale(1)'
                }}
                title={`Week ${week.week_number}: ${completionPercent}% complete`}
              >
                {isCompleted ? (
                  <CheckCircle size={24} className="text-white" strokeWidth={3} />
                ) : isUnlocked ? (
                  <span className="text-white font-bold text-sm shadow-sm">{week.week_number}</span>
                ) : (
                  <Lock size={18} className="text-slate-500" />
                )}

                {/* Tooltip on hover */}
                <div className="absolute bottom-full mb-3 hidden group-hover:block z-20">
                  <div className="bg-black text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg border border-slate-700">
                    Week {week.week_number}: {completionPercent}%
                    {!isUnlocked && <div className="text-slate-400 mt-1">🔒 Locked</div>}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                  </div>
                </div>
              </div>

              {/* Week Label */}
              <span className={`text-xs font-semibold ${
                isCompleted ? 'text-emerald-400' : 
                isUnlocked ? 'text-indigo-300' : 
                'text-slate-500'
              }`}>
                W{week.week_number}
              </span>

              {/* Connection Line */}
              {index < weeks.length - 1 && (
                <div 
                  className="absolute h-1 transition-all duration-300"
                  style={{
                    width: 'calc((100% - 48px) / 8)',
                    left: `calc(${(index + 1) * (100 / total_weeks)}% + 24px)`,
                    top: '24px',
                    background: isCompleted 
                      ? 'linear-gradient(90deg, var(--color-cta), #10B981)'
                      : 'rgba(51, 65, 85, 0.8)',
                    zIndex: -1,
                    boxShadow: isCompleted ? '0 0 10px rgba(34, 197, 94, 0.4)' : 'none'
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Current Week Info */}
      {sortedWeeks.length > 0 && (
        <div className="mt-8 p-4 rounded-2xl"
             style={{ 
               background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(129, 140, 248, 0.05))',
               border: '1px solid rgba(79, 70, 229, 0.2)'
             }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-indigo-300 mb-1">Current Week Progress</p>
              <p className="text-2xl font-bold text-white">
                Week {safeCurrentWeek}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold" style={{ color: 'var(--color-cta)', textShadow: '0 0 15px rgba(34,197,94,0.3)' }}>
                {Math.round(sortedWeeks.find((w) => w.week_number === safeCurrentWeek)?.completion_percent || 0)}%
              </p>
              <p className="text-xs text-slate-400 font-medium tracking-wide uppercase mt-1">Completed</p>
            </div>
          </div>
        </div>
      )}

      {/* Unlock Message */}
      {safeCurrentWeek < total_weeks && (sortedWeeks.find((w) => w.week_number === safeCurrentWeek)?.completion_percent || 0) < 80 && (
        <div className="mt-4 p-3 rounded-xl bg-amber-900/20 border border-amber-700/50 flex items-start gap-3 shadow-inner">
          <Lock size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-200">
              Complete {80 - Math.round(sortedWeeks.find((w) => w.week_number === safeCurrentWeek)?.completion_percent || 0)}% more to unlock Week {safeCurrentWeek + 1}
            </p>
            <p className="text-xs text-amber-400/80 mt-1">
              Keep working through the slides to unlock the next week!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
