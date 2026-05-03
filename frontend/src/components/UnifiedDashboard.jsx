import React, { useEffect, useState, useMemo } from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { apiFetch } from '../utils/api';
import { levels } from '../data/levels';
import DashboardLayout from './DashboardLayout';
import OverviewTab from './OverviewTab';
import LessonsTab from './LessonsTab';
import ListeningTab from './ListeningTab';
import WritingTab from './WritingTab';
import SpeakingTab from './SpeakingTab';

/**
 * Unified Dashboard - Principal entry point for the Student Experience
 * Redesigned with Sidebar navigation and multiple learning sections.
 */
export default function UnifiedDashboard({ levelId = 'a1-2' }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [progressSummary, setProgressSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const levelData = levels[levelId] || levels['a1-1'];

  useEffect(() => {
    let isActive = true;
    const loadProgress = async () => {
      try {
        const data = await apiFetch('/students/me/progress-summary/');
        if (isActive) {
          setProgressSummary(normalizeProgressSummary(data));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading progress:', error);
        if (isActive) setLoading(false);
      }
    };
    loadProgress();
    const interval = setInterval(loadProgress, 30000);
    const onFocus = () => loadProgress();
    const onStorage = (event) => {
      if (event.key === 'student-progress-last-update') {
        loadProgress();
      }
    };
    window.addEventListener('focus', onFocus);
    window.addEventListener('storage', onStorage);
    return () => {
      isActive = false;
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  // Prepare weeks data for LessonsTab
  const weeks = useMemo(() => {
    const totalWeeks = 8;
    const weeksArr = [];
    const progressWeeks = Array.isArray(progressSummary?.weeks) ? progressSummary.weeks : [];
    const weekByNumber = new Map(
      progressWeeks
        .filter((w) => w && Number.isFinite(Number(w.week_number)))
        .map((w) => [Number(w.week_number), w])
    );
    const currentWeek = Math.max(1, Math.min(totalWeeks, Number(progressSummary?.current_week) || 1));
    
    for (let i = 1; i <= totalWeeks; i++) {
      const weekProgress = weekByNumber.get(i) || { completion_percent: 0, unlocked: i === 1 };
      const weekStatic = levelData.nav.lessons.find(l => l.href.includes(`week-${i}`)) || {
        label: `Week ${i}`,
        icon: 'bi bi-journal',
        href: `/${levelId}/week-${i}`
      };
      const rawCompletion = Math.max(0, Math.min(100, Number(weekProgress.completion_percent) || 0));
      const isUnlocked = i <= currentWeek;
      const completionPercent = isUnlocked ? rawCompletion : 0;
      
      weeksArr.push({
        number: i,
        title: weekStatic.label,
        subtitle: getWeekSubtitle(levelId, i),
        progress: Math.round(completionPercent),
        completed: isUnlocked && completionPercent >= 100,
        isLocked: !isUnlocked,
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

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewTab 
            user={user} 
            progressSummary={progressSummary} 
            levelData={levelData} 
            levelId={levelId} 
          />
        );
      case 'lessons':
        return (
          <LessonsTab 
            weeks={weeks} 
            levelId={levelId} 
          />
        );
      case 'listening':
        return <ListeningTab levelId={levelId} />;
      case 'writing':
        return <WritingTab levelId={levelId} />;
      case 'speaking':
        return <SpeakingTab levelId={levelId} />;
      default:
        return <OverviewTab user={user} progressSummary={progressSummary} levelData={levelData} levelId={levelId} />;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderActiveTab()}
    </DashboardLayout>
  );
}

function normalizeProgressSummary(data) {
  if (!data || typeof data !== 'object') return data;

  const totalWeeks = Number(data.total_weeks) || 8;
  const rawWeeks = Array.isArray(data.weeks) ? data.weeks : [];
  const validWeeks = rawWeeks.filter((w) => w && Number.isFinite(Number(w.week_number)));
  const weekByNumber = new Map(validWeeks.map((w) => [Number(w.week_number), w]));
  let orderedWeeks = Array.from({ length: totalWeeks }, (_, idx) => {
    const weekNumber = idx + 1;
    const source = weekByNumber.get(weekNumber) || { week_number: weekNumber, completion_percent: 0, unlocked: weekNumber === 1 };
    const completion = Math.max(0, Math.min(100, Number(source.completion_percent) || 0));
    return { ...source, week_number: weekNumber, completion_percent: completion };
  });

  const safeCurrentWeek = Math.max(1, Math.min(totalWeeks, Number(data.current_week) || 1));

  // Data repair: if student is at week 1 but has progress in future weeks, reset to clean start.
  const hasFutureProgressAtWeek1 = safeCurrentWeek === 1 && orderedWeeks.slice(1).some((w) => (Number(w.completion_percent) || 0) > 0);
  if (hasFutureProgressAtWeek1) {
    orderedWeeks = orderedWeeks.map((w) => ({ ...w, completion_percent: 0, status: 'not_started' }));
  }

  // Overall = real course progress across all weeks (0..100)
  const totalCompletion = orderedWeeks.reduce((sum, w) => sum + (Number(w.completion_percent) || 0), 0);
  const computedOverall = totalWeeks > 0 ? totalCompletion / totalWeeks : 0;

  return {
    ...data,
    weeks: orderedWeeks,
    overall_percent: Math.round(computedOverall * 100) / 100,
    current_week: safeCurrentWeek,
  };
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
