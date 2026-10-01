# Design: Performance & Navigation Optimization

## 1. Authentication Layer (Optimistic Rehydration)
- `tokenStorage.js`:
  - Enhance `STORAGE_KEYS` to include `USER: 'auth_user'`.
  - Add `saveUser(user, rememberMe)` and `getUser()` methods.
  - When saving tokens in `saveTokens(tokens, user, rememberMe)`, also save serialized user.
  - When clearing tokens in `clearTokens()`, remove the stored user.
- `AuthContext.jsx`:
  - Initialize state with:
    ```js
    const storedTokens = tokenStorage.getStoredTokens();
    const storedUser = tokenStorage.getUser();
    const hasInitialAuth = Boolean(storedTokens?.access && storedUser);
    ```
  - Initial `isLoading`: false if `hasInitialAuth` is true, otherwise false if no tokens, or true only if token exists without cached user profile.
  - Initial `isAuthenticated`: true if `hasInitialAuth`.
  - Initial `user`: `storedUser || null`.
  - In `useEffect()`, re-verify token with backend in the background without blocking render. If token is invalid (e.g. 401), trigger logout gracefully.

## 2. Fast Client-Side SPA Router (`App.jsx`)
- State: `const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname));`
- Navigation function:
  ```js
  const navigate = (to, replace = false) => {
    const target = normalizePath(to);
    if (target === currentPath) return;
    if (replace) {
      window.history.replaceState({}, '', target);
    } else {
      window.history.pushState({}, '', target);
    }
    setCurrentPath(target);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  ```
- Listen to `popstate` events to support browser back/forward buttons seamlessly.
- Global Click Interceptor:
  - Add an event listener on `document.addEventListener('click', ...)`:
  - If target is an `<a>` element with an internal path (starts with `/`, doesn't have `target="_blank"`, `download`, or modifier keys like Ctrl/Cmd/Shift), call `e.preventDefault()` and `navigate(targetHref)`.
  - This immediately turns ALL existing links (`/docente`, `/docente/videos`, `/docente/listening`, `/docente/writing`, `/admin`, unit cards) into 0ms client-side transitions across the entire codebase without needing to rewrite every single `<a href="...">`!
- Provide `navigate` via a lightweight routing context or window event so components can also programmatically navigate without reloading.

## 3. Code-Splitting with `React.lazy` & `<Suspense>`
- Replace monolithic static imports:
  ```js
  const AdminPanel = lazy(() => import('./components/AdminPanel'));
  const TeacherWorkspace = lazy(() => import('./components/TeacherWorkspace'));
  const DBADeck = lazy(() => import('./components/DBADeck'));
  const VideosPage = lazy(() => import('./components/MaterialPages').then(m => ({ default: m.VideosPage })));
  const ListeningPage = lazy(() => import('./components/MaterialPages').then(m => ({ default: m.ListeningPage })));
  const WritingPage = lazy(() => import('./components/MaterialPages').then(m => ({ default: m.WritingPage })));
  const LoginPage = lazy(() => import('./features/auth/pages/LoginPage'));
  const DiagnosticPage = lazy(() => import('./pages/DiagnosticPage'));
  ```
- Render a lightweight, smooth skeleton fallback: `<Suspense fallback={<PageSkeleton />}>`.

## 4. CSS and Render Performance Optimization
- `index.html`:
  - Add `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Nunito+Sans:wght@400;600;700;800&display=swap" />` in `<head>`.
- `index.css`:
  - Remove `@import url(...)` at line 1.
  - Optimize `.bg-blobs::before`:
    - Add `contain: strict; will-change: transform; transform: translateZ(0);` so the browser promotes the animated gradient blobs to an independent compositor layer, preventing paint reflows during page scroll.
  - Optimize `.bg-blobs::after`:
    - The SVG `feTurbulence` filter on a fixed layer causes heavy CPU re-rasterization. Replace with an ultra-lightweight, high-performance CSS radial-dot pattern or pre-rendered static noise texture, isolated with `contain: strict; pointer-events: none;`.

## 5. Rollup Vendor Chunking (`vite.config.js`)
- Replace `__dirname` with `path.resolve(process.cwd(), './src')`.
- Configure `build.rollupOptions.output.manualChunks`:
  - `vendor-react`: `['react', 'react-dom']`
  - `vendor-icons`: `['lucide-react']`
  - This allows the browser to cache React and Lucide icons permanently across page visits and version updates.
