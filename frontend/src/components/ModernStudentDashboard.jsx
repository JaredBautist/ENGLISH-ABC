import { useEffect, useState, useMemo } from 'react';
import { BookOpen, Award, TrendingUp, Clock, Calendar, CheckCircle, Lock, ChevronRight, PlayCircle } from 'lucide-react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { apiFetch } from '../utils/api';
import { levels } from '../data/levels';
import NavigationBar from './NavigationBar';

/**
 * Modern Student Dashboard - Pure React implementation
 * Replaces the legacy HTML transformation system with a high-fidelity React UI.
 */
export default function ModernStudentDashboard({ levelId = 'a1-2' }) {
  const { user } = useAuth();
  const [progressSummary, setProgressSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const levelData = levels[levelId] || levels['a1-1'];

  useEffect(() => {
    let isActive = true;
    const loadProgress = async () => {
      try {
        const data = await apiFetch('/students/me/progress-summary/');
        if (isActive) {
          setProgressSummary(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading progress:', error);
        if (isActive) setLoading(false);
      }
    };
    loadProgress();
    const interval = setInterval(loadProgress, 30000);
    return () => {
      isActive = false;
      clearInterval(interval);
    };
  }, []);

  // Merge static level data with dynamic progress
  const weeks = useMemo(() => {
    const totalWeeks = 8;
    const weeksArr = [];
    
    for (let i = 1; i <= totalWeeks; i++) {
      const weekProgress = progressSummary?.weeks?.[i] || { percent: 0, completed: false };
      const weekStatic = levelData.nav.lessons.find(l => l.href.includes(`week-${i}`)) || {
        label: `Week ${i}`,
        icon: 'bi bi-journal'
      };
      
      const isLocked = i > (progressSummary?.current_week || 1);
      
      weeksArr.push({
        number: i,
        title: weekStatic.label,
        subtitle: getWeekSubtitle(levelId, i),
        progress: weekProgress.percent || 0,
        completed: weekProgress.completed || weekProgress.percent === 100,
        isLocked: isLocked,
        href: weekStatic.href,
        icon: weekStatic.icon
      });
    }
    return weeksArr;
  }, [levelId, levelData, progressSummary]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 border-opacity-50"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <NavigationBar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12 relative">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl"></div>
          
          <div className="relative">
            <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-white via-indigo-200 to-slate-400 bg-clip-text text-transparent">
              Hello, {user?.username || 'Student'}! 👋
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              {levelData.heroDescription.replace(/<\/?[^>]+(>|$)/g, "")}
            </p>
          </div>
        </div>

        {/* Stats Grid - Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <StatCard 
            icon={<Calendar className="text-indigo-400" />} 
            label="Current Week" 
            value={`${progressSummary?.current_week || 1}/8`}
            color="indigo"
          />
          <StatCard 
            icon={<Award className="text-emerald-400" />} 
            label="Overall Progress" 
            value={`${progressSummary?.overall_percent || 0}%`}
            color="emerald"
          />
          <StatCard 
            icon={<TrendingUp className="text-amber-400" />} 
            label="Learning Streak" 
            value="5 Days"
            color="amber"
          />
          <StatCard 
            icon={<Clock className="text-rose-400" />} 
            label="Time Spent" 
            value="12.4h"
            color="rose"
          />
        </div>

        {/* Learning Path - The Main Accordion/Grid */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black flex items-center gap-3">
              <BookOpen className="text-indigo-500" size={32} />
              Learning Journey
            </h2>
            <div className="flex gap-2">
              <span className="px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold uppercase tracking-widest">
                Level {levelId.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {weeks.map((week) => (
              <WeekCard key={week.number} week={week} />
            ))}
          </div>
        </div>

        {/* Level Footer */}
        <div className="rounded-[2.5rem] bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-white/5 p-12 text-center backdrop-blur-sm">
          <h3 className="text-2xl font-bold mb-4">You're doing amazing! 🚀</h3>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Consistency is the key to mastering English. Try to practice at least 15 minutes every day.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-3 bg-white text-indigo-900 font-bold rounded-2xl hover:scale-105 transition-transform shadow-xl shadow-white/10"
          >
            Continue Learning
          </button>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  const colors = {
    indigo: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    rose: 'bg-rose-500/10 border-rose-500/20 text-rose-400'
  };

  return (
    <div className="group p-8 rounded-[2rem] bg-slate-800/40 border border-white/5 hover:border-white/10 transition-all duration-500 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        {icon}
      </div>
      <div className={`inline-flex p-3 rounded-2xl mb-4 ${colors[color]}`}>
        {icon}
      </div>
      <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-4xl font-black text-white">{value}</p>
    </div>
  );
}

function WeekCard({ week }) {
  const isAvailable = !week.isLocked;
  
  return (
    <div className={`group relative rounded-[2.5rem] p-8 border transition-all duration-500 ${
      week.isLocked 
        ? 'bg-slate-900/40 border-white/5 opacity-60 grayscale' 
        : 'bg-slate-800/60 border-white/10 hover:border-indigo-500/50 hover:bg-slate-800/80 shadow-2xl hover:shadow-indigo-500/10'
    }`}>
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4 items-center">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${
            week.completed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-indigo-500/20 text-indigo-400'
          }`}>
            {week.number}
          </div>
          <div>
            <h3 className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors">
              {week.title}
            </h3>
            <p className="text-slate-400 font-medium">
              {week.subtitle}
            </p>
          </div>
        </div>
        {week.completed ? (
          <CheckCircle className="text-emerald-500" size={28} />
        ) : week.isLocked ? (
          <Lock className="text-slate-600" size={24} />
        ) : (
          <PlayCircle className="text-indigo-400 animate-pulse" size={28} />
        )}
      </div>

      <div className="mb-8">
        <div className="flex justify-between text-sm font-bold mb-2">
          <span className={week.completed ? 'text-emerald-400' : 'text-slate-400'}>
            {week.completed ? 'WEEK COMPLETED' : 'PROGRESS'}
          </span>
          <span className="text-slate-200">{week.progress}%</span>
        </div>
        <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-1 border border-white/5">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${
              week.completed ? 'bg-emerald-500' : 'bg-indigo-500'
            }`}
            style={{ width: `${week.progress}%` }}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button 
          disabled={week.isLocked}
          onClick={() => window.location.href = week.href}
          className={`flex-1 py-4 px-6 rounded-2xl font-black flex items-center justify-center gap-2 transition-all ${
            week.isLocked
              ? 'bg-white/5 text-slate-600'
              : 'bg-white text-indigo-950 hover:bg-indigo-50 active:scale-95 shadow-lg shadow-white/5'
          }`}
        >
          {week.isLocked ? 'Locked' : 'Start Lesson'}
          {!week.isLocked && <ChevronRight size={20} />}
        </button>
        
        {!week.isLocked && (
          <button 
            onClick={() => window.location.href = `${week.href}/exercises`}
            className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 transition-all active:scale-95"
            title="Extra Practice"
          >
            <TrendingUp size={24} />
          </button>
        )}
      </div>
    </div>
  );
}

function getWeekSubtitle(levelId, weekNum) {
  const subtitles = {
    'a1-2': {
      1: 'Verb To Be • Countries • Numbers',
      2: 'Daily Routine • Present Simple',
      3: 'Family Members • Possessive Adj.',
      4: 'My Home • There is / There are',
      5: 'Food & Shopping • Quantifiers',
      6: 'Abilities & Rules • Can/Can\'t',
      7: 'Weekend Plans • Future Going To',
      8: 'Review & Final Evaluation'
    },
    'a1-1': {
      1: 'Alphabet & Basic Greetings',
      2: 'Numbers & Personal Data',
      3: 'Colors & Common Objects',
      4: 'Basic Feelings & Emotions',
      5: 'School & Classroom Vocabulary',
      6: 'Days & Months of the Year',
      7: 'Basic Body Parts',
      8: 'Level A1.1 Final Review'
    }
  };
  return subtitles[levelId]?.[weekNum] || 'English Exploration';
}
