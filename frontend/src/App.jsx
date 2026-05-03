import { useEffect } from 'react';
import A11Topics from './pages/a1-1/Topics';
import A11WeekOneAlphabet from './pages/a1-1/WeekOneAlphabet';
import A11WeekTwoGreetings from './pages/a1-1/WeekTwoGreetings';
import A11ExercisesWeek1 from './pages/a1-1/ExercisesWeek1';
import A12Topics from './pages/a1-2/Topics';
import A12WeekOne from './pages/a1-2/WeekOne';
import A12WeekTwo from './pages/a1-2/WeekTwo';
import A12WeekThree from './pages/a1-2/WeekThree';
import A12WeekFour from './pages/a1-2/WeekFour';
import A12WeekFive from './pages/a1-2/WeekFive';
import A12WeekSix from './pages/a1-2/WeekSix';
import A12WeekSeven from './pages/a1-2/WeekSeven';
import A12WeekEight from './pages/a1-2/WeekEight';
import LoginPage from './features/auth/pages/LoginPage';
import Logout from './pages/Logout';
import TeacherDashboard from './pages/TeacherDashboard';
import DiagnosticPage from './pages/DiagnosticPage';
import NotFound from './pages/NotFound';
import { useAuth } from './features/auth/hooks/useAuth';
import { ToastContainer } from './components/Toast';

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

export default function App() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const path = normalizePath(window.location.pathname);
  const role = user?.role;
  const level = user?.level === 'a1-2' ? 'a1-2' : 'a1-1';
  const studentBase = `/${level}`;

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
      if (isAuthenticated && role === 'teacher') {
        redirectTo('/teacher');
        return null;
      }
      if (isAuthenticated && role === 'student') {
        redirectTo(studentBase);
        return null;
      }
      return <LoginPage />;
    }

    if (!isAuthenticated || !role) {
      redirectTo('/login');
      return null;
    }

    if (role === 'teacher') {
      if (path !== '/teacher') {
        redirectTo('/teacher');
        return null;
      }
      return <TeacherDashboard />;
    }

    if (role === 'student') {
      if (!path.startsWith(studentBase)) {
        redirectTo(studentBase);
        return null;
      }
    }

    switch (path) {
      case '/':
      case '/a1-1':
        return <A11Topics />;
      case '/a1-1/week-1':
        return <A11WeekOneAlphabet />;
      case '/a1-1/week-2':
        return <A11WeekTwoGreetings />;
      case '/a1-1/exercises-week-1':
        return <A11ExercisesWeek1 />;
      case '/a1-2':
        return <A12Topics />;
      case '/a1-2/week-1':
        return <A12WeekOne />;
      case '/a1-2/week-2':
        return <A12WeekTwo />;
      case '/a1-2/week-3':
        return <A12WeekThree />;
      case '/a1-2/week-4':
        return <A12WeekFour />;
      case '/a1-2/week-5':
        return <A12WeekFive />;
      case '/a1-2/week-6':
        return <A12WeekSix />;
      case '/a1-2/week-7':
        return <A12WeekSeven />;
      case '/a1-2/week-8':
        return <A12WeekEight />;
      default:
        return <NotFound />;
    }
  }
}
