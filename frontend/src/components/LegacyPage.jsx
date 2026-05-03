import { useEffect, useMemo } from 'react';
import { parseLegacyHtml } from '../utils/legacy';

export default function LegacyPage({ html, transform }) {
  const parsed = useMemo(() => parseLegacyHtml(html, transform), [html, transform]);

  useEffect(() => {
    if (parsed.title) {
      document.title = parsed.title;
    }
    if (parsed.htmlAttrs?.lang) {
      document.documentElement.setAttribute('lang', parsed.htmlAttrs.lang);
    }
    if (parsed.htmlAttrs?.dataTheme) {
      document.documentElement.setAttribute('data-theme', parsed.htmlAttrs.dataTheme);
    }
  }, [parsed.title, parsed.htmlAttrs]);

  useEffect(() => {
    if (!parsed.scripts) {
      return undefined;
    }

    const scriptEl = document.createElement('script');
    scriptEl.type = 'text/javascript';
    scriptEl.text = parsed.scripts;
    document.body.appendChild(scriptEl);

    // Trigger DOMContentLoaded for legacy scripts that wait on it.
    document.dispatchEvent(new Event('DOMContentLoaded'));

    return () => {
      if (scriptEl.parentNode) {
        scriptEl.parentNode.removeChild(scriptEl);
      }
    };
  }, [parsed.scripts]);

  return (
    <div className="legacy-page">
      <style>{parsed.styles}</style>
      <div dangerouslySetInnerHTML={{ __html: parsed.body }} />
    </div>
  );
}
