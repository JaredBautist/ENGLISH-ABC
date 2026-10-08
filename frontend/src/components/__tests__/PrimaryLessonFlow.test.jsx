import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import DBADeck from '../DBADeck';
import { unitSlides } from '../../data/unitSlides';
import { speakFriendly } from '../../shared/utils/friendlySpeech';

vi.mock('../../shared/utils/friendlySpeech', () => ({
  speakFriendly: vi.fn(),
  playRewardSound: vi.fn(),
}));

const lessons = Object.entries(unitSlides).filter(([key]) => /^(primero|segundo)-/.test(key));

describe.each(lessons)('%s interactive lesson flow', (key, slides) => {
  it('plays the prompt, resets feedback between questions and supports modeled writing', () => {
    const { container } = render(<DBADeck slidesKey={key} title="Lesson" />);
    const listeningIndex = slides.findIndex(s => s.skill === 'listening');
    for (let step = 0; step < listeningIndex; step += 1) {
      fireEvent.click(screen.getByRole('button', { name: /Siguiente/ }));
    }
    const listening = slides[listeningIndex];
    fireEvent.click(screen.getByRole('button', { name: 'Escuchar pregunta' }));
    expect(speakFriendly).toHaveBeenLastCalledWith(listening.question, expect.any(Object));
    const answers = container.querySelectorAll('.grid > button');
    expect(answers).toHaveLength(2);
    for (const answer of answers) expect(answer.querySelector('img')).toHaveAttribute('src', '/placeholders/illustration.svg');
    fireEvent.click(answers[listening.options.indexOf(listening.correct)]);
    expect(screen.getByText(/¡Respuesta correcta!/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Siguiente/ }));
    expect(screen.queryByText(/¡Respuesta correcta!|Inténtalo de nuevo/)).not.toBeInTheDocument();
    const reading = slides[listeningIndex + 1];
    fireEvent.click(container.querySelectorAll('.grid > button')[reading.options.indexOf(reading.correct)]);
    expect(screen.getByText(/¡Respuesta correcta!/)).toBeInTheDocument();
    const writingIndex = slides.findIndex(s => s.activityType === 'fill');
    for (let step = listeningIndex + 1; step < writingIndex; step += 1) {
      fireEvent.click(screen.getByRole('button', { name: /Siguiente/ }));
    }
    fireEvent.change(screen.getByRole('textbox', { name: 'Respuesta' }), { target: { value: slides[writingIndex].answer } });
    expect(screen.getByRole('status')).toHaveTextContent('¡Muy bien!');
    for (let step = writingIndex; step < slides.length - 1; step += 1) {
      fireEvent.click(screen.getByRole('button', { name: /Siguiente/ }));
    }
    expect(screen.getByText('Practicamos con apoyo')).toBeInTheDocument();
    expect(container.querySelector('img[src^="/cards/"], img[src^="/topics/"]')).toBeNull();
  });
});
