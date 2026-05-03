import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  AlertCircle, 
  LogOut,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../features/auth/hooks/useAuth';

export default function TeacherDashboardLayout({ children, activeTab, setActiveTab, lowProgressCount = 0 }) {
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('teacherTheme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('teacherTheme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('teacherTheme', 'light');
    }
  };

  const menuItems = [
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
    { id: 'alerts', label: 'Alerts', icon: AlertCircle, badge: lowProgressCount },
    { id: 'manage', label: 'Students', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen transition-all duration-300 z-50 bg-white dark:bg-[#0f172a] border-r border-slate-200 dark:border-white/10 shadow-xl ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-white/5">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
                T
              </div>
              <span className="font-black text-xl bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
                Teacher
              </span>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white mx-auto">
              T
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-200 group relative ${
                activeTab === item.id 
                  ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/5' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-200 border border-transparent'
              }`}
            >
              <item.icon size={22} className={activeTab === item.id ? 'text-indigo-600 dark:text-indigo-400' : 'group-hover:scale-110 transition-transform'} />
              {!isCollapsed && (
                <>
                  <span className="font-bold">{item.label}</span>
                  {item.badge > 0 && (
                    <span className="ml-auto bg-rose-500 text-white text-xs font-black rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {activeTab === item.id && !isCollapsed && (
                <div className="ml-auto w-1.5 h-6 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-slate-200 dark:border-white/5 space-y-2">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-4 p-3 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all group"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? (
              <>
                <Sun size={22} className="group-hover:rotate-180 transition-transform duration-500 mx-auto md:mx-0" />
                {!isCollapsed && <span className="font-bold text-sm">Light Mode</span>}
              </>
            ) : (
              <>
                <Moon size={22} className="group-hover:-rotate-12 transition-transform duration-500 mx-auto md:mx-0" />
                {!isCollapsed && <span className="font-bold text-sm">Dark Mode</span>}
              </>
            )}
          </button>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center gap-4 p-3 rounded-2xl text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
          >
            {isCollapsed ? <ChevronRight size={22} className="mx-auto" /> : (
              <>
                <ChevronLeft size={22} />
                <span className="font-bold text-sm">Collapse</span>
              </>
            )}
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center gap-4 p-3 rounded-2xl text-rose-600 dark:text-rose-400/80 hover:text-rose-700 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all group"
          >
            <LogOut size={22} className="group-hover:translate-x-1 transition-transform mx-auto md:mx-0" />
            {!isCollapsed && <span className="font-bold">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 min-h-screen ${
        isCollapsed ? 'pl-20' : 'pl-64'
      }`}>
        <div className="max-w-[1600px] mx-auto min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
