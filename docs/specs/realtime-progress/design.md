# Design: Real-Time Classroom Progress & Slide Completion

## 1. Flow Diagram

```
[ Teacher in DBADeck ]
         │
         ├── (A) Slide navigation ──► Debounced POST /api/teachers/me/progress/
         │                             { grade_code, week_number, completion_percent, status: 'in_progress' }
         │
         └── (B) Click "Completar clase" ──► POST /api/teachers/me/progress/
                                             { grade_code, week_number, completion_percent: 100, status: 'completed' }
                                             │
                                             ▼
                                     Notify callback / return to workspace
                                             │
                                             ▼
                                     [ TeacherWorkspace ]
                                     Instant summary reload & real-time badge update
                                             │
                                             ▼
                                     [ AdminPanel ]
                                     Polled every 10s or window focus
                                     Shows updated units viewed, completed, & % coverage
```

## 2. API Contract
- **Endpoint:** `POST /api/teachers/me/progress/`
- **Payload:**
  ```json
  {
    "grade_code": "primero",
    "week_number": 1,
    "completion_percent": 100,
    "status": "completed"
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "grade_code": "primero",
    "week_number": 1,
    "completion_percent": 100.0,
    "status": "completed",
    "last_activity": "2026-10-01T18:55:00Z"
  }
  ```

## 3. Component Details
- `DBADeck.jsx`:
  - Receives `gradeCode` and `weekNumber`.
  - When `current === total - 1`, button changes to "¡Completar clase! ✓".
  - Clicking saves 100% completed status and optionally navigates back to dashboard with toast notification.
- `TeacherWorkspace.jsx`:
  - Adds direct completion toggle button for teachers on each unit card.
  - Automatically reloads `summary` on closing deck (`onCloseDeck`).
  - Sets up periodic background refresh and focus listener.
- `AdminPanel.jsx`:
  - Sets up periodic background refresh (10s) and window focus listener.
  - Adds a dedicated "Actualizar" button with spinning icon in the overview header.
- `backend/apps/learning/views.py`:
  - Update `grade_rows` in `AdminOverviewView` so `avg_completion` correctly computes `round((units_completed / modules_count) * 100, 2)` instead of unweighted row averages.
