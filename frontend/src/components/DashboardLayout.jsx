import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children, activeTab, setActiveTab }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const darkEnabled = savedTheme !== 'light';
    setIsDark(darkEnabled);
    document.documentElement.classList.toggle('dark', darkEnabled);
    document.body.classList.toggle('dark', darkEnabled);
  }, []);

  const shellBgClass = isDark ? 'bg-[#0f172a] text-slate-100' : 'bg-slate-50 text-slate-900';

  return (
    <div className={`${isDark ? 'dark' : ''} min-h-screen selection:bg-indigo-500 selection:text-white transition-colors duration-300 ${shellBgClass}`}>
      {/* Navigation Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        isDark={isDark}
        setIsDark={setIsDark}
      />

      {/* Main Content Area */}
      <main 
        className={`transition-all duration-300 min-h-screen ${
          isCollapsed ? 'pl-20' : 'pl-64'
        }`}
      >
        <div className="max-w-[1600px] mx-auto min-h-screen">
          {React.isValidElement(children) ? React.cloneElement(children, { isDark }) : children}
        </div>
      </main>
    </div>
  );
}
