# Content design and decision

## Decision

Use the existing content/vocabulary/song/activity/homework schema in `frontend/src/data/slides/jardin/unitSlides.js`. No new renderer, dependency, endpoint or architectural layer is warranted for a content-only change.

The approved pedagogical proposal, sections 5, 6 and 8, is the local reference. This is an original adaptation, not an official MEN lesson or certification.

## Audio and visual contract

- `items[].text`, `words[].word`, `examples[]`, activity `question` and homework `tasks[]` are English inputs for existing speech controls.
- Spanish directions in `description` guide the adult. Existing text labels remain visible; reading them is not required for participation.
- Activity questions are simply the target utterance (`Hello!` / `Bye-bye!`). Their image choices resolve through existing concept mappings. No answer-revealing hero image is added.
- The existing teddy image depicts a toy, not three distinct actions. Reuse it as a recurring character; the teacher models arrival/introduction/departure with gesture. Do not claim new scene illustrations were created.
- Greeting/farewell images were visually inspected. Farewell is contextual and must first be modeled by the adult, not treated as an unambiguous independent diagnostic.
- Keep the existing song URL; embedding/content availability and actual classroom audio still require human verification. Offer teacher-led echo as the no-video alternative.

## Alternatives rejected

New audio controls, hidden-text modes, automatic voice scoring and generated art would expand the approved scope. Replacing shared vocabulary mappings could affect other units.

No deployment is included. Unit IDs and progress API semantics are unchanged.
