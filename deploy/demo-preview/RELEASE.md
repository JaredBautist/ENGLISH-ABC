# Demo preview release — 2026-10-07

- URL: http://162.35.28.193/login
- Review: Jardín, unit 1, Hello! (10 slides).
- Release: `/root/english-demo-preview/release-qncjfGmE`.
- Container: `english-demo-preview-web`, static Nginx, healthy.
- Gateway: exact-IP `/root/ENGLISH-ABC/deploy/nginx/conf.d/demo-preview.conf`.
- Backup: release directory `gateway-before/`; source snapshot: `source/`.
- Existing demo API/database reused without changes; existing school frontend containers untouched.

## Evidence

- 27 tests passed; production build passed.
- Public login HTML SHA-256 matches local build: `4049a35fa0d0bb4b6b40f46f9d93dd9761b9203059ce5904c9827f45db51ac22`.
- Public DBADeck bundle SHA-256 matches local build: `12f2623405540d15cdc9ff7158140be8e0bdaa66ce79f50c86b44a1b985ff844`.
- Teddy image: HTTP 200.
- Existing protected progress API: HTTP 401 without credentials, as expected.
- Existing TTS endpoint with Hello: HTTP 200, audio/mpeg. Physical sound was not verified.
- Both school login HTML hashes unchanged; every pre-existing container ID unchanged.
- Gateway configuration diff contains only the new exact-IP file; nginx validation and graceful reload passed.

See README for rollback. No database migrations, credential changes or authenticated user actions were performed.

## Centered single-card hotfix

On the same date, the preview received the user-requested single-card centering correction. Single content cards now use a centered, bounded one-column layout; multi-card branches are unchanged. Content and audio are unchanged.

- Chromium geometry test reproduced a 173px desktop offset before the fix and passed afterward.
- 29 tests passed; production build passed.
- Previous deployed assets and HTML retained in `site-before-center/`; previous renderer retained in `DBADeck-before-center.jsx`.
- This hotfix updates the existing preview mount in place (an exception to the initial immutable-release plan). Assets are uploaded before HTML; old hashed assets remain for open sessions. To undo this hotfix, restore `site-before-center/index.html` into `site/index.html`.
- Earlier HTML and bundle hashes above describe the initial deployment, not this hotfix.

## Two-card centering hotfix

User screenshots identified left-aligned two-card vocabulary and two-option activities. The correction centers their occupied columns while preserving card widths, gaps, mobile stacking and all other card-count branches. No content, audio or navigation changes.

- Regression-first Chromium checks reproduced offsets of 261px (vocabulary) and approximately 153px (both activities).
- After correction: all eight layout cases and all 35 tests passed; build passed.
- Pre-hotfix deployed files retained in `site-before-pair-center/` and `DBADeck-before-pair-center.jsx`.
- Rollback: restore `site-before-pair-center/index.html` into `site/index.html`; old hashed assets remain available.
- Deployment scope remains the exact IP preview only.

## Jardin units 2–8 — 2026-10-08

Published the approved remaining Jardin content to the existing IP preview. Jardin now has 91 slides across eight units, including optional extensions; Hello remains unchanged by this content revision.

- 63 tests and production build passed.
- Public HTML, DBADeck bundle and CSS match the local build byte-for-byte.
- HTML SHA-256: `cf4a69765f280aca97f63e00e3f0a163ae8455f1fd13023d50cfe3c767af7288`.
- DBADeck SHA-256: `3afb07b8489aeb57386c6fd841bcb81918899119a66c4871cadadcf5a1a96f3a`.
- All 72 distinct Jardin image references returned valid image responses.
- TTS for Red returned HTTP 200, audio/mpeg; physical playback remains unverified.
- Both institution login HTML hashes and all container IDs matched the pre-deployment check. No backend/database or gateway changes.
- Backups: `site-before-jardin-20261008/` and `source-before-jardin-20261008/` within the release directory.
- Assets and source snapshot transferred first, index last; old hashed bundles retained.
- Rollback this update by restoring the backup site's contents and source snapshot into the existing preview directories. No database restoration is needed.

## Primary content and pending Transicion release — 2026-10-08

Published eight revised Primero units (126 slides), eight Segundo units (130 slides), and the previously prepared Transicion content (96 slides) to http://162.35.28.193/login. Jardin remains at 91 slides. Counts include optional extensions; they are not required single-session workloads.

- Source alignment, classroom scaffolding and answer key: `docs/propuesta-pedagogica-pedro-fortoul/PRIMERO_SEGUNDO_GUIA.md`.
- Primary and Transicion illustrations intentionally use the blank placeholder pending user-supplied artwork. Shared image assets were retained. Approved layout and speech implementation remain unchanged.
- Fixed existing answer-state carryover between adjacent questions by resetting slide-local state on navigation; regression tests reproduced the failure before the fix.
- All 192 tests across 12 files passed, including eight Chromium layout cases. Production build passed (nonblocking stale Browserslist dataset notice).
- Baseline comparison: exactly the 16 primary unit entries changed during this task; Jardin and Transicion data were unchanged from the initial local snapshot.
- Public login HTML, all 15 generated JS/CSS assets, and blank SVG matched the local build byte-for-byte (HTTP 200).
- HTML SHA-256: `6d365504dbad7dd5a3e6e950e49ce9e96210cd2a271569bb4a8b8a293960af2f`.
- DBADeck SHA-256: `819b68d939cb304c2379421cfd2e1af8c664e33e642f9ff25cfe92280274838b`.
- TTS for “I drink water.”: HTTP 200, audio/mpeg, 10944 bytes. Physical playback was not verified. Protected progress API returned expected HTTP 401 without credentials.
- Preview container healthy; all nine container IDs unchanged. Both school login hashes unchanged: Manuel `9cc04cc2b9723b69f5bd33698819b18af2eae73d580d403b7a641c82e7d9601c`; Aquilino `729da047478aa04f440a8e8ea1ecdacac0cfb1ca49d70469fa71389d94af9f85`.
- No database, credentials, gateway configuration, institution frontend or backend changes.
- Backups under `/root/english-demo-preview/release-qncjfGmE/`: `site-before-primary-20261008/` and `source-before-primary-20261008/`.
- Assets/public files/source snapshot uploaded first, entry HTML last; no deletion and no restart. Old hashed assets remain for open sessions.
- Rollback: restore `site-before-primary-20261008/index.html` to `site/index.html` and restore the source backup if needed. Previously published assets remain available; no database rollback is required.
- Authenticated classroom review and final illustrations remain pending, not certified by these deployment checks.

## Preschool AI Cards Integration — 2026-10-08

Deployed the completed 3D clay card assignments and preschool slide updates across all environments on the VPS.

- Verified all 192 tests across 12 suites pass (100%).
- Production build created: HTML SHA-256 `35e10930cc475e088b54729ade13e32e6679f93187376bd0e587c86a47105258`, DBADeck bundle SHA-256 `58a74bfe946da38139aafe8686d63daea799ec9ce7e0be5a6eb86a9f4e4e9cf7`.
- Synced across `/root/ENGLISH-ABC`, `/root/ENGLISH-AQUILINO-PEDRO-FORTOUL`, and `/root/english-demo-preview/release-qncjfGmE/site`.
- Live endpoints verified via curl: Demo preview (`http://162.35.28.193`), Colegio Manuel Fernández de Novoa, and Sede Aquilino Pedro Fortoul returning HTTP 200 OK.
- All 9 Docker containers healthy.

