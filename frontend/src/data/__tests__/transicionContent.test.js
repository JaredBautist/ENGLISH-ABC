import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { unitSlides } from '../unitSlides.js';

const units = Object.entries(unitSlides).filter(([key]) => key.startsWith('transicion-'));
const exists = path => Boolean(path) && existsSync(resolve(process.cwd(), 'public', path.slice(1)));

describe.each(units)('%s preschool slide content and illustrations', (key, slides) => {
  it('excludes writing and maintains preschool appropriate slide count', () => {
    expect(slides.length).toBeGreaterThanOrEqual(6);
    for (const slide of slides) {
      expect(slide.activityType).not.toBe('fill');
      expect(slide.items?.length || slide.words?.length || 0).toBeLessThanOrEqual(4);
    }
  });

  it('uses real existing AI illustrations and topics across all visual slides', () => {
    for (const slide of slides) {
      if (slide.image) {
        expect(exists(slide.image), `Missing slide.image: ${slide.image}`).toBe(true);
      }
      for (const visual of [...(slide.items || []), ...(slide.words || [])]) {
        if (visual.image) {
          expect(exists(visual.image), `Missing item/word image: ${visual.image}`).toBe(true);
        }
      }
    }
  });

  it('provides options with existing images in activity slides', () => {
    const activities = slides.filter(s => s.type === 'activity');
    expect(activities.length).toBeGreaterThanOrEqual(1);
    for (const activity of activities) {
      expect(activity.options.length).toBeGreaterThanOrEqual(2);
      if (activity.optionImages) {
        for (const [optionKey, img] of Object.entries(activity.optionImages)) {
          expect(exists(img), `Option image for ${optionKey} not found: ${img}`).toBe(true);
        }
      }
    }
  });

  it('includes a song and home reinforcement in each unit', () => {
    const song = slides.find(s => s.type === 'song');
    expect(song).toBeDefined();
    expect(song.description).toBeTruthy();

    const homework = slides.at(-1);
    expect(homework.type).toBe('homework');
    expect(homework.tasks?.length).toBeGreaterThanOrEqual(1);
  });
});
