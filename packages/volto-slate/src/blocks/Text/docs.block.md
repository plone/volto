---
block: slate
---

Holds rich text: a paragraph, a heading, a list or a quote, with inline formatting and links. It is the most common block on a page.

Each text block normally holds one paragraph, heading, list or quote. For several paragraphs, add one text block per paragraph, as the editor does when you press Enter.

The text is stored twice:

- `value`: the rich text, as a list of Slate nodes.
- `plaintext`: the same text without formatting. It is what the site indexes for search and what decides whether the block is empty, so keep it in sync with `value`.

### The `value` format

`value` is a list with one element (sometimes more). An element is `{ "type": ..., "children": [...] }`, and the innermost children are text nodes, `{ "text": "..." }`. Every element has at least one child, even if it's `{ "text": "" }`.

- Block-level types: `p` (paragraph), `h2`, `h3`, `h4` (headings; the page title is the `h1`), `ul` and `ol` (lists, whose children are `li` elements), and `blockquote`.
- Inline formatting is not a property of text nodes. It is an element that wraps them: `strong`, `em`, `u`, `del`, `sub`, `sup` and `code`.
- Links are `{ "type": "link", "data": { "url": ... }, "children": [...] }`. For content from the site, use its path, for example `/news/annual-report`; it is stored as a UID-based link. For an external link, use the full URL.

### Fields

- `value`: the rich text, as described above.
- `plaintext`: the text of `value` without formatting.
- `override_toc`, `level`, `entry_text`: optional. Replace this block's entry in a table of contents block.

### Examples

A heading:

```json
{
  "@type": "slate",
  "value": [{ "type": "h2", "children": [{ "text": "Our services" }] }],
  "plaintext": "Our services"
}
```

A paragraph with bold text and a link:

```json
{
  "@type": "slate",
  "value": [
    {
      "type": "p",
      "children": [
        { "text": "Read the " },
        { "type": "strong", "children": [{ "text": "annual report" }] },
        { "text": " on the " },
        {
          "type": "link",
          "data": { "url": "/news/annual-report" },
          "children": [{ "text": "news page" }]
        },
        { "text": "." }
      ]
    }
  ],
  "plaintext": "Read the annual report on the news page."
}
```

A bulleted list:

```json
{
  "@type": "slate",
  "value": [
    {
      "type": "ul",
      "children": [
        { "type": "li", "children": [{ "text": "First item" }] },
        { "type": "li", "children": [{ "text": "Second item" }] }
      ]
    }
  ],
  "plaintext": "First item Second item"
}
```
