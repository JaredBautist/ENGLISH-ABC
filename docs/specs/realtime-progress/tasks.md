# Tasks: Real-Time Classroom Progress & Slide Completion

- [ ] **Task 1: Backend Calculation Refinement**
  - Update `AdminOverviewView` in [`backend/apps/learning/views.py`](file:///home/balckyshadown/Escritorio/English%20Platform/backend/apps/learning/views.py) to accurately calculate `avg_completion` per grade and teacher `coverage_percent`.
  - Verify with tests in `test_api.py`.

- [ ] **Task 2: Slide Completion in DBADeck**
  - Update [`frontend/src/components/DBADeck.jsx`](file:///home/balckyshadown/Escritorio/English%20Platform/frontend/src/components/DBADeck.jsx) to accept `gradeCode`, `weekNumber`, and `onCompleted`.
  - Add debounced progress update on slide changes.
  - Add active "¡Completar clase! ✓" button on the final slide.
  - Update [`App.jsx`](file:///home/balckyshadown/Escritorio/English%20Platform/frontend/src/App.jsx) and [`TeacherWorkspace.jsx`](file:///home/balckyshadown/Escritorio/English%20Platform/frontend/src/components/TeacherWorkspace.jsx) to pass `gradeCode` and `weekNumber`.

- [ ] **Task 3: Live Progress & Quick Actions in TeacherWorkspace**
  - Add quick "Marcar completada" / "Desmarcar" action on unit cards in `TeacherWorkspace.jsx`.
  - Add auto-refresh and focus listeners for real-time sync.

- [ ] **Task 4: Real-time Refresh in AdminPanel**
  - Add background polling (every 10s) and focus listener in `AdminPanel.jsx`.
  - Add manual "Actualizar" button in header with spinner animation.

- [ ] **Task 5: Verification & End-to-End Testing**
  - Run backend tests (`python scripts/test_mysql.py`).
  - Run frontend tests (`npm test -- --run`).
  - Verify slide completion updates DB and admin overview in real time.
