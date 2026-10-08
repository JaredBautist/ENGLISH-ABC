import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import { describe, expect, it, vi } from 'vitest';
import DBADeck from '../DBADeck';

vi.mock('../../data/unitSlides', async importOriginal => {
  const original = await importOriginal();
  const hello = original.unitSlides['jardin-hello'];
  return { ...original, unitSlides: {
    ...original.unitSlides,
    'layout-vocabulary': [hello[1]],
    'layout-hello-choice': [hello[6]],
    'layout-bye-choice': [hello[7]],
  } };
});

// Real browser geometry is required: jsdom does not implement layout.
describe.skipIf(!existsSync('/usr/bin/chromium')).each([
  'jardin-hello', 'layout-vocabulary', 'layout-hello-choice', 'layout-bye-choice',
])('%s card group alignment', slidesKey => {
  it.each([390, 1440])('centers the card without overflow at %ipx', async width => {
    const markup = renderToStaticMarkup(<DBADeck slidesKey={slidesKey} title="Hello!" />);
    const { css } = await postcss([tailwindcss({
      content: [{ raw: markup, extension: 'html' }],
      corePlugins: { preflight: true },
    })]).process('@tailwind base; @tailwind utilities;', { from: undefined });
    const html = `<!doctype html><html><head><style>${css}</style></head><body>${markup}
      <script>
        const cards = [...document.querySelectorAll('.grid > [role="button"], .grid > button')];
        const card = cards[0];
        const rectangles = cards.map(element => element.getBoundingClientRect());
        const bounds = {
          left: Math.min(...rectangles.map(rect => rect.left)),
          right: Math.max(...rectangles.map(rect => rect.right)),
          width: rectangles[0].width
        };
        const region = card.parentElement.parentElement.getBoundingClientRect();
        document.body.innerHTML = '<pre id="geometry">' + JSON.stringify({
          offset: Math.abs((bounds.left + bounds.right - region.left - region.right) / 2),
          overflow: bounds.left < 0 || bounds.right > innerWidth,
          width: bounds.width
        }) + '</pre>';
      </script></body></html>`;
    const output = execFileSync('/usr/bin/chromium', [
      '--headless', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage',
      '--no-proxy-server', '--dump-dom', `--window-size=${width},1000`,
      'data:text/html;base64,' + Buffer.from(html).toString('base64'),
    ], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 20000 });
    const geometry = JSON.parse(output.match(/<pre id="geometry">([^<]+)<\/pre>/)[1]);
    expect(geometry.offset).toBeLessThan(1);
    expect(geometry.overflow).toBe(false);
    expect(geometry.width).toBeGreaterThan(0);
  }, 30000);
});
