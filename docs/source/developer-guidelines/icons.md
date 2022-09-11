---
myst:
  html_meta:
    "description": "Icons used in Volto"
    "property=og:description": "Icons used in Volto"
    "property=og:title": "Icons"
    "keywords": "Volto, Plone, frontend, React, Icons, svg, pastanaga"
---

# Icons

Volto has a pre-defined set of SVG icons from the Pastanaga UI icon system. You can find them in the code repo in [here](https://github.com/plone/volto/tree/master/src/icons). They are also browseable in https://pastanaga.io/icons/.

The following example shows how to display one of these icons.

```js
import addUserSVG from '@plone/volto/icons/add-user.svg';
import { Icon } from '@plone/volto/components';

<Icon name={addUserSVG} size="24px" />;
```

```{note}
These icons are intended to be used only in the "official" Plone Pastanaga UI.
Please refrain from using them on personal projects unless they are based on Plone.
```
