# How to instantiate the registry

The registry is instantiated on the top of your app folder.
It gets your app folder path as argument.

```js
import path from 'path';
import { AddonRegistry } from '@plone/registry/addon-registry';

const appRootPath = path.resolve('.');
const { registry } = AddonRegistry.init(appRootPath)
```

You have full access to the Add-on Registry API in the `registry` object.

By default, you also get these objects after calling `init`:

```js
const { registry, addons, theme, shadowAliases } = AddonRegistry.init(appRootPath)
```

Which can be useful for configure your build process.
