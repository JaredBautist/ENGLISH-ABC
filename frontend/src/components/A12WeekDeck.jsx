import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle, Mic2, PenTool, Square } from 'lucide-react';
import { apiFetch } from '../utils/api';

const defaultTheme = {
  from: 'from-fuchsia-500',
  via: 'via-sky-500',
  to: 'to-emerald-500',
};

function normalize(value) {
  return (value || '').toString().trim().toLowerCase();
}

const weekDeckStyles = `
  .weekdeck-page {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(120deg, #ff9ecb 0%, #ffe59a 25%, #9ae5ff 50%, #b7f8cf 75%, #c7b4ff 100%);
    background-size: 300% 300%;
    animation: skyDance 14s ease infinite;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    position: relative;
    overflow-x: hidden;
  }

  .weekdeck-global-actions {
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 20;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .weekdeck-home-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 44px;
    padding: 10px 16px;
    border-radius: 999px;
    color: #ffffff;
    background: linear-gradient(135deg, #4f46e5, #06b6d4);
    font-weight: 800;
    font-size: 0.95rem;
    text-decoration: none;
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.24);
    transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  }

  .weekdeck-home-btn:hover {
    color: #ffffff;
    opacity: 0.96;
    transform: translateY(-1px);
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.3);
  }

  .weekdeck-home-btn[aria-busy="true"] {
    opacity: 0.7;
    pointer-events: none;
  }

  .weekdeck-page::before,
  .weekdeck-page::after {
    content: '';
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    opacity: 0.35;
    z-index: 0;
  }

  .weekdeck-page::before {
    width: 260px;
    height: 260px;
    background: radial-gradient(circle at 30% 30%, #fff59d 0%, #ffb6c1 70%);
    top: -70px;
    left: -70px;
    animation: floatBlob 8s ease-in-out infinite;
  }

  .weekdeck-page::after {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle at 40% 40%, #b3e5fc 0%, #d1c4e9 75%);
    right: -90px;
    bottom: -90px;
    animation: floatBlob 10s ease-in-out infinite reverse;
  }

  .weekdeck-presentation {
    max-width: 930px;
    width: 100%;
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    overflow: hidden;
    border: 6px solid rgba(255,255,255,0.9);
    position: relative;
    z-index: 1;
  }

  .weekdeck-presentation::before {
    content: '';
    display: block;
    height: 10px;
    background: linear-gradient(90deg, #ff7eb3, #ffd166, #06d6a0, #4cc9f0, #a78bfa);
    background-size: 250% 100%;
    animation: shimmerBar 6s linear infinite;
  }

  .weekdeck-banner {
    background: linear-gradient(135deg, #fff7d6 0%, #ffe4f6 50%, #dff7ff 100%);
    border-bottom: 3px dashed #ffb74d;
    padding: 14px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .weekdeck-banner-title {
    font-size: 1.25em;
    font-weight: 800;
    color: #ff6f61;
    text-shadow: 1px 1px 0 #fff;
  }

  .weekdeck-reward-pill {
    background: linear-gradient(135deg, #ffe082 0%, #ffcc80 100%);
    border: 2px solid #ff9800;
    border-radius: 999px;
    padding: 8px 16px;
    font-weight: 700;
    color: #7a4500;
  }

  .weekdeck-slide {
    padding: 52px 44px;
    min-height: 610px;
    background:
      radial-gradient(circle at 12% 18%, rgba(255, 235, 59, 0.12), transparent 18%),
      radial-gradient(circle at 87% 78%, rgba(124, 77, 255, 0.1), transparent 20%),
      radial-gradient(circle at 88% 20%, rgba(33, 150, 243, 0.1), transparent 16%),
      linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(252,252,255,0.95) 100%);
    animation: fadeIn 0.45s ease;
  }

  .weekdeck-emoji {
    font-size: 5em;
    text-align: center;
    margin: 10px 0 18px;
    animation: pulseEmoji 1.8s ease-in-out infinite;
  }

  .weekdeck-title {
    font-size: 2.7em;
    color: #ff6f61;
    margin-bottom: 12px;
    text-align: center;
    text-shadow: 2px 2px 0 #fff2a8;
    font-weight: 800;
  }

  .weekdeck-subtitle {
    font-size: 1.5em;
    color: #5b6cf0;
    margin-bottom: 24px;
    text-align: center;
    text-shadow: 1px 1px 0 #ffffff;
    font-weight: 700;
  }

  .weekdeck-topic-title {
    font-size: 1.72em;
    color: #334155;
    margin: 0 0 16px;
    text-align: center;
    font-weight: 800;
  }

  .weekdeck-content {
    font-size: 1.18em;
    line-height: 1.8;
    color: #333;
    margin-bottom: 10px;
  }

  .weekdeck-paragraph {
    font-size: 1.08em;
    line-height: 1.75;
    color: #374151;
    background: rgba(255, 255, 255, 0.78);
    border-left: 4px solid #7d77ff;
    border-radius: 10px;
    padding: 10px 12px;
    margin: 8px 0;
  }

  .weekdeck-list {
    list-style: none;
    padding: 0;
    margin-top: 14px;
  }

  .weekdeck-list li {
    padding: 10px 0 10px 34px;
    position: relative;
    font-size: 1.08em;
  }

  .weekdeck-list li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #667eea;
    font-weight: bold;
    font-size: 1.3em;
  }

  .weekdeck-example-box {
    background: linear-gradient(135deg, #fff3cd 0%, #ffe0b2 100%);
    padding: 22px;
    border-radius: 14px;
    margin: 18px 0;
    border-left: 5px solid #ff9800;
    box-shadow: 0 6px 14px rgba(255,152,0,0.2);
    font-size: 1.02em;
    font-weight: 700;
  }

  .weekdeck-option {
    width: 100%;
    text-align: left;
    background: #fff;
    border: 2px solid #cfe3ff;
    color: #1f2937;
    padding: 12px 14px;
    border-radius: 12px;
    margin-bottom: 10px;
    font-size: 1.03em;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .weekdeck-option:hover { border-color: #7d77ff; }
  .weekdeck-option.correct { border-color: #4caf50; background: #ecfdf3; color: #166534; }
  .weekdeck-option.incorrect { border-color: #ef4444; background: #fef2f2; color: #991b1b; }

  .weekdeck-input {
    width: 100%;
    border: 2px solid #cfe3ff;
    border-radius: 12px;
    padding: 12px 14px;
    font-size: 1.02em;
    outline: none;
  }

  .weekdeck-input:focus { border-color: #7d77ff; }

  .weekdeck-feedback-good { color: #16a34a; font-weight: 800; }
  .weekdeck-feedback-bad { color: #dc2626; font-weight: 800; }

  .weekdeck-controls {
    background: linear-gradient(180deg, #f6fbff 0%, #ecf7ff 100%);
    padding: 18px 20px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  .weekdeck-btn {
    background: linear-gradient(135deg, #ff7eb3 0%, #7d77ff 100%);
    color: white;
    border: none;
    padding: 15px 30px;
    font-size: 1.02em;
    border-radius: 50px;
    cursor: pointer;
    font-weight: 800;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 5px 15px rgba(102,126,234,0.3);
  }

  .weekdeck-btn:hover { transform: translateY(-2px) scale(1.02); }
  .weekdeck-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .weekdeck-counter {
    font-size: 1.12em;
    color: #5b6cf0;
    font-weight: 800;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    min-width: 220px;
  }

  .weekdeck-progress-track {
    width: 220px;
    height: 12px;
    background: #dce4ff;
    border-radius: 999px;
    overflow: hidden;
    border: 2px solid #ffffff;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
  }

  .weekdeck-progress-fill {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, #ff9800 0%, #ffd54f 35%, #4caf50 100%);
    transition: width 0.35s ease;
  }

  .weekdeck-stars { color: #ff9800; font-size: 1.02em; }

  @keyframes skyDance {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes floatBlob {
    0% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(16px) scale(1.04); }
    100% { transform: translateY(0px) scale(1); }
  }
  @keyframes shimmerBar {
    0% { background-position: 0% 0; }
    100% { background-position: 250% 0; }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulseEmoji {
    0% { transform: scale(1); }
    50% { transform: scale(1.07); }
    100% { transform: scale(1); }
  }

  @media (max-width: 768px) {
    .weekdeck-slide { padding: 38px 26px; min-height: 520px; }
    .weekdeck-title { font-size: 2.05em; }
    .weekdeck-subtitle { font-size: 1.2em; }
    .weekdeck-controls { flex-direction: column; }
    .weekdeck-progress-track { width: 190px; }
    .weekdeck-banner { justify-content: center; text-align: center; }
    .weekdeck-global-actions {
      top: 10px;
      right: 10px;
      left: 10px;
      justify-content: flex-end;
    }
    .weekdeck-home-btn {
      font-size: 0.84rem;
      padding: 8px 12px;
      min-height: 40px;
    }
  }
`;

function ChoiceExercise({ slide, slideId, answers, setAnswers }) {
  const selected = answers[slideId];
  const isCorrect = selected === slide.correct;

  return (
    <div className="animate-fadeIn">
      <p className="weekdeck-content font-black mb-6 text-slate-700">{slide.question}</p>
      <div className="grid gap-3">
        {slide.options.map((opt) => {
          const active = selected === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => setAnswers((prev) => ({ ...prev, [slideId]: opt }))}
              className={`weekdeck-option transition-all duration-300 ${
                active
                  ? isCorrect
                    ? 'correct shadow-lg shadow-emerald-500/10 scale-[1.02]'
                    : 'incorrect shadow-lg shadow-rose-500/10 scale-[1.02]'
                  : 'hover:border-indigo-300 hover:bg-indigo-50/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  active ? (isCorrect ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-rose-500 bg-rose-500 text-white') : 'border-slate-300'
                }`}>
                  {active && (isCorrect ? '✓' : '✕')}
                </div>
                <span className="font-bold">{opt}</span>
              </div>
            </button>
          );
        })}
      </div>
      {selected && (
        <div className={`mt-6 p-4 rounded-2xl border flex items-center gap-3 animate-slideIn ${
          isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'
        }`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
            {isCorrect ? '✓' : '!'}
          </div>
          <p className="font-bold">
            {isCorrect ? 'Excelente, respuesta correcta.' : `Casi. Respuesta esperada: ${slide.correct}`}
          </p>
        </div>
      )}
    </div>
  );
}

function FillExercise({ slide, slideId, answers, setAnswers }) {
  const value = answers[slideId] || '';
  const isCorrect = normalize(value) === normalize(slide.answer);

  return (
    <div className="animate-fadeIn">
      <p className="weekdeck-content font-black mb-6 text-slate-700">{slide.prompt}</p>
      <div className="relative group">
        <input
          value={value}
          onChange={(e) => setAnswers((prev) => ({ ...prev, [slideId]: e.target.value }))}
          placeholder={slide.placeholder || 'Escribe tu respuesta...'}
          className="weekdeck-input h-16 text-xl font-bold px-6 focus:ring-4 focus:ring-indigo-500/10 transition-all"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
          <PenTool size={24} className="text-indigo-500" />
        </div>
      </div>
      {value && (
        <div className={`mt-6 p-4 rounded-2xl border flex items-center gap-3 animate-slideIn ${
          isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-indigo-50 border-indigo-200 text-indigo-700'
        }`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-indigo-500 text-white'}`}>
            {isCorrect ? '✓' : 'i'}
          </div>
          <p className="font-bold">
            {isCorrect ? 'Muy bien.' : `Sugerencia: ${slide.answer}`}
          </p>
        </div>
      )}
    </div>
  );
}

function VideoSlide({ slide }) {
  return (
    <div className="animate-fadeIn">
      <h3 className="weekdeck-topic-title mb-6">Listening: {slide.title}</h3>
      <div className="bg-slate-900 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl mb-6">
        <div className="aspect-video">
          <iframe 
            src={slide.videoUrl} 
            title={slide.title}
            className="w-full h-full"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <p className="weekdeck-content text-center italic text-slate-500 bg-slate-50 p-4 rounded-2xl">
        {slide.description || "Watch the video and pay attention to the pronunciation."}
      </p>
    </div>
  );
}

function WritingSlide({ slide, slideId, answers, setAnswers }) {
  const value = answers[slideId] || '';
  const wordCount = value.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="animate-fadeIn">
      <h3 className="weekdeck-topic-title mb-4">Writing Task</h3>
      <div className="bg-indigo-50 border-2 border-indigo-100 p-6 rounded-2xl mb-6">
        <p className="font-bold text-indigo-900 mb-2">{slide.title}</p>
        <p className="text-indigo-700 leading-relaxed">{slide.description}</p>
      </div>
      <div className="relative">
        <textarea 
          value={value}
          onChange={(e) => setAnswers((prev) => ({ ...prev, [slideId]: e.target.value }))}
          placeholder="Type your response here..."
          className="w-full h-48 bg-white border-2 border-slate-200 rounded-[2rem] p-6 text-lg font-medium focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all resize-none"
        ></textarea>
        <div className="absolute bottom-4 right-6 text-xs font-black uppercase tracking-widest text-slate-400 bg-white/80 px-2 py-1 rounded-full">
          {wordCount} words
        </div>
      </div>
    </div>
  );
}

function SpeakingSlide({ slide }) {
  const [isRecording, setIsRecording] = useState(false);
  const [completed, setCompleted] = useState(false);

  return (
    <div className="animate-fadeIn text-center">
      <h3 className="weekdeck-topic-title mb-6">Speaking: {slide.title}</h3>
      <div className="bg-slate-50 border-2 border-slate-100 p-8 rounded-[3rem] mb-8">
        <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-indigo-500/20">
          <Mic2 size={40} />
        </div>
        <p className="text-xl font-bold text-slate-700 mb-4">{slide.description}</p>
        <p className="text-3xl font-black text-indigo-600 mb-8 italic">"{slide.phrase}"</p>
        
        <button 
          onClick={() => {
            if (isRecording) {
              setIsRecording(false);
              setCompleted(true);
            } else {
              setIsRecording(true);
            }
          }}
          className={`px-10 py-4 rounded-2xl font-black text-white transition-all flex items-center gap-3 mx-auto shadow-lg ${
            isRecording 
              ? 'bg-rose-500 animate-pulse hover:bg-rose-600' 
              : 'bg-indigo-500 hover:bg-indigo-600 hover:scale-105 active:scale-95'
          }`}
        >
          {isRecording ? <><Square size={20} fill="currentColor" /> Stop Recording</> : <><Mic2 size={20} /> Start Recording</>}
        </button>

        {completed && !isRecording && (
          <div className="mt-6 text-emerald-600 font-bold flex items-center justify-center gap-2 animate-bounce">
            <CheckCircle size={20} /> Recording captured!
          </div>
        )}
      </div>
    </div>
  );
}

function SlideContent({ slide, slideId, answers, setAnswers }) {
  if (slide.type === 'exercise-choice') {
    return <ChoiceExercise slide={slide} slideId={slideId} answers={answers} setAnswers={setAnswers} />;
  }

  if (slide.type === 'exercise-fill') {
    return <FillExercise slide={slide} slideId={slideId} answers={answers} setAnswers={setAnswers} />;
  }

  if (slide.type === 'video') {
    return <VideoSlide slide={slide} />;
  }

  if (slide.type === 'writing') {
    return <WritingSlide slide={slide} slideId={slideId} answers={answers} setAnswers={setAnswers} />;
  }

  if (slide.type === 'speaking') {
    return <SpeakingSlide slide={slide} />;
  }

  return (
    <div>
      {slide.title && <h3 className="weekdeck-topic-title">{slide.title}</h3>}

      {slide.description && <p className="weekdeck-content">{slide.description}</p>}

      {slide.paragraphs && slide.paragraphs.map((paragraph) => (
        <p key={paragraph} className="weekdeck-paragraph">{paragraph}</p>
      ))}

      {slide.items && (
        <ul className="weekdeck-list">
          {slide.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      {slide.examples && (
        <div style={{ marginTop: '14px' }}>
          {slide.examples.map((example) => (
            <div key={example} className="weekdeck-example-box">
              {example}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

class SlideErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Unknown slide error' };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.slideKey !== this.props.slideKey && this.state.hasError) {
      this.setState({ hasError: false, message: '' });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-6 text-rose-700">
          <p className="font-black mb-2">Error loading this slide</p>
          <p className="text-sm">{this.state.message}</p>
          <p className="text-xs mt-3">Use Next/Previous to continue.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function A12WeekDeck({ weekNumber, title, subtitle, theme = defaultTheme, slides = [], levelCode = 'a1-2', dashboardHref = '/a1-2' }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLeaving, setIsLeaving] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [weekCompleted, setWeekCompleted] = useState(false);
  const lastSavedRef = useRef(-1);
  const isSavingRef = useRef(false);

  const total = slides.length;
  const currentSlide = slides[current];

  const displayProgress = useMemo(() => {
    if (!total) return 0;
    return Math.round(((current + 1) / total) * 100);
  }, [current, total]);

  const progress = useMemo(() => {
    if (!total) return 0;
    // Progreso parcial (0..79) basado principalmente en navegación real de slides
    // y con un bono menor por actividades respondidas.
    const navigationProgress = ((current + 1) / total) * 79;
    const activitySlides = slides.filter((s) =>
      s.type === 'exercise-choice' || s.type === 'exercise-fill' || s.type === 'writing'
    );
    const completedActivities = activitySlides.filter((_, idx) => {
      const answerKey = `${weekNumber}-${slides.indexOf(activitySlides[idx])}`;
      const value = answers[answerKey];
      return typeof value === 'string' ? value.trim().length > 0 : value != null;
    }).length;
    const activityRatio = activitySlides.length > 0 ? completedActivities / activitySlides.length : 0;
    const bonus = activityRatio * 10; // small bonus, does not dominate progression

    return Math.min(Math.round(navigationProgress + bonus), 79);
  }, [current, total, answers, slides]);

  if (!total) {
    return (
      <div className="weekdeck-page">
        <style>{weekDeckStyles}</style>
        <div className="weekdeck-presentation" style={{ padding: '28px', color: '#dc2626', fontWeight: 800 }}>
          No hay diapositivas cargadas para esta semana.
        </div>
      </div>
    );
  }

  const saveProgress = async (completionPercent, { force = false } = {}) => {
    if (isSavingRef.current) return;
    const rounded = Math.max(0, Math.min(100, Math.round(completionPercent * 100) / 100));
    if (!force && rounded <= lastSavedRef.current) return;
    
    console.log(`[Progress] Saving: Week ${weekNumber} - ${rounded}%`);
    
    isSavingRef.current = true;
    try {
      const response = await apiFetch('/students/me/progress/', {
        method: 'POST',
        body: JSON.stringify({
          level_code: levelCode,
          week_number: weekNumber,
          completion_percent: rounded,
        }),
      });
      
      console.log(`[Progress] Saved successfully:`, response);
      lastSavedRef.current = rounded;
      try {
        localStorage.setItem('student-progress-last-update', String(Date.now()));
      } catch {}
      
      // Show toast notification
      if (typeof window.showToast === 'function') {
        if (rounded >= 100) {
          window.showToast(`🎉 Week ${weekNumber} completed! 100%`, 'success', 4000);
        } else if (rounded >= 80 && lastSavedRef.current < 80) {
          window.showToast(`🔓 Week ${weekNumber + 1} unlocked! Keep going!`, 'info', 4000);
        } else if (rounded % 25 === 0 && rounded > 0) {
          window.showToast(`📊 Progress saved: ${rounded}%`, 'success', 2000);
        }
      }
    } catch (error) {
      console.error('Error saving week progress:', error);
      if (typeof window.showToast === 'function') {
        window.showToast('Failed to save progress. Please try again.', 'error', 3000);
      }
    } finally {
      isSavingRef.current = false;
    }
  };

  useEffect(() => {
    if (weekCompleted) return undefined;
    const completionPercent = progress;
    console.log(`[Progress] Week ${weekNumber} - Slide ${current + 1}/${total} - ${Math.round(completionPercent)}%`);
    
    const timeoutId = window.setTimeout(() => {
      saveProgress(completionPercent);
    }, 400);
    return () => window.clearTimeout(timeoutId);
  }, [current, total, weekCompleted, progress]);

  const handleCompleteWeek = async () => {
    if (weekCompleted || isCompleting) return;
    setIsCompleting(true);
    try {
      await saveProgress(100, { force: true });
      setWeekCompleted(true);
    } finally {
      setIsCompleting(false);
    }
  };

  const handleBackToDashboard = async (event) => {
    event.preventDefault();
    if (isLeaving) return;
    setIsLeaving(true);
    try {
      const partialPercent = Math.min(((current + 1) / total) * 100, 79);
      await saveProgress(weekCompleted ? 100 : partialPercent, { force: weekCompleted });
    } finally {
      window.location.href = dashboardHref;
    }
  };

  return (
    <div className={`weekdeck-page ${theme.from} ${theme.via} ${theme.to}`}>
      <style>{weekDeckStyles}</style>
      <div className="weekdeck-global-actions">
        <a href={dashboardHref} className="weekdeck-home-btn" onClick={handleBackToDashboard} aria-busy={isLeaving ? 'true' : 'false'}>
          🏠 Volver al dashboard
        </a>
      </div>
      <div className="weekdeck-presentation">
        <div className="weekdeck-banner">
          <div className="weekdeck-banner-title">🌈 English Kids Adventure • Week {weekNumber}</div>
          <div className="weekdeck-reward-pill">🏅 Junta estrellas mientras avanzas</div>
        </div>

        <div className="weekdeck-slide">
          <div className="weekdeck-emoji">{currentSlide.emoji || '✨'}</div>
          <h1 className="weekdeck-title">{title}</h1>
          <h2 className="weekdeck-subtitle">{subtitle}</h2>

          <SlideErrorBoundary slideKey={`${weekNumber}-${current}`}>
            <SlideContent slide={currentSlide} slideId={`${weekNumber}-${current}`} answers={answers} setAnswers={setAnswers} />
          </SlideErrorBoundary>
        </div>

        <div className="weekdeck-controls">
          <button
            type="button"
            onClick={async () => {
              const nextIndex = Math.max(0, current - 1);
              const nextProgress = Math.min(((nextIndex + 1) / total) * 79, 79);
              await saveProgress(nextProgress);
              setCurrent(nextIndex);
            }}
            disabled={current === 0}
            className="weekdeck-btn"
          >
            ⬅ Anterior
          </button>

          <span className="weekdeck-counter">
            <span>{current + 1} / {total}</span>
            <span className="weekdeck-progress-track">
          <span className="weekdeck-progress-fill" style={{ width: `${displayProgress}%`, display: 'block' }} />
            </span>
            <span className="weekdeck-stars">⭐ {displayProgress}% completado</span>
          </span>

          <button
            type="button"
            onClick={async () => {
              const nextIndex = Math.min(total - 1, current + 1);
              const nextProgress = Math.min(((nextIndex + 1) / total) * 79, 79);
              await saveProgress(nextProgress);
              setCurrent(nextIndex);
            }}
            disabled={current === total - 1}
            className="weekdeck-btn"
          >
            Siguiente ➡
          </button>

          {current === total - 1 && (
            <button
              type="button"
              onClick={handleCompleteWeek}
              disabled={weekCompleted || isCompleting}
              className="weekdeck-btn"
              style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)' }}
            >
              {weekCompleted ? '✅ Semana completada' : isCompleting ? '⏳ Guardando...' : '✅ Completar semana'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
