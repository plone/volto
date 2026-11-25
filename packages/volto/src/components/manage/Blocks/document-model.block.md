---
document_model: plone.blocks
---

Content stores its blocks in two fields.
`blocks` maps each block ID to the block data, with the block type in `@type`.
`blocks_layout.items` lists the block IDs in the order they are shown.
A block that is in `blocks` but not in `blocks_layout.items` isn't shown, and content without both fields shows no blocks.

Use a new, unique ID for each block, such as a UUID.
Container blocks, such as the grid block, hold their own `blocks` and `blocks_layout` in their block data.

```json
{
  "blocks": {
    "7c9d2b1e-5a0f-4f3e-9b1a-2d6e8f0c4a11": {
      "@type": "title"
    },
    "e3b8a5c2-1d4f-4a6b-8c9e-0f2a7d5b3c90": {
      "@type": "slate",
      "value": [{ "type": "p", "children": [{ "text": "Hello." }] }],
      "plaintext": "Hello."
    }
  },
  "blocks_layout": {
    "items": [
      "7c9d2b1e-5a0f-4f3e-9b1a-2d6e8f0c4a11",
      "e3b8a5c2-1d4f-4a6b-8c9e-0f2a7d5b3c90"
    ]
  }
}
```
