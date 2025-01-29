---
myst:
  html_meta:
    "description": "An explanation of the add-ons configuration loader in @plone/registry"
    "property=og:description": "An explanation of the add-ons configuration loader in @plone/registry"
    "property=og:title": "Add-ons configuration loader"
    "keywords": "@plone/registry, registry, add-ons, loader"
---

# Add-ons configuration loader

Add-ons that are compatible with `@plone/registry` can load configuration into the configuration registry.
`@plone/registry` reads the value of the `main` key entry point in the add-on {file}`package.json`, which specifies the source of the loader.
This should be a JavaScript or TypeScript file, such as {file}`index.ts` or {file}`index.js`, placed somewhere in your add-on, conventionally at its root.

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

`@plone/registry` has a helper utility `createAddonsLoader` which generates the add-ons loader file.
That file contains the code needed to load the add-ons configuration of all the registered add-ons, keeping the order in which they were defined.

This loader is a JavaScript file and it is placed in the root of your application.
By default, it's called {file}`.registry.loader.js`.

```{important}
This file is generated and maintained by `@plone/registry`.
You should neither modify it nor add your own styles in here.
It will be overwritten in the next bundler run.
```

The add-ons loader generator is meant to be run before bundling your app or by the bundler itself when it runs.
The `@plone/registry` Vite plugin generates this file, so the framework can load it during app bootstrap time, as shown below.

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

Afterwards, configure your app to load the code during the app bootstrap, as early as possible in both your client and server code, and as a module side-effect, as shown in the following example.

```js
import config from '@plone/registry';
import applyAddonConfiguration from './.registry.loader';

applyAddonConfiguration(config);
```

```{note}
If you use a Vite-powered framework, use the `@plone/registry` Vite plugin.
If you use a non-Vite framework, you will have to build your own integration.
You can take the implementation of the Vite plugin as reference.
```

## Provide optional add-on configurations

You can export additional configuration functions from your add-ons configuration loader file.
The default export is always loaded by `@plone/registry`, while the named exports are optional for loading as needed.

To specify optional loaders as needed, in the add-on registration, use the name of your add-on, followed by a colon (`:`), followed by the names of the optional loaders as comma-separated values as shown in the following example.

```{code-block} json
:emphasize-lines: 4

{
  "name": "my-nice-volto-project",
  "addons": [
    "my-volto-add-on-name:loadOptionalBlocks,overrideSomeDefaultBlock",
    "volto-another-add-on"
  ],
}
```

```{note}
The additional comma-separated names should be exported from the add-on configuration loader file.
The main configuration function should be exported as the default.
An add-on's default configuration method will always be loaded.
```
