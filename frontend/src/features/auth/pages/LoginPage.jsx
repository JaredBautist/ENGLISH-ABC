import { useEffect } from 'react';
import { BookOpen, GraduationCap, Sparkles } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  const { isAuthenticated, user, isLoading, status } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user && !isLoading) {
      const redirectPath = user.role === 'teacher' ? '/teacher' : `/${user.level === 'a1-2' ? 'a1-2' : 'a1-1'}`;
      window.location.replace(redirectPath);
    }
  }, [isAuthenticated, user, isLoading]);

  if (isLoading && status === 'idle') {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#f8faf7]">
        <div className="h-11 w-11 animate-spin rounded-full border-2 border-[#99f6e4] border-t-[#0f766e]" />
      </div>
    );
  }

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#f8faf7] px-4 py-8 text-slate-800">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,118,110,0.12),transparent_50%),radial-gradient(circle_at_90%_85%,rgba(234,88,12,0.10),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,118,110,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,118,110,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <section className="relative mx-auto grid min-h-[calc(100dvh-4rem)] w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_460px]">
        <div className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left">
          <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-[1.6rem] bg-gradient-to-br from-[#0f766e] to-[#0ea5a4] text-white shadow-[0_18px_45px_rgba(15,118,110,0.24)] lg:mx-0">
            <GraduationCap size={30} />
          </div>

          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#99f6e4] bg-white px-5 py-2.5 text-sm font-semibold text-[#115e59] shadow-sm">
            <Sparkles size={16} />
            MCER Learning Platform
          </p>

          <h1 className="text-4xl font-extrabold leading-tight text-[#134e4a] sm:text-5xl lg:text-6xl">
            English Platform
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Accede a tus clases, actividades y progreso con una interfaz más clara, rápida y accesible.
          </p>

        </div>

        <div className="mx-auto w-full max-w-[460px] rounded-[2rem] border border-[#ccfbf1] bg-white/95 shadow-[0_28px_80px_rgba(15,118,110,0.16)] backdrop-blur-sm">
          <div className="p-6 sm:p-9">
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#99f6e4] bg-[#f0fdfa] text-[#0f766e] shadow-[0_12px_30px_rgba(15,118,110,0.12)]">
                  <BookOpen size={23} />
                </div>
                <h2 className="text-3xl font-extrabold leading-tight text-[#134e4a]">Iniciar sesión</h2>
                <p className="mt-2 text-base leading-7 text-slate-500">
                  Usa tu correo y contraseña para entrar.
                </p>
              </div>
            </div>

            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  );
}
