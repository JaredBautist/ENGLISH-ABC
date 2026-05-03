import { useState } from 'react';
import { Menu, X, Home, BookOpen, User, LogOut, Award } from 'lucide-react';
import Button from './ui/Button';
import { useAuth } from '../features/auth/hooks/useAuth';

/**
 * Navigation Bar - Claymorphism Design
 * Responsive navigation with mobile menu
 */
export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Inicio', icon: Home, href: '/' },
    { label: 'Mis Lecciones', icon: BookOpen, href: '/lessons' },
    { label: 'Logros', icon: Award, href: '/achievements' },
    { label: 'Perfil', icon: User, href: '/profile' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md"
         style={{ 
           boxShadow: '0 4px 0 rgba(79, 70, 229, 0.1), 0 8px 16px rgba(0, 0, 0, 0.05)',
           borderBottom: '3px solid rgba(79, 70, 229, 0.1)'
         }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white text-xl"
                 style={{ 
                   background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                   boxShadow: '0 4px 0 rgba(79, 70, 229, 0.2)'
                 }}>
              E
            </div>
            <span className="text-xl font-bold hidden sm:block" 
                  style={{ color: 'var(--color-text)' }}>
              English Platform
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:bg-[rgba(79,70,229,0.1)]"
                style={{ color: 'var(--color-text)' }}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-3">
            {user && (
              <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                {user.username}
              </span>
            )}
            <Button 
              variant="outline" 
              size="sm"
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut size={16} />
              Salir
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl transition-all duration-200 hover:bg-[rgba(79,70,229,0.1)]"
            style={{ color: 'var(--color-primary)' }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t-3 border-[rgba(79,70,229,0.1)]"
             style={{ 
               background: 'white',
               boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
             }}>
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-200 hover:bg-[rgba(79,70,229,0.1)]"
                style={{ color: 'var(--color-text)' }}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </a>
            ))}
            <div className="pt-4 border-t-2 border-[rgba(79,70,229,0.1)]">
              {user && (
                <p className="px-4 py-2 text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                  {user.username}
                </p>
              )}
              <Button 
                variant="outline" 
                size="md"
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2"
              >
                <LogOut size={18} />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
