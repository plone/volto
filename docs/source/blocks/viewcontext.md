---
myst:
  html_meta:
    "description": "Sharing a context between blocks"
    "property=og:description": "Sharing a context between blocks"
    "property=og:title": "context of view"
    "keywords": "Volto, React, blocks, view, context"
---

(viewcontext-label)=

# context of `View`

```{versionadded} Volto 18.0.0-alpha.48
```

Sharing a context between blocks.

Volto provides a context of the `View` component for the case that blocks need to know about each other.

Example: tooltips generated from a glossary show up only on the first occurrence on a page.

Initialize the context for your add-on:

```js
config.views.viewContext["volto-slate-glossary"] = [];
```

Get the context and use it:

```js
import { getViewContext } from '@plone/volto/components/theme/View/View';


    let matchedGlossaryTerms = getViewContext("volto-slate-glossary");
```


