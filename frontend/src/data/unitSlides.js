import { unitSlides as jardinSlides } from './slides/jardin/unitSlides.js';
import { unitSlides as transicionSlides } from './slides/transicion/unitSlides.js';
import { unitSlides as primeroSlides } from './slides/primero/unitSlides.js';
import { unitSlides as segundoSlides } from './slides/segundo/unitSlides.js';

// Compatibility facade: preserve unit keys, slide content and grade order.
export const unitSlides = {
  ...jardinSlides,
  ...transicionSlides,
  ...primeroSlides,
  ...segundoSlides,
};
