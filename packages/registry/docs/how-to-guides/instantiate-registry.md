---
myst:
  html_meta:
    "description": "How to instantiate the registry in @plone/registry"
    "property=og:description": "How to instantiate the registry in @plone/registry"
    "property=og:title": "Instantiate the registry"
    "keywords": "@plone/registry, registry, instantiate"
---

# Instantiate the registry

The registry is instantiated in the context of your app folder.
It gets your app folder path as argument.

```js
import path from 'path';
import { AddonRegistry } from '@plone/registry/addon-registry';

const appRootPath = path.resolve('.');
const { registry } = AddonRegistry.init(appRootPath)
```

You have full access to the add-on registry API in the `registry` object.

By default, you also get these objects after calling `init`.

```js
const { registry, addons, theme, shadowAliases } = AddonRegistry.init(appRootPath)
```

This can be useful for configuring your build process.


## Initialization

By default, the configuration registry is empty.
It only contains the base object keys which are required for it to work properly.
These are the keys present on initialization.
The optional keys are excluded.

```ts
export type ConfigData = {
  settings: SettingsConfig | Record<string, never>;
  blocks: BlocksConfig | Record<string, never>;
  views: ViewsConfig | Record<string, never>;
  widgets: WidgetsConfig | Record<string, never>;
  addonReducers?: AddonReducersConfig;
  addonRoutes?: AddonRoutesConfig;
  slots: SlotsConfig | Record<string, never>;
  components: ComponentsConfig | Record<string, never>;
  utilities: UtilitiesConfig | Record<string, never>;
  experimental?: ExperimentalConfig;
};
```

In the context of a Volto app, the registry gets initialized by Volto by default.
