---
myst:
  html_meta:
    "description": "How to register an add-on in @plone/registry"
    "property=og:description": "How to register an add-on in @plone/registry"
    "property=og:title": "Register an add-on"
    "keywords": "@plone/registry, registry, add-on"
---

# Register an add-on

You have two ways available to register an add-on in your app.
You can do so either through the `addons` key in your {file}`package.json` or by using a configuration file.

```{note}
Using a configuration file is useful when you want to add some logic to the `addons` list, if you want it to be dynamic.
For example, you can make the list dynamic given an environment variable.
```


## Via `addons` key in `package.json`

The following code sample shows how to register your add-on in your app through the `addons` key in your {file}`package.json`.

```json
{
  "name": "my-app-project",
  "addons": [
    "acme-volto-foo-addon",
    "@plone/some-addon",
    "collective-another-volto-addon"
  ]
}
```

The add-ons are registered in the order they are found in the `addons` key.
The last add-on takes precedence over the others.
This means that if you configure something in `acme-volto-foo-addon`, then the same thing later in `collective-another-volto-addon`, the latter configured thing will win and its configuration will be applied.

All add-ons should set the value for the `main` entry module, such as `src/index.js`, in {file}`package.json`.
This function should have a signature of `config => config`.
That is, it should take the configuration registry object and return it, possibly mutated or changed.

```ts
import type { ConfigType } from '@plone/registry'

export default function applyConfig(config: ConfigType) {
  return config
};
```

The `addons` key ensures the add-on's main default export function is executed, being passed the configuration registry.


## Via a configuration file

The configuration file can be provided via an environment variable.
You can use one of these two environment variables.

-   `REGISTRYCONFIG`
-   `VOLTOCONFIG`

The value of the environment variable must point to a file that exists relative to the app folder, that is, the one you pass to the instantiation of the add-on registry.
You can also pass the full path of the file.

For example, if your configuration file is named {file}`my-add-on-registry-config.js` and is located at the root of your add-on package, you would set your environment variable as shown.

```shell
set REGISTRYCONFIG="my-add-on-registry.config.js"
```

```{note}
This is useful when you want to provide different `addon` configuration files under different scenarios.
```

If the file that you specify in the environment variable exists, then `@plone/registry` uses it to configure your add-on.
If it does not exist, then `@plone/registry` looks for the configuration file in the following locations in the root of your app in order.
The first found configuration file wins.

-   {file}`registry.config.js`
-   {file}`volto.config.js`

This is an example of a configuration file.
You must define it in [CommonJS](https://en.wikipedia.org/wiki/CommonJS) format.

```js
module.exports = {
  addons: ['my-volto-config-addon'],
};
```

If your app is in ESM (`"type": "module"` in {file}`package.json`), then you should use the `.cjs` suffix for the configuration file to mark it as a proper `CommonJS` file.

If `@plone/registry` finds no configuration file, then it only relies on the configuration, if any, in the `addons` key in {file}`package.json`.
