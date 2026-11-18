---
block: leadimage
---

Shows the lead image of the content item, the image in its `image` field, at the place of the block. The image is not block data: the block takes it from the content item, so the block is useful only on content that has a lead image field. The block stores only its layout and an optional link.

The image, its file name, its size and its alternative text are not stored in the block. The alternative text is the `image_caption` field of the content item. The block shows nothing if the content item has no image.

### Fields

- `align`: `left`, `right`, `center` or `full`. Sets the place of the image on the page, and its size with it. When it is not set, the image is centered. There is no separate size field.
- `href`: optional link target, a path or a full URL. The image links to it.
- `openLinkInNewTab`: `true` to open `href` in a new tab.

### Example

```json
{
  "@type": "leadimage",
  "align": "right",
  "href": "/news/annual-report-2025",
  "openLinkInNewTab": false
}
```
