---
myst:
  html_meta:
    "description": "Legacy Slate to Plate converters"
    "property=og:description": "Legacy Slate to Plate converters"
    "property=og:title": "Legacy Slate to Plate converters"
    "keywords": "Plone, Seven, plate, slate, reference"
---

# Legacy Slate to Plate converters

```{warning}
These converters are under heavy development and may change in future releases.
This document will be updated accordingly, but for now it serves as a reference for the current and future implementations.
```

`@plone/plate` includes small migration helpers to make legacy Slate content render correctly in Plate without pre-processing.
They run both in SSR (static pass) and in the client (plugin normalizers).

## Marks

- **Bold (`type: "strong"`)**
  - Runtime: `LegacyBoldPlugin` (wraps Plate normalize, sets `bold: true` on text descendants, unwraps `strong`)
  - Static/SSR: `migrateLegacyBoldInValue`
  - Example:
    - Slate:
      ```json
      {
        "type": "strong",
        "children": [{ "text": "bold text" }]
      }
      ```
    - Plate:
      ```json
      { "text": "bold text", "bold": true }
      ```
- **Italic (`type: "em"`)**
  - Runtime: `LegacyItalicPlugin` (sets `italic: true`, unwraps `em`)
  - Static/SSR: `migrateLegacyItalicInValue`
  - Example:
    - Slate:
      ```json
      {
        "type": "em",
        "children": [{ "text": "italic text" }]
      }
      ```
    - Plate:
      ```json
      { "text": "italic text", "italic": true }
      ```
- **Strikethrough (`type: "del"`)**
  - Runtime: `LegacyStrikethroughPlugin` (sets `strikethrough: true`, unwraps `del`)
  - Static/SSR: `migrateLegacyStrikethroughInValue`
  - Example:
    - Slate:
      ```json
      {
        "type": "del",
        "children": [{ "text": "struck text" }]
      }
      ```
    - Plate:
      ```json
      { "text": "struck text", "strikethrough": true }
      ```

These plugins are added to `BasicMarksKit` and `BaseBasicMarksKit`, so editors/renderers pick them up automatically.

## Links

- Legacy shapes: `type: "link"` and/or `data.url` + optional `data.target`
- Runtime: `LegacyLinkPlugin` normalizes to Plate link type (`KEYS.link`, usually `"a"`) and moves `data.url` → `url`, `data.target` → `target`.
- Static/SSR: `migrateLegacyLinksInValueStatic(value, linkType?)` defaults to `KEYS.link`.
  - Example:
    - Slate:
      ```json
      {
        "type": "link",
        "data": { "url": "https://example.com", "target": "_blank" },
        "children": [{ "text": "Example" }]
      }
      ```
    - Plate:
      ```json
      {
        "type": "a",
        "url": "https://example.com",
        "target": "_blank",
        "children": [{ "text": "Example" }]
      }
      ```

Both editor and renderer kits include the plugin, so client hydration keeps the normalized shape.

## Lists

- Legacy shapes: `type: "ul"` / `type: "ol"` with `li` children.
- Runtime: `LegacyListPlugin` flattens list wrappers into paragraphs with `listStyleType`, `indent: 1`, and `listStart` (for subsequent items).
- Static/SSR: `migrateLegacyListsInValue`
  - Example (unordered):
    - Slate:
      ```json
      {
        "type": "ul",
        "children": [
          { "type": "li", "children": [{ "text": "first" }] },
          { "type": "li", "children": [{ "text": "second" }] }
        ]
      }
      ```
    - Plate:
      ```json
      [
        {
          "type": "p",
          "children": [{ "text": "first" }],
          "indent": 1,
          "listStyleType": "disc"
        },
        {
          "type": "p",
          "children": [{ "text": "second" }],
          "indent": 1,
          "listStyleType": "disc",
          "listStart": 2
        }
      ]
      ```
  - Example (ordered):
    - Slate:
      ```json
      {
        "type": "ol",
        "children": [
          { "type": "li", "children": [{ "text": "first" }] },
          { "type": "li", "children": [{ "text": "second" }] }
        ]
      }
      ```
    - Plate:
      ```json
      [
        {
          "type": "p",
          "children": [{ "text": "first" }],
          "indent": 1,
          "listStyleType": "decimal",
          "listRestartPolite": 1
        },
        {
          "type": "p",
          "children": [{ "text": "second" }],
          "indent": 1,
          "listStyleType": "decimal",
          "listStart": 2
        }
      ]
      ```

## One-shot normalizer (SSR/manual)

`normalizeLegacyValue(value, linkType?)` runs bold, italic, strikethrough, list, and link static migrations in place.
Use this before `usePlateEditor` on the server, or in a one-off migration script.

## Types to aid manual scripts

- `LegacyBoldNode`
- `LegacyItalicNode`
- `LegacyLinkElement` / `LegacyLinkData`
- `LegacyStrikethroughNode`
- `LegacyListElement`

## Tests

Ref: `components/editor/plugins/legacy-migrations.test.ts` for expected behaviors and idempotency.***
