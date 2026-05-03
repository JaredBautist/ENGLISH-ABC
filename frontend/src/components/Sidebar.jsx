import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Headphones, 
  PenTool, 
  Mic2, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun
} from 'lucide-react';
import { useAuth } from '../features/auth/hooks/useAuth';

export default function Sidebar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed, isDark, setIsDark }) {
  const { logout, user } = useAuth();

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    document.body.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'lessons', label: 'Lessons', icon: BookOpen },
    { id: 'listening', label: 'Listening', icon: Headphones },
    { id: 'writing', label: 'Writing', icon: PenTool },
    { id: 'speaking', label: 'Speaking', icon: Mic2 },
  ];

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen transition-all duration-300 z-50 border-r shadow-xl ${
        isDark ? 'bg-[#0f172a] border-white/10' : 'bg-white border-slate-200'
      } ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-white/5">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              E
            </div>
            <span className="font-black text-xl bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
              English
            </span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white mx-auto">
            E
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="p-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-200 group ${
              activeTab === item.id 
                ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/5' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-200 border border-transparent'
            }`}
          >
            <item.icon size={22} className={activeTab === item.id ? 'text-indigo-600 dark:text-indigo-400' : 'group-hover:scale-110 transition-transform'} />
            {!isCollapsed && <span className="font-bold">{item.label}</span>}
            {activeTab === item.id && !isCollapsed && (
              <div className="ml-auto w-1.5 h-6 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
            )}
          </button>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="absolute bottom-0 left-0 w-full p-4 border-t border-slate-200 dark:border-white/5 space-y-2">
        {/* Theme Toggle */}
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

        {!isCollapsed && user && (
          <div className="mt-4 px-3 py-4 rounded-[1.5rem] bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-500/20 uppercase">
                {user.username.charAt(0)}
              </div>
              <div className="overflow-hidden text-left">
                <p className="font-bold text-slate-900 dark:text-white truncate text-sm">{user.username}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500 truncate uppercase tracking-tighter">Level {user.level || 'A1'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
