import { useEffect } from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';

export default function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    window.location.replace('/login');
  }, [logout]);

  return null;
}
