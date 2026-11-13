---
block: gridBlock
---

Places blocks side by side in columns, for example several teasers in a row. It holds up to {{maxLength}} blocks.

The grid contains its own blocks, in the same format as a page: `blocks` maps block IDs to block data, and `blocks_layout.items` lists those IDs in display order. Every ID must appear in both. The allowed blocks are {{allowedBlocks}}.

The grid controls the layout of its blocks, so alignment and size settings of the blocks inside it are not used.

### Fields

- `blocks`: object of child blocks keyed by a unique ID (normally a UUID).
- `blocks_layout`: `{ "items": [...] }` with the child IDs in order.

### Example

```json
{
  "@type": "gridBlock",
  "blocks": {
    "3f1a6c2e-0d8b-4a8e-9c55-1b2f7e9d4a01": {
      "@type": "teaser",
      "href": [{ "@id": "/news/article-one", "title": "Article one" }]
    },
    "8b7d0e4f-5c2a-4e61-a3f9-6d0c2b8e1f72": {
      "@type": "teaser",
      "href": [{ "@id": "/news/article-two", "title": "Article two" }]
    }
  },
  "blocks_layout": {
    "items": [
      "3f1a6c2e-0d8b-4a8e-9c55-1b2f7e9d4a01",
      "8b7d0e4f-5c2a-4e61-a3f9-6d0c2b8e1f72"
    ]
  }
}
```
