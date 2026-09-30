import DiagnosticPage from './pages/DiagnosticPage';
import LoginPage from './features/auth/pages/LoginPage';
import Logout from './pages/Logout';
import NotFound from './pages/NotFound';
import AdminPanel from './components/AdminPanel';
import TeacherWorkspace from './components/TeacherWorkspace';
import DBADeck from './components/DBADeck';
import { ListeningPage, VideosPage, WritingPage } from './components/MaterialPages';
import { useAuth } from './features/auth/hooks/useAuth';
import { ToastContainer } from './components/Toast';
import { getGrade, grades } from './data/grados';

const normalizePath = (pathname) => {
  if (!pathname) return '/';
  const trimmed = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
  return trimmed || '/';
};

const redirectTo = (target) => {
  if (window.location.pathname !== target) {
    window.location.replace(target);
  }
};

const homeForRole = (role) => {
  if (role === 'superadmin') return '/admin';
  if (role === 'teacher') return '/docente';
  return '/login';
};

const UNIT_PATTERN = /^\/(jardin|transicion|primero|segundo)\/unidad-(\d+)$/;

export default function App() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const path = normalizePath(window.location.pathname);
  const role = user?.role;

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100"
        role="status"
        aria-label="Loading"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      {renderContent()}
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
        redirectTo(homeForRole(role));
        return null;
      }
      return <LoginPage />;
    }

    if (!isAuthenticated || !role) {
      redirectTo('/login');
      return null;
    }

    // Solo personal institucional: docentes y administración.
    if (role !== 'teacher' && role !== 'superadmin') {
      redirectTo('/login');
      return null;
    }

    if (path === '/admin') {
      if (role !== 'superadmin') {
        redirectTo('/docente');
        return null;
      }
      return <AdminPanel />;
    }

    if (path === '/' || path === '/docente') {
      return <TeacherWorkspace />;
    }

    // Material didáctico por grado (páginas independientes)
    if (path === '/docente/videos') {
      return <VideosPage />;
    }
    if (path === '/docente/listening') {
      return <ListeningPage />;
    }
    if (path === '/docente/writing') {
      return <WritingPage />;
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
      return (
        <DBADeck
          slidesKey={unit.slides}
          title={`${grade.name} • Unidad ${unit.week}: ${unit.title}`}
          subtitle={unit.subtitle}
          dashboardHref={role === 'superadmin' ? '/admin' : '/docente'}
        />
      );
    }

    // Rutas legacy de niveles MCER: llevar al panel correspondiente.
    if (path.startsWith('/a1-1') || path.startsWith('/a1-2') || path.startsWith('/a2-1')) {
      redirectTo(homeForRole(role));
      return null;
    }

    if (Object.prototype.hasOwnProperty.call(grades, path.slice(1))) {
      return <TeacherWorkspace />;
    }

    return <NotFound />;
  }
}
