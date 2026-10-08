const fs = require('node:fs');
const path = require('node:path');

const defaultDirectory = path.resolve(__dirname, '../../frontend/src/data/slides');

/** Read JSON-compatible grade modules without executing source code. Throws on invalid catalogues. */
function readCatalogues(directory) {
  const catalogues = fs.readdirSync(directory, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .sort((left, right) => left.name.localeCompare(right.name))
    .map(entry => {
      const file = path.join(directory, entry.name, 'unitSlides.js');
      const source = fs.readFileSync(file, 'utf8');
      const match = source.match(/^export const unitSlides = (\{[\s\S]*\});\s*$/);
      if (!match) throw new Error(`Invalid slide module: ${file}`);
      const units = JSON.parse(match[1]);
      for (const [key, slides] of Object.entries(units)) {
        if (!key.startsWith(entry.name + '-') || !Array.isArray(slides)) {
          throw new Error(`Invalid unit ownership or slides: ${key}`);
        }
      }
      return { file, units };
    });
  if (!catalogues.length) throw new Error('No grade catalogues found');
  return catalogues;
}

/** Return all grade units for maintenance transforms; runtime ordering belongs to the facade. */
function loadUnitSlides(directory = defaultDirectory) {
  return Object.assign({}, ...readCatalogues(directory).map(catalogue => catalogue.units));
}

/** Persist existing units to their grade files. Reject additions/removals before writing. */
function saveUnitSlides(units, directory = defaultDirectory) {
  const catalogues = readCatalogues(directory);
  const existingKeys = catalogues.flatMap(catalogue => Object.keys(catalogue.units));
  const suppliedKeys = Object.keys(units);
  if (existingKeys.length !== suppliedKeys.length ||
      existingKeys.some(key => !Object.hasOwn(units, key) || !Array.isArray(units[key]))) {
    throw new Error('Unit keys must match existing grade catalogues and values must be arrays');
  }
  // Serialize every file before the first write so invalid values cannot cause partial updates.
  const writes = catalogues.map(({ file, units: original }) => {
    const updated = Object.fromEntries(Object.keys(original).map(key => [key, units[key]]));
    return { file, source: 'export const unitSlides = ' + JSON.stringify(updated, null, 2) + ';\n' };
  });
  for (const { file, source } of writes) fs.writeFileSync(file, source, 'utf8');
}

module.exports = { loadUnitSlides, saveUnitSlides };
