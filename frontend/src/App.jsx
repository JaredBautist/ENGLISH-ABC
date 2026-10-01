import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { useAuth } from './features/auth/hooks/useAuth';
import { ToastContainer } from './components/Toast';
import { getGrade, grades } from './data/grados';

// Lazy-loaded routes for optimal initial bundle size and rapid entry
const DiagnosticPage = lazy(() => import('./pages/DiagnosticPage'));
const LoginPage = lazy(() => import('./features/auth/pages/LoginPage'));
const Logout = lazy(() => import('./pages/Logout'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const TeacherWorkspace = lazy(() => import('./components/TeacherWorkspace'));
const DBADeck = lazy(() => import('./components/DBADeck'));
const VideosPage = lazy(() =>
  import('./components/MaterialPages').then((m) => ({ default: m.VideosPage }))
);
const ListeningPage = lazy(() =>
  import('./components/MaterialPages').then((m) => ({ default: m.ListeningPage }))
);
const WritingPage = lazy(() =>
  import('./components/MaterialPages').then((m) => ({ default: m.WritingPage }))
);

// Strips query string (?foo=bar) and hash (#anchor), returning canonical route path
const normalizePath = (raw) => {
  if (!raw) return '/';
  const pathOnly = raw.split('?')[0].split('#')[0];
  const trimmed = pathOnly.endsWith('/') && pathOnly !== '/' ? pathOnly.slice(0, -1) : pathOnly;
  return trimmed || '/';
};

const homeForRole = (role) => {
  if (role === 'superadmin') return '/admin';
  if (role === 'teacher') return '/docente';
  return '/login';
};

const UNIT_PATTERN = /^\/(jardin|transicion|primero|segundo)\/unidad-(\d+)$/;

// Lightweight clay-styled skeleton while dynamic chunk streams in
function ViewSkeleton() {
  return (
    <div
      className="flex min-h-dvh items-center justify-center bg-slate-50 dark:bg-slate-950 p-6"
      role="status"
      aria-label="Cargando vista..."
    >
      <div className="card-clay max-w-sm w-full p-8 text-center flex flex-col items-center gap-4 animate-pulse">
        <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950/80 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-3 border-blue-600 border-t-transparent animate-spin" />
        </div>
        <div className="h-4 w-36 bg-slate-200 dark:bg-slate-800 rounded-full" />
        <div className="h-3 w-48 bg-slate-100 dark:bg-slate-800/60 rounded-full" />
      </div>
    </div>
  );
}

export default function App() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));
  const [locationSearch, setLocationSearch] = useState(() => window.location.search);
  const role = user?.role;

  // Client-side navigation handler preserving query params and hash
  const navigate = useCallback((to, replace = false) => {
    const targetPath = normalizePath(to);
    const searchPart = to.includes('?') ? '?' + to.split('?')[1].split('#')[0] : '';
    const hashPart = to.includes('#') ? '#' + to.split('#')[1] : '';
    const fullHref = targetPath + searchPart + hashPart;

    if (replace) {
      window.history.replaceState({}, '', fullHref);
    } else {
      window.history.pushState({}, '', fullHref);
    }
    setPath(targetPath);
    setLocationSearch(searchPart);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Listen for browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setPath(normalizePath(window.location.pathname));
      setLocationSearch(window.location.search);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Intercept internal anchor link clicks to avoid full browser reloads
  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey ||
        e.shiftKey
      ) {
        return;
      }

      const anchor = e.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        anchor.target === '_blank' ||
        anchor.hasAttribute('download')
      ) {
        return;
      }

      // Valid internal route
      if (href.startsWith('/')) {
        e.preventDefault();
        navigate(href);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [navigate]);

  // Initial auth verification spinner (only visible if tokens exist without cached profile)
  if (isLoading) {
    return <ViewSkeleton />;
  }

  return (
    <>
      <ToastContainer />
      <Suspense fallback={<ViewSkeleton />}>
        {renderContent()}
      </Suspense>
    </>
  );

  function renderContent() {
    if (path === '/logout') {
      return <Logout />;
    }

    if (path === '/diagnostic') {
      return <DiagnosticPage />;
    }

    if (path === '/login') {
      if (isAuthenticated && role) {
        navigate(homeForRole(role), true);
        return null;
      }
      return <LoginPage />;
    }

    if (!isAuthenticated || !role) {
      navigate('/login', true);
      return null;
    }

    // Solo personal institucional: docentes y administración.
    if (role !== 'teacher' && role !== 'superadmin') {
      navigate('/login', true);
      return null;
    }

    if (path === '/admin') {
      if (role !== 'superadmin') {
        navigate('/docente', true);
        return null;
      }
      return <AdminPanel />;
    }

    if (path === '/' || path === '/docente') {
      return <TeacherWorkspace />;
    }

    // Material didáctico por grado (páginas independientes)
    if (path === '/docente/videos') {
      return <VideosPage key={`videos-${locationSearch}`} />;
    }
    if (path === '/docente/listening') {
      return <ListeningPage key={`listening-${locationSearch}`} />;
    }
    if (path === '/docente/writing') {
      return <WritingPage key={`writing-${locationSearch}`} />;
    }

    // Slides de unidad: /:grado/unidad-N
    const unitMatch = path.match(UNIT_PATTERN);
    if (unitMatch) {
      const gradeId = unitMatch[1];
      const week = Number(unitMatch[2]);
      const grade = getGrade(gradeId);
      const unit = grade?.units.find((u) => u.week === week);
      if (!grade || !unit) {
        return <NotFound />;
      }
      const targetDashboard = role === 'superadmin' ? '/admin' : '/docente';
      return (
        <DBADeck
          slidesKey={unit.slides}
          title={`${grade.name} • Unidad ${unit.week}: ${unit.title}`}
          subtitle={unit.subtitle}
          dashboardHref={targetDashboard}
          gradeCode={gradeId}
          weekNumber={week}
          onBack={() => navigate(targetDashboard)}
          onCompleted={() => navigate(targetDashboard)}
        />
      );
    }

    // Rutas legacy de niveles MCER: llevar al panel correspondiente.
    if (path.startsWith('/a1-1') || path.startsWith('/a1-2') || path.startsWith('/a2-1')) {
      navigate(homeForRole(role), true);
      return null;
    }

    if (Object.prototype.hasOwnProperty.call(grades, path.slice(1))) {
      return <TeacherWorkspace />;
    }

    return <NotFound />;
  }
}
