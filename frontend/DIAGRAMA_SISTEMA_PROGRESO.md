# 📊 Diagrama del Sistema de Progreso

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Student Dashboard                            │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │         WeekProgressBar Component                   │  │  │
│  │  │  ┌──────────────────────────────────────────────┐  │  │  │
│  │  │  │  🏆 Your Progress    [45% Complete]          │  │  │  │
│  │  │  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │  │  │  │
│  │  │  │  ✅ ✅ ✅ 🔵 🔒 🔒 🔒 🔒                      │  │  │  │
│  │  │  │  W1 W2 W3 W4 W5 W6 W7 W8                     │  │  │  │
│  │  │  └──────────────────────────────────────────────┘  │  │  │
│  │  │                                                      │  │  │
│  │  │  Actualización: cada 5 segundos                     │  │  │
│  │  │  API: GET /students/me/progress-summary/            │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                            │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │         Week Cards (LessonCard)                     │  │  │
│  │  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐              │  │  │
│  │  │  │ W1 ✅│ │ W2 🔵│ │ W3 🔵│ │ W4 🔒│              │  │  │
│  │  │  │ 100% │ │ 85%  │ │ 45%  │ │  0%  │              │  │  │
│  │  │  └──────┘ └──────┘ └──────┘ └──────┘              │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Week Slideshow (A12WeekDeck)                 │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  Slide 1 → Slide 2 → Exercise → Slide 3 → ...     │  │  │
│  │  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │  │  │
│  │  │  Progress: 75% (15/20 slides)                      │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                            │  │
│  │  Guardado automático: cada 400ms (debounced)              │  │
│  │  API: POST /students/me/progress/                         │  │
│  │  Body: { level_code, week_number, completion_percent }    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Toast Notifications                          │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  ✅ Progress saved: 75%                            │  │  │
│  │  │  🔓 Week 4 unlocked! Keep going!                   │  │  │
│  │  │  🎉 Week 3 completed! 100%                         │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                            │  │
│  │  Auto-dismiss: 2-4 segundos                               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↕ HTTP/REST API
┌─────────────────────────────────────────────────────────────────┐
│                        BACKEND (Django)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              API Endpoints                                │  │
│  │                                                            │  │
│  │  POST /api/students/me/progress/                          │  │
│  │  ├─ Guarda progreso de una semana                         │  │
│  │  ├─ Calcula si desbloquea siguiente                       │  │
│  │  └─ Actualiza overall_percent                             │  │
│  │                                                            │  │
│  │  GET /api/students/me/progress-summary/                   │  │
│  │  ├─ Retorna progreso de todas las semanas                 │  │
│  │  ├─ Indica qué semanas están desbloqueadas                │  │
│  │  └─ Calcula semana actual                                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Database Models                              │  │
│  │                                                            │  │
│  │  StudentProgress                                           │  │
│  │  ├─ student (FK)                                           │  │
│  │  ├─ level_code (a1-1, a1-2)                               │  │
│  │  ├─ week_number (1-8)                                      │  │
│  │  ├─ completion_percent (0-100)                             │  │
│  │  ├─ unlocked (Boolean)                                     │  │
│  │  └─ updated_at (DateTime)                                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Business Logic                               │  │
│  │                                                            │  │
│  │  unlock_next_week(current_week, completion_percent):      │  │
│  │    if completion_percent >= 80:                            │  │
│  │      next_week = current_week + 1                          │  │
│  │      if next_week <= 8:                                    │  │
│  │        StudentProgress.objects.update(                     │  │
│  │          week_number=next_week,                            │  │
│  │          unlocked=True                                     │  │
│  │        )                                                   │  │
│  │        return True                                         │  │
│  │    return False                                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flujo de Datos Detallado

### 1. Estudiante Completa Diapositiva

```
┌─────────────────┐
│   Estudiante    │
│  navega/completa│
│   diapositiva   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│      A12WeekDeck Component          │
│                                     │
│  1. Detecta cambio (current slide)  │
│  2. Calcula progreso:               │
│     - 70% ejercicios completados    │
│     - 30% navegación                │
│  3. Debounce 400ms                  │
│  4. Llama saveProgress()            │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│   POST /students/me/progress/       │
│                                     │
│   Body: {                           │
│     level_code: "a1-2",             │
│     week_number: 3,                 │
│     completion_percent: 75.5        │
│   }                                 │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│         Backend Django              │
│                                     │
│  1. Valida datos                    │
│  2. Actualiza StudentProgress       │
│  3. Si >= 80%: desbloquea siguiente │
│  4. Calcula overall_percent         │
│  5. Retorna success                 │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│      Toast Notification             │
│                                     │
│  window.showToast(                  │
│    "Progress saved: 75%",           │
│    "success"                        │
│  )                                  │
└─────────────────────────────────────┘
```

### 2. Dashboard Actualiza Progreso

```
┌─────────────────────────────────────┐
│   WeekProgressBar Component         │
│                                     │
│  useEffect(() => {                  │
│    fetchProgress()                  │
│    setInterval(fetchProgress, 5000) │
│  }, [])                             │
└────────┬────────────────────────────┘
         │ cada 5 segundos
         ▼
┌─────────────────────────────────────┐
│  GET /students/me/progress-summary/ │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│         Backend Django              │
│                                     │
│  1. Busca todos los StudentProgress │
│  2. Calcula overall_percent         │
│  3. Determina current_week          │
│  4. Retorna JSON con weeks[]        │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│      Response JSON                  │
│                                     │
│  {                                  │
│    overall_percent: 45.5,           │
│    current_week: 3,                 │
│    total_weeks: 8,                  │
│    weeks: [                         │
│      {                              │
│        week_number: 1,              │
│        completion_percent: 100,     │
│        unlocked: true               │
│      },                             │
│      {                              │
│        week_number: 2,              │
│        completion_percent: 85,      │
│        unlocked: true               │
│      },                             │
│      {                              │
│        week_number: 3,              │
│        completion_percent: 45,      │
│        unlocked: true               │
│      },                             │
│      {                              │
│        week_number: 4,              │
│        completion_percent: 0,       │
│        unlocked: false              │
│      }                              │
│    ]                                │
│  }                                  │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│   WeekProgressBar Component         │
│                                     │
│  1. Actualiza estado local          │
│  2. Re-renderiza UI                 │
│  3. Muestra milestones actualizados │
│  4. Actualiza barra de progreso     │
└─────────────────────────────────────┘
```

---

## 🎯 Estados de los Milestones

```
┌──────────────────────────────────────────────────────────────┐
│                    Milestone States                           │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Estado 1: BLOQUEADO (🔒)                                    │
│  ┌────────┐                                                  │
│  │   🔒   │  completion_percent: 0                           │
│  │        │  unlocked: false                                 │
│  └────────┘  color: gray                                     │
│              cursor: not-allowed                             │
│                                                               │
│  Estado 2: DESBLOQUEADO (🔵)                                 │
│  ┌────────┐                                                  │
│  │   4    │  completion_percent: 0-99                        │
│  │        │  unlocked: true                                  │
│  └────────┘  color: blue gradient                            │
│              cursor: pointer                                 │
│                                                               │
│  Estado 3: EN PROGRESO (🟢)                                  │
│  ┌────────┐                                                  │
│  │   3    │  completion_percent: 1-99                        │
│  │ ━━━━━  │  unlocked: true                                  │
│  └────────┘  is_current: true                                │
│              color: blue + green border                      │
│              scale: 1.1                                      │
│                                                               │
│  Estado 4: COMPLETADO (✅)                                   │
│  ┌────────┐                                                  │
│  │   ✓    │  completion_percent: 100                         │
│  │        │  unlocked: true                                  │
│  └────────┘  color: green gradient                           │
│              checkmark icon                                  │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 📊 Cálculo de Progreso

### Progreso por Semana:

```javascript
// En A12WeekDeck.jsx

const totalSlides = 20;
const currentSlide = 15;
const exerciseSlides = 8;
const completedExercises = 6;

// Cálculo:
const exerciseProgress = (6 / 8) * 70;  // = 52.5%
const navigationProgress = (15 / 20) * 30;  // = 22.5%
const weekProgress = 52.5 + 22.5;  // = 75%

// Guardar en backend
POST /students/me/progress/
{
  level_code: "a1-2",
  week_number: 3,
  completion_percent: 75
}
```

### Progreso Global:

```javascript
// En Backend Django

weeks = [
  { week_number: 1, completion_percent: 100 },
  { week_number: 2, completion_percent: 85 },
  { week_number: 3, completion_percent: 75 },
  { week_number: 4, completion_percent: 0 },
  { week_number: 5, completion_percent: 0 },
  { week_number: 6, completion_percent: 0 },
  { week_number: 7, completion_percent: 0 },
  { week_number: 8, completion_percent: 0 }
];

// Cálculo:
const sum = 100 + 85 + 75 + 0 + 0 + 0 + 0 + 0;  // = 260
const overall_percent = 260 / 8;  // = 32.5%

// Retornar en API
GET /students/me/progress-summary/
{
  overall_percent: 32.5,
  current_week: 3,
  total_weeks: 8,
  weeks: [...]
}
```

### Lógica de Desbloqueo:

```python
# En Backend Django

def unlock_next_week(student, level_code, current_week, completion_percent):
    """
    Desbloquea la siguiente semana si se cumple el umbral
    """
    UNLOCK_THRESHOLD = 80  # 80% requerido
    
    if completion_percent >= UNLOCK_THRESHOLD:
        next_week = current_week + 1
        
        if next_week <= 8:  # Máximo 8 semanas
            StudentProgress.objects.update_or_create(
                student=student,
                level_code=level_code,
                week_number=next_week,
                defaults={'unlocked': True}
            )
            return True
    
    return False
```

---

## 🎨 Componentes Visuales

### WeekProgressBar Layout:

```
┌─────────────────────────────────────────────────────────────┐
│  🏆 Your Progress              [45% Complete]                │
├─────────────────────────────────────────────────────────────┤
│  You're on Week 3 of 8. Keep going! 🚀                      │
│                                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  [████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░]  │
│                                                              │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐         │
│  │ ✓ │ │ ✓ │ │ 3 │ │🔒 │ │🔒 │ │🔒 │ │🔒 │ │🔒 │         │
│  └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘         │
│   W1    W2    W3    W4    W5    W6    W7    W8             │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Current Week Progress                              │   │
│  │  Week 3                                      75%    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ⚠️ Complete 5% more to unlock Week 4                       │
│     Keep working through the slides!                        │
└─────────────────────────────────────────────────────────────┘
```

### Toast Notification Layout:

```
┌─────────────────────────────────────┐
│  ✅  Progress saved: 75%            │
│                                  ✕  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  🔓  Week 4 unlocked! Keep going!   │
│                                  ✕  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  🎉  Week 3 completed! 100%         │
│                                  ✕  │
└─────────────────────────────────────┘
```

---

## 🔄 Ciclo de Vida Completo

```
Día 1: Estudiante inicia Week 1
  ↓
Completa 5 diapositivas (25%)
  ↓
Backend guarda: week_1 = 25%
  ↓
Dashboard muestra: W1 en progreso (25%)
  ↓
Día 2: Completa 10 más (75%)
  ↓
Backend guarda: week_1 = 75%
  ↓
Dashboard muestra: W1 en progreso (75%)
  ↓
Día 3: Completa últimas 5 (100%)
  ↓
Backend guarda: week_1 = 100%
Backend desbloquea: week_2 = unlocked
  ↓
Toast: "🎉 Week 1 completed!"
Toast: "🔓 Week 2 unlocked!"
  ↓
Dashboard muestra:
  - W1: ✅ (verde, completado)
  - W2: 🔵 (azul, desbloqueado)
  - W3-8: 🔒 (gris, bloqueado)
  ↓
Estudiante puede acceder a Week 2
  ↓
Repite el ciclo...
```

---

## 📈 Métricas del Sistema

### Performance:

- **Actualización de progreso:** 400ms debounce
- **Consulta al backend:** Cada 5 segundos
- **Renderizado de milestones:** < 16ms (60fps)
- **Animaciones:** 200-500ms smooth transitions

### Umbrales:

- **Desbloqueo:** 80% de la semana anterior
- **Completado:** 100% de la semana
- **Notificación:** Cada 25% de progreso

### Capacidad:

- **Semanas por nivel:** 8
- **Diapositivas por semana:** 10-20
- **Ejercicios por semana:** 5-10
- **Estudiantes concurrentes:** Ilimitado (escalable)

---

**Este diagrama muestra la arquitectura completa del sistema de progreso implementado.** 🚀
