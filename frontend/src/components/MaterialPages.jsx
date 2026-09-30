import { useMemo, useState } from 'react';
import {
  BookOpen, CheckCircle2, PenLine, Play, Shuffle, Volume2, Headphones,
} from 'lucide-react';
import MaterialShell from './MaterialShell';
import { getListening, getVideos, getWriting } from '../data/material';
import { gradeOrder } from '../data/grados';

function useActiveGrade() {
  const initial = gradeOrder.includes(window.location.search.split('grado=')[1]?.split('&')[0])
    ? window.location.search.split('grado=')[1].split('&')[0]
    : 'jardin';
  const [activeGrade, setActiveGrade] = useState(initial);

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
            className="card-clay card-clay-hover overflow-hidden !p-0"
          >
            <div className="aspect-video bg-slate-900">
              <iframe
                src={`https://www.youtube.com/embed/${video.videoId}`}
                title={video.title}
                className="h-full w-full"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="p-4 sm:p-5">
              <span className="badge-clay badge-clay-blue mb-2">{video.unit}</span>
              <h2 className="text-base font-black leading-tight sm:text-lg">{video.title}</h2>
              <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">{video.description}</p>
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
  const isCorrect = selected === activity.correct;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-base font-black text-slate-700 sm:text-lg">{activity.prompt}</p>
        <button
          type="button"
          onClick={() => {
            try {
              if (window.speechSynthesis) {
                const utterance = new SpeechSynthesisUtterance(activity.speakText);
                utterance.lang = 'en-US';
                utterance.rate = 0.8;
                window.speechSynthesis.cancel();
                window.speechSynthesis.speak(utterance);
              }
            } catch { /* tts optional */ }
          }}
          aria-label="Escuchar de nuevo"
          className="shrink-0 rounded-2xl bg-gradient-to-br from-blue-500 to-sky-500 p-3 text-white shadow-[0_4px_0_rgba(29,78,216,0.35)] transition-all hover:-translate-y-0.5 active:translate-y-0.5"
        >
          <Volume2 size={20} aria-hidden="true" />
        </button>
      </div>
      <div className="grid gap-2.5 sm:gap-3">
        {activity.options.map((option) => {
          const active = selected === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setSelected(option)}
              className={`w-full rounded-2xl border-[3px] px-4 py-3.5 text-left text-base font-extrabold transition-all sm:text-lg ${
                active
                  ? isCorrect
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-[0_4px_0_rgba(16,185,129,0.3)]'
                    : 'border-rose-400 bg-rose-50 text-rose-700'
                  : 'border-blue-100 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {selected && (
        <p className={`animate-pop mt-4 flex items-center justify-center gap-2 text-center font-black ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`} role="status">
          {isCorrect ? <CheckCircle2 size={18} aria-hidden="true" /> : null}
          {isCorrect ? '¡Excelente escucha! ✅' : 'Intenta de nuevo 🔄'}
        </p>
      )}
    </div>
  );
}

function OrderListening({ activity }) {
  const [order, setOrder] = useState([]);
  const [available, setAvailable] = useState(() => [...activity.steps].sort(() => Math.random() - 0.5));
  const done = order.length === activity.steps.length;

  const pick = (step) => {
    setOrder((prev) => [...prev, step]);
    setAvailable((prev) => prev.filter((s) => s !== step));
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
          onClick={() => {
            try {
              if (window.speechSynthesis) {
                const utterance = new SpeechSynthesisUtterance(activity.speakText);
                utterance.lang = 'en-US';
                utterance.rate = 0.8;
                window.speechSynthesis.cancel();
                window.speechSynthesis.speak(utterance);
              }
            } catch { /* tts optional */ }
          }}
          aria-label="Escuchar de nuevo"
          className="shrink-0 rounded-2xl bg-gradient-to-br from-blue-500 to-sky-500 p-3 text-white shadow-[0_4px_0_rgba(29,78,216,0.35)] transition-all hover:-translate-y-0.5"
        >
          <Volume2 size={20} aria-hidden="true" />
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
            className="rounded-2xl border-[3px] border-blue-100 bg-white px-3.5 py-2.5 text-sm font-extrabold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-blue-300 disabled:opacity-40 sm:text-base dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            {step}
          </button>
        ))}
      </div>

      {done && (
        <div className="animate-pop mt-4 flex flex-wrap items-center gap-3">
          <p className="flex items-center gap-2 font-black text-emerald-600" role="status">
            <CheckCircle2 size={18} aria-hidden="true" /> ¡Secuencia completa! ✅
          </p>
          <button type="button" onClick={reset} className="btn-ghost-clay px-4 py-2 text-sm">
            <Shuffle size={15} aria-hidden="true" className="mr-1.5 inline" /> Reintentar
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
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const filled = text.replace(/_{2,}/g, '…');

  return (
    <div>
      <div className="mb-4 rounded-2xl border-l-[6px] border-amber-400 bg-amber-50 px-4 py-3 text-base font-extrabold text-amber-800 sm:text-lg">
        Modelo: <span className="font-black">{activity.model}</span>
      </div>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Escribe aquí con los niños…"
        rows={4}
        aria-label={`Escribir: ${activity.title}`}
        className="input-clay w-full resize-none text-base sm:text-lg"
      />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {activity.hints.map((hint) => (
            <button
              key={hint}
              type="button"
              onClick={() => setText((prev) => prev + (prev && !prev.endsWith(' ') ? ' ' : '') + hint)}
              className="rounded-xl border-2 border-blue-100 bg-white px-3 py-1.5 text-xs font-extrabold text-slate-600 transition hover:-translate-y-0.5 hover:border-blue-300 sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              + {hint}
            </button>
          ))}
        </div>
        <span className="text-xs font-black text-slate-400 sm:text-sm">{words} palabras</span>
      </div>
      {text && (
        <p className="mt-3 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-800 dark:bg-blue-500/10 dark:text-blue-200">
          <span className="font-black">Lectura:</span> {filled}
        </p>
      )}
    </div>
  );
}

function FreeWriting({ activity }) {
  const [text, setText] = useState('');
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {activity.suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => setText((prev) => (prev ? `${prev.trimEnd()} ${suggestion} ` : `${suggestion} `))}
            className="rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-extrabold text-emerald-700 transition hover:-translate-y-0.5 sm:text-sm dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
          >
            {suggestion}
          </button>
        ))}
      </div>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Escribe la historia o descripción…"
        rows={5}
        aria-label={`Escribir: ${activity.title}`}
        className="input-clay w-full resize-none text-base sm:text-lg"
      />
      <p className="mt-2 text-right text-xs font-black text-slate-400 sm:text-sm">{words} palabras</p>
    </div>
  );
}

export function WritingPage() {
  const [activeGrade, setActiveGrade] = useActiveGrade();
  const items = useMemo(() => getWriting(activeGrade), [activeGrade]);

  return (
    <MaterialShell
      materialTitle="Writing para clase"
      materialIcon={PenLine}
      activeGrade={activeGrade}
      onGradeChange={setActiveGrade}
    >
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
    </MaterialShell>
  );
}

export { BookOpen };
