export function parseLegacyHtml(html, transform) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  if (typeof transform === 'function') {
    transform(doc);
  }

  const title = doc.title || '';
  const htmlAttrs = {
    lang: doc.documentElement.getAttribute('lang') || 'es',
    dataTheme: doc.documentElement.getAttribute('data-theme')
  };

  const scripts = Array.from(doc.querySelectorAll('script'))
    .filter((script) => !script.src)
    .map((script) => script.textContent || '')
    .join('\n');

  doc.querySelectorAll('script').forEach((script) => script.remove());

  const styles = Array.from(doc.querySelectorAll('style'))
    .map((style) => style.textContent || '')
    .join('\n');

  doc.querySelectorAll('style').forEach((style) => style.remove());

  const body = doc.body.innerHTML;

  return { title, htmlAttrs, styles, body, scripts };
}
