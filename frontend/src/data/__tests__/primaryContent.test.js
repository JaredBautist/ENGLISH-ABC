import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { unitSlides } from '../unitSlides.js';

const units = Object.entries(unitSlides).filter(([key]) => /^(primero|segundo)-/.test(key));
const placeholder = '/placeholders/illustration.svg';
const normalize = text => text.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
const spoken = slide => [...(slide.items || []).map(x => x.text), ...(slide.words || []).map(x => x.word), ...(slide.examples || [])];

describe.each(units)('%s scaffolded primary lesson', (key, slides) => {
  it('has connected shared reading, sequence retelling and an oral alternative to writing', () => {
    const reading = slides.find(s => s.title === 'Leemos juntos');
    expect(reading).toBeDefined();
    expect(reading.examples.length).toBeGreaterThanOrEqual(key.startsWith('segundo-') ? 4 : 3);
    expect(slides.some(s => s.title === 'Contamos la historia')).toBe(true);
    expect(slides.find(s => s.title === 'Escritura con apoyo (opcional)').description).toMatch(/oral/);
  });
  it('grounds the literal question and both answer options in the shared text', () => {
    const question = slides.find(s => s.skill === 'reading');
    const text = slides.find(s => s.title === 'Leemos juntos').examples.join(' ');
    expect(question.activityType).toBe('choice');
    expect(question.options).toHaveLength(2);
    expect(question.options).toContain(question.correct);
    expect(text).toContain(question.evidence);
    expect(question.evidence.toLowerCase()).toContain(question.correct.toLowerCase());
    expect(question.explanation.length).toBeGreaterThan(15);
    for (const option of question.options) expect(text.toLowerCase()).toContain(option.toLowerCase());
  });
  it('uses modeled listening prompts and a reconstructable supported writing answer', () => {
    const listening = slides.find(s => s.skill === 'listening');
    const prior = slides.slice(0, slides.indexOf(listening)).flatMap(spoken).map(normalize);
    expect(listening.options).toContain(listening.correct);
    expect(listening.question).toBe(listening.correct);
    for (const option of listening.options) expect(prior).toContain(normalize(option));
    const writing = slides.find(s => s.activityType === 'fill');
    const models = slides.slice(0, slides.indexOf(writing)).flatMap(spoken).map(normalize);
    expect(models).toContain(normalize(writing.prompt.replace('___', writing.answer)));
  });
  it('reserves every illustration and keeps spoken fields clean', () => {
    expect(existsSync(resolve(process.cwd(), 'public', placeholder.slice(1)))).toBe(true);
    for (const slide of slides) {
      if (slide.image) expect(slide.image).toBe(placeholder);
      for (const entry of [...slide.items || [], ...slide.words || []]) expect(entry.image).toBe(placeholder);
      if (slide.activityType === 'choice') {
        expect(slide.image).toBeUndefined();
        for (const option of slide.options) expect(slide.optionImages[option]).toBe(placeholder);
      }
      for (const text of [...spoken(slide), ...slide.tasks || [], ...slide.question ? [slide.question] : []]) {
        expect(text).toMatch(/^[A-Za-z0-9 ,.!?'’…-]+$/);
      }
      expect(slide.items?.length || slide.words?.length || 0).toBeLessThanOrEqual(4);
    }
  });
  it('provides inclusive home practice already modeled in the lesson', () => {
    const homework = slides.at(-1);
    expect(homework.type).toBe('homework');
    expect(homework.description).toMatch(/cuidador/);
    const prior = slides.slice(0, -1).flatMap(spoken).map(normalize);
    for (const task of homework.tasks) expect(prior).toContain(normalize(task));
  });
});
