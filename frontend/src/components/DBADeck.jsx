import React, { useMemo, useState } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, Home, Volume2 } from 'lucide-react';
import { unitSlides } from '../data/grados';

function normalize(value) {
  return (value || '').toString().trim().toLowerCase();
}

function speak(text) {
  try {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  } catch {
    /* silent: speech is a nice-to-have for classroom projection */
  }
}

function ContentSlide({ slide }) {
  return (
    <div className="animate-fadeIn">
      {slide.title && <h3 className="text-2xl sm:text-3xl font-black text-slate-800 text-center mb-4">{slide.title}</h3>}
      {slide.description && <p className="text-lg text-slate-600 text-center mb-6">{slide.description}</p>}
      {slide.items && (
        <ul className="grid sm:grid-cols-2 gap-3 mb-4">
          {slide.items.map((item) => (
            <li key={item} className="bg-white/85 border-2 border-indigo-100 rounded-2xl px-4 py-3 text-lg font-bold text-slate-700 flex items-center justify-between gap-3">
              <span>{item}</span>
              <button
                type="button"
                onClick={() => speak(item.split('(')[0])}
                aria-label={`Pronunciar ${item}`}
                className="shrink-0 p-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
              >
                <Volume2 size={18} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {slide.examples && (
        <div className="mt-4 space-y-2">
          {slide.examples.map((example) => (
            <div key={example} className="bg-amber-50 border-l-4 border-amber-400 rounded-xl px-4 py-3 font-bold text-amber-800">
              {example}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function VocabularySlide({ slide }) {
  return (
    <div className="animate-fadeIn">
      <h3 className="text-2xl sm:text-3xl font-black text-slate-800 text-center mb-2">{slide.title}</h3>
      {slide.description && <p className="text-slate-600 text-center mb-6">{slide.description}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {slide.words.map((entry) => (
          <button
            key={entry.word}
            type="button"
            onClick={() => speak(entry.word)}
            className="group bg-white rounded-3xl border-2 border-emerald-100 p-4 flex flex-col items-center gap-2 hover:border-emerald-400 hover:shadow-lg transition-all"
          >
            <span className="text-4xl" aria-hidden="true">{entry.emoji}</span>
            <span className="font-black text-slate-800 text-center leading-tight">{entry.word}</span>
            <span className="text-sm text-slate-500">{entry.es}</span>
            <Volume2 size={16} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
}

function ActivitySlide({ slide }) {
  const [selected, setSelected] = useState(null);
  const [text, setText] = useState('');

  if (slide.activityType === 'fill') {
    const isCorrect = normalize(text) === normalize(slide.answer);
    return (
      <div className="animate-fadeIn">
        <p className="text-xl font-black text-slate-700 mb-6 text-center">{slide.prompt}</p>
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={slide.placeholder || 'Escribe tu respuesta...'}
          aria-label="Respuesta"
          className="w-full max-w-md mx-auto block h-14 px-6 rounded-2xl border-2 border-sky-200 text-xl font-bold focus:border-sky-500 focus:outline-none"
        />
        {text && (
          <p className={`mt-4 text-center font-black ${isCorrect ? 'text-emerald-600' : 'text-sky-600'}`} role="status">
            {isCorrect ? '¡Muy bien! ✅' : `Sugerencia: ${slide.answer}`}
          </p>
        )}
      </div>
    );
  }

  const isCorrect = selected === slide.correct;
  return (
    <div className="animate-fadeIn">
      <p className="text-xl font-black text-slate-700 mb-6 text-center">{slide.question}</p>
      <div className="grid gap-3 max-w-xl mx-auto">
        {slide.options.map((option) => {
          const active = selected === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setSelected(option)}
              className={`w-full text-left px-5 py-4 rounded-2xl border-2 font-bold text-lg transition-all ${
                active
                  ? isCorrect
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-rose-500 bg-rose-50 text-rose-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300'
              }`}
            >
              <span className="inline-flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-black ${
                  active ? (isCorrect ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-rose-500 bg-rose-500 text-white') : 'border-slate-300'
                }`}>
                  {active ? (isCorrect ? '✓' : '✕') : ''}
                </span>
                {option}
              </span>
            </button>
          );
        })}
      </div>
      {selected && (
        <p className={`mt-4 text-center font-black ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`} role="status">
          {isCorrect ? '¡Excelente! ✅' : `Respuesta: ${slide.correct}`}
        </p>
      )}
    </div>
  );
}

function SongSlide({ slide }) {
  return (
    <div className="animate-fadeIn">
      <h3 className="text-2xl sm:text-3xl font-black text-slate-800 text-center mb-2">
        {slide.emoji} {slide.title}
      </h3>
      <p className="text-slate-600 text-center mb-6">{slide.description}</p>
      <div className="max-w-3xl mx-auto rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl bg-slate-900">
        <div className="aspect-video">
          <iframe src={slide.videoUrl} title={slide.title} className="w-full h-full" allowFullScreen />
        </div>
      </div>
    </div>
  );
}

function SlideBody({ slide }) {
  if (slide.type === 'vocabulary') return <VocabularySlide slide={slide} />;
  if (slide.type === 'activity') return <ActivitySlide slide={slide} />;
  if (slide.type === 'song') return <SongSlide slide={slide} />;
  return <ContentSlide slide={slide} />;
}

export default function DBADeck({ slidesKey, title, subtitle, dashboardHref = '/' }) {
  const slides = useMemo(() => unitSlides[slidesKey] || [], [slidesKey]);

  return (
    <DeckInner
      key={slidesKey}
      slides={slides}
      title={title}
      subtitle={subtitle}
      dashboardHref={dashboardHref}
    />
  );
}

function DeckInner({ slides, title, subtitle, dashboardHref }) {
  const [current, setCurrent] = useState(0);
  const total = slides.length;
  const currentSlide = slides[current] || {};
  const displayProgress = total ? Math.round(((current + 1) / total) * 100) : 0;

  if (!total) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-emerald-50 to-violet-100 p-6">
        <div className="bg-white rounded-[2rem] border-2 border-slate-100 shadow-xl p-10 text-center max-w-md">
          <p className="text-5xl mb-4" aria-hidden="true">📚</p>
          <p className="font-black text-slate-700 text-xl">Aún no hay diapositivas para esta unidad.</p>
          <a href={dashboardHref} className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors">
            <Home size={18} aria-hidden="true" /> Volver al panel
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-emerald-50 to-violet-100 p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white/70 backdrop-blur rounded-[2rem] border border-white shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-white px-6 py-4 flex items-center justify-between gap-3">
          <div>
            <p className="font-black text-lg leading-tight">{title}</p>
            {subtitle && <p className="text-sm text-white/85">{subtitle}</p>}
          </div>
          <a
            href={dashboardHref}
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 font-bold text-sm transition-colors"
          >
            <Home size={16} aria-hidden="true" /> Panel
          </a>
        </div>

        <div className="px-6 sm:px-10 py-8 sm:py-10 min-h-[420px]">
          <div className="text-6xl text-center mb-4" aria-hidden="true">{currentSlide.emoji || '✨'}</div>
          <SlideBody slide={currentSlide} />
        </div>

        <div className="px-6 py-5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setCurrent(Math.max(0, current - 1))}
            disabled={current === 0}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-indigo-500 to-sky-500 disabled:opacity-40 hover:enabled:from-indigo-600 transition-all"
          >
            <ChevronLeft size={18} aria-hidden="true" /> Anterior
          </button>

          <div className="flex-1 max-w-xs">
            <div className="flex items-center justify-between text-xs font-black text-slate-500 mb-1">
              <span>{current + 1} / {total}</span>
              <span>{displayProgress}%</span>
            </div>
            <div
              role="progressbar"
              aria-valuenow={displayProgress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progreso de la unidad"
              className="h-3 bg-slate-200 rounded-full overflow-hidden"
            >
              <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-500 rounded-full transition-all duration-300" style={{ width: `${displayProgress}%` }} />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setCurrent(Math.min(total - 1, current + 1))}
            disabled={current === total - 1}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-sky-500 to-emerald-500 disabled:opacity-40 transition-all"
          >
            {current === total - 1 && <CheckCircle2 size={18} aria-hidden="true" />}
            Siguiente <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
