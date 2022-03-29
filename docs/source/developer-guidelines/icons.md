---
html_meta:
  'description': 'Icons used in Volto'
  'property=og:description': 'Icons used in Volto'
  'property=og:title': 'Icons'
  'keywords': 'Volto, Plone, frontend, React, Icons, svg, pastanaga'
---

# Icons

Volto has pre-defined set of SVG icons from Pastanaga UI icon system and are available under [Volto icons](https://github.com/plone/volto/tree/master/src/icons).

```js
import addUserSVG from '@plone/volto/icons/add-user.svg';
import { Icon } from '@plone/volto/components';

<Icon name={addUserSVG} size="24px" />;
```

```{note}
These icons are intended to be used only in "official" Pastanaga UI, so please refrain to use them on personal projects unless they are based on Pastanaga UI.
```
