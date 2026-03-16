---
myst:
  html_meta:
    "description": "Use the Plate Playwright adapter to drive Slate-based editors in Seven end-to-end tests."
    "property=og:description": "Use the Plate Playwright adapter to drive Slate-based editors in Seven end-to-end tests."
    "property=og:title": "Plate Playwright adapter reference for Seven"
    "keywords": "Plone, Seven, Plate, Slate, Playwright, editor testing, reference"
---

# Plate editor helpers in Playwright

Seven uses `@platejs/playwright` so you can drive Plate editors from Playwright tests while keeping support for multiple editors on the page.

## Prerequisites

-   The editor must render with `PlaywrightPlugin` so that `window.platePlaywrightAdapter` exists.
-   The default editable selector is `[data-slate-editor]`.
    Pass a specific `Locator` to `getEditorHandle` when multiple editors are on the page.
-   Use `waitForPlateEditorReady` from `packages/tooling/playwright/plate` to avoid races with lazy editor mounting.

    Example:

    ```ts
    import { waitForPlateEditorReady } from '../tooling/playwright/plate';

    await waitForPlateEditorReady(page);
    ```

## Basic usage

```ts
import {
  clickAtPath,
  getEditorHandle,
  setSelection,
} from '@platejs/playwright';
```

## Command reference

`getEditable(context)`
:   Returns a `Locator` for the editable inside the provided `Page` or `Locator`.

    Example:

    ```ts
    const editable = getEditable(page);
    await expect(editable).toBeVisible();
    ```

`getEditorHandle(page, editable?)`
:   Resolves a single editor instance from the adapter’s `EDITABLE_TO_EDITOR` map.
    Pass a `Locator` to disambiguate when multiple editors are present.

    Example:

    ```ts
    const editorHandle = await getEditorHandle(page);
    const selection = await page.evaluate((editor) => editor.selection, editorHandle);
    expect(selection).toBeNull();
    ```

`setSelection(page, editorHandle, at)`

:   Builds a range with `editor.api.range(at)` and applies it via `editor.tf.setSelection`.

    Selection shapes for `at`:
    
    Point (cursor)
    :   `{ path: [blockIndex, textIndex], offset: number }`
    
    Range
    :   `{ anchor: Point, focus: Point }`
    
    Node path
    :   `[blockIndex]` or `[blockIndex, textIndex]`

    The following example selects the first word in the first block.

    ```ts
    await setSelection(page, editorHandle, {
      anchor: { path: [0, 0], offset: 0 },
      focus: { path: [0, 0], offset: 4 },
    });
    await expect(page.getByLabel('Editor toolbar')).toBeVisible();
    ```

`clickAtPath(page, editorHandle, path)`

:   Resolves the Slate node at `path`, converts it to a DOM node, and clicks it.
    Handy before typing.

    Example:

    ```ts
    await clickAtPath(page, editorHandle, [1, 0]);
    await page.keyboard.type('Append text to the second paragraph');
    ```

`getNodeByPath(page, editorHandle, path)`

:   Resolves and returns the Slate node at `path` via the adapter.

    Example:

    ```ts
    const nodeHandle = await getNodeByPath(page, editorHandle, [0]);
    const node = await nodeHandle.jsonValue();
    expect(node.type).toEqual('p');
    ```

`getDOMNodeByPath(page, editorHandle, path)`

:   Resolves the DOM node for the Slate node at `path`.

    Example:

    ```ts
    const domNodeHandle = await getDOMNodeByPath(page, editorHandle, [0, 0]);
    const slateNodeType = await domNodeHandle.getAttribute('data-slate-node');
    expect(slateNodeType).toBe('text');
    ```

`getSelection(page, editorHandle)`

:   Returns the editor selection (or `null`).

    Example:

    ```ts
    const selection = await getSelection(page, editorHandle);
    expect(selection).toBeNull();
    ```

`getTypeAtPath(page, editorHandle, path)`

:   Returns the Plate node type at `path` (`text` for text nodes).

    Example:

    ```ts
    const type = await getTypeAtPath(page, editorHandle, [0]);
    expect(type).toBe('p');
    ```

## Selecting specific text

1. Identify the text node path and offsets.
2. Call `setSelection(page, editorHandle, { anchor, focus })`.

More examples:

```ts
// Place the cursor after 5 chars in the first text node of the first block
await setSelection(page, editorHandle, { path: [0, 0], offset: 5 });

// Select across two blocks
await setSelection(page, editorHandle, {
  anchor: { path: [0, 0], offset: 2 },
  focus: { path: [1, 0], offset: 3 },
});

// Target a specific editor when multiple are present
const secondaryEditor = page.locator('.secondary-editor [data-slate-editor]');
const secondaryHandle = await getEditorHandle(page, secondaryEditor);
await setSelection(page, secondaryHandle, { path: [0, 0], offset: 0 });
```
