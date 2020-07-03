# Add-on packages

There are several advanced scenarios where we might want to have more control
and flexibility beyond using the plain Volto project to build a site.

## Use add-on products

We can build Volto add-on products and make them available as published
packages (from public/private npm repositories), or as checkouts from git
repositories using `mrs-developer` helper package.

We can use them to easily reuse components across projects, like custom blocks,
views, widgets, or any other Volto or React artifact.

### Loading an addon configuration

As a convenience, an addon can export configuration functions that can mutate,
in-place, the overall ``~/config`` registry. An addon can export multiple
configurations methods, making it possible to selectively choose which specific
addon functionality you want to load.

In your Volto project's ``package.json`` you can allow the addon to alter the
global configuration by adding, in the ``addons`` key, a list of volto addon
package names, like:

```
{
  "name": "my-nice-volto-project",
  ...
  "addons": [
    "volto-example-addon",
    "volto-ga"
  ],
  ...
}
```

!!! info
  If you're an addon developer, you should export, in your package main,
  a function with the signature ``config => config``. So it should take the
  ``global`` configuration object and return it, possibly mutated or changed.

Some addons might choose to allow the Volto project to selectively load some of
their configuration, so they may offer additional configuration functions,
which you can load by overloading the addon name in the ``addons`` package.json
key, like so:

```js
{
  "name": "my-nice-volto-project",
  ...
  "addons": [
    "volto-example-addon:loadOptionalBlocks,overrideSomeDefaultBlock",
    "volto-ga"
  ],
  ...
}
```

!!! info
  The additional comma-separated names should be exported from the addon
  package's ``index.js``. The main configuration function should be exported as
  the default. An addon's default configuration method will always be loaded.

If for some reason, you want to manually load the addon, you could always do,
in your project's ``config.js`` module:

```js
import loadExampleAddon, { enableOptionalBlocks } from 'volto-example-addon';
import * as voltoConfig from '@plone/volto/config';

const config = enableOptionalBlocks(loadExampleAddon(voltoConfig));

export blocks = {
  ...config.blocks,
}
...
```

### Mrs. Developer

Eric Brehault ported this amazing Python tool, which provides a way to pull
a package from git and set it up as a dependency for the current project
codebase.

https://www.npmjs.com/package/mrs-developer

By doing this, you can develop both the project and the add-on product as if they
were both part of the current codebase. Once the add-on development is done,
you can publish the package to an npm repository.

Volto is also capable of using aliases for your (unreleased) package, so that once
you've released it, you don't need to change import paths, since you can use the
final ones from the very beginning.



## Configuring a Volto project to use a Volto add-on product

### Add mr-developer dependency and related script

```
$ yarn add mrs-developer
```

and in `package.json`:

```json
  "scripts": {
    "develop": "missdev --config=jsconfig.json --output=addons",
    ...
  }
```

we can configure `mrs-developer` to use any directory that you want. Here we are
telling it to create the directory `src/addons` and put the packages managed by
`mrs-developer` inside.

!!! note
    You can use any name/directory in your project. We chose `addons` by convention for
    all Volto add-ons.

### mrs.developer.json

This is the configuration file that instructs `mrs-developer` from where it has
to pull the packages. So, in `mrs.developer.json`:

```json
{
  "plone.my-volto-addon": {
      "package": "@plone/my-volto-addon",
      "url": "git@github.com:plone/my-volto-addon.git",
      "path": "src"
  }
}
```

!!! warning
    `mrs-developer` does not support scopes (`@` or `/` in the key for the definition of the
    package). The suggestion is to remove the `@` and replace the `/` with `.`.

!!! info
    `package` property is optional, set it up only if your package has a scope. `src` is
    required if the content of your addon is located in the `src` directory (recommended
    by convention in all Volto add-on packages)

If you want to know more about `mrs-developer` config options, please refer to
[its npm page](https://www.npmjs.com/package/mrs-developer).

### jsconfig.json

You can let `mrs-developer` create this file for you or create it manually.

```json
{
    "compilerOptions": {
        "paths": {
            "@plone/my-volto-addon": [
                "addons/@plone/my-volto-addon/src"
            ]
        },
        "baseUrl": "src"
    }
}
```

!!! warning
    Please note that both `paths` and `baseUrl` are required to match your
    project layout.

!!! tip
    You should use the `src` path inside your package and point the `main` key
    in `package.json` to the `index.js` file in `src/index.js`.

### Fix test infrastructure

We should let jest know about our aliases and make them available to it to
resolve them, so in `package.json`:

```json hl_lines="6"
  "jest": {
    ...
    "moduleNameMapper": {
      "@plone/volto/(.*)$": "<rootDir>/node_modules/@plone/volto/src/$1",
      "@package/(.*)$": "<rootDir>/src/$1",
      "@plone/my-volto-addon/(.*)$": "<rootDir>/src/addons/@plone/my-volto-addon/src/$1",
      "~/(.*)$": "<rootDir>/src/$1"
    },
    ...
```

### .eslintrc

Make sure to upgrade your project's `.eslintrc` to the `.eslintrc.js` version,
according to the [Upgrade Guide](/upgrade-guide).


## Loading addon configuration

As a convenience, an addon can export configuration functions that can mutate,
in-place, the overall ``~/config`` registry. An addon can export multiple
configurations methods, making it possible to selectively choose which specific
addon functionality you want to load.

In your Volto project's ``package.json`` you can allow the addon to alter the
global configuration by adding, in the ``addons`` key, a list of volto addon
package names, like:

```
{
  "name": "my-nice-volto-project",
  ...
  "addons": [
    "volto-example-addon",
    "volto-ga"
  ],
  ...
}
```

!!! info
  If you're an addon developer, you should export, in your package main,
  a function with the signature ``config => config``. So it should take the
  ``global`` configuration object and return it, possibly mutated or changed.

Some addons might choose to allow the Volto project to selectively load some of
their configuration, so they may offer additional configuration functions,
which you can load by overloading the addon name in the ``addons`` package.json
key, like so:

```js
{
  "name": "my-nice-volto-project",
  ...
  "addons": [
    "volto-example-addon:loadOptionalBlocks,overrideSomeDefaultBlock",
    "volto-ga"
  ],
  ...
}
```

!!! info
  The additional comma-separated names should be exported from the addon
  package's ``index.js``. The main configuration function should be exported as
  the default. An addon's default configuration method will always be loaded.

If for some reason, you want to manually load the addon, you could always do,
in your project's ``config.js`` module:

```js
import loadExampleAddon, { enableOptionalBlocks } from 'volto-example-addon';
import * as voltoConfig from '@plone/volto/config';

const config = enableOptionalBlocks(loadExampleAddon(voltoConfig));

export blocks = {
  ...config.blocks,
}
...
```


## Add several layers of customizations

In `package.json` we can add more customization layers that will be added to the
current ones. These will be added to the aliases list, with the last ones
having more precedence. You have to keep sanity in the overriding layers, since
Volto is not yet ready to do it for you.

Set them up in the `customizationPaths` key in the `package.json` file on your
Volto project.

```json
"customizationPaths": ["src/customizations/", "src/addons/@plone/my-volto-addon/src/customizations/"],
```

!!! tip
    Do not forget the `/` at the end of both
