# Tasks

- [x] Inspect current content, image assets and existing speech contract.
- [x] Add acceptance tests and confirm failures against the old unit.
- [x] Replace only the approved unit content and provide a teacher guide.
- [x] Verify all other units are identical, run suite and build.
- [x] Record limits: no live Google playback, classroom pilot or deployment verification.

## Results

- Before implementation: four expected content acceptance failures; asset existence passed.
- After implementation: 27 tests passed in six suites, including real renderer-to-TTS URL verification with mocked audio.
- Production build passed; existing Browserslist age warning remains.
- Catalogue comparison: only `jardin-hello` changed; the other 31 units and key order are identical.
- No renderer, styling, speech service, route or image files changed. No VPS actions performed.
- Song URL retained, not independently validated for availability/content. Physical playback and teacher review remain pending.
