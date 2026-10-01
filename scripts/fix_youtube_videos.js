// Busca reemplazos vivos para videos caídos y valida canal oficial vía oEmbed.
const fs = require('fs');

const QUERIES = [
  ['YJyNoFk8tnA', 'finger family super simple songs'],
  ['lihWz8eqKm0', 'old macdonald had a farm super simple songs'],
  ['ZiNfns1jlBs', 'head shoulders knees and toes super simple songs'],
  ['wDTjKnwJz4c', 'put on your shoes super simple songs'],
  ['frN3T84bl28', 'do you like broccoli ice cream super simple songs'],
  ['TCt8WN_2v3M', 'what do you hear super simple songs'],
  ['6RfTKqUUZr4', 'follow me super simple songs'],
  ['ba5uqYvZ4Bk', "what's your name super simple songs"],
  ['OCAXRJgZBbU', "jack johnson 3 r's reduce reuse recycle song"],
  ['_Ir0Mc6f-Lo', 'yes i can super simple songs'],
  ['L5hVfy5FGsM', 'rain rain go away super simple songs'],
  ['zeIoQlNc4d4', 'this is the way we brush our teeth super simple songs'],
];

const CHANNEL_OK = ['super simple songs', 'noodle & pals', 'jack johnson', 'super simple tv'];

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { 'Accept-Language': 'en-US,en;q=0.9' },
    signal: AbortSignal.timeout(20000),
  });
  return { status: res.status, text: await res.text() };
}

async function oembed(id) {
  try {
    const { status, text } = await fetchText(
      `https://www.youtube.com/oembed?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${id}&format=json`,
    );
    if (status !== 200) return null;
    const data = JSON.parse(text);
    return { title: data.title, author: data.author_name };
  } catch {
    return null;
  }
}

(async () => {
  const mapping = {};
  for (const [oldId, query] of QUERIES) {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    let html = '';
    try {
      html = (await fetchText(url)).text;
    } catch {
      console.log(`${oldId} -> ERROR de red en búsqueda`);
      continue;
    }
    const candidates = [...new Set([...html.matchAll(/"videoId":"([A-Za-z0-9_-]{11})"/g)].map((m) => m[1]))]
      .filter((id) => id !== oldId)
      .slice(0, 6);
    let chosen = null;
    for (const cand of candidates) {
      const meta = await oembed(cand);
      if (!meta) continue;
      if (CHANNEL_OK.some((c) => meta.author.toLowerCase().includes(c))) {
        chosen = { id: cand, ...meta };
        break;
      }
    }
    if (chosen) {
      mapping[oldId] = chosen.id;
      console.log(`${oldId} -> ${chosen.id} | ${chosen.author} | ${chosen.title}`);
    } else {
      console.log(`${oldId} -> SIN REEMPLAZO CON CANAL OFICIAL`);
    }
  }
  fs.writeFileSync('/tmp/yt_mapping.json', JSON.stringify(mapping, null, 2));
})();
