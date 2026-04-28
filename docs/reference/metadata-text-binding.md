---
myst:
  html_meta:
    "description": "Reference for metadata-backed text bindings in Plate plugins."
    "property=og:description": "Reference for metadata-backed text bindings in Plate plugins."
    "property=og:title": "Metadata text binding reference for Seven"
    "keywords": "Seven, Plate, metadata, title block, editor binding"
---

# Metadata Text Binding

`useMetadataTextBinding` is a small synchronization helper for Plate plugins that mirror a metadata field into a text-like block in the editor.

Current implementation:

- Source: {file}`packages/plate/components/editor/plugins/metadata-text-binding.tsx`
- Example usage: {file}`packages/plate/components/editor/plugins/title.tsx`

How to apply it in a plugin:

- See [Bind Metadata Fields To Plate Text Blocks](../how-to-guides/bind-metadata-fields-to-plate-text-blocks.md)

## What It Is For

Use it when all of the following are true:

- One metadata field maps to one editor value.
- The editor value is plain text or can be treated as plain text.
- The plugin can tell whether its block is currently active.
- Metadata-to-editor writes can be implemented by a plugin-specific `writeToEditor` function.

Typical fits:

- Title block bound to `title`
- Subtitle block bound to `description`
- Simple summary or teaser text block bound to a single field

## What It Guarantees

The helper enforces these rules:

- While the bound block is active, editor changes win and are pushed into the metadata field.
- While the bound block is inactive, metadata changes win and are pushed into the editor.
- Self-inflicted echoes are suppressed with explicit tracking of the last editor-originated and field-originated values.

This is the important difference from the earlier `previous value` sync approach: it avoids blindly writing a stale metadata value back into the block while the user is typing.

## API

```ts
useMetadataTextBinding({
  field: 'title',
  getState: (editor) => ({
    isActive: true,
    value: 'Current text',
  }),
  writeToEditor: (editor, value) => {
    // plugin-specific editor update
  },
});
```

Binding shape:

- `field`: metadata field name in `formAtom`
- `getState(editor)`: returns:
  - `value`: current plain-text value represented by the block, or `null` if the block is absent
  - `isActive`: whether the user is currently editing that block
- `writeToEditor(editor, value)`: applies an external metadata update into the block

## When Not To Use It

This helper is intentionally narrow. Do not use it for:

- Structured metadata that maps to multiple nodes or multiple fields
- Rich text metadata where plain-text extraction is lossy
- Blocks whose editor state cannot be represented as a single string
- Cases where metadata and editor must merge concurrently instead of following active/inactive ownership

For those cases, create a richer binding abstraction with explicit serialization and conflict handling.

## Notes

- Prefer minimal metadata-to-editor writes, but correctness matters more than micro-optimizing transforms.
- If a structural replace is required, only allow it while the block is inactive.
- Return `null` from `getState` when the block is absent so the helper stays idle.
- Add both unit coverage for sync decisions and end-to-end coverage for the real editor behavior.
