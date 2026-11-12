---
block: slateTable
---

Shows a table of rows and cells, for data that a reader compares across rows and columns. Each cell holds rich text, in the same Slate format as the text block. The table, its rows, its cells and its settings are all stored in one `table` object.

### The `table` object

- `rows`: the rows of the table, in order. The first row is the header row. The view does not show it when `hideHeaders` is `true`.
- `hideHeaders`, `sortable`, `fixed`, `celled`, `striped`, `compact`, `basic` and `inverted`: the table's settings, all `true` or `false`. `sortable` lets a reader click a header to sort the rows, in view mode only. `fixed` gives the cells a fixed width, `celled` draws the cell borders, `striped` shades alternate rows, `compact` reduces the spacing, `basic` removes the table's borders and background, and `inverted` uses light text on a dark background.

### Rows and cells

A row is `{ "key": ..., "cells": [...] }`, and a cell is `{ "key": ..., "type": ..., "value": [...] }`.

- `key`: an identifier, unique within the table.
- `type`: `header` for a header cell, `data` for an ordinary cell. Cells of the first row are normally `header`.
- `value`: the content of the cell, as a list of Slate nodes. A cell is normally one paragraph. An empty cell has `{ "type": "p", "children": [{ "text": "" }] }`.

### The `value` format

`value` follows the format of the text block. An element is `{ "type": ..., "children": [...] }`, and the innermost children are text nodes, `{ "text": "..." }`. Every element has at least one child.

- Block-level types: `p` (paragraph) is the one used in cells.
- Inline formatting is an element that wraps text nodes: `strong`, `em`, `u`, `del`, `sub`, `sup` and `code`.
- Links are `{ "type": "link", "data": { "url": ... }, "children": [...] }`. For content from the site, use its path; for an external link, use the full URL.

### Fields

- `table`: the table, as described above.

### Example

A table with a header row and two data rows, where one cell has bold text and another has a link:

```json
{
  "@type": "slateTable",
  "table": {
    "hideHeaders": false,
    "sortable": true,
    "fixed": true,
    "celled": true,
    "striped": false,
    "compact": false,
    "basic": false,
    "inverted": false,
    "rows": [
      {
        "key": "row-header",
        "cells": [
          {
            "key": "cell-1",
            "type": "header",
            "value": [{ "type": "p", "children": [{ "text": "Service" }] }]
          },
          {
            "key": "cell-2",
            "type": "header",
            "value": [{ "type": "p", "children": [{ "text": "Status" }] }]
          }
        ]
      },
      {
        "key": "row-1",
        "cells": [
          {
            "key": "cell-3",
            "type": "data",
            "value": [
              {
                "type": "p",
                "children": [
                  { "type": "strong", "children": [{ "text": "Intranet" }] }
                ]
              }
            ]
          },
          {
            "key": "cell-4",
            "type": "data",
            "value": [{ "type": "p", "children": [{ "text": "Online" }] }]
          }
        ]
      },
      {
        "key": "row-2",
        "cells": [
          {
            "key": "cell-5",
            "type": "data",
            "value": [
              {
                "type": "p",
                "children": [
                  {
                    "type": "link",
                    "data": { "url": "/news/annual-report" },
                    "children": [{ "text": "Annual report" }]
                  }
                ]
              }
            ]
          },
          {
            "key": "cell-6",
            "type": "data",
            "value": [{ "type": "p", "children": [{ "text": "Published" }] }]
          }
        ]
      }
    ]
  }
}
```
