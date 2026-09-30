import React, { useMemo, useState } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, Home, Maximize, Minimize, Volume2 } from 'lucide-react';
import { unitSlides } from '../data/unitSlides';

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
      {slide.title && (
        <h3 className="mb-3 text-xl font-black text-slate-800 text-center sm:mb-4 sm:text-2xl lg:text-3xl">
          {slide.title}
        </h3>
      )}
      {slide.description && (
        <p className="mb-5 text-base font-semibold text-slate-500 text-center sm:mb-6 sm:text-lg">{slide.description}</p>
      )}
      {slide.items && (
        <ul className={`mb-4 grid gap-2.5 sm:gap-3 ${slide.items.length > 6 ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5' : 'grid-cols-1 sm:grid-cols-2'}`}>
          {slide.items.map((item) => (
            <li
              key={item}
              className="flex items-center justify-between gap-2 rounded-2xl border-[3px] border-blue-100 bg-white px-3 py-2.5 text-sm font-extrabold text-slate-700 shadow-[0_4px_0_rgba(37,99,235,0.08)] sm:gap-3 sm:px-4 sm:py-3 sm:text-base lg:text-lg"
            >
              <span className="min-w-0">{item}</span>
              <button
                type="button"
                onClick={() => speak(item.split('(')[0])}
                aria-label={`Pronunciar ${item}`}
                className="shrink-0 rounded-full bg-blue-50 p-1.5 text-blue-600 transition hover:bg-blue-100 active:scale-90 sm:p-2"
              >
                <Volume2 size={16} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {slide.examples && (
        <div className="mt-3 space-y-2 sm:mt-4">
          {slide.examples.map((example) => (
            <div
              key={example}
              className="rounded-2xl border-l-[6px] border-amber-400 bg-amber-50 px-3 py-2.5 text-sm font-extrabold text-amber-800 sm:px-4 sm:py-3 sm:text-base"
            >
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
      <h3 className="mb-2 text-xl font-black text-slate-800 text-center sm:text-2xl lg:text-3xl">{slide.title}</h3>
      {slide.description && (
        <p className="mb-5 text-center text-sm font-semibold text-slate-500 sm:mb-6 sm:text-base">{slide.description}</p>
      )}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {slide.words.map((entry) => (
          <button
            key={entry.word}
            type="button"
            onClick={() => speak(entry.word)}
            className="group flex flex-col items-center gap-1.5 rounded-3xl border-[3px] border-emerald-100 bg-white p-3 transition-all hover:-translate-y-1 hover:border-emerald-400 hover:shadow-[0_10px_20px_rgba(16,185,129,0.15)] active:translate-y-0 active:scale-95 sm:gap-2 sm:p-4"
          >
            <span className="text-4xl sm:text-5xl" aria-hidden="true">{entry.emoji}</span>
            <span className="text-center text-sm font-black leading-tight text-slate-800 sm:text-base">{entry.word}</span>
            <span className="text-center text-xs font-semibold text-slate-500 sm:text-sm">{entry.es}</span>
            <Volume2 size={15} className="text-emerald-500 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
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
        <p className="mb-5 text-lg font-black text-slate-700 text-center sm:mb-6 sm:text-xl">{slide.prompt}</p>
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={slide.placeholder || 'Escribe tu respuesta...'}
          aria-label="Respuesta"
          className="input-clay mx-auto block h-13 w-full max-w-md px-5 text-lg font-bold sm:h-14 sm:px-6 sm:text-xl"
        />
        {text && (
          <p
            className={`mt-4 text-center text-base font-black sm:text-lg ${isCorrect ? 'text-emerald-600' : 'text-sky-600'}`}
            role="status"
          >
            {isCorrect ? '¡Muy bien! ✅' : `Sugerencia: ${slide.answer}`}
          </p>
        )}
      </div>
    );
  }

  const isCorrect = selected === slide.correct;
  return (
    <div className="animate-fadeIn">
      <p className="mb-5 text-lg font-black text-slate-700 text-center sm:mb-6 sm:text-xl">{slide.question}</p>
      <div className="mx-auto grid max-w-xl gap-2.5 sm:gap-3">
        {slide.options.map((option) => {
          const active = selected === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setSelected(option)}
              className={`w-full rounded-2xl border-[3px] px-4 py-3.5 text-left text-base font-extrabold transition-all sm:px-5 sm:py-4 sm:text-lg ${
                active
                  ? isCorrect
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-[0_4px_0_rgba(16,185,129,0.3)]'
                    : 'border-rose-400 bg-rose-50 text-rose-700 shadow-[0_4px_0_rgba(244,63,94,0.25)]'
                  : 'border-blue-100 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-blue-300'
              }`}
            >
              <span className="inline-flex items-center gap-3">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-sm font-black ${
                    active
                      ? isCorrect
                        ? 'border-transparent bg-emerald-500 text-white'
                        : 'border-transparent bg-rose-500 text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {active ? (isCorrect ? '✓' : '✕') : ''}
                </span>
                {option}
              </span>
            </button>
          );
        })}
      </div>
      {selected && (
        <p
          className={`mt-4 text-center text-base font-black sm:text-lg ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}
          role="status"
        >
          {isCorrect ? '¡Excelente! ✅' : `Respuesta: ${slide.correct}`}
        </p>
      )}
    </div>
  );
}

function SongSlide({ slide }) {
  return (
    <div className="animate-fadeIn">
      <h3 className="mb-2 text-center text-xl font-black text-slate-800 sm:text-2xl lg:text-3xl">
        {slide.emoji} {slide.title}
      </h3>
      <p className="mb-4 text-center text-sm font-semibold text-slate-500 sm:mb-6 sm:text-base">{slide.description}</p>
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border-4 border-white bg-slate-900 shadow-[0_16px_40px_rgba(15,23,42,0.3)] sm:rounded-[2rem]">
        <div className="aspect-video">
          <iframe src={slide.videoUrl} title={slide.title} className="h-full w-full" allowFullScreen />
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const total = slides.length;
  const currentSlide = slides[current] || {};
  const displayProgress = total ? Math.round(((current + 1) / total) * 100) : 0;

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      /* fullscreen optional (not supported on some browsers/iOS Safari) */
    }
  };

  React.useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  if (!total) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#eff6ff] p-4 sm:p-6 dark:bg-[#0b1224]">
        <div className="card-clay max-w-md p-6 text-center sm:p-10">
          <p className="mb-4 text-5xl" aria-hidden="true">📚</p>
          <p className="text-lg font-black text-slate-700 sm:text-xl">Aún no hay diapositivas para esta unidad.</p>
          <a href={dashboardHref} className="btn-primary-clay mt-6 inline-flex items-center gap-2">
            <Home size={18} aria-hidden="true" /> Volver al panel
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-amber-50/60 to-emerald-50 transition-all dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 ${
        isFullscreen ? 'p-0' : 'p-2 sm:p-4 lg:p-8'
      }`}
    >
      <div
        className={`flex w-full flex-col overflow-hidden bg-white/80 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur transition-all dark:bg-slate-900/80 ${
          isFullscreen ? 'min-h-screen max-w-none rounded-none' : 'max-w-4xl rounded-none border-[3px] border-white sm:rounded-[2rem]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2 bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500 px-3 py-3 text-white sm:gap-3 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-black leading-tight sm:text-base lg:text-lg">{title}</p>
            {subtitle && <p className="truncate text-[11px] font-semibold text-white/85 sm:text-sm">{subtitle}</p>}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa para proyectar'}
              title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/20 px-2.5 py-2 text-xs font-extrabold transition hover:bg-white/30 sm:rounded-2xl sm:px-4 sm:py-2.5 sm:text-sm"
            >
              {isFullscreen ? <Minimize size={15} aria-hidden="true" /> : <Maximize size={15} aria-hidden="true" />}
              <span className="hidden sm:inline">{isFullscreen ? 'Salir' : 'Proyectar'}</span>
            </button>
            <a
              href={dashboardHref}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/20 px-2.5 py-2 text-xs font-extrabold transition hover:bg-white/30 sm:rounded-2xl sm:px-4 sm:py-2.5 sm:text-sm"
            >
              <Home size={15} aria-hidden="true" />
              <span className="hidden sm:inline">Panel</span>
            </a>
          </div>
        </div>

        {/* Slide */}
        <div className={`flex flex-1 flex-col justify-center px-3 py-5 sm:px-8 sm:py-8 lg:px-10 ${isFullscreen ? 'py-[4vh]' : ''}`}>
          <div
            className={`mb-4 text-center ${isFullscreen ? 'text-[6vh] leading-none' : 'text-5xl sm:text-6xl'}`}
            aria-hidden="true"
          >
            {currentSlide.emoji || '✨'}
          </div>
          <SlideBody slide={currentSlide} />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-2 border-t-[3px] border-blue-100 bg-blue-50/70 px-3 py-3.5 sm:gap-4 sm:px-6 sm:py-5 dark:border-slate-800 dark:bg-slate-950/60">
          <button
            type="button"
            onClick={() => setCurrent(Math.max(0, current - 1))}
            disabled={current === 0}
            className="btn-clay inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 to-sky-500 px-3 py-2.5 text-xs text-white disabled:opacity-40 sm:gap-2 sm:px-5 sm:py-3 sm:text-base"
          >
            <ChevronLeft size={17} aria-hidden="true" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          <div className="min-w-0 flex-1 px-1">
            <div className="mb-1 flex items-center justify-between text-[10px] font-black text-slate-500 sm:text-xs dark:text-slate-400">
              <span>{current + 1} / {total}</span>
              <span>{displayProgress}%</span>
            </div>
            <div
              role="progressbar"
              aria-valuenow={displayProgress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progreso de la unidad"
              className="progress-clay h-2.5 sm:h-3"
            >
              <div
                className="progress-clay-fill"
                style={{ width: `${displayProgress}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setCurrent(Math.min(total - 1, current + 1))}
            disabled={current === total - 1}
            className="btn-clay inline-flex items-center gap-1 bg-gradient-to-r from-sky-500 to-emerald-500 px-3 py-2.5 text-xs text-white disabled:opacity-40 sm:gap-2 sm:px-5 sm:py-3 sm:text-base"
          >
            {current === total - 1 && <CheckCircle2 size={17} aria-hidden="true" />}
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronRight size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
