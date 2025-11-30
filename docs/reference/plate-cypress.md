# Plate editor helpers in Cypress

This project wires the Plate Playwright adapter into Cypress so you can control editors in tests while keeping support for multiple editors on the page.

## Prerequisites

- The editor must render with `CypressPlugin` so `window.plateCypressAdapter` exists.
- The default editable selector is `.slate-editor[data-slate-editor]`; pass `options.editable` when multiple editors are on the page.

## Command reference

### `cy.getPlateEditor(editable = '.slate-editor[data-slate-editor]')`

Locates a single editable, focuses it, and returns the Plate editor instance from the adapter’s `EDITABLE_TO_EDITOR` map.

Example:

```ts
cy.getPlateEditor().then((editor) => {
  expect(editor.api).to.have.property('range');
});
```

### `cy.plateSetSelection(at, options?)`

Builds a range with `editor.api.range(at)` and applies it via `editor.tf.setSelection`. Accepts `options.editable` to target a specific editor.

Selection shapes for `at`:
- Point (cursor): `{ path: [blockIndex, textIndex], offset: number }`
- Range: `{ anchor: Point, focus: Point }`
- Node path: `[blockIndex]` or `[blockIndex, textIndex]`

Example (select the first word in the first block):

```ts
cy.plateSetSelection({
  anchor: { path: [0, 0], offset: 0 },
  focus: { path: [0, 0], offset: 4 },
});
cy.get('[role="toolbar"]').should('be.visible');
```

### `cy.plateClickAtPath(path, options?)`

Resolves the Slate node at `path`, converts it to a DOM node, scrolls it into view, and clicks it (forced). Handy before typing.

Example:

```ts
cy.plateClickAtPath([1, 0]).type('Append text to the second paragraph');
```

### `cy.plateGetNode(path, options?)`

Resolves and returns the Slate node at `path` via the adapter.

Example:

```ts
cy.plateGetNode([0]).should((node) => {
  expect(node.type).to.equal('p');
});
```

### `cy.plateGetDOMNode(path, options?)`

Resolves the DOM node for the Slate node at `path`.

Example:

```ts
cy.plateGetDOMNode([0, 0]).should('have.attr', 'data-slate-node', 'text');
```

### `cy.plateTypeAtPath(path, text, options?)`

Clicks the node at `path` and types `text` into it in one chain. Forwards `options.typeOptions` to `cy.type`.

Example:

```ts
cy.plateTypeAtPath(
  [0, 0],
  'This is the first line{enter}{enter}And a new paragraph',
  { typeOptions: { delay: 0 } },
);
```

### `cy.plateSetNode(path, newProperties, options?)`

Merges `newProperties` into the node at `path` using `editor.api.setNodes`.

Example (promote the first block to an h2):

```ts
cy.plateSetNode([0], { type: 'h2' });
cy.plateGetNode([0]).its('type').should('equal', 'h2');
```

### `cy.plateFocus(options?)`

Clicks the first element node inside the editable (or a provided selector) to focus the editor.

Example:

```ts
cy.plateFocus();
cy.focused().type('Start typing immediately after focus');
```

## Selecting specific text

1. Identify the text node path and offsets.
2. Call `cy.plateSetSelection({ anchor, focus }, { editable?: '<selector>' })`.

More examples:

```ts
// Place the cursor after 5 chars in the first text node of the first block
cy.plateSetSelection({ path: [0, 0], offset: 5 });

// Select across two blocks
cy.plateSetSelection({
  anchor: { path: [0, 0], offset: 2 },
  focus: { path: [1, 0], offset: 3 },
});

// Target a specific editor when multiple are present
cy.plateSetSelection({ path: [0, 0], offset: 0 }, { editable: '.secondary-editor' });
```
