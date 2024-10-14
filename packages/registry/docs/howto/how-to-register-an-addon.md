### Register an add-on

You should declare your add-on in your project.
This is done in your app's `package.json`'s `addons` key:

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

export default applyConfig(config: ConfigType) => config)
```
