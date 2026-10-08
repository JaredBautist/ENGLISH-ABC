import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import DBADeck from '../DBADeck';

afterEach(() => vi.unstubAllGlobals());

describe('Jardin Hello existing speech integration', () => {
  it('sends card and listening prompts to the existing TTS endpoint without Spanish directions', () => {
    const urls = [];
    vi.stubGlobal('Audio', class {
      constructor(url) { urls.push(url); }
      play() { return Promise.resolve(); }
      pause() {}
    });
    render(<DBADeck slidesKey="jardin-hello" title="Hello!" />);
    fireEvent.click(screen.getByRole('button', { name: 'Escuchar Hello!' }));
    expect(urls.at(-1)).toBe('/api/tts/?text=Hello!&lang=en');

    for (let step = 0; step < 6; step += 1) {
      fireEvent.click(screen.getByRole('button', { name: /Siguiente/ }));
    }
    fireEvent.click(screen.getByRole('button', { name: 'Escuchar pregunta' }));
    expect(urls.at(-1)).toBe('/api/tts/?text=Hello!&lang=en');
    fireEvent.click(screen.getByRole('button', { name: /Siguiente/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Escuchar pregunta' }));
    expect(urls.at(-1)).toBe('/api/tts/?text=Bye-bye!&lang=en');
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });
});
