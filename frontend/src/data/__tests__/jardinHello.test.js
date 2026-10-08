import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { unitSlides } from '../unitSlides.js';
import { getConceptImage } from '../conceptImages.js';

const slides = unitSlides['jardin-hello'];
const assetExists = asset => existsSync(resolve(process.cwd(), 'public', asset.slice(1)));

describe('Jardin Hello visual and listening content', () => {
  it('provides the approved ten-step sequence without written exercises', () => {
    expect(slides.map(slide => slide.type)).toEqual([
      'content', 'vocabulary', 'content', 'content', 'content',
      'song', 'activity', 'activity', 'content', 'homework',
    ]);
    expect(slides.some(slide => slide.activityType === 'fill')).toBe(false);
  });

  it('narrates three Teddy moments through existing speakable fields', () => {
    expect(slides.slice(2, 5).map(slide => slide.items[0].text)).toEqual([
      'Hello, Teddy!', 'My name is Teddy.', 'Bye-bye, Teddy!',
    ]);
    expect(slides.slice(2, 5).every(slide => slide.image === '/cards/teddy.jpg')).toBe(true);
  });

  it('offers two mapped visual answers with different correct positions and English listening prompts', () => {
    const activities = slides.filter(slide => slide.type === 'activity');
    expect(activities.map(slide => slide.question)).toEqual(['Hello!', 'Bye-bye!']);
    expect(activities.map(slide => slide.options.indexOf(slide.correct))).toEqual([0, 1]);
    for (const slide of activities) {
      expect(slide.options).toEqual(['Hello!', 'Bye-bye!']);
      expect(slide.image).toBeUndefined();
      const images = slide.options.map(getConceptImage);
      expect(new Set(images).size).toBe(2);
      expect(images.every(image => image && assetExists(image))).toBe(true);
    }
  });

  it('uses existing illustration files for every explicit visual', () => {
    for (const slide of slides) {
      const visuals = [slide, ...(slide.items || []), ...(slide.words || [])];
      for (const visual of visuals) {
        if (visual.image) expect(assetExists(visual.image), visual.image).toBe(true);
      }
    }
  });

  it('keeps home speech to modeled phrases and provides inclusive adult guidance', () => {
    const homework = slides.at(-1);
    expect(homework.tasks).toEqual(['Hello!', 'My name is…', 'Bye-bye!']);
    expect(homework.description).toMatch(/cuidador/);
    expect(homework.description).toMatch(/gesto/);
  });
});
