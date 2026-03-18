---
myst:
  html_meta:
    "description": "Migrate existing Volto blocks to the new Plate editor."
    "property=og:description": "Migrate existing Volto blocks to the new Plate editor."
    "property=og:title": "Volto blocks migration to Plate"
    "keywords": "Volto, Plone, frontend, React, Seven, Blocks, Migration"
---

# Volto blocks migration to Seven using Plate

Seven introduces the new {term}`Plate` editor, which also has an impact on
existing Volto blocks. While the Plate editor supports Volto blocks, the default
selection of Plate plugins makes some blocks redundant.

## Migrate the table of contents block

The Plate editor ships with a built-in table of contents (ToC) plugin that
watches for headings and keeps the table of contents updated as the user types,
making the old ToC block redundant. The plugin detects the title block and all
heading nodes (h1 to h6). Headings built into blocks are deliberately not
supported anymore.

When migrating to Seven, existing ToC blocks should be removed. If that is not
practical, you may register the ToC block in the configuration and continue
using the Volto block, but this is discouraged as to not mix the two variations.

Furthermore, since the ToC plugin only recognizes heading nodes and the title
block, any block that renders a heading through its own schema should have that
heading removed and replaced by a heading node in the Plate editor.