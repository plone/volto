---
block: image
---

Shows a single image, either an Image content item from the site or an external image, with optional alt text, link, alignment and size.

For an image from the site, set `url` to the path of the Image content item (for example `/my-folder/my-image`) or to its full URL, and set `image_field` to `image`. Both forms are stored as a UID-based path. Don't use an `@@images` scale URL.

For an external image, set `url` to the full image URL and leave out `image_field`.

Inside a container block such as the grid, the container controls the layout, so `align` and `size` are not used there.

### Fields

- `url`: path or URL of the image.
- `image_field`: the image field of the content item, normally `image`. Only for images from the site.
- `alt`: alternative text for screen readers.
- `href`: optional link target.
- `align`, `size`: alignment and size on the page.

### Example

```json
{
  "@type": "image",
  "url": "/images/team-photo",
  "image_field": "image",
  "alt": "The team at the 2025 conference"
}
```
