export const createSlidePageTransform = ({ dashboardHref, levelCode, weekNumber }) => {
  return (doc) => {
    if (!doc || !doc.body) return;

    const existing = doc.getElementById('slide-global-actions');
    if (existing) return;

    const style = doc.createElement('style');
    style.textContent = `
      .slide-global-actions {
        position: fixed;
        top: 16px;
        right: 16px;
        z-index: 9999;
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }

      .slide-action-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 10px 14px;
        border-radius: 999px;
        font-weight: 700;
        font-size: 0.9rem;
        text-decoration: none;
        box-shadow: 0 8px 20px rgba(15, 23, 42, 0.2);
        transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
      }

      .slide-action-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 10px 24px rgba(15, 23, 42, 0.28);
        opacity: 0.95;
      }

      .slide-action-home {
        background: linear-gradient(135deg, #4f46e5, #06b6d4);
        color: #fff;
      }

      .slide-action-complete {
        background: linear-gradient(135deg, #16a34a, #22c55e);
        color: #fff;
      }

      .slide-action-home[aria-busy="true"] {
        opacity: 0.7;
        pointer-events: none;
      }

      .slide-action-complete[aria-busy="true"] {
        opacity: 0.7;
        pointer-events: none;
      }

      @media (max-width: 640px) {
        .slide-global-actions {
          top: 10px;
          right: 10px;
          left: 10px;
          justify-content: flex-end;
        }

        .slide-action-btn {
          font-size: 0.82rem;
          padding: 8px 12px;
        }
      }
    `;

    const container = doc.createElement('div');
    container.id = 'slide-global-actions';
    container.className = 'slide-global-actions';
    container.innerHTML = `
      <button type="button" class="slide-action-btn slide-action-complete" id="slide-complete-week-btn">✅ Completar semana</button>
      <a href="${dashboardHref}" class="slide-action-btn slide-action-home" id="slide-go-dashboard-btn">🏠 Volver al dashboard</a>
    `;

    const script = doc.createElement('script');
    script.textContent = `
      (function() {
        const levelCode = ${JSON.stringify(levelCode || null)};
        const weekNumber = ${JSON.stringify(weekNumber || null)};
        const dashboardHref = ${JSON.stringify(dashboardHref)};
        const button = document.getElementById('slide-go-dashboard-btn');
        const completeButton = document.getElementById('slide-complete-week-btn');
        if (!button) return;
        let weekCompleted = false;
        let lastSaved = -1;

        const getToken = () => {
          try {
            const local = JSON.parse(localStorage.getItem('english-platform-tokens') || '{}');
            const session = JSON.parse(sessionStorage.getItem('english-platform-tokens') || '{}');
            return local.access || session.access || null;
          } catch {
            return null;
          }
        };

        const resolveProgress = () => {
          const totalByArray = Array.isArray(window.slidesData) ? window.slidesData.length : 0;
          const totalByGlobal = Number(window.totalSlides || 0);
          const totalByDots = document.querySelectorAll('.dot, .slide-dot, .indicator-dot').length;
          const total = totalByArray || totalByGlobal || totalByDots || 1;

          const byIndexRaw = Number(window.currentSlideIndex ?? 0);
          const byCurrentRaw = Number(window.currentSlide ?? 0);
          const activeDot = Array.from(document.querySelectorAll('.dot, .slide-dot, .indicator-dot')).findIndex((node) => node.classList.contains('active'));
          // currentSlide is often 1-based in legacy decks; currentSlideIndex is usually 0-based.
          const byCurrent = byCurrentRaw > 0 ? byCurrentRaw - 1 : 0;
          const fallbackIndex = Number.isFinite(byIndexRaw) && byIndexRaw >= 0 ? byIndexRaw : byCurrent;
          const current = activeDot >= 0 ? activeDot : fallbackIndex;
          const boundedCurrent = Math.max(0, Math.min(total - 1, current));
          return Math.round(((boundedCurrent + 1) / total) * 10000) / 100;
        };

        const saveProgress = async (explicitPercent, force) => {
          if (!levelCode || !weekNumber) return;
          const token = getToken();
          if (!token) return;
          const partial = Math.min(resolveProgress(), 79);
          const completion = typeof explicitPercent === 'number' ? explicitPercent : partial;
          if (!force && completion <= lastSaved) return;
          await fetch('/api/students/me/progress/', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              level_code: levelCode,
              week_number: Number(weekNumber),
              completion_percent: completion,
            }),
          });
          lastSaved = completion;
        };

        const savePartialProgress = () => {
          if (weekCompleted) return;
          return saveProgress(undefined, false);
        };

        if (typeof window.addEventListener === 'function') {
          const events = ['click', 'keydown', 'touchend'];
          events.forEach((eventName) => {
            window.addEventListener(eventName, function() {
              window.setTimeout(function() {
                savePartialProgress().catch(function(error) {
                  console.error('Error saving partial progress:', error);
                });
              }, 300);
            }, true);
          });
        }

        if (completeButton) {
          completeButton.addEventListener('click', async function() {
            if (weekCompleted) return;
            completeButton.setAttribute('aria-busy', 'true');
            try {
              await saveProgress(100, true);
              weekCompleted = true;
              completeButton.textContent = '✅ Semana completada';
            } catch (error) {
              console.error('Error completing week:', error);
            } finally {
              completeButton.removeAttribute('aria-busy');
            }
          });
        };

        button.addEventListener('click', async function(event) {
          event.preventDefault();
          button.setAttribute('aria-busy', 'true');
          try {
            if (weekCompleted) {
              await saveProgress(100, true);
            } else {
              await savePartialProgress();
            }
          } catch (error) {
            console.error('Error saving slide progress:', error);
          } finally {
            window.location.href = dashboardHref;
          }
        });
      })();
    `;

    doc.head.appendChild(style);
    doc.body.appendChild(container);
    doc.body.appendChild(script);
  };
};
