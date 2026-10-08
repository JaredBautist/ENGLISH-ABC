import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { unitSlides } from '../unitSlides.js';
import { getConceptImage } from '../conceptImages.js';

const keys = ['colores', 'numeros', 'juguetes', 'animales', 'cuerpo-mueve', 'familia', 'repaso'];
const normalize = text => text.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
const spoken = slide => [
  ...(slide.items || []).map(item => item.text),
  ...(slide.words || []).map(item => item.word),
  ...(slide.examples || []),
];
const exists = image => Boolean(image) && existsSync(resolve(process.cwd(), 'public', image.slice(1)));

describe.each(keys)('Jardin %s visual/listening progression', key => {
  const slides = unitSlides['jardin-' + key];
  it('includes a narrated sequence, small card groups and an echo moment', () => {
    expect(slides.filter(slide => slide.title?.startsWith('Cuento:'))).toHaveLength(3);
    expect(slides.some(slide => slide.title?.startsWith('Eco:'))).toBe(true);
    for (const slide of slides) {
      expect(slide.items?.length || slide.words?.length || 0).toBeLessThanOrEqual(4);
      expect(slide.activityType).not.toBe('fill');
    }
  });

  it('offers two distinct illustrated answers already modeled before each listening prompt', () => {
    const activities = slides.filter(slide => slide.type === 'activity');
    expect(activities).toHaveLength(2);
    expect(activities.map(slide => slide.options.indexOf(slide.correct))).toEqual([0, 1]);
    for (const slide of activities) {
      expect(slide.options).toHaveLength(2);
      expect(slide.question).toBe(slide.correct);
      expect(slide.image).toBeUndefined();
      const prior = slides.slice(0, slides.indexOf(slide)).flatMap(spoken).map(normalize);
      for (const option of slide.options) expect(prior).toContain(normalize(option));
      const images = slide.options.map(getConceptImage);
      expect(new Set(images).size).toBe(2);
      expect(images.every(exists)).toBe(true);
    }
  });

  it('uses existing images and clean English speech inputs', () => {
    for (const slide of slides) {
      for (const visual of [slide, ...(slide.items || []), ...(slide.words || [])]) {
        if (visual.image) expect(exists(visual.image), visual.image).toBe(true);
      }
      for (const phrase of [...spoken(slide), ...(slide.tasks || []), ...(slide.question ? [slide.question] : [])]) {
        expect(phrase).toMatch(/^[A-Za-z0-9 ,.!?'’…-]+$/);
      }
    }
  });

  it('provides a song fallback and inclusive home practice using modeled phrases', () => {
    expect(slides.find(slide => slide.type === 'song').description).toMatch(/eco/i);
    const homework = slides.at(-1);
    expect(homework.type).toBe('homework');
    expect(homework.description).toMatch(/cuidador/);
    expect(homework.description).toMatch(/señal|gesto/);
    const prior = slides.slice(0, -1).flatMap(spoken).map(normalize);
    for (const task of homework.tasks) expect(prior).toContain(normalize(task));
  });
});
