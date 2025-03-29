---
myst:
  html_meta:
    "description": "How to access the configuration registry in @plone/registry"
    "property=og:description": "How to access the configuration registry in @plone/registry"
    "property=og:title": "Access the configuration registry"
    "keywords": "@plone/registry, registry, configuration, guide"
---

# Access the configuration registry

You can access the configuration registry as follows.

```ts
import config from '@plone/registry'

const blocksConfig = config.blocks.blocksConfig
```

This method assumes that either you previously created a `blocksConfig` key in `blocks` in your add-on, or another add-on sets it.
