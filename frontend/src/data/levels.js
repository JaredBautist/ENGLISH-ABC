export const levels = {
  'a1-1': {
    id: 'a1-1',
    name: 'English A1.1',
    subtitle: 'MCER Learning Platform',
    levelLabel: 'A1.1',
    heroTitle: 'Welcome to English A1.1!',
    heroDescription:
      'Master English with our <strong>MCER/CEFR certified</strong> course. Develop the 4 essential communication skills: Listening, Reading, Speaking, and Writing. Start your journey from absolute beginner to confident communicator!',
    stats: [
      {
        icon: '📅',
        value: '8',
        label: 'Weeks',
        color: '#6366f1',
        glow: 'rgba(99,102,241,0.3)'
      },
      {
        icon: '🎯',
        value: '4',
        label: 'Skills',
        color: '#06b6d4',
        glow: 'rgba(6,182,212,0.3)'
      },
      {
        icon: '📝',
        value: '8',
        label: 'Projects',
        color: '#f59e0b',
        glow: 'rgba(245,158,11,0.3)'
      },
      {
        icon: '🏆',
        value: 'A1.1',
        label: 'Level',
        color: '#10b981',
        glow: 'rgba(16,185,129,0.3)'
      }
    ],
    slidesCta: {
      href: '/a1-1/week-1',
      title: 'Week 1 Interactive Slides',
      description: '15 slides • ABC Song • Practice Exercises • Sticker Challenges',
      button: 'Open Slides'
    },
    nav: {
      lessons: [
        {
          href: '/a1-1/week-1',
          label: 'Week 1 - Alphabet',
          icon: 'bi bi-fonts'
        },
        {
          href: '/a1-1/week-2',
          label: 'Week 2 - Greetings',
          icon: 'bi bi-chat-dots'
        }
      ],
      exercises: [
        {
          href: '/a1-1/exercises-week-1',
          label: 'Week 1 Exercises',
          icon: 'bi bi-pencil-square'
        }
      ],
      resourcesBadge: 8
    },
    progress: {
      percent: 12.5,
      currentWeek: 1,
      totalWeeks: 8,
      badge: '12.5% Complete',
      text: "You're on Week 1 of 8. Keep going! 🚀"
    },
    user: {
      name: 'Student',
      xp: '⭐ 125 XP'
    }
  },
  'a1-2': {
    id: 'a1-2',
    name: 'English A1.2',
    subtitle: 'MCER Learning Platform',
    levelLabel: 'A1.2',
    heroTitle: 'English A1.2 - Continue Your Journey!',
    heroDescription:
      'Build on your A1.1 foundation! This level takes you from basic introductions to confident everyday communication. Master <strong>Present Simple</strong>, <strong>daily routines</strong>, <strong>family descriptions</strong>, <strong>shopping</strong>, and more!',
    stats: [
      {
        icon: '📅',
        value: '8',
        label: 'Weeks',
        color: '#6366f1',
        glow: 'rgba(99,102,241,0.3)'
      },
      {
        icon: '🎯',
        value: '16',
        label: 'Classes',
        color: '#06b6d4',
        glow: 'rgba(6,182,212,0.3)'
      },
      {
        icon: '📝',
        value: '8',
        label: 'Projects',
        color: '#f59e0b',
        glow: 'rgba(245,158,11,0.3)'
      },
      {
        icon: '🏆',
        value: 'A1.2',
        label: 'Level',
        color: '#10b981',
        glow: 'rgba(16,185,129,0.3)'
      }
    ],
    slidesCta: {
      href: '/a1-2/week-1',
      title: 'Week 1 Interactive Slides',
      description: 'To be • Countries • Numbers 0-100 • Professions',
      button: 'Open Slides'
    },
    nav: {
      lessons: [
        {
          href: '/a1-2/week-1',
          label: 'Week 1 - Hello!',
          icon: 'bi bi-fonts'
        },
        {
          href: '/a1-2/week-2',
          label: 'Week 2 - Daily Routine',
          icon: 'bi bi-sunrise'
        },
        {
          href: '/a1-2/week-3',
          label: 'Week 3 - Family',
          icon: 'bi bi-people-fill'
        },
        {
          href: '/a1-2/week-4',
          label: 'Week 4 - Home',
          icon: 'bi bi-house-door'
        },
        {
          href: '/a1-2/week-5',
          label: 'Week 5 - Shopping',
          icon: 'bi bi-cart4'
        },
        {
          href: '/a1-2/week-6',
          label: 'Week 6 - I Can Do It',
          icon: 'bi bi-check2-circle'
        },
        {
          href: '/a1-2/week-7',
          label: 'Week 7 - Weekend Plans',
          icon: 'bi bi-calendar-event'
        },
        {
          href: '/a1-2/week-8',
          label: 'Week 8 - Final Review',
          icon: 'bi bi-award'
        }
      ],
      exercises: [],
      resourcesBadge: 8
    },
    progress: {
      percent: 50,
      currentWeek: 4,
      totalWeeks: 8,
      badge: '50% Complete',
      text: "You're on Week 4 of 8. Great progress! 🚀"
    },
    user: {
      name: 'Student',
      xp: '⭐ 250 XP'
    }
  }
};

export const defaultLevelId = 'a1-1';
