const { loadUnitSlides, saveUnitSlides } = require('./lib/unit_slides_store.cjs');
const { getConceptImage } = require('../frontend/src/data/conceptImages.js');


const unitSlides = loadUnitSlides();

let enrichedItems = 0;
let enrichedWords = 0;

for (const [unitKey, slides] of Object.entries(unitSlides)) {
  for (const slide of slides) {
    // If it's a content slide without an image, check if title or topic matches
    if (slide.type === 'content' && !slide.image) {
      if (slide.title && slide.title.toLowerCase().includes('rutinas')) {
        slide.image = '/topics/classroom.jpg';
      } else if (slide.title && getConceptImage(slide.title)) {
        slide.image = getConceptImage(slide.title);
      }
    }

    // Enrich items in content slides
    if (slide.items && Array.isArray(slide.items)) {
      slide.items = slide.items.map((item) => {
        if (typeof item === 'string') {
          // Parse string
          const emojiMatch = item.match(/^([\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]|\p{Emoji_Presentation}|\p{Emoji}\uFE0F)\s*/u);
          let emoji = '✨';
          let cleanStr = item;
          if (emojiMatch) {
            emoji = emojiMatch[1];
            cleanStr = item.slice(emojiMatch[0].length).trim();
          }
          const parenMatch = cleanStr.match(/^(.*?)\s*\((.*?)\)$/);
          const text = parenMatch ? parenMatch[1].trim() : cleanStr;
          const es = parenMatch ? parenMatch[2].trim() : '';
          const img = getConceptImage(text);
          if (img) enrichedItems++;
          return {
            text,
            es,
            emoji,
            image: img || null
          };
        } else if (typeof item === 'object') {
          if (!item.image && item.text) {
            item.image = getConceptImage(item.text);
            if (item.image) enrichedItems++;
          }
          return item;
        }
        return item;
      });
    }

    // Enrich words in vocabulary slides
    if (slide.words && Array.isArray(slide.words)) {
      slide.words.forEach((w) => {
        if (!w.image && w.word) {
          w.image = getConceptImage(w.word);
          if (w.image) enrichedWords++;
        }
      });
    }
  }
}

console.log(`Enriched ${enrichedItems} items and ${enrichedWords} vocabulary words with real photographs/illustrations.`);

saveUnitSlides(unitSlides);
console.log('Successfully updated grade slide files with real representation!');
