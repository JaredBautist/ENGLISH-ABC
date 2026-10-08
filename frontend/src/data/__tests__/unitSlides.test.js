import { afterEach, describe, expect, it } from 'vitest';
import { mkdtempSync, cpSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { unitSlides } from '../unitSlides.js';
import { grades, gradeOrder } from '../grados.js';
import store from '../../../../scripts/lib/unit_slides_store.cjs';

const directory = resolve(process.cwd(), 'src/data/slides');
const temporaryDirectories = [];

function fixture() {
  const temporary = mkdtempSync(join(tmpdir(), 'grade-slides-test-'));
  temporaryDirectories.push(temporary);
  cpSync(directory, temporary, { recursive: true });
  return temporary;
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe('grade slide catalogue compatibility', () => {
  it('matches every registered unit exactly once and preserves grade/unit ordering', () => {
    const keys = gradeOrder.flatMap(grade => grades[grade].units.map(unit => unit.slides));
    expect(new Set(keys).size).toBe(keys.length);
    expect(Object.keys(unitSlides)).toEqual(keys);
    for (const key of keys) expect(unitSlides[key].length).toBeGreaterThan(0);
  });

  it('exposes exactly the same content to runtime and maintenance scripts', () => {
    expect(store.loadUnitSlides(directory)).toEqual(unitSlides);
  });

  it('round trips all grade files without content or formatting changes', () => {
    const temporary = fixture();
    const sources = gradeOrder.map(grade =>
      readFileSync(join(temporary, grade, 'unitSlides.js'), 'utf8'));
    store.saveUnitSlides(store.loadUnitSlides(temporary), temporary);
    expect(store.loadUnitSlides(temporary)).toEqual(unitSlides);
    expect(gradeOrder.map(grade =>
      readFileSync(join(temporary, grade, 'unitSlides.js'), 'utf8'))).toEqual(sources);
  });

  it('writes an edited slide only to its owning grade', () => {
    const temporary = fixture();
    const catalogue = store.loadUnitSlides(temporary);
    const key = Object.keys(unitSlides)[0];
    catalogue[key][0].title = 'Edited title';
    store.saveUnitSlides(catalogue, temporary);
    expect(store.loadUnitSlides(temporary)).toEqual(catalogue);
    for (const grade of gradeOrder.filter(grade => !key.startsWith(grade + '-'))) {
      expect(readFileSync(join(temporary, grade, 'unitSlides.js'), 'utf8'))
        .toBe(readFileSync(join(directory, grade, 'unitSlides.js'), 'utf8'));
    }
  });

  it.each(['unknown', 'removed', 'invalid'])('rejects %s units before changing files', kind => {
    const temporary = fixture();
    const catalogue = store.loadUnitSlides(temporary);
    const key = Object.keys(catalogue)[0];
    if (kind === 'unknown') catalogue['tercero-new'] = [];
    if (kind === 'removed') delete catalogue[key];
    if (kind === 'invalid') catalogue[key] = {};
    expect(() => store.saveUnitSlides(catalogue, temporary)).toThrow(/Unit keys/);
    expect(store.loadUnitSlides(temporary)).toEqual(unitSlides);
  });
});
