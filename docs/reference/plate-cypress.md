# Plate editor helpers in Cypress

This project wires the Plate Playwright adapter into Cypress so you can control editors in tests while keeping support for multiple editors on the page.

## Commands

- `cy.getPlateEditor(selector = '[data-slate-editor]')`  
  Locates an editable, then returns the editor instance from the Playwright adapter’s `EDITABLE_TO_EDITOR` WeakMap. Fails if none or multiple match the selector. Use a more specific selector when multiple editors exist.

- `cy.plateSetSelection(at, options?)`  
  Sets the editor selection via Plate’s APIs. Internally: `const range = editor.api.range(at); editor.tf.setSelection(range);`. Optional `options.editable` lets you target a specific editor selector.

## Selection shapes (`at`)

`at` follows Slate/Plate coordinates:

- **Point** (cursor): `{ path: [blockIndex, textIndex], offset: number }`
- **Range** (selection): `{ anchor: Point, focus: Point }`
- **Node path**: `[blockIndex]` or `[blockIndex, textIndex]` (selects that node)

Notes:
- `offset` is zero-based within the text node at `path`.
- You can span nodes by using different anchor and focus paths.

## Selecting specific text

1. Identify the text node and offsets you need.
2. Call `cy.plateSetSelection({ anchor: { path, offset: start }, focus: { path, offset: end } }, { editable?: '<selector>' })`.

Examples:

```ts
// Place the cursor after 5 chars in the first text node of the first block
cy.plateSetSelection({ path: [0, 0], offset: 5 });

// Select the first word in the first text node of the first block (chars 0-4)
cy.plateSetSelection({
  anchor: { path: [0, 0], offset: 0 },
  focus: { path: [0, 0], offset: 4 },
});

// Select across two blocks
cy.plateSetSelection({
  anchor: { path: [0, 0], offset: 2 },
  focus: { path: [1, 0], offset: 3 },
});

// Target a specific editor when multiple are present
cy.plateSetSelection({ path: [0, 0], offset: 0 }, { editable: '.secondary-editor' });
```

## Requirements

- The editor must render with `PlaywrightPlugin` so `window.platePlaywrightAdapter` is present.
- Each editable must have a unique selector if you need to disambiguate multiple editors.
