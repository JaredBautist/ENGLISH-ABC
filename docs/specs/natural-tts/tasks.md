# Implementation Tasks: Natural Google TTS Integration

- [x] **Task 1: Backend TTS Endpoint**
  - Implement `TTSView` in [`backend/apps/learning/views.py`](file:///home/balckyshadown/Escritorio/English%20Platform/backend/apps/learning/views.py).
  - Add disk/memory caching with MD5 hashing (`.tts_cache/`).
  - Register `/api/tts/` in [`backend/apps/learning/urls.py`](file:///home/balckyshadown/Escritorio/English%20Platform/backend/apps/learning/urls.py).
  - Add backend tests in [`backend/apps/learning/tests/test_api.py`](file:///home/balckyshadown/Escritorio/English%20Platform/backend/apps/learning/tests/test_api.py).
  - *Evidence:* Ran 18 tests in 9.598s (OK). Live `curl` returned HTTP 200 `audio/mpeg` (12480 bytes).

- [x] **Task 2: Frontend Speech Engine Upgrade**
  - Refactored [`frontend/src/shared/utils/friendlySpeech.js`](file:///home/balckyshadown/Escritorio/English%20Platform/frontend/src/shared/utils/friendlySpeech.js) to consume `/api/tts/` via `new Audio()`.
  - Implemented single active audio management with instant stop (`stopFriendlySpeech()`).
  - Added visual interaction feedback (`isPlaying`) to listening activities in [`frontend/src/components/MaterialPages.jsx`](file:///home/balckyshadown/Escritorio/English%20Platform/frontend/src/components/MaterialPages.jsx).
  - Added resilient fallback to `speechSynthesis` with `pitch: 1.0` if offline.
  - *Evidence:* Frontend build succeeded in 1.44s; Vitest suite 3/3 tests passed.

- [x] **Task 3: Verification & Integration Testing**
  - Backend tests: `Ran 18 tests in 9.598s - OK`.
  - Frontend tests: `3 passed (3)`.
  - Vite proxy endpoint verified: HTTP 200 `audio/mpeg`.
