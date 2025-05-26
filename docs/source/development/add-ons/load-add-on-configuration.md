---
myst:
  html_meta:
    "description": "Load configuration from add-ons"
    "property=og:description": "Load configuration from add-ons"
    "property=og:title": "Load configuration from add-ons"
    "keywords": "Volto, add-on, extensions, frontend, Plone, configuration"
---

# Load configuration from add-ons

As a convenience, an add-on can export configuration functions that can mutate in-place the overall Volto {term}`configuration registry`.
An add-on can export multiple configuration methods, making it possible to selectively choose which specific add-on functionality you want to load.

Some add-ons might allow the Volto project to selectively load some of their configuration, so they may offer additional configuration functions.
You can load them by overloading the add-on name in the `addons` {file}`package.json` key, as shown.

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
The additional comma-separated names should be exported from the add-on package's {file}`index.js`.
The main configuration function should be exported as the default.
An add-on's default configuration method will always be loaded.
```

```{note}
The behavior below using the {file}`config.js` module is not tested with Volto 19 and Cookieplone.
Neither with the add-on template, nor with the full-stack template.

If for some reason you want to manually load the add-on, you can edit your project's {file}`config.js` module:

```js
import loadExampleAddon, { enableOptionalBlocks } from 'volto-example-add-on';
import * as voltoConfig from '@plone/volto/config';

const config = enableOptionalBlocks(loadExampleAddon(voltoConfig));

export blocks = {
  ...config.blocks,
}
```

Volto requires add-ons to have a default export from their {file}`index.js`, a helper method `applyConfig`.

```js
const applyConfig = (config) => {
  return enableOptionalBlocks(loadExampleAddon(config));
};

export default applyConfig;
```

The `applyConfig` helper ensures that each configuration method returns the configuration object, avoiding errors when developing add-ons.
