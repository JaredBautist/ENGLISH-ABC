# Design: DBA Visual Slides & Preescolar Scope Adjustment

## Visual Hierarchy & Component Architecture

### 1. Preescolar Scope Boundaries (`TeacherWorkspace.jsx` & `MaterialPages.jsx`)
```
                          Active Grade
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
    Jardín / Transición                1° / 2° Primaria
    • Videos 🎬                        • Videos 🎬
    • Listening 🎧                     • Listening 🎧
    (Writing OMITTED)                  • Writing ✍️
```

* In `TeacherWorkspace.jsx`, the material cards array is dynamically filtered based on `activeGrade.id`:
  ```javascript
  const materials = [
    { href: `/docente/videos?grado=${activeGrade.id}`, ... },
    { href: `/docente/listening?grado=${activeGrade.id}`, ... },
    ...(!['jardin', 'transicion'].includes(activeGrade.id) ? [{
      href: `/docente/writing?grado=${activeGrade.id}`, ...
    }] : [])
  ];
  ```
* In `MaterialShell.jsx`, grade tabs on `/docente/writing` only display `1°` and `2°`.
* In `WritingPage`, if an active preescolar grade is selected, a child-friendly pedagogical banner informs the teacher that DBA English in preschool is 100% oral/auditory and links directly to `/docente/listening` and `/docente/videos`.

### 2. High-Impact Visual Content in Slides (`DBADeck.jsx`)

#### A. Content Slides as Visual Flashcard Grids
Instead of plain text bullets:
* Each item is rendered as an illustrated card:
  - Top or leading prominent illustration/emoji via `EmojiArt` (`size="word"` or `size="md"`).
  - Bold child-friendly typography in English (`Baloo 2`).
  - Spanish translation in a soft pastel badge.
  - Native audio speaker button (`Volume2`) for auditory reinforcement.
* Slide examples are rendered with conversation speech bubbles and avatars (`👩‍🏫 Teacher` / `👦 Student`).

#### B. Visual Vocabulary Cards
* Scaled up for 1080p Smart TVs and classroom beamers.
* Visual tactile feedback with Claymorphism elevation and colorful hover rings.

#### C. Visual Clues in Activities
* Options in choice activities include visual icons corresponding to the answers (e.g., `👋 Hello!`, `👋 Bye-bye!`), allowing preschool and 1st-grade children to participate visually.
