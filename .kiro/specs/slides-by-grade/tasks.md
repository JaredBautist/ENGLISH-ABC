# Tasks

- [x] Capture original catalogue as comparison baseline.
- [x] Extract four grades and keep compatibility facade.
- [x] Adapt four maintenance scripts with validated storage.
- [x] Test references, storage round trips and invalid writes.
- [x] Compare original values/order; run tests and production build.

## Validation

- Serialized catalogue equality before/after: identical keys, ordering and all values (32 units, 238 slides).
- Frontend: 4 suites, 21 tests passed, including 7 new catalogue/storage cases.
- Production build: passed; non-blocking warning about outdated Browserslist data.
- Syntax checks: all four maintenance scripts and storage helper passed.
- Maintenance writes were exercised on temporary copies only; original lesson content was not enriched or regenerated.
- No VPS deployment or browser/manual playback verification performed.
