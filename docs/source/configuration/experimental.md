---
myst:
  html_meta:
    "description": "Enable experimental features in Volto's configuration object"
    "property=og:description": "Enable experimental features in Volto's configuration object"
    "property=og:title": "Experimental features"
    "keywords": "Volto, Plone, frontend, experimental"
---

# Experimental features

Experimental features are planned for inclusion in a future release of Volto,
but are not yet considered mature by the community.

## Volto configuration

You need to enable experimental features in Volto's configuration object:

```js
import config from '@plone/volto/registry'

config.experimental.addBlockButton.enabled = true;
```

Currently the following experimental features are available:

```{glossary}
:sorted:

addBlockButton
    Enables a new UI for adding blocks.
    The button to add a block is now shown below any selected block.
    A text block can also be added by clicking in the empty area at the bottom of the content area.

```
