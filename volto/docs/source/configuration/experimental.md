---
myst:
  html_meta:
    "description": "Enable experimental features in Volto's configuration object"
    "property=og:description": "Enable experimental features in Volto's configuration object"
    "property=og:title": "Experimental features"
    "keywords": "Volto, Plone, frontend, experimental, features"
---

# Experimental features

Experimental features are planned for inclusion in a future release of Volto,
but are not yet considered mature by the community.
An experimental feature gives users an easy way to install it and see if anything breaks before we make a new stable release that includes it.

## Volto configuration

You can enable an experimental feature—also called a "feature flag"—in Volto's configuration object as shown below.

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
