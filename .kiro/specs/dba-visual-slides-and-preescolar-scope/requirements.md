# Requirements: DBA Visual Slides & Preescolar Scope Adjustment

## Purpose
Align the platform strictly with the Colombian Ministry of Education (MEN) Basic Learning Rights (DBA) for early childhood and primary education:
1. **Preescolar Scope Adjustment:** In Jardín (3-4 years) and Transición (4-5 years), children do NOT write in English. Their curriculum is strictly oral-visual (Songs/Videos and Listening). Writing starts in 1° Primaria.
2. **High-Impact Visual Slides (DBA Visual Principle):** Children from Jardín to 5° Primaria are visual learners. The classroom slides (DBADeck) must feature rich, prominent illustrations, OpenMoji vector art, visual concept cards, and thematic imagery rather than text-heavy bullet lists, maximizing classroom engagement when projected on Smart TVs or beamers.
3. **Local-First Verification:** All changes must be verified and tested thoroughly in the local environment (`http://localhost:5173`) before staging or syncing to the production VPS.

## Scope
- Frontend `TeacherWorkspace.jsx`: Hide Writing card for `jardin` and `transicion`; show only Videos and Listening.
- Frontend `MaterialShell.jsx` & `MaterialPages.jsx`: Restrict `/docente/writing` to `primero` and `segundo`. Show pedagogical explanation for preescolar teachers.
- Frontend `DBADeck.jsx`: Transform `ContentSlide`, `VocabularySlide`, and `ActivitySlide` into high-impact, visual-first flashcard presentations with large illustrations, OpenMoji SVG art, and visual cues for every concept.
- Frontend `unitSlides.js`: Enhance slide items and concepts with corresponding visual symbols, emojis, and thematic imagery across all 32 units.
- Verification: Local testing with Vitest, build check, and interactive verification.

## Acceptance Criteria

1. **AC-1 (Preescolar Writing Exclusion):**
   - WHEN a teacher selects `Jardín` or `Transición` in `TeacherWorkspace`,
   - THEN the Material Didáctico section SHALL ONLY display `Videos` and `Listening` cards, omitting `Writing`.

2. **AC-2 (Primary Writing Retention):**
   - WHEN a teacher selects `1° de Primaria` or `2° de Primaria`,
   - THEN the Material Didáctico section SHALL display `Videos`, `Listening`, and `Writing` cards.

3. **AC-3 (Writing Route Protection):**
   - WHEN a user navigates to `/docente/writing` with a preescolar grade (`?grado=jardin` or `?grado=transicion`),
   - THEN the application SHALL display a clear pedagogical notice explaining that writing begins in 1° Primaria according to MEN DBA, offering direct shortcuts to Listening and Videos.

4. **AC-4 (Visual-First Content Slides):**
   - WHILE projecting any unit in `DBADeck`,
   - THEN each content item SHALL render as an illustrated card with prominent visual art (OpenMoji SVG / emoji), bilingual text, and one-tap native audio playback.

5. **AC-5 (Enriched Vocabulary Flashcards):**
   - WHILE viewing a vocabulary slide,
   - THEN each word SHALL be presented as a large, tactile flashcard with a high-resolution illustration and audio pronunciation.

6. **AC-6 (Visual Activities):**
   - WHILE interacting with choice activities,
   - THEN question prompts and options SHALL include visual cues and emojis so non-reading children can associate sound and meaning visually.

7. **AC-7 (Zero Production Disruption):**
   - ALL changes SHALL be validated locally before initiating any deployment to the production VPS.
