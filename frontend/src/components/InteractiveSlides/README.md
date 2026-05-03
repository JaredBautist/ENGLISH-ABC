# Interactive Slides for A1.2 English Course

## Overview

Este proyecto incluye componentes React interactivos para enseñanza de inglés A1.2 (CEFR level) con un enfoque pedagógico basado en mejores prácticas de TEFL/TESOL.

**Estructura:** 8 semanas × 15 diapositivas cada una = 120 diapositivas interactivas totales

## 📁 Estructura de Carpetas

```
frontend/src/
├── components/
│   └── InteractiveSlides/          # Componentes reutilizables
│       ├── A1_2WeekSlideshow.jsx   # Contenedor principal de una semana
│       ├── SlideContent.jsx        # Renderizador universal de diapositivas
│       ├── SlideNav.jsx            # Barra de navegación y progreso
│       ├── InteractiveActivities.jsx # Actividades: drag-drop, fill-blank, etc.
│       └── index.js                # Exportaciones
│
├── pages/
│   └── A1_2WeekSlides.jsx          # Página wrapper para routing
│
└── curriculum/                     # (Datos de contenido)
    ├── week-1.json                 # Datos de semana 1
    ├── week-2.json                 # Datos de semana 2
    └── ...week-8.json

Documentos en raíz:
├── CURRICULUM_A1.2_COMPLETE.md     # Resumen completo del curriculum
├── CURRICULUM_A1.2_WEEK1.md        # Contenido detallado Semana 1
├── ... (WEEK2-8.md)
└── SKILL.md                        # Skill de pedagogía de idiomas
```

## 🚀 Quick Start

### 1. Importar Componentes

```javascript
import { A1_2WeekSlideshow } from '@/components/InteractiveSlides';
import A1_2WeekSlides from '@/pages/A1_2WeekSlides';
```

### 2. Usar en una Página

```jsx
import A1_2WeekSlides from '@/pages/A1_2WeekSlides';

export default function Week1Lesson() {
  return <A1_2WeekSlides weekNumber={1} />;
}
```

### 3. Integrar en Router

```jsx
// En tu archivo de routes (por ejemplo, App.jsx)
import A1_2WeekSlides from '@/pages/A1_2WeekSlides';

const routes = [
  {
    path: '/a1-2/week-1',
    element: <A1_2WeekSlides weekNumber={1} />,
  },
  {
    path: '/a1-2/week-2',
    element: <A1_2WeekSlides weekNumber={2} />,
  },
  // ... continúa para semanas 3-8
];
```

## 📚 Componentes Disponibles

### 1. **A1_2WeekSlideshow** (Principal)
Contenedor que gestiona una semana completa de diapositivas.

**Props:**
- `weekData`: Object con slides, vocabulario, etc.
- `weekNumber`: 1-8
- `onComplete`: Callback cuando completa

**Ejemplo:**
```jsx
<A1_2WeekSlideshow
  weekData={weekData}
  weekNumber={1}
  onComplete={() => moveToNextWeek()}
/>
```

### 2. **SlideContent** (Universal)
Renderiza cualquier tipo de diapositiva (title, presentation, grammar, vocabulary, dialogue, etc.)

**Tipos soportados:**
- `title`: Diapositiva de título
- `presentation`: Presentación con ejemplos
- `grammar`: Explicación de gramática con tabla
- `vocabulary`: Lista de vocabulario con pronunciación
- `dialogue`: Diálogo con múltiples speakers
- `assessment`: Evaluación/Checkpoint
- `reflection`: Reflexión/Síntesis

### 3. **Interactive Activities**

#### DragDropActivity
Arrastra elementos a opciones correctas.
```jsx
<DragDropActivity
  title="Match Countries to Flags"
  instructions="Drag each country to its correct flag"
  pairs={[
    { id: 'country-1', label: 'Brazil', correctId: 'brazil', image: '🇧🇷' },
    // ...
  ]}
  onComplete={() => nextSlide()}
/>
```

#### FillInTheBlankActivity
Complunta espacios en blanco en oraciones.
```jsx
<FillInTheBlankActivity
  title="Complete the Sentences"
  sentences={[
    {
      id: 'sent-1',
      before: 'I',
      answer: 'am',
      after: 'from Mexico.',
    },
    // ...
  ]}
  onComplete={() => nextSlide()}
/>
```

#### MultipleChoiceActivity
Elige la respuesta correcta entre opciones.
```jsx
<MultipleChoiceActivity
  title="Listening Comprehension"
  question="What is Paolo's profession?"
  options={['Teacher', 'Chef', 'Doctor', 'Engineer']}
  correctAnswer="Chef"
  explanation="Paolo says 'I am a chef'"
  onComplete={() => nextSlide()}
/>
```

#### VocabularyFlashcard
Tarjetas de vocabulario con audio y pronunciación.
```jsx
<VocabularyFlashcard
  words={[
    {
      word: 'Brazil',
      pronunciation: '/brəˈzɪl/',
      meaning: 'a country in South America',
      example: 'I am from Brazil',
    },
    // ...
  ]}
  title="Countries of the World"
/>
```

### 4. **SlideNav**
Barra de navegación con progreso.
```jsx
<SlideNav
  currentSlide={3}
  totalSlides={15}
  onPrevious={() => prevSlide()}
  onNext={() => nextSlide()}
  progress={20} // percentage
/>
```

## 📊 Estructura de Datos

### Formato de Semana (weekData)

```json
{
  "id": "week-1",
  "title": "Hello! - Introductions",
  "subtitle": "Learn to introduce yourself...",
  "grammarFocus": "Present Simple of 'To Be'",
  "vocabularyCount": 40,
  "duration": "15 slides | 48 minutes",
  "culturalTheme": "Greetings Around the World",
  "slides": [
    {
      "id": "s1-1",
      "type": "title",
      "title": "Welcome to A1.2!",
      "subtitle": "Week 1: Hello!"
    },
    // ... más slides
  ]
}
```

### Formato de Slides

#### Title Slide
```json
{
  "id": "s1-1",
  "type": "title",
  "title": "Welcome to A1.2!",
  "subtitle": "Week 1: Hello!",
  "emoji": "👋"
}
```

#### Presentation Slide
```json
{
  "id": "s1-2",
  "type": "presentation",
  "title": "Global Greetings",
  "content": "People around the world...",
  "image": "6 people from different countries waving",
  "examples": [
    {
      "text": "Hello!",
      "meaning": "Formal greeting"
    }
  ]
}
```

#### Grammar Slide
```json
{
  "id": "s1-6",
  "type": "grammar",
  "title": "The Verb 'To Be'",
  "rule": "The verb 'to be' tells us WHO...",
  "table": {
    "headers": ["Pronoun", "Verb Form", "Example"],
    "rows": [
      ["I", "am", "I am Maria"],
      ["You", "are", "You are a student"]
    ]
  },
  "errors": [
    {
      "incorrect": "❌ He are a teacher",
      "correct": "✓ He is a teacher"
    }
  ]
}
```

#### Activity Slide (Drag-Drop)
```json
{
  "id": "s1-5",
  "type": "activity",
  "activityType": "drag-drop",
  "title": "Match Countries to Flags",
  "instructions": "Drag each country to its correct flag.",
  "pairs": [
    {
      "id": "country-1",
      "label": "Brazil",
      "correctId": "brazil",
      "image": "🇧🇷"
    }
  ]
}
```

## 🎨 Estilos

Los componentes usan **Tailwind CSS** (**versión 3.3.6** confirmada en tu proyecto).

### Paleta de Colores (por tipo de slide)

| Tipo | Color Principal | Gradient |
|------|-----------------|----------|
| Title | Indigo → Purple | `from-indigo-600 to-purple-600` |
| Presentation | Blue → Cyan | `from-blue-50 to-cyan-50` |
| Grammar | Green → Emerald | `from-green-50 to-emerald-50` |
| Vocabulary | Orange → Amber | `from-orange-50 to-amber-50` |
| Activity | Rosa → Rose | `from-pink-50 to-rose-50` |
| Dialogue | Purple → Violet | `from-purple-50 to-violet-50` |

## 🔊 Audio/Pronunciación

Los componentes incluyen soporte para **Web Speech API** (SpeechSynthesis).

```javascript
const playAudio = (text, lang = 'en-US') => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  }
};
```

Todas las palabras de vocabulario y ejemplos tienen botones 🔊 para reproducción de audio.

## 📝 Próximos Pasos: Convertir Curriculum a JSON

El LanguageCurriculum Agent ha generado archivos Markdown. Para usarlos en los componentes:

### Opción A: Convertir a JSON manualmente
```javascript
// curriculum/week-1.json
{
  "id": "week-1",
  "title": "Hello! - Introductions",
  // ... (llenar con datos de CURRICULUM_A1.2_WEEK1.md)
}
```

### Opción B: Crear un script de conversión
```python
# tools/markdown_to_json.py
# Lee CURRICULUM_A1.2_WEEK*.md
# Exporta a curriculum/week-*.json
```

### Opción C: Cargar dinámicamente desde Markdown
```javascript
import { marked } from 'marked';

async function loadWeekFromMarkdown(weekNumber) {
  const response = await fetch(`/CURRICULUM_A1.2_WEEK${weekNumber}.md`);
  const markdown = await response.text();
  return parseMarkdownToCurriculum(markdown);
}
```

## 💾 Gestión de Progreso

Los componentes pueden integrase con un sistema de progreso:

```javascript
// Guardar progreso del estudiante
const saveProgress = async (studentId, weekNumber, slideIndex, activityScores) => {
  await fetch('/api/progress', {
    method: 'POST',
    body: JSON.stringify({
      studentId,
      weekNumber,
      slideIndex,
      activityScores,
      completedAt: new Date(),
    }),
  });
};
```

## 🧪 Testing

Ejemplo de test para un componente:

```javascript
import { render, screen } from '@testing-library/react';
import { A1_2WeekSlideshow } from '@/components/InteractiveSlides';

test('renders first slide on mount', () => {
  const weekData = { slides: [{ id: 's1', type: 'title', title: 'Welcome' }] };
  render(<A1_2WeekSlideshow weekData={weekData} />);
  expect(screen.getByText('Welcome')).toBeInTheDocument();
});
```

## ✅ Features Implementados

✅ 4 tipos de actividades interactivas (drag-drop, fill-blank, multiple-choice, flashcards)  
✅ Pronunciación con Web Speech API  
✅ Barra de progreso visual  
✅ Navegación anterior/siguiente  
✅ Feedback inmediato  
✅ Completación automática de semana  
✅ Diseño responsivo (mobile-friendly)  
✅ Accesibilidad básica (ARIA labels)  
✅ Colores para diferentes tipos de slides  

## ⚠️ Limitaciones Actuales

- Los datos de curriculum están en el archivo `.jsx` (ejemplo)
- No hay persistencia de progreso en BD
- Audio sintetizado (no grabaciones nativas)
- No hay soporte para video/animaciones
- Recording de audio estudiante (experimental con Web Audio API)

## 🔄 Integración con Backend

Para conectar con tu Django backend:

```javascript
// En A1_2WeekSlides.jsx
useEffect(() => {
  fetch(`/api/curriculum/week/${weekNumber}`)
    .then(r => r.json())
    .then(data => setWeekData(data))
    .catch(error => setError(error));
}, [weekNumber]);

// Guardar progreso
const handleActivityComplete = async (slideId) => {
  await fetch('/api/student/progress', {
    method: 'POST',
    body: JSON.stringify({
      weekNumber,
      slideId,
      completed: true,
    }),
  });
};
```

## 🎓 Referencias Pedagógicas

- **CEFR Companion Volume 2018** - Estándares de proficiencia
- **Nation & Beglar (2007)** - Adquisición de vocabulario
- **Krashen (1985)** - Teoría de input comprensible
- **Brown (2007)** - Principios de enseñanza de idiomas
- **Dörnyei (2001)** - Motivación en el aula

---

**Creado por:** LanguageCurriculum Instructor Agent  
**Fecha:** Marzo 2026  
**Licencia:** MIT
