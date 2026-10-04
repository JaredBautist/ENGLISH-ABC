import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle, BookOpen, CheckCircle2, ExternalLink, Headphones, PenLine, Play, RotateCcw,
  Shuffle, Sparkles, Volume2,
} from 'lucide-react';
import MaterialShell, { allowedGradesFor } from './MaterialShell';
import { playRewardSound, speakFriendly } from '../shared/utils/friendlySpeech';
import { useAuth } from '../features/auth/hooks/useAuth';
import { getListening, getVideos, getWriting } from '../data/material';
import { defaultGradeId } from '../data/grados';

function useActiveGrade(filterFn) {
  const { user } = useAuth();
  const rawAllowed = useMemo(() => allowedGradesFor(user), [user]);
  const allowedGrades = useMemo(() => (filterFn ? rawAllowed.filter(filterFn) : rawAllowed), [rawAllowed, filterFn]);
  const requested = window.location.search.split('grado=')[1]?.split('&')[0];
  const [activeGrade, setActiveGrade] = useState(() => {
    if (requested && (!filterFn || filterFn(requested))) return requested;
    return allowedGrades[0] || (filterFn ? 'primero' : defaultGradeId);
  });

  // Si el grado en la URL no está asignado al docente o no pasa el filtro,
  // cae al primer grado permitido en cuanto se conoce el usuario.
  useEffect(() => {
    if (allowedGrades.length > 0 && !allowedGrades.includes(activeGrade)) {
      setActiveGrade(allowedGrades[0]);
    }
  }, [allowedGrades, activeGrade]);

  const selectGrade = (gradeId) => {
    setActiveGrade(gradeId);
    try {
      const url = new URL(window.location);
      url.searchParams.set('grado', gradeId);
      window.history.replaceState({}, '', url);
    } catch {
      /* URL sync is a nice-to-have */
    }
  };

  return [activeGrade, selectGrade];
}

/* ================= VIDEOS ================= */
export function VideosPage() {
  const [activeGrade, setActiveGrade] = useActiveGrade();
  const items = useMemo(() => getVideos(activeGrade), [activeGrade]);

  return (
    <MaterialShell
      materialTitle="Videos para clase"
      materialIcon={Play}
      activeGrade={activeGrade}
      onGradeChange={setActiveGrade}
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {items.map((video) => (
          <article
            key={video.id}
            className="card-clay card-clay-hover overflow-hidden !p-0 flex flex-col justify-between"
          >
            <div>
              <div className="aspect-video bg-slate-950 relative">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.videoId}?rel=0`}
                  title={video.title}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="p-4 sm:p-5">
                <span className="badge-clay badge-clay-blue mb-2">{video.unit}</span>
                <h2 className="text-base font-black leading-tight sm:text-lg text-slate-800 dark:text-slate-100">{video.title}</h2>
                <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">{video.description}</p>
              </div>
            </div>
            <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
              <a
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition"
              >
                <span>Abrir en YouTube</span>
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
      {items.length === 0 && (
        <p className="card-clay p-6 text-center font-bold text-slate-500">Material en preparación para este grado.</p>
      )}
    </MaterialShell>
  );
}

/* ================= LISTENING ================= */
function QuizListening({ activity }) {
  const [selected, setSelected] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isCorrect = selected === activity.correct;

  const handleSpeak = () => {
    speakFriendly(activity.speakText, {
      rate: 0.88,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };

  const handleSelect = (option) => {
    setSelected(option);
    if (option === activity.correct) {
      playRewardSound('Nice job!');
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-base font-black text-slate-700 dark:text-slate-200 sm:text-lg">{activity.prompt}</p>
        <button
          type="button"
          onClick={handleSpeak}
          aria-label="Escuchar audio"
          className={`shrink-0 rounded-2xl p-3 text-white shadow-[0_4px_0_rgba(29,78,216,0.35)] transition-all hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.97] ${
            isPlaying
              ? 'bg-gradient-to-br from-amber-400 to-orange-500 ring-4 ring-orange-200 dark:ring-orange-950 scale-105'
              : 'bg-gradient-to-br from-blue-500 to-sky-500'
          }`}
        >
          <Volume2 size={20} className={isPlaying ? 'animate-pulse' : ''} aria-hidden="true" />
        </button>
      </div>
      <div className="grid gap-2.5 sm:gap-3">
        {activity.options.map((option) => {
          const active = selected === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className={`w-full rounded-2xl border-[3px] px-4 py-3.5 text-left text-base font-extrabold transition-all active:scale-[0.98] sm:text-lg ${
                active
                  ? isCorrect
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-[0_4px_0_rgba(16,185,129,0.3)] dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300'
                    : 'border-rose-400 bg-rose-50 text-rose-800 shadow-[0_4px_0_rgba(244,63,94,0.2)] dark:border-rose-600 dark:bg-rose-950/40 dark:text-rose-300'
                  : 'border-blue-100 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {selected && (
        <div className={`animate-pop mt-4 flex items-center justify-center gap-2 text-center font-black ${isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`} role="status">
          {isCorrect ? (
            <>
              <Sparkles size={20} className="text-amber-500 animate-spin" aria-hidden="true" />
              <span>¡Excelente escucha! Nice job! 🌟</span>
            </>
          ) : (
            <span>Intenta de nuevo 🔄</span>
          )}
        </div>
      )}
    </div>
  );
}

function OrderListening({ activity }) {
  const [order, setOrder] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [available, setAvailable] = useState(() => [...activity.steps].sort(() => Math.random() - 0.5));
  const done = order.length === activity.steps.length;
  const isOrderCorrect = done && order.every((s, i) => s === activity.steps[i]);

  const handleSpeak = () => {
    speakFriendly(activity.speakText, {
      rate: 0.88,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };

  const pick = (step) => {
    const nextOrder = [...order, step];
    setOrder(nextOrder);
    setAvailable((prev) => prev.filter((s) => s !== step));
    if (nextOrder.length === activity.steps.length) {
      const correct = nextOrder.every((s, i) => s === activity.steps[i]);
      if (correct) {
        playRewardSound('Nice job!');
      }
    }
  };

  const reset = () => {
    setOrder([]);
    setAvailable([...activity.steps].sort(() => Math.random() - 0.5));
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 sm:text-base">
          Toca las frases en el orden que escuchaste
        </p>
        <button
          type="button"
          onClick={handleSpeak}
          aria-label="Escuchar audio"
          className={`shrink-0 rounded-2xl p-3 text-white shadow-[0_4px_0_rgba(29,78,216,0.35)] transition-all hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.97] ${
            isPlaying
              ? 'bg-gradient-to-br from-amber-400 to-orange-500 ring-4 ring-orange-200 dark:ring-orange-950 scale-105'
              : 'bg-gradient-to-br from-blue-500 to-sky-500'
          }`}
        >
          <Volume2 size={20} className={isPlaying ? 'animate-pulse' : ''} aria-hidden="true" />
        </button>
      </div>

      <div className="mb-3 min-h-16 rounded-2xl border-[3px] border-dashed border-blue-200 bg-blue-50/50 p-3 dark:border-slate-700 dark:bg-slate-900/60">
        {order.length === 0 ? (
          <p className="text-sm font-semibold text-slate-400">Tu secuencia aparecerá aquí…</p>
        ) : (
          <ol className="space-y-1.5">
            {order.map((step, idx) => (
              <li key={step} className="text-sm font-black text-slate-700 dark:text-slate-200 sm:text-base">
                {idx + 1}. {step}
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {available.map((step) => (
          <button
            key={step}
            type="button"
            onClick={() => pick(step)}
            disabled={done}
            className="rounded-2xl border-[3px] border-blue-100 bg-white px-3.5 py-2.5 text-sm font-extrabold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-blue-300 active:scale-[0.97] disabled:opacity-40 sm:text-base dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            {step}
          </button>
        ))}
      </div>

      {done && (
        <div className="animate-pop mt-4 flex flex-wrap items-center gap-3">
          {isOrderCorrect ? (
            <p className="flex items-center gap-2 font-black text-emerald-600 dark:text-emerald-400" role="status">
              <Sparkles size={18} className="text-amber-500 animate-spin" aria-hidden="true" />
              <span>¡Secuencia completa en orden exacto! Nice job! 🌟</span>
            </p>
          ) : (
            <p className="flex items-center gap-2 font-black text-rose-600 dark:text-rose-400" role="status">
              <AlertCircle size={18} aria-hidden="true" />
              <span>Casi lo tienes. Revisa el orden que escuchaste 🔄</span>
            </p>
          )}
          <button type="button" onClick={reset} className="btn-ghost-clay px-4 py-2 text-sm">
            <RotateCcw size={15} aria-hidden="true" className="mr-1.5 inline" /> Reintentar
          </button>
        </div>
      )}
    </div>
  );
}

export function ListeningPage() {
  const [activeGrade, setActiveGrade] = useActiveGrade();
  const items = useMemo(() => getListening(activeGrade), [activeGrade]);

  return (
    <MaterialShell
      materialTitle="Listening para clase"
      materialIcon={Headphones}
      activeGrade={activeGrade}
      onGradeChange={setActiveGrade}
    >
      <div className="grid gap-4 sm:gap-5">
        {items.map((activity) => (
          <article key={activity.id} className="card-clay p-4 sm:p-6">
            <span className="badge-clay badge-clay-amber mb-2">
              {activity.type === 'order' ? 'Ordenar' : 'Opción múltiple'}
            </span>
            <h2 className="text-base font-black sm:text-lg">{activity.title}</h2>
            <p className="mb-4 text-sm font-semibold text-slate-500 dark:text-slate-400">{activity.description}</p>
            {activity.type === 'order' ? <OrderListening activity={activity} /> : <QuizListening activity={activity} />}
          </article>
        ))}
      </div>
      {items.length === 0 && (
        <p className="card-clay p-6 text-center font-bold text-slate-500">Material en preparación para este grado.</p>
      )}
    </MaterialShell>
  );
}

/* ================= WRITING ================= */
function GuidedWriting({ activity }) {
  const [text, setText] = useState('');
  const [validation, setValidation] = useState(null);
  const [isReading, setIsReading] = useState(false);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const filled = text.replace(/_{2,}/g, '…');

  const handleValidate = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setValidation({
        valid: false,
        message: 'Por favor escribe tu texto antes de verificar.',
      });
      return;
    }
    if (trimmed.includes('___')) {
      setValidation({
        valid: false,
        message: 'Recuerda reemplazar las líneas "___" por tus propias palabras o nombres.',
      });
      return;
    }

    const rule = activity.validation;
    if (rule) {
      if (rule.pattern && !rule.pattern.test(trimmed)) {
        setValidation({
          valid: false,
          message: rule.hintMessage || 'Revisa que tu frase siga el modelo indicado.',
        });
        return;
      }
      if (rule.minWords && words < rule.minWords) {
        setValidation({
          valid: false,
          message: `Escribe un poco más para completar la oración (mínimo ${rule.minWords} palabras).`,
        });
        return;
      }
    } else {
      if (words < 3) {
        setValidation({
          valid: false,
          message: 'Escribe una oración completa siguiendo el modelo.',
        });
        return;
      }
    }

    setValidation({
      valid: true,
      message: '¡Excelente redacción! Modelo completado correctamente. Nice job! 🌟',
    });
    playRewardSound('Nice job!');
  };

  const handleReadText = () => {
    if (!text.trim()) return;
    speakFriendly(text.replace(/_{2,}/g, ' '), {
      rate: 0.9,
      onStart: () => setIsReading(true),
      onEnd: () => setIsReading(false),
      onError: () => setIsReading(false),
    });
  };

  const handleInsertHint = (hint) => {
    setText((prev) => {
      if (prev.includes('___')) {
        return prev.replace('___', hint);
      }
      return prev ? `${prev.trimEnd()} ${hint}` : hint;
    });
    setValidation(null);
  };

  return (
    <div>
      <div className="mb-4 rounded-2xl border-l-[6px] border-amber-400 bg-amber-50 px-4 py-3 text-base font-extrabold text-amber-900 dark:bg-amber-950/40 dark:text-amber-200 sm:text-lg">
        Modelo: <span className="font-black text-amber-950 dark:text-amber-100">{activity.model}</span>
      </div>
      <textarea
        value={text}
        onChange={(event) => {
          setText(event.target.value);
          if (validation) setValidation(null);
        }}
        placeholder="Escribe aquí con los niños o toca las sugerencias de abajo…"
        rows={3}
        aria-label={`Escribir: ${activity.title}`}
        className={`input-clay w-full resize-none text-base sm:text-lg transition-colors ${
          validation
            ? validation.valid
              ? 'border-emerald-500 bg-emerald-50/20 ring-2 ring-emerald-400 dark:border-emerald-600'
              : 'border-rose-400 bg-rose-50/20 ring-2 ring-rose-300 dark:border-rose-600'
            : ''
        }`}
      />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Insertar:
          </span>
          {activity.hints.map((hint) => (
            <button
              key={hint}
              type="button"
              onClick={() => handleInsertHint(hint)}
              className="rounded-xl border-2 border-blue-100 bg-white px-3 py-1.5 text-xs font-extrabold text-slate-700 transition hover:-translate-y-0.5 hover:border-blue-300 active:scale-[0.97] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 sm:text-sm"
            >
              + {hint}
            </button>
          ))}
        </div>
        <span className="text-xs font-black text-slate-400 sm:text-sm">{words} palabras</span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={handleValidate}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2.5 text-sm font-black text-white shadow-[0_4px_0_rgba(15,118,110,0.35)] transition-all hover:-translate-y-0.5 hover:from-emerald-600 hover:to-teal-700 active:translate-y-0.5 active:shadow-none active:scale-[0.98]"
        >
          <CheckCircle2 size={17} aria-hidden="true" />
          <span>Verificar ejercicio</span>
        </button>

        <button
          type="button"
          onClick={handleReadText}
          disabled={!text.trim()}
          className="inline-flex items-center gap-2 rounded-2xl border-2 border-blue-100 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 disabled:opacity-40 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          <Volume2 size={16} className={isReading ? 'animate-pulse text-blue-600' : ''} aria-hidden="true" />
          <span>Escuchar pronunciación</span>
        </button>
      </div>

      {validation && (
        <div
          role="status"
          className={`animate-pop mt-3.5 flex items-start gap-3 rounded-2xl border-2 p-3.5 ${
            validation.valid
              ? 'border-emerald-300 bg-emerald-50/80 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
              : 'border-rose-300 bg-rose-50/80 text-rose-800 dark:border-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
          }`}
        >
          {validation.valid ? (
            <Sparkles size={20} className="shrink-0 text-emerald-600 mt-0.5 animate-spin" aria-hidden="true" />
          ) : (
            <AlertCircle size={20} className="shrink-0 text-rose-600 mt-0.5" aria-hidden="true" />
          )}
          <div className="text-sm font-bold leading-relaxed">{validation.message}</div>
        </div>
      )}

      {text && (
        <p className="mt-3 rounded-2xl bg-blue-50/60 px-4 py-2.5 text-sm font-bold text-blue-900 dark:bg-blue-500/10 dark:text-blue-200">
          <span className="font-black text-blue-700 dark:text-blue-400">Texto generado:</span> {filled}
        </p>
      )}
    </div>
  );
}

function FreeWriting({ activity }) {
  const [text, setText] = useState('');
  const [validation, setValidation] = useState(null);
  const [isReading, setIsReading] = useState(false);
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  const handleValidate = () => {
    const trimmed = text.trim();
    const min = activity.validation?.minWords || 5;
    if (!trimmed) {
      setValidation({
        valid: false,
        message: 'Por favor escribe tu texto antes de verificar.',
      });
      return;
    }
    if (words < min) {
      setValidation({
        valid: false,
        message: `Has escrito ${words} palabras. Escribe al menos ${min} palabras usando las frases sugeridas.`,
      });
      return;
    }

    setValidation({
      valid: true,
      message: '¡Fantástica redacción libre! Buen vocabulario y longitud. Nice job! 🌟',
    });
    playRewardSound('Nice job!');
  };

  const handleReadText = () => {
    if (!text.trim()) return;
    speakFriendly(text, {
      rate: 0.9,
      onStart: () => setIsReading(true),
      onEnd: () => setIsReading(false),
      onError: () => setIsReading(false),
    });
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {activity.suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => {
              setText((prev) => (prev ? `${prev.trimEnd()} ${suggestion} ` : `${suggestion} `));
              if (validation) setValidation(null);
            }}
            className="rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-extrabold text-emerald-700 transition hover:-translate-y-0.5 active:scale-[0.97] sm:text-sm dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
          >
            + {suggestion}
          </button>
        ))}
      </div>
      <textarea
        value={text}
        onChange={(event) => {
          setText(event.target.value);
          if (validation) setValidation(null);
        }}
        placeholder="Escribe la historia o descripción…"
        rows={4}
        aria-label={`Escribir: ${activity.title}`}
        className={`input-clay w-full resize-none text-base sm:text-lg transition-colors ${
          validation
            ? validation.valid
              ? 'border-emerald-500 bg-emerald-50/20 ring-2 ring-emerald-400 dark:border-emerald-600'
              : 'border-rose-400 bg-rose-50/20 ring-2 ring-rose-300 dark:border-rose-600'
            : ''
        }`}
      />
      <div className="mt-2 flex items-center justify-between text-xs font-black text-slate-400 sm:text-sm">
        <span>Mínimo sugerido: {activity.validation?.minWords || 5} palabras</span>
        <span>{words} palabras</span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={handleValidate}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2.5 text-sm font-black text-white shadow-[0_4px_0_rgba(15,118,110,0.35)] transition-all hover:-translate-y-0.5 hover:from-emerald-600 hover:to-teal-700 active:translate-y-0.5 active:shadow-none active:scale-[0.98]"
        >
          <CheckCircle2 size={17} aria-hidden="true" />
          <span>Verificar ejercicio</span>
        </button>

        <button
          type="button"
          onClick={handleReadText}
          disabled={!text.trim()}
          className="inline-flex items-center gap-2 rounded-2xl border-2 border-blue-100 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 disabled:opacity-40 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          <Volume2 size={16} className={isReading ? 'animate-pulse text-blue-600' : ''} aria-hidden="true" />
          <span>Escuchar pronunciación</span>
        </button>
      </div>

      {validation && (
        <div
          role="status"
          className={`animate-pop mt-3.5 flex items-start gap-3 rounded-2xl border-2 p-3.5 ${
            validation.valid
              ? 'border-emerald-300 bg-emerald-50/80 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
              : 'border-rose-300 bg-rose-50/80 text-rose-800 dark:border-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
          }`}
        >
          {validation.valid ? (
            <Sparkles size={20} className="shrink-0 text-emerald-600 mt-0.5 animate-spin" aria-hidden="true" />
          ) : (
            <AlertCircle size={20} className="shrink-0 text-rose-600 mt-0.5" aria-hidden="true" />
          )}
          <div className="text-sm font-bold leading-relaxed">{validation.message}</div>
        </div>
      )}
    </div>
  );
}

export function WritingPage() {
  const isPrimary = (code) => !['jardin', 'transicion'].includes(code);
  const [activeGrade, setActiveGrade] = useActiveGrade(isPrimary);
  const isPreescolar = activeGrade === 'jardin' || activeGrade === 'transicion';
  const items = useMemo(() => (isPreescolar ? [] : getWriting(activeGrade)), [activeGrade, isPreescolar]);

  return (
    <MaterialShell
      materialTitle="Writing para clase"
      materialIcon={PenLine}
      activeGrade={activeGrade}
      onGradeChange={setActiveGrade}
      gradeFilter={isPrimary}
    >
      {isPreescolar ? (
        <div className="card-clay mx-auto my-6 max-w-xl p-6 text-center sm:p-10">
          <span className="mb-4 block text-5xl" role="img" aria-label="Escucha y canciones">
            🎧
          </span>
          <h2 className="mb-2 text-xl font-black text-slate-800 dark:text-slate-100 sm:text-2xl">
            En {activeGrade === 'jardin' ? 'Jardín' : 'Transición'} el aprendizaje es 100% Oral y Visual
          </h2>
          <p className="mb-6 text-sm font-semibold leading-relaxed text-slate-600 dark:text-slate-300">
            Según los <strong>Derechos Básicos de Aprendizaje (DBA)</strong> del Ministerio de Educación Nacional, los niños de preescolar aprenden inglés asociando sonidos, imágenes y canciones sin lectoescritura. Las actividades de Writing inician formalmente en <strong>1° de Primaria</strong>.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`/docente/listening?grado=${activeGrade}`}
              className="btn-primary-clay inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white sm:text-base"
            >
              <Headphones size={18} aria-hidden="true" /> Ir a Listening
            </a>
            <a
              href={`/docente/videos?grado=${activeGrade}`}
              className="btn-clay inline-flex items-center gap-2 border-[3px] border-rose-200 bg-rose-50 px-5 py-3 text-sm font-bold text-rose-700 hover:bg-rose-100 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300 sm:text-base"
            >
              <Play size={18} aria-hidden="true" /> Ir a Videos
            </a>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:gap-5">
            {items.map((activity) => (
              <article key={activity.id} className="card-clay p-4 sm:p-6">
                <span className="badge-clay badge-clay-green mb-2">
                  {activity.type === 'free' ? 'Escritura libre' : 'Guiada'}
                </span>
                <h2 className="text-base font-black sm:text-lg">{activity.title}</h2>
                <p className="mb-4 text-sm font-semibold text-slate-500 dark:text-slate-400">{activity.description}</p>
                {activity.type === 'free' ? <FreeWriting activity={activity} /> : <GuidedWriting activity={activity} />}
              </article>
            ))}
          </div>
          {items.length === 0 && (
            <p className="card-clay p-6 text-center font-bold text-slate-500">Material en preparación para este grado.</p>
          )}
        </>
      )}
    </MaterialShell>
  );
}

export { BookOpen };
