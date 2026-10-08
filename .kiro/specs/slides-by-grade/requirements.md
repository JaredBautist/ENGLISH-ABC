# Requirements

Scope: user-requested structural refactor; no curriculum, UI, deployment or database changes.

- WHEN consumers import `unitSlides`, the system SHALL preserve the named export, all keys, values and insertion order.
- WHEN a grade is edited, its slides SHALL reside in its dedicated folder.
- WHEN maintenance scripts update slides, they SHALL update grade files without replacing the entry point.
- WHEN validated, the refactor SHALL pass catalogue equality checks, storage tests, existing tests and the production build.
