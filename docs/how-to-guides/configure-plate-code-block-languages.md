---
myst:
  html_meta:
    "description": "Configure and shadow Plate code block syntax highlighting languages"
    "property=og:description": "Configure and shadow Plate code block syntax highlighting languages"
    "property=og:title": "Configure Plate code block languages"
    "keywords": "Seven, Plate, code block, lowlight, highlight.js, shadowing"
---

# Configure Plate code block languages

This guide explains how to configure which languages are available for syntax highlighting in Plate code blocks, and how to shadow that configuration per project or add-on.

## Default language module

Seven reads the language map from:

- {file}`packages/plate/components/editor/plugins/code-block-languages.ts`

By default, it exports `lowlight`'s `common` language set:

```ts
import { common } from 'lowlight';

export const codeBlockLanguages = common;
```

Both editor kits consume this same module:

- {file}`packages/plate/components/editor/plugins/code-block-kit.tsx`
- {file}`packages/plate/components/editor/plugins/code-block-base-kit.tsx`

## Shadow the language list

To customize languages per project, shadow this module path in your add-on:

```
customizations/
└── @plone/
    └── plate/
        └── components/
            └── editor/
                └── plugins/
                    └── code-block-languages.ts
```

In your shadow, export `codeBlockLanguages` with the same shape expected by `createLowlight(...)`.

Example with a minimal curated set:

```ts
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import markdown from 'highlight.js/lib/languages/markdown';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

export const codeBlockLanguages = {
  bash,
  sh: bash,
  css,
  html: xml,
  javascript,
  js: javascript,
  json,
  markdown,
  md: markdown,
  typescript,
  ts: typescript,
  xml,
};
```

## Notes

- Keep only the languages your project needs to reduce bundle size.
- Preserve `codeBlockLanguages` as the named export so both kits continue to work.
- Rebuild and regenerate bundle stats after changes to measure impact.
