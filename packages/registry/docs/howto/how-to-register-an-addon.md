# How to register an add-on in your app

You have two ways available for registering an add-on in your app.
Via `package.json` key or using a configuration file.

## Via `addons` key in `package.json`

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

The `addons` key ensures the add-on's main default export function is executed, being passed the configuration registry.
In that function, the add-on can customize the configuration registry.
The function needs to return the `config` object (the configuration registry), so that it's passed further along to the other add-ons.

The add-ons are registered in the order they are found in the `addons` key.
The last add-on takes precedence over the others.
This means that if you configure something in `acme-volto-foo-addon`, then the same thing later in `collective-another-volto-addon`, the latter configured thing will win and its configuration will be applied.

The default export of any add-on `main` entry module in `package.json` (for example, `src/index.js`) file should be a function with the signature `config => config`.
That is, it should take the configuration registry object and return it, possibly mutated or changed.

```ts
import type { ConfigType } from '@plone/registry'

export default function applyConfig(config: ConfigType) {
  return config
};
```

## Via a configuration file

The configuration file can be provided via an environment variable.
Because of legacy reasons, you can use one of these two:

- `REGISTRYCONFIG`.
- `VOLTOCONFIG`

If it exists, `@plone/registry` uses the file provided as the add-ons configuration.
If it does not, `@plone/registry` looks up for the configuration file existing in these places:

- `registry.config.js`
- `volto.config.js`

in the root of your app, in this order.
If (one of them) exists, it will load it.

This is an example of a configuration file.

```js
module.exports = {
  addons: ['my-volto-config-addon'],
};
```

It has to be defined in commonJS format.
