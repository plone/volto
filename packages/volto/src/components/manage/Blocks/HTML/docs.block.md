---
block: html
---

Renders raw HTML markup as it is.

Only use it for trusted markup that can't be built with other blocks: the HTML is not sanitized.

### Fields

- `html`: the HTML markup.

### Example

```json
{
  "@type": "html",
  "html": "<p>Custom <strong>HTML</strong> content.</p>"
}
```
