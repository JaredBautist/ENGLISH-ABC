# Design: Natural Google TTS Integration

## 1. Architecture & Data Flow

```
[ Teacher / Classroom Browser ]
              │
              ▼ (1) Click "Listen" or "Pronounce"
      friendlySpeech.js
              │
              ├──► (2) HTML5 Audio GET /api/tts/?text=...&lang=en
              │          │
              │          ▼
              │     [ Django API: TTSView ]
              │          │
              │          ├──► Check local disk/memory cache
              │          │     ├─ Cache Hit  ──► Return cached MP3
              │          │     └─ Cache Miss ──► Stream from Google TTS
              │          │                         (client=tw-ob, tl=en)
              │          │                         Save to cache
              │          ▼
              │     HTTP 200 (audio/mpeg)
              │
              └──► (3) IF Fetch/Audio Error ──► Fallback: window.speechSynthesis (pitch: 1.0)
```

## 2. Component Boundaries

### Backend: `apps.learning.views.TTSView`
- **Location:** [`backend/apps/learning/views.py`](file:///home/balckyshadown/Escritorio/English%20Platform/backend/apps/learning/views.py)
- **URL Route:** `path('tts/', TTSView.as_view(), name='tts-audio')` in [`backend/apps/learning/urls.py`](file:///home/balckyshadown/Escritorio/English%20Platform/backend/apps/learning/urls.py)
- **Permission:** `AllowAny` (allows `<audio src="...">` and `new Audio(url)` without custom auth headers).
- **Throttling & Validation:**
  - `text`: 1 to 300 characters.
  - `lang`: `en` or `es` (default `en`).
- **Cache Strategy:**
  - Cache directory: `BASE_DIR / '.tts_cache'` or Django cache.
  - Key: `md5(f"{lang}:{text.lower()}")`.
  - Content-Type: `audio/mpeg`.
  - Cache-Control: `public, max-age=604800, immutable`.

### Frontend: `shared/utils/friendlySpeech.js`
- **Location:** [`frontend/src/shared/utils/friendlySpeech.js`](file:///home/balckyshadown/Escritorio/English%20Platform/frontend/src/shared/utils/friendlySpeech.js)
- **Functions:**
  - `speakFriendly(text, { rate, onStart, onEnd, onError })`:
    - Aborts previous active audio (`currentAudio.pause()`, `currentAudio.currentTime = 0`).
    - Strips bracketed annotations (e.g. `cow (vaca)` -> `cow`).
    - Constructs URL `/api/tts/?text=${encodeURIComponent(cleanText)}&lang=en`.
    - Instantiates `new Audio(url)` and sets `playbackRate = rate || 0.9`.
    - Handles error fallback gracefully with `window.speechSynthesis`.
  - `stopFriendlySpeech()`:
    - Pauses `currentAudio` and calls `window.speechSynthesis.cancel()`.
