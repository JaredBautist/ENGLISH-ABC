# Design decision

Keep `frontend/src/data/unitSlides.js` as a synchronous compatibility facade. Import and spread grade catalogues in their original order. Callers and slide schemas remain unchanged.

```text
frontend/src/data/
  unitSlides.js
  slides/
    jardin/unitSlides.js
    transicion/unitSlides.js
    primero/unitSlides.js
    segundo/unitSlides.js
scripts/lib/unit_slides_store.cjs
```

Each grade module exports JSON-compatible `unitSlides`. The maintenance adapter parses this restricted format without evaluation and partitions writes by existing unit ownership. Unknown or removed units are rejected before writes; add units by explicitly editing their grade catalogue.

Chosen: static modules and a facade preserve synchronous consumers. This improves file organization, not bundle size.

Rejected: async loading or a CMS would change contracts beyond scope. One file per unit adds unnecessary granularity now.

New grades require a module, facade import/spread and registration in `grados.js`. Maintenance storage discovers grade directories automatically. No new dependencies.
