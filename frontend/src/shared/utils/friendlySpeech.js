/**
 * Motor de voz natural y amigable para niños.
 *
 * Utiliza el endpoint /api/tts/ (Google Neural TTS) para entregar audio MP3
 * de alta definición, claro y con pronunciación nativa cálida en inglés.
 * Incluye fallback seguro a Web Speech API en caso de estar offline o sin red.
 */

let activeAudio = null;
let cachedVoice = null;

const PREFERRED_VOICES = [
  'google us english',
  'microsoft aria',
  'microsoft zira',
  'microsoft michelle',
  'samantha',
  'karen',
  'moira',
  'tessa',
];

function pickLocalVoice() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  for (const needle of PREFERRED_VOICES) {
    const match = voices.find(
      (v) => v.lang?.toLowerCase().startsWith('en') && v.name.toLowerCase().includes(needle)
    );
    if (match) return match;
  }

  const female = voices.find(
    (v) =>
      v.lang?.toLowerCase().startsWith('en') &&
      ['female', 'mujer', 'aria', 'zira', 'jenny', 'sonia'].some((h) =>
        v.name.toLowerCase().includes(h)
      )
  );
  if (female) return female;

  return voices.find((v) => v.lang?.toLowerCase().startsWith('en')) || voices[0];
}

function getLocalVoice() {
  if (cachedVoice) return cachedVoice;
  cachedVoice = pickLocalVoice();
  return cachedVoice;
}

/**
 * Detiene cualquier audio o síntesis de voz en reproducción.
 */
export function stopFriendlySpeech() {
  if (activeAudio) {
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    } catch {
      // ignore
    }
    activeAudio = null;
  }
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
}

/**
 * Fallback a Web Speech API si el endpoint no responde o el navegador está offline.
 */
function fallbackWebSpeech(text, { rate = 0.9, pitch = 1.0, onEnd, onError } = {}) {
  try {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      onError?.(new Error('Speech synthesis not supported'));
      return;
    }
    const synth = window.speechSynthesis;

    const run = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      const voice = getLocalVoice();
      if (voice) utterance.voice = voice;
      utterance.lang = voice?.lang || 'en-US';
      utterance.rate = rate;
      utterance.pitch = pitch; // 1.0 normal para evitar voces chillonas en espeak
      utterance.onend = () => onEnd?.();
      utterance.onerror = (e) => onError?.(e);

      synth.cancel();
      synth.speak(utterance);
    };

    if (synth.getVoices().length === 0) {
      synth.addEventListener('voiceschanged', run, { once: true });
      run();
    } else {
      run();
    }
  } catch (err) {
    onError?.(err);
  }
}

/**
 * Habla con la voz natural de Google.
 *
 * @param {string} text - Texto en inglés a pronunciar.
 * @param {{
 *   lang?: string,
 *   rate?: number,
 *   onStart?: () => void,
 *   onEnd?: () => void,
 *   onError?: (error: any) => void
 * }} [options]
 */
export function speakFriendly(
  text,
  { lang = 'en', rate = 0.9, onStart, onEnd, onError } = {}
) {
  if (!text) return;

  // Detener cualquier audio previo para evitar superposiciones
  stopFriendlySpeech();

  // Limpiar texto: remover anotaciones entre paréntesis tipo "(vaca)"
  const cleanText = text.replace(/\([^)]*\)/g, '').trim();
  if (!cleanText) return;

  try {
    const endpoint = `/api/tts/?text=${encodeURIComponent(cleanText)}&lang=${encodeURIComponent(lang)}`;
    const audio = new Audio(endpoint);
    activeAudio = audio;

    audio.playbackRate = rate;

    audio.onplay = () => {
      onStart?.();
    };

    audio.onended = () => {
      if (activeAudio === audio) activeAudio = null;
      onEnd?.();
    };

    audio.onerror = () => {
      if (activeAudio === audio) activeAudio = null;
      // Fallback transparente a Web Speech API con pitch normalizado
      fallbackWebSpeech(cleanText, { rate, pitch: 1.0, onEnd, onError });
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // En caso de bloqueo de autoplay o error de red, intentar fallback
        if (activeAudio === audio) activeAudio = null;
        fallbackWebSpeech(cleanText, { rate, pitch: 1.0, onEnd, onError });
      });
    }
  } catch {
    fallbackWebSpeech(cleanText, { rate, pitch: 1.0, onEnd, onError });
  }
}

/**
 * Emite un agradable arpegio musical de celebración y la voz entusiasta
 * "Nice job!" para premiar a los niños cuando completan un ejercicio.
 */
export function playRewardSound(customPraise = 'Nice job!') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';

      // Acorde alegre de campanilla: C5 (523Hz) -> E5 (659Hz) -> G5 (784Hz) -> C6 (1046Hz)
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      osc.frequency.setValueAtTime(783.99, now + 0.16);
      osc.frequency.setValueAtTime(1046.50, now + 0.24);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    }
  } catch {
    // Silently continue if Web Audio API is disabled
  }

  // Pronunciación de felicitación en inglés con Google Neural TTS
  setTimeout(() => {
    speakFriendly(customPraise, { rate: 1.05 });
  }, 160);
}

