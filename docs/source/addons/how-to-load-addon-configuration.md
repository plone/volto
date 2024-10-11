---
myst:
  html_meta:
    "description": "Loading configuration from add-ons"
    "property=og:description": "Loading configuration from add-ons"
    "property=og:title": "Loading configuration from add-ons"
    "keywords": "Volto, add-on, extensions, frontend, Plone, configuration"
---

# Loading configuration from add-ons

As a convenience, an add-on can export configuration functions that can mutate,
in-place, the overall Volto {term}`configuration registry`.
An add-on can export multiple configurations methods, making it possible to selectively choose which specific add-on functionality you want to load.

Some add-ons might choose to allow the Volto project to selectively load some of
their configuration, so they may offer additional configuration functions,
which you can load by overloading the add-on name in the `addons` package.json
key, like so:

```{code-block} json
:emphasize-lines: 4

{
  "name": "my-nice-volto-project",
  "addons": [
    "acme-volto-foo-add-on:loadOptionalBlocks,overrideSomeDefaultBlock",
    "volto-ga"
  ],
}
```

```{note}
The additional comma-separated names should be exported from the add-on
package's `index.js`. The main configuration function should be exported as
the default. An add-on's default configuration method will always be loaded.
```

If for some reason, you want to manually load the add-on, you could always do,
in your project's `config.js` module:

```js
import loadExampleAddon, { enableOptionalBlocks } from 'volto-example-add-on';
import * as voltoConfig from '@plone/volto/config';

const config = enableOptionalBlocks(loadExampleAddon(voltoConfig));

export blocks = {
  ...config.blocks,
}
```

As this is a common operation, Volto provides a helper method for this:

```js
import { applyConfig } from '@plone/volto/helpers';
import * as voltoConfig from '@plone/volto/config';

const config = applyConfig([
    enableOptionalBlocks,
    loadExampleAddon
], voltoConfig);

export blocks = {
  ...config.blocks,
}
```

The `applyConfig` helper ensures that each configuration methods returns the
config object, avoiding odd and hard to track errors when developing add-ons.
