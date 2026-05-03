import { levels, defaultLevelId } from '../data/levels';

const linkMaps = {
  'a1-1': {
    'week-one-alphabet.html': '/a1-1/week-1',
    'week-two-greetings.html': '/a1-1/week-2',
    'exercises-week1.html': '/a1-1/exercises-week-1'
  },
  'a1-2': {
    'week one.html': '/a1-2/week-1',
    'week two.html': '/a1-2/week-2',
    'week three.html': '/a1-2/week-3',
    'week four.html': '/a1-2/week-4',
    'week five.html': '/a1-2/week-5',
    'week six.html': '/a1-2/week-6',
    'week seven.html': '/a1-2/week-7',
    'week eight.html': '/a1-2/week-8'
  }
};

const setText = (element, text) => {
  if (element) {
    element.textContent = text;
  }
};

const buildStatCards = (stats) =>
  stats
    .map(
      (stat) => `
      <div class="stat-card" style="--stat-color: ${stat.color}; --stat-glow: ${stat.glow};">
        <span class="stat-icon">${stat.icon}</span>
        <p class="stat-value">${stat.value}</p>
        <p class="stat-label">${stat.label}</p>
      </div>`
    )
    .join('');

const getWeekFromHref = (href) => {
  const match = href && href.match(/\/week-(\d+)/);
  return match ? Number(match[1]) : null;
};

const buildNavItem = (doc, item) => {
  const container = doc.createElement('div');
  container.className = 'nav-item';
  const target = item.external ? ' target="_blank"' : '';
  const badge = item.badge ? `<span class="nav-badge">${item.badge}</span>` : '';
  const externalIcon = item.external
    ? '<i class="bi bi-box-arrow-up-right" style="margin-left: auto; font-size: 0.8em;"></i>'
    : '';
  const weekNumber = getWeekFromHref(item.href);
  const weekAttr = weekNumber ? ` data-week-number="${weekNumber}"` : '';
  container.innerHTML = `
    <a href="${item.href}" class="nav-link"${target}${weekAttr}>
      <i class="${item.icon}"></i>
      <span>${item.label}</span>
      ${badge}
      ${externalIcon}
    </a>
  `;
  return container;
};

const updateNavSection = (doc, title, items) => {
  const sections = Array.from(doc.querySelectorAll('.nav-section'));
  const section = sections.find((node) => {
    const label = node.querySelector('.nav-section-title');
    return label && label.textContent.trim() === title;
  });

  if (!section) return;

  section.querySelectorAll('.nav-item').forEach((item) => item.remove());

  if (!items || items.length === 0) {
    section.style.display = 'none';
    return;
  }

  items.forEach((item) => section.appendChild(buildNavItem(doc, item)));
};

const updateLinks = (doc, levelId) => {
  const map = linkMaps[levelId] || {};
  Object.entries(map).forEach(([from, to]) => {
    doc.querySelectorAll(`a[href="${from}"]`).forEach((anchor) => {
      anchor.setAttribute('href', to);
    });
  });
};

const updateSlidesButtons = (doc) => {
  doc.querySelectorAll('.slide-card-btn span').forEach((node) => {
    node.textContent = 'Ver diapositivas';
  });

  doc.querySelectorAll('a.slide-card, a.slide-card-btn').forEach((anchor) => {
    anchor.removeAttribute('target');
  });

  if (!doc.getElementById('dashboard-slide-btn-visibility-style')) {
    const style = doc.createElement('style');
    style.id = 'dashboard-slide-btn-visibility-style';
    style.textContent = `
      .slides-grid .slide-card-btn,
      .accordion .slide-card-btn {
        display: inline-flex !important;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 11px 18px !important;
        min-height: 44px;
        color: #ffffff !important;
        background: linear-gradient(135deg, #6366f1, #8b5cf6 55%, #a855f7) !important;
        font-weight: 700;
        font-size: 0.92rem;
        letter-spacing: 0.2px;
        border: 1px solid rgba(255, 255, 255, 0.22);
        border-radius: 999px !important;
        box-shadow: 0 10px 24px rgba(99, 102, 241, 0.34);
        text-decoration: none !important;
        transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
      }

      .slides-grid .slide-card-btn:hover,
      .accordion .slide-card-btn:hover {
        transform: translateY(-1px);
        filter: brightness(1.04);
        box-shadow: 0 14px 30px rgba(99, 102, 241, 0.42);
      }

      .slides-grid .slide-card-btn span,
      .accordion .slide-card-btn span,
      .slides-grid .slide-card-btn i,
      .accordion .slide-card-btn i {
        color: #ffffff !important;
      }
    `;
    doc.head.appendChild(style);
  }
};

const removeSlidesCta = (doc) => {
  const cta = doc.querySelector('.slides-cta');
  if (cta) {
    cta.remove();
  }
};

const updateProgress = (doc, progress) => {
  if (!progress) return;
  const badge = doc.querySelector('.progress-badge');
  setText(badge, progress.badge);

  const text = doc.querySelector('.progress-text');
  if (text) {
    text.innerHTML = `You're on <strong>Week ${progress.currentWeek} of ${progress.totalWeeks}</strong>. ${progress.currentWeek === progress.totalWeeks ? 'Great work! 🎉' : 'Keep going! 🚀'}`;
  }

  const bar = doc.querySelector('.progress-bar-fill');
  if (bar) {
    bar.style.width = `${progress.percent}%`;
  }

  const milestones = doc.querySelector('.progress-milestones');
  if (milestones) {
    const items = Array.from({ length: progress.totalWeeks }).map((_, index) => {
      const active = index < progress.currentWeek ? ' active' : '';
      return `<div class="milestone${active}"></div>`;
    });
    milestones.innerHTML = items.join('');
  }
};

const applyDynamicProgress = (doc, summary) => {
  if (!summary || !summary.total_weeks) return;
  const totalWeeks = summary.total_weeks;
  const currentWeek = summary.current_week || 1;
  const percent = Number(summary.overall_percent || 0);

  const badge = doc.querySelector('.progress-badge');
  setText(badge, `${percent}% Complete`);

  const text = doc.querySelector('.progress-text');
  if (text) {
    text.innerHTML = `You're on <strong>Week ${currentWeek} of ${totalWeeks}</strong>. ${currentWeek === totalWeeks ? 'Great work! 🎉' : 'Keep going! 🚀'}`;
  }

  const bar = doc.querySelector('.progress-bar-fill');
  if (bar) {
    bar.style.width = `${percent}%`;
  }

  const milestones = doc.querySelector('.progress-milestones');
  if (milestones) {
    const weeks = summary.weeks || [];
    milestones.innerHTML = weeks
      .map((week) => `<div class="milestone${week.completion_percent > 0 ? ' active' : ''}"></div>`)
      .join('');
  }
};

const applyWeekUnlockState = (doc, summary) => {
  if (!summary || !Array.isArray(summary.weeks)) return;
  const unlockedByWeek = new Map(summary.weeks.map((week) => [Number(week.week_number), Boolean(week.unlocked)]));

  if (!doc.getElementById('dashboard-week-lock-style')) {
    const style = doc.createElement('style');
    style.id = 'dashboard-week-lock-style';
    style.textContent = `
      .nav-link.week-locked {
        opacity: 0.55;
        filter: grayscale(0.15);
        cursor: not-allowed;
      }
      .nav-link.week-locked:hover {
        transform: none !important;
      }
      .nav-link.week-locked .lock-badge {
        margin-left: auto;
        font-size: 0.74em;
        font-weight: 700;
        background: rgba(148, 163, 184, 0.2);
        border: 1px solid rgba(148, 163, 184, 0.35);
        border-radius: 999px;
        padding: 2px 8px;
        color: #cbd5e1;
      }
      a.week-locked-content {
        pointer-events: none;
        opacity: 0.6;
        filter: grayscale(0.15);
      }
    `;
    doc.head.appendChild(style);
  }

  doc.querySelectorAll('.nav-link[data-week-number]').forEach((anchor) => {
    const weekNumber = Number(anchor.getAttribute('data-week-number'));
    const unlocked = unlockedByWeek.get(weekNumber);
    const oldBadge = anchor.querySelector('.lock-badge');
    if (oldBadge) oldBadge.remove();
    anchor.classList.remove('week-locked');
    anchor.removeAttribute('data-locked');
    anchor.removeAttribute('title');

    if (unlocked === false) {
      anchor.classList.add('week-locked');
      anchor.setAttribute('data-locked', 'true');
      anchor.setAttribute('title', 'Completa la semana anterior al 80% para desbloquear');
      const badge = doc.createElement('span');
      badge.className = 'lock-badge';
      badge.textContent = 'Locked';
      anchor.appendChild(badge);
      anchor.setAttribute('href', '#');
    }
  });

  doc.querySelectorAll('a[href*="/week-"]').forEach((anchor) => {
    const href = anchor.getAttribute('href') || '';
    const weekNumber = getWeekFromHref(href);
    if (!weekNumber) return;
    const unlocked = unlockedByWeek.get(weekNumber);
    if (unlocked === false) {
      anchor.classList.add('week-locked-content');
      if (!anchor.getAttribute('data-original-href')) {
        anchor.setAttribute('data-original-href', href);
      }
      anchor.setAttribute('href', '#');
      anchor.setAttribute('title', 'Completa la semana anterior al 80% para desbloquear');
    }
  });
};

const installWeekLockClickGuard = (doc) => {
  if (doc.getElementById('dashboard-week-lock-guard-script')) return;
  const script = doc.createElement('script');
  script.id = 'dashboard-week-lock-guard-script';
  script.textContent = `
    document.addEventListener('click', function(event) {
      const lockedLink = event.target.closest('.nav-link[data-locked="true"]');
      if (!lockedLink) return;
      event.preventDefault();
      event.stopPropagation();
      if (typeof window.showToast === 'function') {
        window.showToast('Semana bloqueada', 'Completa la semana anterior al 80% para desbloquearla.', '🔒');
      } else {
        window.alert('Completa la semana anterior al 80% para desbloquear esta semana.');
      }
    }, true);
  `;
  doc.body.appendChild(script);
};

const updateStats = (doc, stats) => {
  const statsRow = doc.querySelector('.stats-row');
  if (statsRow) {
    statsRow.innerHTML = buildStatCards(stats);
  }
};

const updateHero = (doc, level) => {
  const hero = doc.querySelector('.content-area > .welcome-banner');
  if (!hero) return;
  const title = hero.querySelector('h1');
  if (title) {
    title.innerHTML = `<span>🚀</span> ${level.heroTitle}`;
  }
  const description = hero.querySelector('p');
  if (description) {
    description.innerHTML = level.heroDescription;
  }
};

const replaceSection = (doc, sourceDoc, selector) => {
  const target = doc.querySelector(selector);
  const source = sourceDoc.querySelector(selector);
  if (target && source) {
    target.innerHTML = source.innerHTML;
  }
};

const updateUserInfo = (doc, level, user) => {
  const username = user?.username || 'Student';
  const userLevel = (user?.level || level.levelLabel || '').toUpperCase();

  setText(doc.querySelector('.brand-info h1'), level.name);
  setText(doc.querySelector('.user-name'), username);
  setText(doc.querySelector('.user-level'), `Level ${userLevel}`);

  const xp = doc.querySelector('.user-xp');
  if (xp) {
    xp.remove();
  }
};

const ensureDashboardLogoutButton = (doc) => {
  const footer = doc.querySelector('.sidebar-footer');
  if (!footer) return;

  if (!doc.getElementById('dashboard-logout-style')) {
    const style = doc.createElement('style');
    style.id = 'dashboard-logout-style';
    style.textContent = `
      .dashboard-logout-btn {
        width: 100%;
        margin-top: 10px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 10px 14px;
        border-radius: 12px;
        text-decoration: none;
        font-weight: 700;
        color: #fff;
        background: linear-gradient(135deg, #dc2626, #f43f5e);
        box-shadow: 0 8px 20px rgba(220, 38, 38, 0.25);
        transition: transform 0.2s ease, opacity 0.2s ease;
      }

      .dashboard-logout-btn:hover {
        color: #fff;
        opacity: 0.95;
        transform: translateY(-1px);
      }
    `;
    doc.head.appendChild(style);
  }

  let logoutLink = doc.getElementById('dashboard-logout-btn');
  if (!logoutLink) {
    logoutLink = doc.createElement('a');
    logoutLink.id = 'dashboard-logout-btn';
    logoutLink.className = 'dashboard-logout-btn';
    logoutLink.setAttribute('href', '/logout');
    logoutLink.innerHTML = '<span>🚪</span><span>Cerrar sesión</span>';
    footer.appendChild(logoutLink);
  }
};

const updateListeningBadge = (doc, badgeValue) => {
  const listeningLink = doc.querySelector('.nav-link[href="#listening"]');
  if (!listeningLink) return;
  const badge = listeningLink.querySelector('.nav-badge');
  if (badge) {
    badge.textContent = badgeValue;
  }
};

const enrichA12UpcomingWeeks = (doc) => {
  const weekMeta = {
    '1': {
      subtitle: 'To Be (all forms) • Adjectives • Personal Info',
      mcer: [
        { icon: '🎧', title: 'Listening', desc: 'Understand introductions and basic questions', color: '#ff6b6b' },
        { icon: '📖', title: 'Reading', desc: 'Read profiles and ID cards', color: '#4ecdc4' },
        { icon: '🗣️', title: 'Speaking', desc: 'Introduce yourself with name, age, country', color: '#ffe66d' },
        { icon: '✍️', title: 'Writing', desc: 'Write 3 sentences about yourself', color: '#1dd1a1' },
      ],
      topics: ['✅ To be (am/is/are)', '🌍 Countries', '🔢 Numbers 0-100', '👩‍🏫 Professions'],
      portfolio: ['Write 3 short sentences: name, age, favorite number', 'Record 20-30 second self-introduction'],
      href: '/a1-2/week-1',
      label: 'Ver diapositivas Week 1',
      exerciseHref: 'exercises-week1.html',
      exerciseLabel: 'Practice Week 1'
    },
    '2': {
      subtitle: 'Present Simple • WH Questions • Time',
      mcer: [
        { icon: '🎧', title: 'Listening', desc: 'Understand daily routine descriptions', color: '#ff6b6b' },
        { icon: '📖', title: 'Reading', desc: 'Read schedules and routine texts', color: '#4ecdc4' },
        { icon: '🗣️', title: 'Speaking', desc: 'Describe your daily routine with times', color: '#ffe66d' },
        { icon: '✍️', title: 'Writing', desc: 'Write "My Daily Routine" (8-10 sentences)', color: '#1dd1a1' },
      ],
      topics: ['📝 Present Simple', '❓ WH Questions', '🕐 Telling Time', '🔄 Adverbs'],
      portfolio: ['Write "My Daily Routine" (8-10 sentences)', 'Create 6 interview questions'],
      href: '/a1-2/week-2',
      label: 'Ver diapositivas Week 2',
      exerciseHref: 'exercises-week2.html',
      exerciseLabel: 'Practice Week 2'
    },
    '3': {
      subtitle: 'Have/Has Got • Adjectives • Personality',
      mcer: [
        { icon: '🎧', title: 'Listening', desc: 'Understand family descriptions', color: '#ff6b6b' },
        { icon: '📖', title: 'Reading', desc: 'Read family trees and descriptions', color: '#4ecdc4' },
        { icon: '🗣️', title: 'Speaking', desc: 'Describe family and friends', color: '#ffe66d' },
        { icon: '✍️', title: 'Writing', desc: 'Describe a family member (6-8 sentences)', color: '#1dd1a1' },
      ],
      topics: ['✅ Have/Has Got', '❤️ Adjectives', '👉 Demonstratives', '👪 Family'],
      portfolio: ['Describe a family member (6-8 sentences)', 'Vocabulary: 10 adjectives with examples'],
      href: '/a1-2/week-3',
      label: 'Ver diapositivas Week 3',
      exerciseHref: 'exercises-week3.html',
      exerciseLabel: 'Practice Week 3'
    },
    '4': {
      subtitle: 'There is/are • Prepositions • Places',
      mcer: [
        { icon: '🎧', title: 'Listening', desc: 'Understand house descriptions', color: '#ff6b6b' },
        { icon: '📖', title: 'Reading', desc: 'Read floor plans and property descriptions', color: '#4ecdc4' },
        { icon: '🗣️', title: 'Speaking', desc: 'Describe your house and neighborhood', color: '#ffe66d' },
        { icon: '✍️', title: 'Writing', desc: 'Write "My Neighborhood" (60-80 words)', color: '#1dd1a1' },
      ],
      topics: ['🏠 There is/are', '📍 Prepositions', '🛋️ Furniture', '🏪 Places in Town'],
      portfolio: ['Write "My Neighborhood" (60-80 words)', '8 sentences with there is/are'],
      href: '/a1-2/week-4',
      label: 'Ver diapositivas Week 4',
      exerciseHref: 'exercises-week4.html',
      exerciseLabel: 'Practice Week 4'
    },
    '5': {
      subtitle: 'Some/Any • How much/how many • Food',
      mcer: [
        { icon: '🎧', title: 'Listening', desc: 'Understand shopping conversations and prices', color: '#ff6b6b' },
        { icon: '📖', title: 'Reading', desc: 'Read shopping lists and store ads', color: '#4ecdc4' },
        { icon: '🗣️', title: 'Speaking', desc: 'Ask for products and quantities', color: '#ffe66d' },
        { icon: '✍️', title: 'Writing', desc: 'Create a complete shopping list', color: '#1dd1a1' },
      ],
      topics: ['🧺 Some/Any', '⚖️ How much/how many', '🥛 Countable vs Uncountable', '🛒 Shopping language'],
      portfolio: ['Write a shopping list with 10 items and quantities', 'Role play: customer and cashier dialogue'],
      href: '/a1-2/week-5',
      label: 'Ver diapositivas Week 5',
      exerciseHref: 'exercises-week5.html',
      exerciseLabel: 'Practice Week 5'
    },
    '6': {
      subtitle: 'Can/Can\'t • Imperatives • Abilities',
      mcer: [
        { icon: '🎧', title: 'Listening', desc: 'Understand abilities and classroom commands', color: '#ff6b6b' },
        { icon: '📖', title: 'Reading', desc: 'Read simple rules and instructions', color: '#4ecdc4' },
        { icon: '🗣️', title: 'Speaking', desc: 'Talk about what you can and can\'t do', color: '#ffe66d' },
        { icon: '✍️', title: 'Writing', desc: 'Write rules using imperative forms', color: '#1dd1a1' },
      ],
      topics: ['✅ Can/Can\'t', '📢 Imperatives', '🏫 Classroom rules', '🙋 Permission language'],
      portfolio: ['Write 10 classroom rules (5 positive, 5 negative)', 'Record an audio: My abilities and skills'],
      href: '/a1-2/week-6',
      label: 'Ver diapositivas Week 6',
      exerciseHref: 'exercises-week6.html',
      exerciseLabel: 'Practice Week 6'
    },
    '7': {
      subtitle: 'Like + -ing • Going to • Hobbies',
      mcer: [
        { icon: '🎧', title: 'Listening', desc: 'Understand weekend plans and hobbies', color: '#ff6b6b' },
        { icon: '📖', title: 'Reading', desc: 'Read short texts about free time', color: '#4ecdc4' },
        { icon: '🗣️', title: 'Speaking', desc: 'Describe likes and future plans', color: '#ffe66d' },
        { icon: '✍️', title: 'Writing', desc: 'Write your weekend agenda', color: '#1dd1a1' },
      ],
      topics: ['❤️ Like + -ing', '📅 Going to', '🎨 Hobbies', '🌤️ Weekend plans'],
      portfolio: ['Write your weekend plan (8-10 sentences)', 'Interview a classmate about hobbies'],
      href: '/a1-2/week-7',
      label: 'Ver diapositivas Week 7',
      exerciseHref: 'exercises-week7.html',
      exerciseLabel: 'Practice Week 7'
    },
    '8': {
      subtitle: 'Complete Review • Final Project • Assessment',
      mcer: [
        { icon: '🎧', title: 'Listening', desc: 'Review core listening comprehension A1.2', color: '#ff6b6b' },
        { icon: '📖', title: 'Reading', desc: 'Integrate vocabulary and grammar from all weeks', color: '#4ecdc4' },
        { icon: '🗣️', title: 'Speaking', desc: 'Present a final personal project', color: '#ffe66d' },
        { icon: '✍️', title: 'Writing', desc: 'Final integrated writing task', color: '#1dd1a1' },
      ],
      topics: ['🧠 Grammar review', '📚 Vocabulary integration', '🎤 Final speaking', '🏁 Self-evaluation'],
      portfolio: ['Final project presentation (45-60 seconds)', 'Personal reflection: What I can do in English now'],
      href: '/a1-2/week-8',
      label: 'Ver diapositivas Week 8',
      exerciseHref: 'exercises-week8.html',
      exerciseLabel: 'Practice Week 8'
    },
  };

  doc.querySelectorAll('.accordion .accordion-item').forEach((item) => {
    const badge = item.querySelector('.week-badge');
    const week = badge?.textContent?.trim();
    const meta = weekMeta[week];
    if (!meta) return;

    const subtitleNode = item.querySelector('.week-subtitle');
    if (subtitleNode) setText(subtitleNode, meta.subtitle);

    const contentInner = item.querySelector('.content-inner');
    if (!contentInner) return;

    contentInner.innerHTML = `
      <div class="mcer-grid">
        ${meta.mcer
          .map(
            (card) => `<div class="mcer-card" style="--mcer-color: ${card.color};"><span class="mcer-icon">${card.icon}</span><div class="mcer-title">${card.title}</div><div class="mcer-desc">${card.desc}</div></div>`
          )
          .join('')}
      </div>
      <div class="topics-grid">
        ${meta.topics.map((topic) => {
          const [emoji, ...rest] = topic.split(' ');
          return `<div class="topic-chip"><span class="topic-emoji">${emoji}</span><p class="topic-text">${rest.join(' ')}</p></div>`;
        }).join('')}
      </div>
      <div class="portfolio-section">
        <div class="portfolio-header"><i class="bi bi-folder-check" style="color: var(--accent);"></i><h4 class="portfolio-title">MCER Portfolio</h4></div>
        <div class="portfolio-items">
          ${meta.portfolio.map((itemText) => `<div class="portfolio-item"><span class="portfolio-check">✓</span><span>${itemText}</span></div>`).join('')}
        </div>
      </div>
      <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 20px;">
        <a href="${meta.href}" class="slide-card-btn" style="display: inline-flex;">
          <i class="bi bi-play-fill"></i>
          <span>${meta.label}</span>
        </a>
        ${meta.exerciseHref ? `
        <a href="${meta.exerciseHref}" target="_blank" class="slide-card-btn" style="display: inline-flex; background: linear-gradient(135deg, #06b6d4, #3b82f6) !important; box-shadow: 0 10px 24px rgba(6, 182, 212, 0.34) !important;">
          <i class="bi bi-pencil-square"></i>
          <span>${meta.exerciseLabel || 'Weekly Exercises'}</span>
        </a>
        ` : ''}
      </div>
    `;
  });
};

const enrichA11UpcomingWeeks = (doc) => {
  const weekMeta = {
    '1': {
      subtitle: 'Introduction • The Alphabet • Spelling',
      mcer: [
        { icon: '🎧', title: 'Listening', desc: 'Recognize letter sounds and spelling', color: '#ff6b6b' },
        { icon: '📖', title: 'Reading', desc: 'Read basic names and alphabet charts', color: '#4ecdc4' },
        { icon: '🗣️', title: 'Speaking', desc: 'Spell your name and basic words', color: '#ffe66d' },
        { icon: '✍️', title: 'Writing', desc: 'Write the alphabet and simple words', color: '#1dd1a1' },
      ],
      topics: ['🔤 Alphabet', '📝 Spelling', '👋 Introductions', '🔢 Numbers 1-10'],
      portfolio: ['Record audio spelling your full name', 'Write the alphabet in uppercase and lowercase'],
      href: '/a1-1/week-1',
      label: 'Ver diapositivas Week 1',
      exerciseHref: 'exercises-week1.html',
      exerciseLabel: 'Practice Week 1'
    },
    '2': {
      subtitle: 'Greetings • Verb To Be • Personal Info',
      mcer: [
        { icon: '🎧', title: 'Listening', desc: 'Understand basic greetings and introductions', color: '#ff6b6b' },
        { icon: '📖', title: 'Reading', desc: 'Read simple personal profiles', color: '#4ecdc4' },
        { icon: '🗣️', title: 'Speaking', desc: 'Introduce yourself and others', color: '#ffe66d' },
        { icon: '✍️', title: 'Writing', desc: 'Complete a simple ID form', color: '#1dd1a1' },
      ],
      topics: ['👋 Greetings', '👤 Verb To Be (I/You)', '🌎 Countries', '🆔 Personal Info'],
      portfolio: ['Create a personal ID card', 'Record a 30-second self-introduction'],
      href: '/a1-1/week-2',
      label: 'Ver diapositivas Week 2',
      exerciseHref: 'exercises-week2.html',
      exerciseLabel: 'Practice Week 2'
    },
    '3': {
      subtitle: 'Colors • Shapes • Numbers 20-50',
      mcer: [
        { icon: '🎧', title: 'Listening', desc: 'Identify colors and shapes in context', color: '#ff6b6b' },
        { icon: '📖', title: 'Reading', desc: 'Read descriptions of objects', color: '#4ecdc4' },
        { icon: '🗣️', title: 'Speaking', desc: 'Describe objects using colors and shapes', color: '#ffe66d' },
        { icon: '✍️', title: 'Writing', desc: 'Write short descriptions of things', color: '#1dd1a1' },
      ],
      topics: ['🎨 Colors', '🔷 Shapes', '🔢 Numbers 20-50', '🎒 Classroom objects'],
      portfolio: ['Describe 5 objects in your room', 'Record audio naming 10 colors'],
      href: '/a1-1/week-3',
      label: 'Ver diapositivas Week 3',
      exerciseHref: 'exercises-week3.html',
      exerciseLabel: 'Practice Week 3'
    },
    '4': {
      subtitle: 'Family Members • Possessive Adjectives',
      mcer: [
        { icon: '🎧', title: 'Listening', desc: 'Understand family relationship descriptions', color: '#ff6b6b' },
        { icon: '📖', title: 'Reading', desc: 'Read short texts about family trees', color: '#4ecdc4' },
        { icon: '🗣️', title: 'Speaking', desc: 'Talk about your family members', color: '#ffe66d' },
        { icon: '✍️', title: 'Writing', desc: 'Write a paragraph about your family', color: '#1dd1a1' },
      ],
      topics: ['👨‍👩‍👧 Family', '👥 Possessives', '🎂 Age', '🎭 Adjectives'],
      portfolio: ['Draw and label your family tree', 'Record audio describing your family'],
      href: '/a1-1/week-4',
      label: 'Ver diapositivas Week 4',
      exerciseHref: 'exercises-week4.html',
      exerciseLabel: 'Practice Week 4'
    },
    '5': {
      subtitle: 'House Rooms • Furniture • Prepositions',
      mcer: [
        { icon: '🎧', title: 'Listening', desc: 'Identify rooms and furniture locations', color: '#ff6b6b' },
        { icon: '📖', title: 'Reading', desc: 'Read descriptions of house layouts', color: '#4ecdc4' },
        { icon: '🗣️', title: 'Speaking', desc: 'Describe your house or apartment', color: '#ffe66d' },
        { icon: '✍️', title: 'Writing', desc: 'Write a list of items in each room', color: '#1dd1a1' },
      ],
      topics: ['🏠 House', '🛋️ Furniture', '📍 Prepositions', '🌳 Garden/Yard'],
      portfolio: ['Describe your favorite room', 'Record audio tour of your home'],
      href: '/a1-1/week-5',
      label: 'Ver diapositivas Week 5',
      exerciseHref: 'exercises-week5.html',
      exerciseLabel: 'Practice Week 5'
    },
    '6': {
      subtitle: 'Body Parts • Clothes • Present Continuous',
      mcer: [
        { icon: '🎧', title: 'Listening', desc: 'Understand body parts and clothing items', color: '#ff6b6b' },
        { icon: '📖', title: 'Reading', desc: 'Read descriptions of what people wear', color: '#4ecdc4' },
        { icon: '🗣️', title: 'Speaking', desc: 'Describe what you are wearing today', color: '#ffe66d' },
        { icon: '✍️', title: 'Writing', desc: 'Write a description of a person\'s outfit', color: '#1dd1a1' },
      ],
      topics: ['👕 Clothes', '🦶 Body parts', '🏃 Actions', '🌈 Style'],
      portfolio: ['Record audio describing your outfit', 'Draw a person and label 10 body parts'],
      href: '/a1-1/week-6',
      label: 'Ver diapositivas Week 6',
      exerciseHref: 'exercises-week6.html',
      exerciseLabel: 'Practice Week 6'
    },
    '7': {
      subtitle: 'Food & Drinks • Likes/Dislikes',
      mcer: [
        { icon: '🎧', title: 'Listening', desc: 'Understand food orders and preferences', color: '#ff6b6b' },
        { icon: '📖', title: 'Reading', desc: 'Read simple menus and food lists', color: '#4ecdc4' },
        { icon: '🗣️', title: 'Speaking', desc: 'Order food and express preferences', color: '#ffe66d' },
        { icon: '✍️', title: 'Writing', desc: 'Create a weekly meal plan', color: '#1dd1a1' },
      ],
      topics: ['🍎 Food', '🥤 Drinks', '😋 Likes', '🤢 Dislikes'],
      portfolio: ['Write a simple menu', 'Record audio about your favorite food'],
      href: '/a1-1/week-7',
      label: 'Ver diapositivas Week 7',
      exerciseHref: 'exercises-week7.html',
      exerciseLabel: 'Practice Week 7'
    },
    '8': {
      subtitle: 'Daily Routine • Telling Time • Review',
      mcer: [
        { icon: '🎧', title: 'Listening', desc: 'Understand routine schedules and times', color: '#ff6b6b' },
        { icon: '📖', title: 'Reading', desc: 'Read daily agendas and timetables', color: '#4ecdc4' },
        { icon: '🗣️', title: 'Speaking', desc: 'Talk about your daily activities', color: '#ffe66d' },
        { icon: '✍️', title: 'Writing', desc: 'Write your daily schedule', color: '#1dd1a1' },
      ],
      topics: ['⏰ Time', '📅 Routine', '🏫 School/Work', '🏁 Review'],
      portfolio: ['Write your daily schedule', 'Final A1.1 self-introduction recording'],
      href: '/a1-1/week-8',
      label: 'Ver diapositivas Week 8',
      exerciseHref: 'exercises-week8.html',
      exerciseLabel: 'Practice Week 8'
    },
  };

  doc.querySelectorAll('.accordion .accordion-item').forEach((item) => {
    const badge = item.querySelector('.week-badge');
    const week = badge?.textContent?.trim();
    const meta = weekMeta[week];
    if (!meta) return;

    const subtitleNode = item.querySelector('.week-subtitle');
    if (subtitleNode) setText(subtitleNode, meta.subtitle);

    const contentInner = item.querySelector('.content-inner');
    if (!contentInner) return;

    contentInner.innerHTML = `
      <div class="mcer-grid">
        ${meta.mcer
          .map(
            (card) => `<div class="mcer-card" style="--mcer-color: ${card.color};"><span class="mcer-icon">${card.icon}</span><div class="mcer-title">${card.title}</div><div class="mcer-desc">${card.desc}</div></div>`
          )
          .join('')}
      </div>
      <div class="topics-grid">
        ${meta.topics.map((topic) => {
          const [emoji, ...rest] = topic.split(' ');
          return `<div class="topic-chip"><span class="topic-emoji">${emoji}</span><p class="topic-text">${rest.join(' ')}</p></div>`;
        }).join('')}
      </div>
      <div class="portfolio-section">
        <div class="portfolio-header"><i class="bi bi-folder-check" style="color: var(--accent);"></i><h4 class="portfolio-title">MCER Portfolio</h4></div>
        <div class="portfolio-items">
          ${meta.portfolio.map((itemText) => `<div class="portfolio-item"><span class="portfolio-check">✓</span><span>${itemText}</span></div>`).join('')}
        </div>
      </div>
      <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 20px;">
        <a href="${meta.href}" class="slide-card-btn" style="display: inline-flex;">
          <i class="bi bi-play-fill"></i>
          <span>${meta.label}</span>
        </a>
        ${meta.exerciseHref ? `
        <a href="${meta.exerciseHref}" target="_blank" class="slide-card-btn" style="display: inline-flex; background: linear-gradient(135deg, #06b6d4, #3b82f6) !important; box-shadow: 0 10px 24px rgba(6, 182, 212, 0.34) !important;">
          <i class="bi bi-pencil-square"></i>
          <span>${meta.exerciseLabel || 'Weekly Exercises'}</span>
        </a>
        ` : ''}
      </div>
    `;
  });
};

const addCompleteWeekButtons = (doc, levelCode, summary) => {
  const completedWeeks = new Set();
  const unlockedByWeek = new Map();
  
  if (summary && summary.weeks) {
    summary.weeks.forEach(w => {
      if (w.completion_percent >= 100) {
        completedWeeks.add(String(w.week_number));
      }
      unlockedByWeek.set(String(w.week_number), Boolean(w.unlocked));
    });
  }

  if (!doc.getElementById('dashboard-complete-week-styles')) {
    const style = doc.createElement('style');
    style.id = 'dashboard-complete-week-styles';
    style.textContent = `
      .accordion .slide-card-btn.dashboard-complete-week-btn {
        background: linear-gradient(135deg, #10b981, #059669) !important;
        box-shadow: 0 10px 24px rgba(16, 185, 129, 0.34) !important;
      }
      .accordion .slide-card-btn.dashboard-complete-week-btn:hover {
        box-shadow: 0 14px 30px rgba(16, 185, 129, 0.42) !important;
      }
      .accordion .slide-card-btn.dashboard-complete-week-btn.completed-state {
        background: linear-gradient(135deg, #059669, #047857) !important;
        opacity: 0.8;
        cursor: default;
        pointer-events: none;
        box-shadow: none !important;
        transform: none !important;
      }
      .accordion .slide-card-btn.dashboard-complete-week-btn-locked {
        background: rgba(148, 163, 184, 0.1) !important;
        border: 1px solid rgba(148, 163, 184, 0.25) !important;
        color: rgba(203, 213, 225, 0.6) !important;
        cursor: not-allowed;
        box-shadow: none !important;
        transform: none !important;
        pointer-events: none;
      }
      .accordion .slide-card-btn.dashboard-complete-week-btn-locked span,
      .accordion .slide-card-btn.dashboard-complete-week-btn-locked i {
        color: rgba(203, 213, 225, 0.6) !important;
      }
    `;
    doc.head.appendChild(style);
  }

  doc.querySelectorAll('.accordion .accordion-item').forEach((item) => {
    const badge = item.querySelector('.week-badge');
    if (!badge) return;
    const weekNumber = badge.textContent.trim();
    
    const slideBtn = item.querySelector('.slide-card-btn:not(.dashboard-complete-week-btn)');
    if (!slideBtn) return;
    
    if (slideBtn.parentElement.classList.contains('action-buttons-container')) return;
    
    const container = doc.createElement('div');
    container.className = 'action-buttons-container';
    container.style.display = 'flex';
    container.style.gap = '10px';
    container.style.marginTop = '20px';
    container.style.flexWrap = 'wrap';
    
    slideBtn.style.marginTop = '0';
    slideBtn.parentNode.insertBefore(container, slideBtn);
    container.appendChild(slideBtn);
    
    const isCompleted = completedWeeks.has(weekNumber);
    const isUnlocked = unlockedByWeek.has(weekNumber) ? unlockedByWeek.get(weekNumber) : true;
    
    const completeBtn = doc.createElement('button');
    completeBtn.type = 'button';
    completeBtn.className = 'slide-card-btn dashboard-complete-week-btn';
    completeBtn.setAttribute('data-week', weekNumber);
    completeBtn.setAttribute('data-level', levelCode);
    completeBtn.style.border = 'none';
    completeBtn.style.marginTop = '0';
    
    if (isCompleted) {
      completeBtn.classList.add('completed-state');
      completeBtn.innerHTML = '<i class="bi bi-check-all"></i><span>Semana completada</span>';
    } else if (!isUnlocked) {
      completeBtn.classList.add('dashboard-complete-week-btn-locked');
      completeBtn.innerHTML = '<i class="bi bi-lock-fill"></i><span>Completar semana</span>';
      completeBtn.setAttribute('title', 'Completa la semana anterior al 80% para desbloquear');
    } else {
      completeBtn.innerHTML = '<i class="bi bi-check-circle-fill"></i><span>Completar semana</span>';
    }
    
    container.appendChild(completeBtn);
  });

  if (!doc.getElementById('dashboard-complete-week-script')) {
    const script = doc.createElement('script');
    script.id = 'dashboard-complete-week-script';
    script.textContent = `
      document.addEventListener('click', async function(event) {
        const btn = event.target.closest('.dashboard-complete-week-btn');
        if (!btn) return;
        event.preventDefault();
        event.stopPropagation();
        
        if (btn.classList.contains('completed-state')) return;
        if (btn.getAttribute('aria-busy') === 'true') return;
        
        const weekNumber = btn.getAttribute('data-week');
        const levelCode = btn.getAttribute('data-level');
        if (!weekNumber || !levelCode) return;
        
        btn.setAttribute('aria-busy', 'true');
        btn.style.opacity = '0.7';
        btn.style.pointerEvents = 'none';
        btn.innerHTML = '<i class="bi bi-hourglass-split"></i><span>Guardando...</span>';
        
        try {
          const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token') || null;
          
          if (!token) throw new Error('No token found');
          
          const res = await fetch('/api/students/me/progress/', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              level_code: levelCode,
              week_number: Number(weekNumber),
              completion_percent: 100,
            }),
          });
          
          if (!res.ok) throw new Error('Network error');
          
          btn.innerHTML = '<i class="bi bi-check-all"></i><span>¡Completado!</span>';
          btn.classList.add('completed-state');
          
          // Save scroll position
          const scrollPos = window.scrollY;
          
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('refresh-progress'));
            // Restore scroll position after a short delay to allow React to re-render
            setTimeout(() => {
              window.scrollTo(0, scrollPos);
            }, 50);
          }, 300);
        } catch (error) {
          console.error('Error completing week:', error);
          btn.removeAttribute('aria-busy');
          btn.style.opacity = '1';
          btn.style.pointerEvents = 'auto';
          btn.innerHTML = '<i class="bi bi-exclamation-triangle-fill"></i><span>Error. Reintentar</span>';
        }
      });
    `;
    doc.body.appendChild(script);
  }
};

export const createDashboardTransform = (levelId, sourceHtml, user, progressSummary) => {
  const level = levels[levelId] || levels[defaultLevelId];

  return (doc) => {
    doc.title = `${level.name} - MCER Learning Platform 🎓`;

    updateUserInfo(doc, level, user);
    ensureDashboardLogoutButton(doc);
    updateHero(doc, level);
    updateStats(doc, level.stats);
    removeSlidesCta(doc);
    updateProgress(doc, level.progress);
    updateNavSection(doc, 'Lessons & Slides', level.nav.lessons);
    updateNavSection(doc, 'Weekly Exercises', level.nav.exercises);
    updateListeningBadge(doc, level.nav.resourcesBadge);

    if (levelId === 'a1-2' && sourceHtml) {
      const parser = new DOMParser();
      const sourceDoc = parser.parseFromString(sourceHtml, 'text/html');
      replaceSection(doc, sourceDoc, '.accordion');
      replaceSection(doc, sourceDoc, '#listening');
      replaceSection(doc, sourceDoc, '#speaking');
      enrichA12UpcomingWeeks(doc);
    }

    if (levelId === 'a1-1' && sourceHtml) {
      const parser = new DOMParser();
      const sourceDoc = parser.parseFromString(sourceHtml, 'text/html');
      replaceSection(doc, sourceDoc, '.accordion');
      replaceSection(doc, sourceDoc, '#listening');
      replaceSection(doc, sourceDoc, '#speaking');
      enrichA11UpcomingWeeks(doc);
    }

    updateLinks(doc, levelId);
    updateSlidesButtons(doc);
    
    // Eliminar el progress card original del template HTML
    const progressCard = doc.querySelector('.progress-card');
    if (progressCard) progressCard.remove();
    
    applyDynamicProgress(doc, progressSummary);
    applyWeekUnlockState(doc, progressSummary);
    installWeekLockClickGuard(doc);
    addCompleteWeekButtons(doc, levelId, progressSummary);
  };
};
