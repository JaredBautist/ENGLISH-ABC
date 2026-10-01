# Requirements: Real-Time Classroom Progress & Slide Completion

## Purpose
Ensure that teaching progress in the classroom is recorded, updated, and visible in real time both for teachers in their workspace and for administrators in the institutional overview.

## Scope
1. Slide progression and unit completion in [`DBADeck.jsx`](file:///home/balckyshadown/Escritorio/English%20Platform/frontend/src/components/DBADeck.jsx).
2. Live progress updates and manual completion toggle in [`TeacherWorkspace.jsx`](file:///home/balckyshadown/Escritorio/English%20Platform/frontend/src/components/TeacherWorkspace.jsx).
3. Real-time background sync and refresh controls in [`AdminPanel.jsx`](file:///home/balckyshadown/Escritorio/English%20Platform/frontend/src/components/AdminPanel.jsx).
4. Accurate grade completion percentage calculation in [`backend/apps/learning/views.py`](file:///home/balckyshadown/Escritorio/English%20Platform/backend/apps/learning/views.py).

## Acceptance Criteria
- [x] **AC-1 (Slide Completion):** WHEN a teacher reaches the last slide or clicks "Completar clase", the system SHALL send `POST /api/teachers/me/progress/` with `completion_percent: 100` and `status: 'completed'`.
- [x] **AC-2 (Progressive Slide Tracking):** WHILE navigating slides, the system SHALL update the progress percentage (debounced) so partial classroom views are recorded.
- [x] **AC-3 (Workspace Quick Action):** Teachers SHALL be able to mark or unmark a unit as completed directly from the unit list in [`TeacherWorkspace.jsx`](file:///home/balckyshadown/Escritorio/English%20Platform/frontend/src/components/TeacherWorkspace.jsx).
- [x] **AC-4 (Immediate Workspace Sync):** WHEN a unit progress changes or a teacher exits the slide deck, the workspace summary SHALL reload immediately without requiring a browser refresh.
- [x] **AC-5 (Admin Real-Time Sync):** In [`AdminPanel.jsx`](file:///home/balckyshadown/Escritorio/English%20Platform/frontend/src/components/AdminPanel.jsx), the institutional overview SHALL sync automatically via background polling (every 10s + window focus) and provide an immediate "Actualizar datos" button.
- [x] **AC-6 (Accurate Metrics):** Grade progress in `AdminOverviewView` SHALL reflect `(completed_units / total_units) * 100` accurately.
