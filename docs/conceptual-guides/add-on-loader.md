---
myst:
  html_meta:
    "description": "An explanation of the add-ons configuration loader in @plone/registry"
    "property=og:description": "An explanation of the add-ons configuration loader in @plone/registry"
    "property=og:title": "Add-ons configuration loader"
    "keywords": "Seven, @plone/registry, registry, add-ons, loader"
---

# Add-ons configuration loader

Add-ons that are compatible with `@plone/registry` can load configuration into the configuration registry.
`@plone/registry` reads the value of the `main` key entry point in the add-on {file}`package.json`, which specifies the source of the loader.
This should be a JavaScript or TypeScript file, such as {file}`index.ts` or {file}`index.js`, placed somewhere in your add-on, conventionally at its root.

The following code example when placed in {file}`package.json` demonstrates the foregoing concept.

```json
{
  "main": "index.ts",
}
```

Next, the file {file}`index.ts` should contain a default export with a function with the following signature.

```ts
import type { ConfigType } from '@plone/registry';

export default function loadConfig(config: ConfigType) {
  // You can mutate the configuration object in here
  return config;
}
```

This loader is a JavaScript file and it is placed in the root of your application.
By default, it's called {file}`registry.loader.js`.
`@plone/registry` will create or overwrite {file}`registry.loader.js` in the root of your app whenever you run the bundler.

```{important}
The file {file}`registry.loader.js` is generated and maintained by `@plone/registry`.
Don't modify it or add your own styles in it.
It will be overwritten in the next bundler run.
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
