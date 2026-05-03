# 🎨 Plan de Mejora del Frontend

## 📋 Estado Actual

### ✅ Lo que ya está implementado:
1. **Nuevo Dashboard Moderno** con sidebar y tabs
2. **Sistema de Diseño Claymorphism** en index.css
3. **Componentes UI** (Button, Card, Input, ProgressBar, Badge)
4. **Tabs del Dashboard**:
   - Overview (resumen general)
   - Lessons (semanas de aprendizaje)
   - Listening, Writing, Speaking (tabs vacíos)
5. **WeekProgressBar** con milestones visuales
6. **A12WeekDeck** para diapositivas interactivas

### ❌ Problemas a Arreglar:
1. **Modo Oscuro** - Variables CSS no se aplican correctamente
2. **Dashboard A1.1** - Usa el mismo componente que A1.2
3. **Contenido de Diapositivas** - Falta contenido según Marco Europeo
4. **Tabs Vacíos** - Listening, Writing, Speaking no tienen contenido
5. **Responsive** - Algunos componentes no se ven bien en móvil
6. **Accesibilidad** - Falta ARIA labels y navegación por teclado

---

## 🎯 Plan de Acción

### Fase 1: Arreglar Modo Oscuro (30 min)
- [ ] Revisar variables CSS en index.css
- [ ] Agregar toggle de modo oscuro en Sidebar
- [ ] Probar todos los componentes en modo oscuro
- [ ] Ajustar colores que no se vean bien

### Fase 2: Mejorar Dashboard Overview (45 min)
- [ ] Agregar gráficos de progreso (Chart.js o Recharts)
- [ ] Mostrar últimas lecciones completadas
- [ ] Agregar calendario de actividades
- [ ] Mejorar estadísticas con animaciones

### Fase 3: Completar Tabs Vacíos (2 horas)
- [ ] **Listening Tab**: Ejercicios de audio con transcripciones
- [ ] **Writing Tab**: Ejercicios de escritura con corrección
- [ ] **Speaking Tab**: Ejercicios de pronunciación con grabación
- [ ] Agregar contenido de ejemplo para cada tab

### Fase 4: Crear Contenido de Diapositivas (3 horas)
- [ ] **A1.1 - 8 semanas** según Marco Europeo
- [ ] **A1.2 - 8 semanas** según Marco Europeo
- [ ] Cada semana con:
  - Vocabulario (10-15 palabras)
  - Gramática (1-2 estructuras)
  - Ejercicios interactivos (5-8)
  - Ejemplos de uso real

### Fase 5: Mejorar Responsive (1 hora)
- [ ] Probar en móvil (320px, 375px, 768px)
- [ ] Ajustar sidebar para móvil (hamburger menu)
- [ ] Ajustar cards para pantallas pequeñas
- [ ] Probar en tablet (768px, 1024px)

### Fase 6: Mejorar Accesibilidad (1 hora)
- [ ] Agregar ARIA labels a todos los botones
- [ ] Navegación por teclado (Tab, Enter, Escape)
- [ ] Contraste de colores (WCAG AA)
- [ ] Screen reader friendly

---

## 🚀 Implementación Inmediata

Voy a empezar con las mejoras más críticas:

### 1. Arreglar Modo Oscuro
### 2. Mejorar Dashboard Overview
### 3. Crear Contenido para A1.1 y A1.2

---

## 📚 Contenido según Marco Europeo (CEFR)

### Nivel A1.1 (Breakthrough)
**Objetivo**: Comprender y usar expresiones cotidianas básicas

**Semana 1**: Alphabet & Basic Greetings
- Vocabulario: A-Z, Hello, Hi, Good morning, Good afternoon, Good evening, Goodbye, Bye, Please, Thank you
- Gramática: Saludos básicos
- Ejercicios: Identificar letras, practicar saludos

**Semana 2**: Numbers & Personal Data
- Vocabulario: 0-100, Name, Age, Phone number, Address
- Gramática: "My name is...", "I am... years old"
- Ejercicios: Completar formularios, decir números

**Semana 3**: Colors & Common Objects
- Vocabulario: Red, Blue, Green, Yellow, etc. + Book, Pen, Table, Chair, etc.
- Gramática: "This is a...", "It is..."
- Ejercicios: Identificar colores y objetos

**Semana 4**: Basic Feelings & Emotions
- Vocabulario: Happy, Sad, Angry, Tired, Hungry, Thirsty
- Gramática: "I am happy", "I feel..."
- Ejercicios: Expresar emociones

**Semana 5**: School & Classroom Vocabulary
- Vocabulario: Teacher, Student, Classroom, Desk, Board, etc.
- Gramática: "Where is the...?", "It is on/in/under..."
- Ejercicios: Ubicar objetos en el aula

**Semana 6**: Days & Months of the Year
- Vocabulario: Monday-Sunday, January-December, Today, Tomorrow, Yesterday
- Gramática: "Today is...", "My birthday is in..."
- Ejercicios: Calendario, fechas importantes

**Semana 7**: Basic Body Parts
- Vocabulario: Head, Eyes, Nose, Mouth, Arms, Legs, etc.
- Gramática: "I have...", "My... hurts"
- Ejercicios: Identificar partes del cuerpo

**Semana 8**: Level A1.1 Final Review
- Repaso de todo el contenido
- Evaluación final
- Certificado de completación

### Nivel A1.2 (Waystage)
**Objetivo**: Comunicarse en situaciones simples y cotidianas

**Semana 1**: Verb To Be • Countries • Numbers
- Vocabulario: I am, You are, He/She is, Countries, Nationalities
- Gramática: Verb "to be" (affirmative, negative, questions)
- Ejercicios: Presentarse, decir nacionalidad

**Semana 2**: Daily Routine • Present Simple
- Vocabulario: Wake up, Eat, Go to school, Sleep, etc.
- Gramática: Present Simple (I wake up at 7am)
- Ejercicios: Describir rutina diaria

**Semana 3**: Family Members • Possessive Adjectives
- Vocabulario: Mother, Father, Sister, Brother, Grandmother, etc.
- Gramática: My, Your, His, Her, Our, Their
- Ejercicios: Describir familia

**Semana 4**: My Home • There is / There are
- Vocabulario: House, Room, Kitchen, Bathroom, Bedroom, etc.
- Gramática: There is a..., There are...
- Ejercicios: Describir casa

**Semana 5**: Food & Shopping • Quantifiers
- Vocabulario: Apple, Bread, Milk, Water, etc.
- Gramática: Some, Any, A lot of, How much/many
- Ejercicios: Hacer compras, pedir comida

**Semana 6**: Abilities & Rules • Can/Can't
- Vocabulario: Swim, Run, Jump, Fly, etc.
- Gramática: I can..., I can't..., Can you...?
- Ejercicios: Expresar habilidades

**Semana 7**: Weekend Plans • Future Going To
- Vocabulario: Visit, Play, Watch, Go, etc.
- Gramática: I am going to..., Are you going to...?
- Ejercicios: Hablar de planes futuros

**Semana 8**: Review & Final Evaluation
- Repaso de todo el contenido
- Evaluación final
- Certificado de completación

---

## 🎨 Mejoras de Diseño

### Paleta de Colores (Modo Oscuro)
```css
--bg-primary: #0f172a (slate-900)
--bg-secondary: #1e293b (slate-800)
--bg-tertiary: #334155 (slate-700)
--text-primary: #f8fafc (slate-50)
--text-secondary: #cbd5e1 (slate-300)
--accent-primary: #6366f1 (indigo-500)
--accent-secondary: #8b5cf6 (purple-500)
--success: #22c55e (green-500)
--warning: #f59e0b (amber-500)
--error: #ef4444 (red-500)
```

### Paleta de Colores (Modo Claro)
```css
--bg-primary: #ffffff (white)
--bg-secondary: #f8fafc (slate-50)
--bg-tertiary: #e2e8f0 (slate-200)
--text-primary: #0f172a (slate-900)
--text-secondary: #475569 (slate-600)
--accent-primary: #4f46e5 (indigo-600)
--accent-secondary: #7c3aed (purple-600)
--success: #16a34a (green-600)
--warning: #d97706 (amber-600)
--error: #dc2626 (red-600)
```

### Animaciones
- Fade in al cargar
- Hover effects en cards
- Progress bar animado
- Skeleton loading states
- Micro-interactions en botones

---

## 📱 Responsive Breakpoints
```css
/* Mobile */
@media (max-width: 640px) { ... }

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) { ... }

/* Desktop */
@media (min-width: 1025px) { ... }

/* Large Desktop */
@media (min-width: 1440px) { ... }
```

---

## ✅ Checklist de Calidad

### Funcionalidad
- [ ] Todos los links funcionan
- [ ] Progreso se guarda correctamente
- [ ] Desbloqueo de semanas funciona
- [ ] Ejercicios interactivos funcionan
- [ ] Notificaciones aparecen correctamente

### Diseño
- [ ] Modo oscuro funciona
- [ ] Modo claro funciona
- [ ] Responsive en móvil
- [ ] Responsive en tablet
- [ ] Animaciones suaves

### Accesibilidad
- [ ] Navegación por teclado
- [ ] ARIA labels
- [ ] Contraste de colores (WCAG AA)
- [ ] Screen reader friendly
- [ ] Focus visible

### Performance
- [ ] Carga rápida (<3s)
- [ ] Imágenes optimizadas
- [ ] CSS minificado
- [ ] JS minificado
- [ ] Lazy loading

---

## 🚀 Próximos Pasos

1. **Ahora**: Arreglar modo oscuro
2. **Después**: Crear contenido de diapositivas
3. **Luego**: Completar tabs vacíos
4. **Finalmente**: Mejorar responsive y accesibilidad

---

**¿Por dónde empezamos?** 🎯
