import React, { useEffect, useMemo, useState } from 'react';
import {
  Award, Check, CheckCircle2, ChevronLeft, ChevronRight, Home, Maximize, Minimize, RotateCcw, Sparkles, Volume2,
} from 'lucide-react';
import { apiFetch } from '../utils/api';
import { playRewardSound, speakFriendly } from '../shared/utils/friendlySpeech';
import EmojiArt from './EmojiArt';
import { unitSlides } from '../data/unitSlides';
import { getConceptImage } from '../data/conceptImages';

function normalize(value) {
  return (value || '').toString().trim().toLowerCase();
}

function speak(text) {
  if (!text) return;
  speakFriendly(text, { rate: 0.85, pitch: 1.2 });
}

/**
 * Parsea un ítem de contenido (string u objeto) extrayendo:
 * emoji (o ilustración), texto en inglés, traducción en español y representación gráfica.
 */
function parseSlideItem(rawItem, fallbackEmoji = '✨') {
  if (typeof rawItem === 'object' && rawItem !== null) {
    const text = rawItem.text || rawItem.word || '';
    return {
      text,
      es: rawItem.es || '',
      emoji: rawItem.emoji || fallbackEmoji,
      image: rawItem.image || getConceptImage(text) || null,
    };
  }

  const str = String(rawItem || '').trim();
  // Detectar emoji al inicio (ej. "👋 Hello! (Hola)" o "🟡 Yellow (Amarillo)")
  const emojiMatch = str.match(/^([\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]|\p{Emoji_Presentation}|\p{Emoji}\uFE0F)\s*/u);
  let emoji = fallbackEmoji;
  let cleanStr = str;
  if (emojiMatch) {
    emoji = emojiMatch[1];
    cleanStr = str.slice(emojiMatch[0].length).trim();
  }

  // Detectar traducción entre paréntesis (ej. "Hello! (Hola)")
  const parenMatch = cleanStr.match(/^(.*?)\s*\((.*?)\)$/);
  if (parenMatch) {
    const text = parenMatch[1].trim();
    return {
      text,
      es: parenMatch[2].trim(),
      emoji,
      image: getConceptImage(text) || null,
    };
  }

  return {
    text: cleanStr,
    es: '',
    emoji,
    image: getConceptImage(cleanStr) || null,
  };
}

function CardIllustration({ src, alt, emoji, className = "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" }) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!src || error) {
    return (
      <div className="flex h-full w-full items-center justify-center p-3">
        <EmojiArt emoji={emoji || '✨'} size="xl" />
      </div>
    );
  }

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-50 dark:bg-slate-800">
          <EmojiArt emoji={emoji || '✨'} size="lg" />
        </div>
      )}
    </>
  );
}

function HeroIllustration({ src, alt, emoji, className = "h-32 w-auto max-w-xs rounded-2xl object-cover shadow-sm sm:h-40 sm:max-w-md lg:h-48" }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return emoji ? (
      <div className="mb-3 flex justify-center">
        <EmojiArt emoji={emoji} size="xl" />
      </div>
    ) : null;
  }

  return (
    <div className="mb-4 flex justify-center">
      <div className="relative overflow-hidden rounded-3xl border-4 border-white bg-white/80 p-2 shadow-[0_12px_28px_rgba(37,99,235,0.15)] ring-2 ring-blue-100 dark:border-slate-800 dark:bg-slate-900/80 sm:p-2.5">
        <img
          src={src}
          alt={alt || 'Ilustración'}
          className={className}
          loading="lazy"
          decoding="async"
          onError={() => setError(true)}
        />
        {emoji && (
          <span className="absolute bottom-3 right-3 rounded-2xl bg-white/95 p-1.5 text-2xl shadow-md backdrop-blur-sm sm:bottom-4 sm:right-4 sm:p-2 sm:text-3xl">
            {emoji}
          </span>
        )}
      </div>
    </div>
  );
}

function ContentSlide({ slide }) {
  const items = useMemo(() => {
    if (!slide.items) return [];
    return slide.items.map((it) => parseSlideItem(it, slide.emoji || '✨'));
  }, [slide.items, slide.emoji]);

  const slideHeroImage = slide.image || (slide.title ? getConceptImage(slide.title) : null);

  return (
    <div className="animate-fadeIn w-full max-w-5xl mx-auto">
      {/* Banner o Ilustración Temática de la Unidad */}
      {slideHeroImage ? (
        <HeroIllustration src={slideHeroImage} alt={slide.title} emoji={slide.emoji} />
      ) : slide.emoji ? (
        <div className="mb-3 flex justify-center">
          <EmojiArt emoji={slide.emoji} size="xl" />
        </div>
      ) : null}

      {slide.title && (
        <h3 className="mb-1 text-center text-xl font-black text-slate-800 dark:text-slate-100 sm:text-2xl lg:text-3xl">
          {slide.title}
        </h3>
      )}
      {slide.description && (
        <p className="mb-5 text-center text-sm font-semibold text-slate-500 dark:text-slate-400 sm:mb-6 sm:text-base">
          {slide.description}
        </p>
      )}

      {/* Grid de Tarjetas Visuales Ilustradas (Flashcards para Niños) */}
      {items.length > 0 && (
        <div
          className={`mb-6 grid gap-4 sm:gap-5 ${
            items.length === 1
              ? 'grid-cols-1 w-full max-w-sm mx-auto'
              : items.length <= 2
              ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto'
              : items.length <= 4
              ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4'
              : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
          }`}
        >
          {items.map((item, idx) => {
            const cardImg = item.image || getConceptImage(item.text);
            return (
              <div
                key={item.text + idx}
                onClick={() => speak(item.text)}
                className="group flex cursor-pointer flex-col justify-between rounded-3xl border-[3px] border-blue-100 bg-white p-3 text-center shadow-md transition-all duration-200 hover:-translate-y-1.5 hover:border-blue-400 hover:shadow-[0_16px_32px_rgba(37,99,235,0.18)] active:scale-[0.98] dark:border-slate-800 dark:bg-slate-900 sm:p-4"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    speak(item.text);
                  }
                }}
                aria-label={`Escuchar ${item.text}`}
              >
                {/* Contenedor de Imagen o Ilustración Representativa */}
                <div className="relative mb-3 h-28 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-slate-100 shadow-inner sm:h-36 lg:h-40 dark:from-slate-800 dark:to-slate-850 flex items-center justify-center">
                  <CardIllustration
                    src={cardImg}
                    alt={item.text}
                    emoji={item.emoji}
                  />
                  {item.emoji && cardImg && (
                    <span className="absolute top-2 left-2 rounded-xl bg-white/90 px-1.5 py-0.5 text-base shadow-sm">
                      {item.emoji}
                    </span>
                  )}
                </div>

                {/* Texto en Inglés */}
                <div className="w-full min-w-0 flex-1 flex flex-col justify-center">
                  <p className="text-base font-black leading-tight text-slate-800 transition group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400 sm:text-lg lg:text-xl">
                    {item.text}
                  </p>
                  {item.es && (
                    <span className="mt-1 inline-block rounded-xl bg-blue-50 px-2.5 py-0.5 text-xs font-extrabold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 sm:text-sm">
                      {item.es}
                    </span>
                  )}
                </div>

                {/* Botón táctil para pronunciar */}
                <div className="mt-2.5 flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/80 px-3 py-1 text-xs font-black text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-800 dark:text-blue-300">
                    <Volume2 size={15} aria-hidden="true" />
                    <span>Escuchar</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Ejemplos y diálogos modelados con avatares */}
      {slide.examples && (
        <div className="mx-auto mt-4 max-w-2xl space-y-2.5 sm:mt-5">
          {slide.examples.map((example, idx) => {
            const isDialogue = example.includes('Teacher:') || example.includes('Student:') || example.includes('—');
            if (isDialogue) {
              const parts = example.split('—').map((p) => p.trim());
              return (
                <div key={idx} className="flex flex-col gap-2 rounded-2xl border-[3px] border-amber-200 bg-amber-50/70 p-3 sm:p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
                  {parts.map((turn, tIdx) => {
                    const isTeacher = turn.toLowerCase().includes('teacher');
                    return (
                      <div
                        key={tIdx}
                        onClick={() => speak(turn.replace(/^(Teacher|Student):\s*/i, ''))}
                        className={`flex cursor-pointer items-center gap-2.5 rounded-xl p-2 transition hover:bg-white/80 dark:hover:bg-slate-800/80 ${
                          isTeacher ? 'text-blue-900 dark:text-blue-200' : 'text-emerald-900 dark:text-emerald-200'
                        }`}
                      >
                        <span className="text-2xl" role="img" aria-hidden="true">
                          {isTeacher ? '👩‍🏫' : '👧'}
                        </span>
                        <span className="text-sm font-extrabold sm:text-base">{turn}</span>
                        <Volume2 size={16} className="ml-auto shrink-0 opacity-60" aria-hidden="true" />
                      </div>
                    );
                  })}
                </div>
              );
            }
            return (
              <div
                key={idx}
                onClick={() => speak(example)}
                className="flex cursor-pointer items-center justify-between rounded-2xl border-l-[6px] border-amber-400 bg-amber-50 px-4 py-3 text-sm font-extrabold text-amber-900 transition hover:bg-amber-100/70 dark:bg-amber-950/40 dark:text-amber-200 sm:text-base"
              >
                <span>{example}</span>
                <Volume2 size={16} className="shrink-0 text-amber-700 opacity-70" aria-hidden="true" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function VocabularySlide({ slide }) {
  return (
    <div className="animate-fadeIn w-full max-w-5xl mx-auto">
      <h3 className="mb-2 text-center text-xl font-black text-slate-800 dark:text-slate-100 sm:text-2xl lg:text-3xl">
        {slide.title}
      </h3>
      {slide.description && (
        <p className="mb-5 text-center text-sm font-semibold text-slate-500 dark:text-slate-400 sm:mb-6 sm:text-base">
          {slide.description}
        </p>
      )}
      <div className={`grid grid-cols-2 gap-4 sm:gap-5 ${slide.words.length === 2
        ? 'mx-auto sm:w-[calc((200%-1.25rem)/3)] lg:w-[calc((100%-1.25rem)/2)]'
        : 'sm:grid-cols-3 lg:grid-cols-4'}`}>
        {slide.words.map((entry) => {
          const cardImg = entry.image || getConceptImage(entry.word);
          return (
            <button
              key={entry.word}
              type="button"
              onClick={() => speak(entry.word)}
              className="group flex flex-col justify-between rounded-3xl border-[3px] border-emerald-100 bg-white p-3.5 text-center shadow-md transition-all duration-200 hover:-translate-y-1.5 hover:border-emerald-400 hover:shadow-[0_16px_32px_rgba(16,185,129,0.2)] active:scale-[0.98] dark:border-slate-800 dark:bg-slate-900 sm:p-4"
            >
              {/* Contenedor de Imagen o Ilustración */}
              <div className="relative mb-3 h-28 w-full overflow-hidden rounded-2xl bg-emerald-50/80 shadow-inner sm:h-36 lg:h-40 flex items-center justify-center dark:bg-emerald-950/30">
                <CardIllustration
                  src={cardImg}
                  alt={entry.word}
                  emoji={entry.emoji}
                />
                {entry.emoji && cardImg && (
                  <span className="absolute top-2 left-2 rounded-xl bg-white/90 px-1.5 py-0.5 text-base shadow-sm">
                    {entry.emoji}
                  </span>
                )}
              </div>

              <div className="w-full min-w-0 flex-1 flex flex-col justify-center">
                <span className="text-center text-base font-black leading-tight text-slate-800 transition group-hover:text-emerald-700 dark:text-slate-100 dark:group-hover:text-emerald-400 sm:text-lg lg:text-xl">
                  {entry.word}
                </span>
                <span className="mt-1 inline-block rounded-xl bg-emerald-50 px-2.5 py-0.5 text-xs font-extrabold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 sm:text-sm">
                  {entry.es}
                </span>
              </div>

              <div className="mt-2.5 flex items-center justify-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-black text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-900/30 dark:text-emerald-300">
                  <Volume2 size={15} aria-hidden="true" />
                  <span>Pronunciar</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ActivitySlide({ slide }) {
  const [selected, setSelected] = useState(null);
  const [text, setText] = useState('');

  const handleSelectOption = (option) => {
    setSelected(option);
    if (option === slide.correct) {
      playRewardSound('Great job!');
    }
  };

  const isCorrect = selected === slide.correct;

  if (slide.activityType === 'fill') {
    const isFillCorrect = normalize(text) === normalize(slide.answer);
    return (
      <div className="animate-fadeIn max-w-2xl mx-auto">
        <div className="mb-5 flex items-center justify-center gap-2.5 sm:mb-6">
          <p className="text-center text-lg font-black text-slate-800 dark:text-slate-100 sm:text-xl lg:text-2xl">
            {slide.prompt}
          </p>
          <button
            type="button"
            onClick={() => speak(slide.prompt)}
            aria-label="Escuchar pregunta"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
          >
            <Volume2 size={18} aria-hidden="true" />
          </button>
        </div>
        <input
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            if (normalize(event.target.value) === normalize(slide.answer)) {
              playRewardSound('Awesome!');
            }
          }}
          placeholder={slide.placeholder || 'Escribe tu respuesta...'}
          aria-label="Respuesta"
          className="input-clay mx-auto block h-13 w-full max-w-md px-5 text-lg font-bold sm:h-14 sm:px-6 sm:text-xl"
        />
        {text && (
          <p
            className={`mt-4 text-center text-base font-black sm:text-lg ${
              isFillCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-sky-600 dark:text-sky-400'
            }`}
            role="status"
          >
            {isFillCorrect ? '¡Muy bien! ✅' : `Sugerencia: ${slide.answer}`}
          </p>
        )}
      </div>
    );
  }

  // Selección Múltiple con Tarjetas Visuales Ilustradas (Pedagogía para Niños)
  return (
    <div className="animate-fadeIn w-full max-w-4xl mx-auto">
      {/* Pregunta con botón de audio */}
      <div className="mb-6 flex flex-col items-center justify-center text-center">
        {slide.image && (
          <HeroIllustration
            src={slide.image}
            alt={slide.question || 'Actividad visual'}
            className="h-36 w-auto max-w-md object-cover rounded-2xl sm:h-44"
          />
        )}
        <div className="inline-flex items-center gap-3 rounded-2xl bg-blue-50/80 px-5 py-3 border border-blue-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
          <button
            type="button"
            onClick={() => speak(slide.question)}
            aria-label="Escuchar pregunta"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md transition hover:scale-105 active:scale-95"
          >
            <Volume2 size={20} aria-hidden="true" />
          </button>
          <p className="text-lg sm:text-xl lg:text-2xl font-black text-slate-800 dark:text-slate-100">
            {slide.question}
          </p>
        </div>
      </div>

      {/* Grid de Opciones Visuales Ilustradas */}
      <div className={`grid grid-cols-1 gap-4 sm:gap-6 ${slide.options.length === 2
        ? 'mx-auto sm:grid-cols-2 sm:w-[calc((200%-1.5rem)/3)]'
        : 'sm:grid-cols-3'}`}>
        {slide.options.map((option) => {
          const active = selected === option;
          const optionImage = slide.optionImages?.[option] ?? getConceptImage(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => handleSelectOption(option)}
              className={`group flex flex-col items-center justify-between rounded-3xl border-4 p-4 text-center transition-all duration-200 active:scale-[0.97] ${
                active
                  ? isCorrect
                    ? 'border-emerald-500 bg-emerald-50 shadow-[0_12px_28px_rgba(16,185,129,0.35)] -translate-y-1 dark:bg-emerald-950/40'
                    : 'border-rose-400 bg-rose-50 shadow-[0_12px_28px_rgba(244,63,94,0.3)] -translate-y-1 dark:bg-rose-950/40'
                  : 'border-slate-200 bg-white hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              {/* Imagen o Ilustración Representativa de la Opción */}
              <div className="relative mb-3 h-28 w-full overflow-hidden rounded-2xl bg-slate-100 shadow-inner sm:h-36 flex items-center justify-center">
                <CardIllustration
                  src={optionImage}
                  alt={option}
                  emoji="✨"
                />
                <div className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-md">
                  {active ? (
                    isCorrect ? (
                      <Check className="text-emerald-600 font-black" size={20} />
                    ) : (
                      <span className="text-rose-600 font-black text-sm">✕</span>
                    )
                  ) : (
                    <Volume2 size={16} className="text-slate-400 group-hover:text-blue-600" />
                  )}
                </div>
              </div>

              {/* Texto de la opción */}
              <span className={`text-lg sm:text-xl font-black ${
                active ? (isCorrect ? 'text-emerald-700' : 'text-rose-700') : 'text-slate-800 dark:text-slate-100'
              }`}>
                {option}
              </span>
            </button>
          );
        })}
      </div>

      {/* Retroalimentación Visual & Auditiva Inmediata */}
      {selected && (
        <div className="mt-6 flex justify-center animate-pop">
          <div className={`inline-flex items-center gap-3 rounded-2xl px-6 py-3 text-base sm:text-lg font-black shadow-lg ${
            isCorrect
              ? 'bg-emerald-500 text-white shadow-emerald-500/30'
              : 'bg-rose-500 text-white shadow-rose-500/30'
          }`}>
            <span>{isCorrect ? '🎉 ¡Excelente! ¡Respuesta correcta!' : `💡 Inténtalo de nuevo. La respuesta es: ${slide.correct}`}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function SongSlide({ slide }) {
  const videoSrc = slide.videoUrl || (slide.videoId ? `https://www.youtube.com/embed/${slide.videoId}` : '');
  return (
    <div className="animate-fadeIn">
      <h3 className="mb-2 text-center text-xl font-black text-slate-800 sm:text-2xl lg:text-3xl">
        {slide.title}
      </h3>
      <p className="mb-4 text-center text-sm font-semibold text-slate-500 sm:mb-6 sm:text-base">{slide.description}</p>
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border-4 border-white bg-slate-900 shadow-[0_16px_40px_rgba(15,23,42,0.3)] sm:rounded-[2rem]">
        <div className="aspect-video">
          <iframe src={videoSrc} title={slide.title} className="h-full w-full" allowFullScreen />
        </div>
      </div>
    </div>
  );
}

function HomeworkSlide({ slide }) {
  return (
    <div className="animate-fadeIn">
      <div className="mx-auto max-w-2xl rounded-3xl border-[3px] border-amber-200 bg-amber-50/80 p-5 sm:p-6 dark:border-amber-900/40 dark:bg-amber-950/20">
        <div className="mb-3 flex items-center justify-center gap-2">
          <span className="rounded-xl bg-amber-500 px-3 py-1 text-xs font-black uppercase tracking-wider text-white">
            Homework • Tarea para casa 🏠
          </span>
        </div>
        {slide.image && (
          <div className="mb-4 flex justify-center">
            <HeroIllustration
              src={slide.image}
              alt={slide.title || 'Tarea para casa'}
              className="h-36 w-auto max-w-sm object-cover rounded-2xl sm:h-44 shadow-md"
            />
          </div>
        )}
        <h3 className="mb-2 text-center text-xl font-black text-slate-800 dark:text-slate-100 sm:text-2xl">
          {slide.title || 'Homework Time!'}
        </h3>
        {slide.description && (
          <p className="mb-4 text-center text-sm font-bold text-slate-600 dark:text-slate-300 sm:text-base">
            {slide.description}
          </p>
        )}
        {slide.tasks && (
          <ul className="space-y-2.5">
            {slide.tasks.map((task, idx) => (
              <li
                key={idx}
                onClick={() => speak(task)}
                className="group flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-amber-100 bg-white p-3 text-sm font-extrabold text-slate-700 shadow-sm transition hover:border-amber-300 hover:bg-amber-50/50 sm:text-base dark:border-amber-900/30 dark:bg-slate-900 dark:text-slate-200"
                role="button"
                tabIndex={0}
                aria-label={`Escuchar tarea ${idx + 1}`}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400 text-xs font-black text-white">
                  {idx + 1}
                </span>
                <span className="min-w-0 flex-1">{task}</span>
                <Volume2 size={16} className="ml-auto shrink-0 text-amber-600 opacity-40 transition group-hover:opacity-100" aria-hidden="true" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function SlideBody({ slide }) {
  if (slide.type === 'vocabulary') return <VocabularySlide slide={slide} />;
  if (slide.type === 'activity') return <ActivitySlide slide={slide} />;
  if (slide.type === 'song' || slide.type === 'video') return <SongSlide slide={slide} />;
  if (slide.type === 'homework') return <HomeworkSlide slide={slide} />;
  return <ContentSlide slide={slide} />;
}

export default function DBADeck({
  slidesKey,
  title,
  subtitle,
  dashboardHref = '/',
  gradeCode,
  weekNumber,
  onBack,
  onCompleted,
}) {
  const slides = useMemo(() => unitSlides[slidesKey] || [], [slidesKey]);

  return (
    <DeckInner
      key={slidesKey}
      slides={slides}
      title={title}
      subtitle={subtitle}
      dashboardHref={dashboardHref}
      gradeCode={gradeCode}
      weekNumber={weekNumber}
      onBack={onBack}
      onCompleted={onCompleted}
    />
  );
}

function DeckInner({
  slides,
  title,
  subtitle,
  dashboardHref,
  gradeCode,
  weekNumber,
  onBack,
  onCompleted,
}) {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const total = slides.length;
  const currentSlide = slides[current] || {};
  const displayProgress = total ? Math.round(((current + 1) / total) * 100) : 0;

  const saveProgress = async (percent, completed = false) => {
    if (!gradeCode || !weekNumber) return;
    try {
      await apiFetch('/teachers/me/progress/', {
        method: 'POST',
        body: JSON.stringify({
          grade_code: gradeCode,
          week_number: Number(weekNumber),
          completion_percent: percent,
          status: completed ? 'completed' : 'in_progress',
        }),
      });
      onCompleted?.(percent, completed);
    } catch (err) {
      console.warn('No se pudo registrar el progreso en el backend:', err);
    }
  };

  // Al abrir la clase por primera vez, registrar que se inició
  useEffect(() => {
    if (total > 0 && gradeCode && weekNumber) {
      const initialPercent = Math.max(10, Math.round((1 / total) * 100));
      saveProgress(initialPercent, false);
    }
  }, [gradeCode, weekNumber, total]);

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

  // Precarga predictiva en segundo plano de imágenes de las próximas diapositivas
  useEffect(() => {
    if (!slides || total === 0) return;
    const upcoming = [slides[current + 1], slides[current + 2]].filter(Boolean);
    upcoming.forEach((s) => {
      const hero = s.image || (s.title ? getConceptImage(s.title) : null);
      if (hero) {
        const img = new Image();
        img.src = hero;
      }
      if (Array.isArray(s.items)) {
        s.items.forEach((it) => {
          const itemImg = it.image || (it.text ? getConceptImage(it.text) : null);
          if (itemImg) {
            const img = new Image();
            img.src = itemImg;
          }
        });
      }
      if (Array.isArray(s.words)) {
        s.words.forEach((w) => {
          const wordImg = w.image || (w.word ? getConceptImage(w.word) : null);
          if (wordImg) {
            const img = new Image();
            img.src = wordImg;
          }
        });
      }
    });
  }, [current, slides, total]);

  if (!total) {
    return (
      <div className="bg-blobs flex min-h-dvh items-center justify-center bg-[#eff6ff] p-4 sm:p-6 dark:bg-[#0b1224]">
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
      className={`bg-blobs flex min-h-dvh items-center justify-center bg-gradient-to-br from-blue-50 via-amber-50/60 to-emerald-50 transition-all dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 ${
        isFullscreen ? 'p-0' : 'p-2 sm:p-4 lg:p-8'
      }`}
    >
      <div
        className={`flex w-full flex-col overflow-hidden bg-white/95 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur transition-all dark:bg-slate-900/90 ${
          isFullscreen ? 'min-h-screen max-w-none rounded-none' : 'max-w-5xl lg:max-w-6xl rounded-none border-[3px] border-white sm:rounded-[2.5rem]'
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
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white/20 px-2.5 py-2 text-xs font-extrabold transition hover:bg-white/30 sm:rounded-2xl sm:px-4 sm:py-2.5 sm:text-sm"
              >
                <Home size={15} aria-hidden="true" />
                <span className="hidden sm:inline">Panel</span>
              </button>
            ) : (
              <a
                href={dashboardHref}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white/20 px-2.5 py-2 text-xs font-extrabold transition hover:bg-white/30 sm:rounded-2xl sm:px-4 sm:py-2.5 sm:text-sm"
              >
                <Home size={15} aria-hidden="true" />
                <span className="hidden sm:inline">Panel</span>
              </a>
            )}
          </div>
        </div>

        {/* Slide Body or Celebratory Completion Screen */}
        <div className={`flex flex-1 flex-col justify-center overflow-y-auto px-4 py-5 sm:px-8 sm:py-7 lg:px-12 ${isFullscreen ? 'py-[4vh]' : 'max-h-[82vh]'}`}>
          {isCompleted ? (
            <div className="animate-pop mx-auto max-w-lg text-center py-6">
              <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-[0_10px_20px_rgba(16,185,129,0.3)]">
                <Award size={44} aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-2xl font-black text-slate-800 dark:text-slate-100 sm:text-3xl">
                ¡Clase completada! 🎉
              </h3>
              <p className="mb-6 text-sm font-semibold text-slate-500 dark:text-slate-400 sm:text-base">
                Has registrado el 100% de esta unidad en el plan institucional. El avance ya se encuentra sincronizado en tiempo real.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {onBack ? (
                  <button
                    type="button"
                    onClick={onBack}
                    className="btn-primary-clay inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white sm:text-base"
                  >
                    <Home size={18} aria-hidden="true" /> Volver al panel docente
                  </button>
                ) : (
                  <a
                    href={dashboardHref}
                    className="btn-primary-clay inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white sm:text-base"
                  >
                    <Home size={18} aria-hidden="true" /> Volver al panel
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsCompleted(false);
                    setCurrent(0);
                  }}
                  className="btn-clay inline-flex items-center gap-2 border-[3px] border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <RotateCcw size={16} aria-hidden="true" /> Repasar diapositivas
                </button>
              </div>
            </div>
          ) : (
            <>
              {currentSlide.emoji ? (
                <div className={`mb-3 flex justify-center ${isFullscreen ? 'pb-[1vh]' : ''}`} aria-hidden="true">
                  <EmojiArt emoji={currentSlide.emoji} size={isFullscreen ? 'heroFull' : 'hero'} />
                </div>
              ) : (
                <div
                  className={`mb-4 text-center ${isFullscreen ? 'text-[6vh] leading-none' : 'text-5xl sm:text-6xl'}`}
                  aria-hidden="true"
                >
                  ✨
                </div>
              )}
              <SlideBody key={current} slide={currentSlide} />
            </>
          )}
        </div>

        {/* Controls */}
        {!isCompleted && (
          <div className="flex items-center justify-between gap-2 border-t-[3px] border-blue-100 bg-blue-50/70 px-3 py-3.5 sm:gap-4 sm:px-6 sm:py-5 dark:border-slate-800 dark:bg-slate-950/60">
            <button
              type="button"
              onClick={() => setCurrent(Math.max(0, current - 1))}
              disabled={current === 0}
              className="btn-clay inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 to-sky-500 px-3 py-3 text-xs text-white disabled:opacity-40 sm:gap-2 sm:px-5 sm:text-base"
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

            {current === total - 1 ? (
              <button
                type="button"
                onClick={async () => {
                  setIsSaving(true);
                  await saveProgress(100, true);
                  setIsCompleted(true);
                  setIsSaving(false);
                }}
                disabled={isSaving}
                className="btn-clay inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 px-3.5 py-2.5 text-xs font-black text-white shadow-[0_4px_0_rgba(5,150,105,0.4)] ring-4 ring-emerald-200 transition-all hover:scale-105 active:scale-95 sm:gap-2 sm:px-6 sm:py-3 sm:text-base dark:ring-emerald-950"
              >
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>{isSaving ? 'Guardando…' : '¡Completar clase!'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  const next = Math.min(total - 1, current + 1);
                  setCurrent(next);
                  const nextPct = Math.round(((next + 1) / total) * 100);
                  saveProgress(nextPct, next === total - 1);
                }}
                className="btn-clay inline-flex items-center gap-1 bg-gradient-to-r from-sky-500 to-emerald-500 px-3 py-3 text-xs text-white disabled:opacity-40 sm:gap-2 sm:px-5 sm:text-base"
              >
                <span className="hidden sm:inline">Siguiente</span>
                <ChevronRight size={17} aria-hidden="true" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
