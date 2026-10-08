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
