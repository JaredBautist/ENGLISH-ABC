import { useState } from 'react';
import { setAuth } from '../utils/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) {
        const message = data?.detail || 'Credenciales incorrectas.';
        throw new Error(message);
      }

      setAuth(data);

      const role = data?.user?.role;
      if (role === 'teacher') {
        window.location.replace('/teacher');
        return;
      }
      if (role === 'student') {
        const level = data?.user?.level === 'a1-2' ? 'a1-2' : 'a1-1';
        window.location.replace(`/${level}`);
        return;
      }

      window.location.replace('/login');
    } catch (err) {
      setError(err.message || 'Ocurrió un error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-icon">🎓</span>
          <h1 className="auth-title">English Platform</h1>
          <p className="auth-subtitle">Acceso para docentes y estudiantes</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>Email</span>
            <input
              className="auth-input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tu@email.com"
              required
            />
          </label>
          <label className="auth-field">
            <span>Password</span>
            <input
              className="auth-input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
              required
            />
          </label>
          {error ? <div className="auth-error">{error}</div> : null}
          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
        <div className="auth-help">
          <p>Credenciales de prueba:</p>
          <p>
            Docente: <strong>dylanjared@gmail.com</strong> / <strong>teacher123</strong>
          </p>
          <p>
            Estudiante: <strong>monica@gmail.com</strong> / <strong>student123</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
