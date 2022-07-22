---
html_meta:
  "description": "Migrate to @plone/volto-slate"
  "property=og:description": "Migrate to @plone/volto-slate"
  "property=og:title": "Migrate to @plone/volto-slate"
  "keywords": "Volto, Plone, frontend, React, Slate, Slate-React, @plone/volto-slate"
---

(migration-guide-slate-label)=

# Migration guide

`volto-slate` has been moved under `@plone` namespace and now is a part of volto. This section will guide you through migrating your addons/projects which were earlier using volto-slate to `@plone/volto-slate`.

(migration-guide-slate-projects-addons-label)=

### Migrating projects and addons

Make sure you update all occurrences of `volto-slate` in your project's package.json and `src/**` to `@plone/volto-slate`

```diff
-import {makeInlineElementPlugin} from "volto-slate/components/ElementEditor"
+import {makeInlineElementPlugin} from "@plone/volto-slate/elementEditor"
```

```{note}
`@plone/volto-slate` is now referenced from `./node_modules/@plone/volto/packages/volto-slate`

```

and then remove `volto-slate` from addons and dependencies in `package.json`:

```diff
addons: [
- "volto-slate:asDefault"
]

dependencies: {
- "volto-slate": "6.2.2"
}
```

You might also need to remove the `slate` and its wrapper libraries like `slate-react` from your addons and projects, as you might run into versioning issues:

```diff
dependencies: {
- "slate": "0.81.1",
- "slate-react": "0.81.0",
- "slate-hyperscript": "0.77.0"
}
```

If you are earlier developing on `volto-slate`, don't forget to remove it from `src/addons` and remove the corresponding entry in `jsconfig.json` and `mrs-developer.json`.

```{note}
You can use `yarn why volto-slate` in your project to find out which addons are using `volto-slate` and then eliminate the duplicated packages.

```
