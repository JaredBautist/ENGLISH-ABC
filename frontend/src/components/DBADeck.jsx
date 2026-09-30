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
      {slide.title && <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-800 text-center mb-3 sm:mb-4">{slide.title}</h3>}
      {slide.description && <p className="text-base sm:text-lg text-slate-600 text-center mb-5 sm:mb-6">{slide.description}</p>}
      {slide.items && (
        <ul className={`grid gap-2.5 sm:gap-3 mb-4 ${slide.items.length > 6 ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5' : 'grid-cols-1 sm:grid-cols-2'}`}>
          {slide.items.map((item) => (
            <li
              key={item}
              className="bg-white/85 border-2 border-indigo-100 rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base lg:text-lg font-bold text-slate-700 flex items-center justify-between gap-2 sm:gap-3"
            >
              <span className="min-w-0">{item}</span>
              <button
                type="button"
                onClick={() => speak(item.split('(')[0])}
                aria-label={`Pronunciar ${item}`}
                className="shrink-0 p-1.5 sm:p-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 active:scale-90 transition"
              >
                <Volume2 size={16} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {slide.examples && (
        <div className="mt-3 sm:mt-4 space-y-2">
          {slide.examples.map((example) => (
            <div
              key={example}
              className="bg-amber-50 border-l-4 border-amber-400 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 font-bold text-amber-800 text-sm sm:text-base"
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
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-800 text-center mb-2">{slide.title}</h3>
      {slide.description && <p className="text-sm sm:text-base text-slate-600 text-center mb-5 sm:mb-6">{slide.description}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {slide.words.map((entry) => (
          <button
            key={entry.word}
            type="button"
            onClick={() => speak(entry.word)}
            className="group bg-white rounded-3xl border-2 border-emerald-100 p-3 sm:p-4 flex flex-col items-center gap-1.5 sm:gap-2 hover:border-emerald-400 hover:shadow-lg active:scale-95 transition-all"
          >
            <span className="text-4xl sm:text-5xl" aria-hidden="true">{entry.emoji}</span>
            <span className="font-black text-slate-800 text-center leading-tight text-sm sm:text-base">{entry.word}</span>
            <span className="text-xs sm:text-sm text-slate-500 text-center">{entry.es}</span>
            <Volume2 size={15} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
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
        <p className="text-lg sm:text-xl font-black text-slate-700 mb-5 sm:mb-6 text-center">{slide.prompt}</p>
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={slide.placeholder || 'Escribe tu respuesta...'}
          aria-label="Respuesta"
          className="w-full max-w-md mx-auto block h-13 sm:h-14 px-5 sm:px-6 rounded-2xl border-2 border-sky-200 text-lg sm:text-xl font-bold focus:border-sky-500 focus:outline-none"
        />
        {text && (
          <p className={`mt-4 text-center font-black text-base sm:text-lg ${isCorrect ? 'text-emerald-600' : 'text-sky-600'}`} role="status">
            {isCorrect ? '¡Muy bien! ✅' : `Sugerencia: ${slide.answer}`}
          </p>
        )}
      </div>
    );
  }

  const isCorrect = selected === slide.correct;
  return (
    <div className="animate-fadeIn">
      <p className="text-lg sm:text-xl font-black text-slate-700 mb-5 sm:mb-6 text-center">{slide.question}</p>
      <div className="grid gap-2.5 sm:gap-3 max-w-xl mx-auto">
        {slide.options.map((option) => {
          const active = selected === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setSelected(option)}
              className={`w-full text-left px-4 py-3.5 sm:px-5 sm:py-4 rounded-2xl border-2 font-bold text-base sm:text-lg transition-all ${
                active
                  ? isCorrect
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-rose-500 bg-rose-50 text-rose-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300'
              }`}
            >
              <span className="inline-flex items-center gap-3">
                <span
                  className={`w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center text-sm font-black ${
                    active
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-500 text-white'
                        : 'border-rose-500 bg-rose-500 text-white'
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
        <p className={`mt-4 text-center font-black text-base sm:text-lg ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`} role="status">
          {isCorrect ? '¡Excelente! ✅' : `Respuesta: ${slide.correct}`}
        </p>
      )}
    </div>
  );
}

function SongSlide({ slide }) {
  return (
    <div className="animate-fadeIn">
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-800 text-center mb-2">
        {slide.emoji} {slide.title}
      </h3>
      <p className="text-sm sm:text-base text-slate-600 text-center mb-4 sm:mb-6">{slide.description}</p>
      <div className="max-w-3xl mx-auto rounded-2xl sm:rounded-[2rem] overflow-hidden border-2 sm:border-4 border-white shadow-2xl bg-slate-900">
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-emerald-50 to-violet-100 p-4 sm:p-6">
        <div className="bg-white rounded-[2rem] border-2 border-slate-100 shadow-xl p-6 sm:p-10 text-center max-w-md">
          <p className="text-5xl mb-4" aria-hidden="true">📚</p>
          <p className="font-black text-slate-700 text-lg sm:text-xl">Aún no hay diapositivas para esta unidad.</p>
          <a
            href={dashboardHref}
            className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors"
          >
            <Home size={18} aria-hidden="true" /> Volver al panel
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-sky-100 via-emerald-50 to-violet-100 flex items-center justify-center transition-all ${
        isFullscreen ? 'p-0' : 'p-2 sm:p-4 lg:p-8'
      }`}
    >
      <div
        className={`w-full bg-white/70 backdrop-blur border border-white shadow-2xl overflow-hidden flex flex-col transition-all ${
          isFullscreen ? 'max-w-none rounded-none min-h-screen' : 'max-w-4xl rounded-none sm:rounded-[2rem]'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-white px-3 py-3 sm:px-6 sm:py-4 flex items-center justify-between gap-2 sm:gap-3">
          <div className="min-w-0">
            <p className="font-black text-sm sm:text-base lg:text-lg leading-tight truncate">{title}</p>
            {subtitle && <p className="text-[11px] sm:text-sm text-white/85 truncate">{subtitle}</p>}
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa para proyectar'}
              title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white/15 hover:bg-white/25 font-bold text-xs sm:text-sm transition-colors"
            >
              {isFullscreen ? <Minimize size={15} aria-hidden="true" /> : <Maximize size={15} aria-hidden="true" />}
              <span className="hidden sm:inline">{isFullscreen ? 'Salir' : 'Proyectar'}</span>
            </button>
            <a
              href={dashboardHref}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white/15 hover:bg-white/25 font-bold text-xs sm:text-sm transition-colors"
            >
              <Home size={15} aria-hidden="true" />
              <span className="hidden sm:inline">Panel</span>
            </a>
          </div>
        </div>

        {/* Slide */}
        <div className={`px-3 py-5 sm:px-8 sm:py-8 lg:px-10 lg:py-10 flex-1 flex flex-col justify-center ${isFullscreen ? 'py-[4vh]' : ''}`}>
          <div className={`text-center mb-4 ${isFullscreen ? 'text-[6vh] leading-none' : 'text-5xl sm:text-6xl'}`} aria-hidden="true">
            {currentSlide.emoji || '✨'}
          </div>
          <SlideBody slide={currentSlide} />
        </div>

        {/* Controls */}
        <div className="px-3 py-3.5 sm:px-6 sm:py-5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => setCurrent(Math.max(0, current - 1))}
            disabled={current === 0}
            className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-black text-xs sm:text-base text-white bg-gradient-to-r from-indigo-500 to-sky-500 disabled:opacity-40 transition-all"
          >
            <ChevronLeft size={17} aria-hidden="true" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          <div className="flex-1 max-w-xs min-w-0 px-1">
            <div className="flex items-center justify-between text-[10px] sm:text-xs font-black text-slate-500 mb-1">
              <span>{current + 1} / {total}</span>
              <span>{displayProgress}%</span>
            </div>
            <div
              role="progressbar"
              aria-valuenow={displayProgress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progreso de la unidad"
              className="h-2.5 sm:h-3 bg-slate-200 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${displayProgress}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setCurrent(Math.min(total - 1, current + 1))}
            disabled={current === total - 1}
            className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-black text-xs sm:text-base text-white bg-gradient-to-r from-sky-500 to-emerald-500 disabled:opacity-40 transition-all"
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
