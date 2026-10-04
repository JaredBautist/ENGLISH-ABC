import { describe, it, expect } from 'vitest';
import { getWriting, getListening, getVideos } from '../../data/material';
import { unitSlides } from '../../data/unitSlides';
import emojiArtData from '../../data/emojiArt.json';

describe('DBA Preescolar Scope (Jardín y Transición)', () => {
  it('strictly excludes writing for preescolar grades (Jardín & Transición)', () => {
    expect(getWriting('jardin')).toEqual([]);
    expect(getWriting('transicion')).toEqual([]);
  });

  it('keeps writing active for primary grades (1° y 2°)', () => {
    const primeroWriting = getWriting('primero');
    const segundoWriting = getWriting('segundo');
    expect(primeroWriting.length).toBeGreaterThan(0);
    expect(segundoWriting.length).toBeGreaterThan(0);
  });

  it('provides listening and video material for preescolar', () => {
    expect(getListening('jardin').length).toBeGreaterThan(0);
    expect(getVideos('jardin').length).toBeGreaterThan(0);
    expect(getListening('transicion').length).toBeGreaterThan(0);
    expect(getVideos('transicion').length).toBeGreaterThan(0);
  });
});

describe('DBADeck Visual Slides and Assets', () => {
  it('ensures unitSlides items contain visual emojis across grades', () => {
    const units = Object.keys(unitSlides);
    expect(units.length).toBeGreaterThanOrEqual(32);

    // Verify Jardin unit 1 (jardin-hello) has rich visual cues
    const jardinHello = unitSlides['jardin-hello'];
    expect(Array.isArray(jardinHello)).toBe(true);
    const contentSlide = jardinHello.find((s) => s.type === 'content');
    expect(contentSlide).toBeDefined();
    expect(contentSlide.items.length).toBeGreaterThan(0);

    // Each content item in jardin-hello should contain a visual emoji and representation image
    contentSlide.items.forEach((item) => {
      const emoji = typeof item === 'string' ? item : (item.emoji || item.text);
      expect(/[\p{Extended_Pictographic}]/u.test(emoji)).toBe(true);
      if (typeof item === 'object') {
        expect(item.image).toBeDefined();
        expect(item.image.startsWith('/cards/') || item.image.startsWith('/topics/')).toBe(true);
      }
    });
  });

  it('has comprehensive offline OpenMoji vector asset mapping', () => {
    const totalSVGs = Object.keys(emojiArtData).length;
    expect(totalSVGs).toBeGreaterThanOrEqual(150);

    // Key school and preschool visual emojis must have mapped SVG art
    const requiredEmojis = ['🍎', '📚', '✏️', '🐶', '🐱', '⭐', '☀️', '👨‍👩‍👦'];
    requiredEmojis.forEach((emoji) => {
      expect(emojiArtData[emoji]).toBeDefined();
      expect(emojiArtData[emoji].startsWith('/openmoji/')).toBe(true);
      expect(emojiArtData[emoji].endsWith('.svg')).toBe(true);
    });
  });

  it('ensures all 32 units have pedagogical topic illustrations attached', () => {
    const units = Object.keys(unitSlides);
    expect(units.length).toBe(32);

    units.forEach((unitKey) => {
      const slides = unitSlides[unitKey];
      const contentSlide = slides.find((s) => s.type === 'content');
      expect(contentSlide).toBeDefined();
      expect(contentSlide.image).toBeDefined();
      expect(contentSlide.image.startsWith('/topics/')).toBe(true);
      expect(contentSlide.image.endsWith('.jpg')).toBe(true);
    });
  });
});
