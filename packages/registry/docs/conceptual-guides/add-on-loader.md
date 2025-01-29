---
myst:
  html_meta:
    "description": "An explanation of the add-ons configuration loader in @plone/registry"
    "property=og:description": "An explanation of the add-ons configuration loader in @plone/registry"
    "property=og:title": "Add-ons configuration loader"
    "keywords": "@plone/registry, registry, add-ons, loader"
---

# Add-ons configuration loader

The `@plone/registry` compatible add-ons are able to load configuration into the configuration registry.
This is achieved by using the `main` key entry point specified in the add-on {file}`package.json`.
This should be a JavaScript or TypeScript file, eg. {file}`index.ts` or {file}`index.js` placed somewhere (generally in the root) of your add-on.

```json
{
  "main": "index.ts",
}
```

This file should contain a default export with a function with this signature:

```ts
import type { ConfigType } from '@plone/registry';

export default function loadConfig(config: ConfigType) {
  // You can mutate the configuration object in here
  return config;
}
```

`@plone/registry` will generate an add-ons loader file that contains the code needed to load the add-ons configuration of all the registered add-ons, keeping the order in which they were defined.

This loader is a JavaScript file and is placed in the root of your application.
By default, it's called {file}`.registry.loader.js`.

The add-ons loader generator is meant to be run before bundling your app or by the bundler when it runs.
The `@plone/registry` Vite plugin generates this file so the framework can load it on app bootstrap time.

```js
  const projectRootPath = path.resolve('.');
  const { registry, shadowAliases } = AddonRegistry.init(projectRootPath);

  createAddonsLoader(
    registry.getAddonDependencies(),
    registry.getAddons(),
    { tempInProject: true },
  );
```

This will create {file}`.registry.loader.js` in the root of your app.
Afterwards, you have to make sure that your app loads the code on the app bootstrap, as early as possible in your client (and server) code and as a module side-effect.

```js
import config from '@plone/registry';
import applyAddonConfiguration from './.registry.loader';

applyAddonConfiguration(config);
```

```{note}
If you are using a Vite-powered framework, just use the `@plone/registry` Vite plugin.
Only in the case that you are using a non-Vite framework, you will have to build your own integration.
You can take the implementation of the Vite plugin as reference.
```

## Provide optional add-on configurations

You can export additional configuration functions from your add-on's configuration loader file.
The default export is always loaded by `@plone/registry`, while the named exports are optional for loading, if required.

The way you specify if these optional loaders must be loaded is through the add-on registration using comma-separated values following a colon after the add-on name:

```{code-block} json
:emphasize-lines: 4

{
  "name": "my-nice-volto-project",
  "addons": [
    "volto-foo-add-on:loadOptionalBlocks,overrideSomeDefaultBlock",
    "volto-another-add-on"
  ],
}
```

```{note}
The additional comma-separated names should be exported from the add-on configuration loader file.
The main configuration function should be exported as the default.
An add-on's default configuration method will always be loaded.
```
