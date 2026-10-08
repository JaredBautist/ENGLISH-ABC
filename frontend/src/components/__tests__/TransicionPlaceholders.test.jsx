import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import DBADeck from '../DBADeck';

vi.mock('../../shared/utils/friendlySpeech', () => ({
  speakFriendly: vi.fn(),
  playRewardSound: vi.fn(),
}));

it('loads real AI illustrations through vocabulary, story and answer options', () => {
  const { container } = render(<DBADeck slidesKey="transicion-familia" title="My family" />);
  for (let slide = 0; slide < 7; slide += 1) {
    const sources = [...container.querySelectorAll('img')].map(image => image.getAttribute('src'));
    if (slide !== 2) {
      expect(sources.some(source => /^\/(cards|topics)\//.test(source))).toBe(true);
    }
    if (slide === 4 || slide === 5) {
      const options = container.querySelectorAll('.grid > button');
      expect(options.length).toBeGreaterThanOrEqual(2);
      for (const option of options) {
        expect(option.querySelector('img')).toHaveAttribute('src', expect.stringMatching(/^\/(cards|topics)\//));
      }
    }
    if (slide < 6) fireEvent.click(screen.getByRole('button', { name: /Siguiente/ }));
  }
});
