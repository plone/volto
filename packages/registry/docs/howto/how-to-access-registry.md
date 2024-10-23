### Accessing the configuration registry

You can access the configuration registry as follows.

```ts
import config from '@plone/registry'

const blocksConfig = config.blocks.blocksConfig
```

Given the fact that you created a `blocksConfig` key in `blocks` previously in your add-on, or being set by another add-on.
