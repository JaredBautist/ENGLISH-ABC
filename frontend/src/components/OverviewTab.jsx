import React from 'react';
import { Calendar, Award, TrendingUp, Clock } from 'lucide-react';
import WeekProgressBar from './WeekProgressBar';

function StatCard({ icon, label, value, color, isDark }) {
  const colors = {
    indigo: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400',
    rose: 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400'
  };

  return (
    <div className={`group p-8 rounded-[2rem] border transition-all duration-500 relative overflow-hidden ${
      isDark
        ? 'bg-slate-800/40 border-white/5 hover:border-white/10 shadow-none'
        : 'bg-white border-slate-200 hover:border-slate-300 shadow-lg'
    }`}>
      <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity">
        {icon}
      </div>
      <div className={`inline-flex p-3 rounded-2xl mb-4 ${colors[color]}`}>
        {icon}
      </div>
      <p className="text-sm font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-4xl font-black text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}

export default function OverviewTab({ user, progressSummary, levelData, levelId, isDark = true }) {
  const levelWelcome = {
    'a1-1': 'Start your English journey with core basics: greetings, personal information, numbers, and simple classroom communication.',
    'a1-2': 'Build your A1.2 communication skills: Present Simple routines, family and home descriptions, shopping language, and weekend plans with going to.',
  };
  const fallbackDescription = levelData?.heroDescription?.replace(/<\/?[^>]+(>|$)/g, '') || '';
  const welcomeDescription = levelWelcome[levelId] || fallbackDescription;

  return (
    <div className="p-8 lg:p-12 animate-fadeIn">
      {/* Welcome Section */}
      <div className="mb-12 relative">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-600/20 dark:bg-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-600/10 dark:bg-purple-600/10 rounded-full blur-3xl"></div>
        
        <div className="relative">
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-700 dark:from-white dark:via-indigo-200 dark:to-slate-400 bg-clip-text text-transparent">
            Hello, {user?.username || 'Student'}!{' '}
            <span style={{ fontFamily: '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif' }}>
              👋
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            {welcomeDescription}
          </p>
        </div>
      </div>

      {/* Main Progress Bar */}
      <div className={`mb-12 rounded-[2.5rem] border p-8 backdrop-blur-sm ${
        isDark
          ? 'bg-slate-800/20 border-white/5 shadow-2xl'
          : 'bg-white border-slate-200 shadow-xl'
      }`}>
        <h2 className="text-2xl font-black mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
          <Award className="text-indigo-600 dark:text-indigo-400" />
          General Progress
        </h2>
        <WeekProgressBar levelCode={levelId} progressData={progressSummary} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard 
          icon={<Calendar className="text-indigo-600 dark:text-indigo-400" />} 
          label="Current Week" 
          value={`${progressSummary?.current_week || 1}/8`}
          color="indigo"
          isDark={isDark}
        />
        <StatCard 
          icon={<Award className="text-emerald-600 dark:text-emerald-400" />} 
          label="Overall Progress" 
          value={`${progressSummary?.overall_percent || 0}%`}
          color="emerald"
          isDark={isDark}
        />
        <StatCard 
          icon={<TrendingUp className="text-amber-600 dark:text-amber-400" />} 
          label="Learning Streak" 
          value="5 Days"
          color="amber"
          isDark={isDark}
        />
        <StatCard 
          icon={<Clock className="text-rose-600 dark:text-rose-400" />} 
          label="Time Spent" 
          value="12.4h"
          color="rose"
          isDark={isDark}
        />
      </div>

      {/* Motivational Footer */}
      <div className="rounded-[2.5rem] bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-600/10 dark:to-purple-600/10 border border-slate-200 dark:border-white/5 p-12 text-center backdrop-blur-sm shadow-lg dark:shadow-none">
        <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">You're doing amazing! 🚀</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
          Consistency is the key to mastering English. Try to practice at least 15 minutes every day.
        </p>
        <div className="flex justify-center gap-4">
          <button 
            className={`px-8 py-3 font-bold rounded-2xl hover:scale-105 transition-transform shadow-xl ${
              isDark
                ? 'bg-white text-indigo-900 shadow-white/10'
                : 'bg-indigo-600 text-white shadow-indigo-500/20'
            }`}
          >
            Continue Learning
          </button>
        </div>
      </div>
    </div>
  );
}
