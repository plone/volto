---
block: teaser
---

Shows a card that links to one content item, with its title, description and image. Use it for highlights chosen by hand. To show items that match a query, use a listing block instead.

Usually only `href` is needed: the teaser reads the title, description and image from the target item, and follows it when that item changes. Set `overwrite` to `true` to replace them with your own values; the teaser then no longer follows changes to the target.

### Fields

- `href`: a list with one item, `[{ "@id": path or URL, "title": title }]`. Use a path for content from the site, or a full URL for an external link.
- `overwrite`: use the teaser's own `title`, `description` and `preview_image` instead of the target's.
- `preview_image`: only with `overwrite`. A list with one item, `[{ "@id": path, "image_field": "image" }]`; leave out `image_field` for an external image.
- `styles.align`: `left`, `right` or `center`. Not used inside a grid, where the grid controls the layout.

### Example

```json
{
  "@type": "teaser",
  "href": [
    { "@id": "/news/annual-report-2025", "title": "Annual Report 2025" }
  ]
}
```
