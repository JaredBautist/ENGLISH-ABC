const { loadUnitSlides, saveUnitSlides } = require('./lib/unit_slides_store.cjs');
const { getConceptImage } = require('../frontend/src/data/conceptImages.js');
const fs = require('fs');
const path = require('path');

const units = loadUnitSlides();
const availableCards = new Set(
  fs.readdirSync(path.resolve(__dirname, '../frontend/public/cards')).map(f => `/cards/${f}`)
);
const availableTopics = new Set(
  fs.readdirSync(path.resolve(__dirname, '../frontend/public/topics')).map(f => `/topics/${f}`)
);

function isValidImage(url) {
  if (!url) return false;
  return availableCards.has(url) || availableTopics.has(url);
}

let fixedBad = 0;
let newlyEnriched = 0;

for (const [unitKey, slides] of Object.entries(units)) {
  for (const [sIdx, slide] of slides.entries()) {
    // 1. Check slide.image
    if (slide.image) {
      // Fix slide false matches
      if (slide.image === '/cards/hi.jpg' && !/\b(hi|saludo)\b/i.test(slide.title || '')) {
        if (/gatito|cat/i.test(slide.title)) {
          slide.image = '/cards/cat.jpg';
        } else if (/historia|dibujo/i.test(slide.title)) {
          slide.image = '/topics/reading.jpg';
        } else {
          slide.image = null;
        }
        fixedBad++;
        console.log(`[FIX SLIDE] ${unitKey} s${sIdx}: "${slide.title}" -> ${slide.image}`);
      } else if (slide.image === '/cards/teddy.jpg' && /saludos en casa/i.test(slide.title)) {
        slide.image = '/cards/family_group.jpg';
        fixedBad++;
        console.log(`[FIX SLIDE] ${unitKey} s${sIdx}: "${slide.title}" -> ${slide.image}`);
      }
    }

    // 2. Check items
    if (slide.items && Array.isArray(slide.items)) {
      for (const item of slide.items) {
        if (typeof item === 'object') {
          const text = (item.text || '').trim();

          // Specific known bad assignments
          if (item.image === '/cards/hi.jpg') {
            if (/daddy/i.test(text)) item.image = '/cards/daddy.jpg';
            else if (/mommy/i.test(text)) item.image = '/cards/mommy.jpg';
            else if (/brother/i.test(text)) item.image = '/cards/brother.jpg';
            else if (/sister/i.test(text)) item.image = '/cards/sister.jpg';
            else if (/thirteen|thirty/i.test(text)) item.image = null;
            else if (!/\b(hi|saludo)\b/i.test(text)) item.image = getConceptImage(text);
            fixedBad++;
            console.log(`[FIX ITEM] ${unitKey} s${sIdx}: "${text}" -> ${item.image}`);
          } else if (item.image === '/cards/red.jpg' && /reduce|scared/i.test(text)) {
            item.image = null;
            fixedBad++;
            console.log(`[FIX ITEM] ${unitKey} s${sIdx}: "${text}" -> ${item.image}`);
          }

          // If item.image is null or empty, try to enrich with validated concept
          if (!item.image && text) {
            const conceptImg = getConceptImage(text);
            if (conceptImg && isValidImage(conceptImg)) {
              item.image = conceptImg;
              newlyEnriched++;
              console.log(`[ENRICH ITEM] ${unitKey} s${sIdx}: "${text}" -> ${item.image}`);
            }
          }
        }
      }
    }

    // 3. Check vocabulary words
    if (slide.words && Array.isArray(slide.words)) {
      for (const w of slide.words) {
        if (typeof w === 'object') {
          const word = (w.word || '').trim();
          if (w.image === '/cards/hi.jpg' && !/\b(hi|saludo)\b/i.test(word)) {
            if (/carnival/i.test(word)) {
              w.image = '/topics/culture.jpg';
            } else {
              w.image = null;
            }
            fixedBad++;
            console.log(`[FIX WORD] ${unitKey} s${sIdx}: "${word}" -> ${w.image}`);
          } else if (w.image === '/cards/red.jpg' && /reduce|scared/i.test(word)) {
            w.image = null;
            fixedBad++;
            console.log(`[FIX WORD] ${unitKey} s${sIdx}: "${word}" -> ${w.image}`);
          }

          if (!w.image && word) {
            const conceptImg = getConceptImage(word);
            if (conceptImg && isValidImage(conceptImg)) {
              w.image = conceptImg;
              newlyEnriched++;
              console.log(`[ENRICH WORD] ${unitKey} s${sIdx}: "${word}" -> ${w.image}`);
            }
          }
        }
      }
    }
  }
}

saveUnitSlides(units);
console.log(`\nSuccessfully applied changes: ${fixedBad} false/mismatched images corrected, ${newlyEnriched} missing images enriched.`);
