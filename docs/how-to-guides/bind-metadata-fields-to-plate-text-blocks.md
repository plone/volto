---
myst:
  html_meta:
    "description": "How to bind a metadata field to a text-like Plate block in Seven."
    "property=og:description": "How to bind a metadata field to a text-like Plate block in Seven."
    "property=og:title": "Bind metadata fields to Plate text blocks"
    "keywords": "Seven, Plate, metadata, title block, how-to"
---

# Bind Metadata Fields To Plate Text Blocks

Use this guide when you want a Plate block to stay synchronized with a single metadata field such as `title` or `description`.

Reference:

- [Metadata Text Binding](../reference/metadata-text-binding.md)

Implementation sources:

- {file}`packages/plate/components/editor/plugins/metadata-text-binding.tsx`
- {file}`packages/plate/components/editor/plugins/title.tsx`

## Before You Start

This pattern fits when:

- one metadata field maps to one editor value
- the block can expose that value as a string
- the plugin can detect whether the block is currently active

If your block is structured or maps multiple fields at once, stop here and use a richer abstraction instead.

## Steps

1. Extract the current value from the plugin node.
2. Detect whether the current selection is inside that node.
3. Call `useMetadataTextBinding` from an `afterEditable` component.
4. Implement `writeToEditor` inside the plugin so metadata changes can be applied safely.
5. Add unit and end-to-end tests for both sync directions.

## Example

```ts
function ExampleMetadataSync() {
  useMetadataTextBinding({
    field: 'description',
    getState: (editor) => {
      const entry = getMyNodeEntry(editor.children as unknown[]);

      if (!entry) {
        return { isActive: false, value: null };
      }

      const path = [entry.index];

      return {
        isActive: isSelectionInside(editor.selection, path),
        value: getNodeText(entry.node),
      };
    },
    writeToEditor: (editor, value) => {
      const entry = getMyNodeEntry(editor.children as unknown[]);
      if (!entry) return;

      editor.tf.replaceNodes(
        {
          ...(entry.node as object),
          children: [{ text: value }],
        } as any,
        { at: [entry.index] },
      );
    },
  });

  return null;
}
```

## Practical Advice

- Keep `writeToEditor` plugin-local, because only the plugin knows the node shape it owns.
- If a replace is needed, make sure it only runs while the block is inactive.
- Return `null` from `getState` when the block does not exist yet.
- Treat the editor as the source of truth while the bound block is active.

## Testing

At minimum, cover:

- metadata to editor sync
- editor to metadata sync
- fast typing while the block is active

Current examples:

- {file}`packages/plate/components/editor/plugins/metadata-text-binding.test.ts`
- {file}`packages/cmsui/acceptance/tests/title-block-sync.test.ts`
