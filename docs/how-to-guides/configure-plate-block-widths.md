---
myst:
  html_meta:
    "description": "Configure width defaults and options for Plate blocks"
    "property=og:description": "Configure width defaults and options for Plate blocks"
    "property=og:title": "Configure Plate block widths"
    "keywords": "Seven, Plate, block width, editor"
---

# Configure Plate block widths

This guide explains how block widths are configured in the Plate editor, how to adjust defaults for existing blocks, and how to set widths for new block plugins.

## How it works

The block width system is implemented by `BlockWidthPlugin`:

- It injects a `blockWidth` property on block elements.
- It maps that value to `style.maxWidth` in the rendered element.
- It uses the configured defaults per block to decide which width should be used.
- The width chooser in the toolbar uses the active block's config to show only allowed widths.

The plugin lives in:

- `packages/plate/components/editor/plugins/block-width-plugin.ts`
- `packages/plate/components/editor/plugins/block-width-kit.tsx`
- `packages/plate/components/editor/plugins/block-width-base-kit.tsx`

The available width values are:

- `BLOCK_WIDTH_VALUES.layout`
- `BLOCK_WIDTH_VALUES.default`
- `BLOCK_WIDTH_VALUES.narrow`

These values are CSS custom properties, so the actual sizes come from CSS:

- `--layout-container-width`
- `--default-container-width`
- `--narrow-container-width`

## Configure defaults for existing blocks

Each block can define its own width defaults via `options.blockWidth` in its plugin configuration. The two keys you can set are:

- `defaultWidth`: the width applied when the block has no explicit width set
- `widths`: the allowed widths that the toolbar will show

### Example: Paragraphs default to narrow

This is already configured in the basic blocks kit:

```ts
import { BLOCK_WIDTH_VALUES } from './block-width-plugin';

ParagraphPlugin.configure({
  node: { component: ParagraphElement },
  options: {
    blockWidth: {
      defaultWidth: BLOCK_WIDTH_VALUES.narrow,
    },
  },
});
```

File:
- `packages/plate/components/editor/plugins/basic-blocks-kit.tsx`
- `packages/plate/components/editor/plugins/basic-blocks-base-kit.tsx`

### Example: Table of contents default

```ts
import { BLOCK_WIDTH_VALUES } from './block-width-plugin';

TocPlugin.configure({
  options: {
    blockWidth: {
      defaultWidth: BLOCK_WIDTH_VALUES.default,
    },
  },
}).withComponent(TocElement);
```

File:
- `packages/plate/components/editor/plugins/toc-kit.tsx`
- `packages/plate/components/editor/plugins/toc-base-kit.tsx`

### Example: Restrict widths for a block

If a block should only allow a subset of widths, specify `widths`:

```ts
import { BLOCK_WIDTH_VALUES } from './block-width-plugin';

SomeBlockPlugin.configure({
  options: {
    blockWidth: {
      defaultWidth: BLOCK_WIDTH_VALUES.default,
      widths: [
        BLOCK_WIDTH_VALUES.default,
        BLOCK_WIDTH_VALUES.narrow,
      ],
    },
  },
});
```

The toolbar will only show `default` and `narrow` for that block.

## Configure widths for new block plugins

When creating a new block plugin, add `options.blockWidth` in the plugin's configuration:

```ts
import { createPlatePlugin } from 'platejs/react';
import { BLOCK_WIDTH_VALUES } from '../plugins/block-width-plugin';

export const MyBlockPlugin = createPlatePlugin({
  key: 'myBlock',
  node: {
    isElement: true,
  },
  options: {
    blockWidth: {
      defaultWidth: BLOCK_WIDTH_VALUES.default,
      widths: [
        BLOCK_WIDTH_VALUES.layout,
        BLOCK_WIDTH_VALUES.default,
      ],
    },
  },
});
```

If you don't specify `blockWidth`, the plugin will use:

- `defaultWidth`: `BLOCK_WIDTH_VALUES.default`
- `widths`: all available widths

## Notes

- Widths are stored in the node as `blockWidth`.
- The `BlockWidthPlugin` normalizes blocks to ensure `blockWidth` is set and valid.
- Centering is handled by CSS in the editor container so blocks with max widths are centered.

If you need to override widths in a specific editor instance, you can configure the block plugin in that editor kit with different `options.blockWidth` values.
