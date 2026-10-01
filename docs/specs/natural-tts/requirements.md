# Requirements: Natural Google TTS Integration

## Purpose
Replace the robotic, unpleasant, and low-quality system speech synthesis (especially on Linux where `espeak` is triggered with an exaggerated pitch) with natural, clear Google Text-to-Speech audio in English (`en-US`).

## Scope
1. Backend TTS streaming endpoint (`/api/tts/`) providing MP3 audio from Google TTS with server-side caching.
2. Frontend speech utility update ([`friendlySpeech.js`](file:///home/balckyshadown/Escritorio/English%20Platform/frontend/src/shared/utils/friendlySpeech.js)) to play the natural Google TTS stream via HTML5 Audio with instant cancellation of previous utterances.
3. Offline / network error fallback to browser `speechSynthesis` with normalized pitch (1.0) to prevent metallic screeching.
4. Support across all listening activities ([`MaterialPages.jsx`](file:///home/balckyshadown/Escritorio/English%20Platform/frontend/src/components/MaterialPages.jsx)) and classroom slides ([`DBADeck.jsx`](file:///home/balckyshadown/Escritorio/English%20Platform/frontend/src/components/DBADeck.jsx)).

## Acceptance Criteria
- [x] **AC-1 (Backend API Contract):** WHEN `GET /api/tts/?text=<text>&lang=en` is requested with a valid text string (1-300 chars), the system SHALL respond with HTTP 200, `Content-Type: audio/mpeg`, and the audio binary stream.
- [x] **AC-2 (Backend Validation):** WHEN `GET /api/tts/` is requested without `text` or with empty text, the system SHALL respond with HTTP 400 Bad Request.
- [x] **AC-3 (Backend Caching):** WHEN the same text is requested more than once, the system SHALL serve the cached audio without re-fetching from external Google servers.
- [x] **AC-4 (Frontend Playback):** WHEN a teacher clicks any pronunciation or listening button, the system SHALL play the warm, natural Google voice.
- [x] **AC-5 (Single-Stream Playback):** WHEN a teacher clicks a new audio button while audio is playing, the system SHALL immediately stop the previous audio before playing the new one.
- [x] **AC-6 (Resilient Fallback):** IF the network request fails or the user is offline, the system SHALL smoothly fallback to local `speechSynthesis` with pitch 1.0 without throwing unhandled exceptions.
