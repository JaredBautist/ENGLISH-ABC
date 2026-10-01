# Spec: App Loading Times & Navigation Performance Optimization

## Purpose
Eliminate perceived and actual latency when entering the application ("dura mucho en entrar") and navigating or scrolling through content ("desplazarse"). Provide instantaneous client-side navigation without full-page reloads, instant session rehydration without blocking spinners, code-splitting for heavy components, and 60fps hardware-accelerated scrolling.

## Scope
- Frontend authentication caching: optimistic rehydration from localStorage.
- Client-side SPA navigation: replace full page `window.location.replace()` / standard anchor reloads with client-side history navigation (`pushState`, `popstate`, link delegation).
- Code-splitting with `React.lazy` and `<Suspense>` for `/admin`, `/docente`, `/docente/videos`, `/docente/listening`, `/docente/writing`, and unit slide decks.
- CSS and rendering performance: eliminate blocking `@import` fonts in CSS, eliminate expensive SVG `feTurbulence` repaints on fixed backgrounds, isolate background drift animation to compositor thread.
- Rollup vendor chunk splitting in `vite.config.js`.

## Acceptance Criteria

1. **AC-1 (Zero-Latency App Entry):**
   - WHEN a user with stored valid credentials opens the application,
   - THEN the app SHALL immediately render the target workspace (e.g. `/docente` or `/admin`) without displaying an initial blocking spinner waterfall, validating credentials asynchronously in the background.

2. **AC-2 (Client-Side Instant Navigation):**
   - WHEN a user clicks on any internal link (e.g. videos, listening, writing, units, or role dashboards),
   - THEN the app SHALL perform a client-side route transition without reloading the browser window or re-downloading the entire bundle.

3. **AC-3 (Code-Splitting & Reduced Initial Bundle Size):**
   - WHEN building the frontend for production (`npm run build`),
   - THEN the initial entry bundle (`index.js`) SHALL NOT include all sub-routes monolithically, and heavy routes SHALL be split into separate dynamic chunks.

4. **AC-4 (Silky 60fps Scrolling & Paint Isolation):**
   - WHILE scrolling any page (e.g. TeacherWorkspace, MaterialPages, DBADeck),
   - THEN the background elements SHALL NOT force continuous CPU re-rasterization or SVG filter invalidations, maintaining smooth 60fps scrolling.

5. **AC-5 (Non-Blocking Typography):**
   - WHEN loading the web app,
   - THEN font loading SHALL be initiated via parallel `<link>` tags with `display=swap` in `index.html` rather than a blocking `@import` in CSS.
