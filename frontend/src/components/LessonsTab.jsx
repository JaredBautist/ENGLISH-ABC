import React from 'react';
import { BookOpen, CheckCircle, Lock, PlayCircle, ChevronRight, TrendingUp } from 'lucide-react';

const weekMeta = {
  1: {
    emoji: '👋',
    focus: 'Verb To Be • Countries • Numbers',
    description: 'Presentarte, decir de dónde eres y usar números básicos en conversaciones cortas.',
    objectives: ['🗣️ Use verb to be in simple sentences', '🌍 Say country and nationality', '🔢 Use numbers 1-100 in context'],
  },
  2: {
    emoji: '⏰',
    focus: 'Daily Routine • Present Simple',
    description: 'Hablar de tu rutina diaria usando horarios y acciones frecuentes.',
    objectives: ['📅 Describe a weekday routine', '🕒 Use time expressions correctly', '✍️ Build present simple statements'],
  },
  3: {
    emoji: '👨‍👩‍👧',
    focus: 'Family Members • Possessive Adjectives',
    description: 'Describir tu familia y relaciones usando my/your/his/her.',
    objectives: ['👪 Name family members', '🔤 Use possessive adjectives', '💬 Write simple family descriptions'],
  },
  4: {
    emoji: '🏠',
    focus: 'My Home • There Is / There Are',
    description: 'Describir espacios de la casa y objetos con estructuras de ubicación.',
    objectives: ['📍 Use there is / there are', '🛋️ Describe rooms and furniture', '🧭 Add basic place prepositions'],
  },
  5: {
    emoji: '🛒',
    focus: 'Food & Shopping • Quantifiers',
    description: 'Hablar de compras, comida y cantidades para situaciones reales.',
    objectives: ['🍎 Use food vocabulary', '⚖️ Use some/any/a lot of', '💵 Write short shopping dialogues'],
  },
  6: {
    emoji: '💪',
    focus: 'Abilities & Rules • Can/Can’t',
    description: 'Expresar habilidades, permisos y reglas simples en contexto.',
    objectives: ['✅ Use can / can’t for abilities', '🚫 Express basic rules', '🎯 Talk about personal skills'],
  },
  7: {
    emoji: '📆',
    focus: 'Weekend Plans • Future Going To',
    description: 'Organizar planes futuros con expresiones de tiempo del fin de semana.',
    objectives: ['🧠 Use going to for plans', '🗓️ Talk about future activities', '📝 Create a weekend plan paragraph'],
  },
  8: {
    emoji: '🏁',
    focus: 'Review & Final Evaluation',
    description: 'Integrar todo el nivel A1.2 en tareas de cierre y autoevaluación.',
    objectives: ['🔁 Review key grammar and vocabulary', '🧾 Complete final integrated tasks', '🌟 Show A1.2 communication goals'],
  },
};

function WeekCard({ week, isDark }) {
  const meta = weekMeta[week.number] || {
    emoji: '📘',
    focus: week.subtitle,
    description: 'Práctica guiada del contenido de la semana.',
    objectives: ['🎯 Reach weekly communication goal'],
  };

  const progressTrackClass = isDark
    ? 'bg-white/5 border-white/5'
    : 'bg-slate-200 border-slate-300';
  const progressTextClass = isDark ? 'text-slate-200' : 'text-slate-900';
  const primaryBtnClass = week.isLocked
    ? (isDark ? 'bg-white/5 text-slate-500' : 'bg-slate-200 text-slate-400')
    : (isDark
      ? 'bg-slate-100 text-indigo-900 hover:bg-white shadow-white/10'
      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/20');

  return (
    <div className={`group relative rounded-[2.5rem] p-8 border transition-all duration-500 ${
      week.isLocked 
        ? (isDark
          ? 'bg-slate-900/40 border-white/5 opacity-60 grayscale'
          : 'bg-slate-100 border-slate-200 opacity-60 grayscale')
        : (isDark
          ? 'bg-slate-800/60 border-white/10 hover:border-indigo-500/50 hover:bg-slate-800/80 shadow-2xl hover:shadow-indigo-500/10'
          : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50 shadow-xl hover:shadow-indigo-200/50')
    }`}>
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4 items-center">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${
            week.completed ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400'
          }`}>
            {week.number}
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {week.title} {meta.emoji}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              {meta.focus}
            </p>
          </div>
        </div>
        {week.completed ? (
          <CheckCircle className="text-emerald-500" size={28} />
        ) : week.isLocked ? (
          <Lock className="text-slate-400 dark:text-slate-600" size={24} />
        ) : (
          <PlayCircle className="text-indigo-600 dark:text-indigo-400 animate-pulse" size={28} />
        )}
      </div>

      <div className={`mb-6 rounded-2xl border px-4 py-3 ${isDark ? 'bg-slate-900/50 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
        <p className={`text-sm mb-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>🧩 {meta.description}</p>
        <div className="space-y-1.5">
          {meta.objectives.map((objective) => (
            <p key={objective} className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {objective}
            </p>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between text-sm font-bold mb-2">
          <span className={week.completed ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'}>
            {week.completed ? 'WEEK COMPLETED' : 'PROGRESS'}
          </span>
          <span className={progressTextClass}>{week.progress}%</span>
        </div>
        <div className={`h-3 w-full rounded-full overflow-hidden p-1 border ${progressTrackClass}`}>
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${
              week.completed ? 'bg-emerald-500' : 'bg-indigo-500'
            }`}
            style={{ width: `${week.progress}%` }}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button 
          disabled={week.isLocked}
          onClick={() => window.location.href = week.href}
          className={`flex-1 py-4 px-6 rounded-2xl font-black flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg ${primaryBtnClass}`}
        >
          {week.isLocked ? 'Locked' : 'Start Lesson'}
          {!week.isLocked && <ChevronRight size={20} />}
        </button>
        
        {!week.isLocked && (
          <button 
            onClick={() => window.location.href = `${week.href}/exercises`}
            className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 transition-all active:scale-95"
            title="Extra Practice"
          >
            <TrendingUp size={24} />
          </button>
        )}
      </div>
    </div>
  );
}

export default function LessonsTab({ weeks, levelId, isDark = true }) {
  return (
    <div className="p-8 lg:p-12 animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black flex items-center gap-3 text-slate-900 dark:text-white">
          <BookOpen className="text-indigo-600 dark:text-indigo-500" size={32} />
          Learning Path
        </h2>
        <div className="flex gap-2">
          <span className="px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-bold uppercase tracking-widest">
            Level {levelId.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {weeks.map((week) => (
          <WeekCard key={week.number} week={week} isDark={isDark} />
        ))}
      </div>
    </div>
  );
}
