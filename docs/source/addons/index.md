# Volto addons

There are several advanced scenarios where we might want to have more control
and flexibility beyond using the plain Volto project to build a site.

We can build Volto add-on products and make them available as generic
Javascript packages that can be included in any Volto project. By doing so we
can provide code and component reutilization across projects and, of course,
benefit from open source collaboration.

!!! note
    By declaring a Javascript package as a "Volto addon", Volto provides
    several integration features: language features (so they can be transpiled
    by Babel), whole-process customization via razzle.extend.js and
    integration with Volto's configuration registry.


The addon can be published to an NPM registry or directly installed from github
by Yarn. By using [mrs-develop](https://github.com/collective/mrs-developer),
it's possible to have a workflow similar to zc.buildout's mr.developer, where
you can "checkout" an addon for development.

An addon can be almost anything that a Volto project can be. They can:

- provide additional views and blocks
- override or extend Volto's builtin views, blocks, settings
- shadow (customize) Volto's (or another addon's) modules
- register custom routes
- provide custom Redux actions and reducers
- register custom Express middleware for Volto's server process
- tweak Volto's Webpack configuration, load custom Razzle and Webpack plugins
- even provide a custom theme, just like a regular Volto project does.

## Configuring a Volto project to use an addon

You can install a Volto addon just like any other JS package:

```
yarn add name-of-addon
```

If the addon is not published on NPM, you can retrieve it directly from Github:

```
yarn add collective/volto-dropdownmenu
```

Next, you'll need to add the addon (identified by its JS package name) to the
`addons` key of your Volto project's `package.json`. More details in the next
section.

### Loading addon configuration

As a convenience, an addon can export configuration functions that can mutate,
in-place, the overall Volto configuration registry. An addon can export multiple
configurations methods, making it possible to selectively choose which specific
addon functionality you want to load.

In your Volto project's ``package.json`` you can allow the addon to alter the
global configuration by adding, in the ``addons`` key, a list of volto addon
package names, like:

```js
{
  "name": "my-nice-volto-project",
  ...
  "addons": [
    "acme-volto-foo-addon",
    "@plone/some-addon",
    "collective-another-volto-addon"
  ],
  ...
}
```

!!! warning
    Adding the addon package to the `addons` key is obligatory! It allows Volto
    to treat that package properly and provide it with BabelJS language
    features. In Plone terminology, it is like including a Python egg to the
    `zcml` section of zc.buildout.

Some addons might choose to allow the Volto project to selectively load some of
their configuration, so they may offer additional configuration functions,
which you can load by overloading the addon name in the ``addons`` package.json
key, like so:

```json hl_lines="5"
{
  "name": "my-nice-volto-project",
  ...
  "addons": [
    "acme-volto-foo-addon:loadOptionalBlocks,overrideSomeDefaultBlock",
    "volto-ga"
  ],
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

As this is a common operation, Volto provides a helper method for this:

```
import { applyConfig } from '@plone/volto/helpers';
import * as voltoConfig from '@plone/volto/config';

const config = applyConfig([
    enableOptionalBlocks,
    loadExampleAddon
], voltoConfig);

export blocks = {
  ...config.blocks,
}
```

The `applyConfig` helper ensures that each configuration methods returns the
config object, avoiding odd and hard to track errors when developing addons.

## Creating addons

Volto addon packages are just CommonJS packages. The only requirement is that
they point the `main` key of their `package.json` to a module that exports, as
a default function that acts as a Volto configuration loader.

Although you could simply use `npm init` to generate an addon initial code,
we now have a nice
[Yeoman-based generator](https://github.com/plone/generator-volto) that you can use:

```
npm install -g @plone/generator-volto
yo @plone/volto:addon [<addonName>] [options]
```
Volto will automatically provide aliases for your (unreleased) package, so that
once you've released it, you don't need to change import paths, since you can
use the final ones from the very beginning. This means that you can use imports
such as `import { Something } from '@plone/my-volto-addon'` without any extra
configuration.

### Use mrs-developer to manage the development cycle

#### Add mrs-developer dependency and related script

[Eric Brehault](https://github.com/ebrehault) ported this amazing Python tool,
which provides a way to pull a package from git and set it up as a dependency
for the current project codebase.

To facilitate addon development lifecycle we recommend using
[mrs-developer](https://www.npmjs.com/package/mrs-developer).

By doing this, you can develop both the project and the add-on product as if
they were both part of the current codebase. Once the add-on development is
done, you can publish the package to an npm repository.

```
$ yarn add mrs-developer
```

Then, in `package.json`:

```json hl_lines="2"
  "scripts": {
    "develop": "missdev --config=jsconfig.json --output=addons",
  }
```

We can configure `mrs-developer` to use any directory that you want. Here we
are telling it to create the directory `src/addons` and put the packages
managed by `mrs-developer` inside.

#### mrs.developer.json

This is the configuration file that instructs `mrs-developer` from where it has
to pull the packages. So, create `mrs.developer.json` and add:

```json
{
  "acme-volto-foo-addon": {
    "package": "@acme/volto-foo-addon",
    "url": "git@github.com:acme/my-volto-addon.git",
    "path": "src"
  }
}
```

Then run:

```bash
yarn develop
```

Now the addon is found in `src/addons/`.

!!! info
    `package` property is optional, set it up only if your package has a scope.
    `src` is required if the content of your addon is located in the `src`
    directory (but, as that is the convention recommended for all Volto add-on
    packages, you will always include it)

If you want to know more about `mrs-developer` config options, please refer to
[its npm page](https://www.npmjs.com/package/mrs-developer).

#### tsconfig.json / jsconfig.json

`mrs-developer` automatically creates this file for you, but if you choose not
to use mrs-developer, you'll have to add something like this to your
`tsconfig.json` or `jsconfig.json` file in the Volto project root:

```json
{
    "compilerOptions": {
        "paths": {
            "acme-volto-foo-addon": [
                "addons/acme-volto-foo-addon/src"
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

### Customizations

Addon packages can include customization folders, just like the Volto projects.
The customizations are resolved in the order: addons (as sorted in the `addons`
key of your project's `package.json`) then the customizations in the Volto
project, last one wins.

!!! tip
    See the [Advanced customization scenarios](../../customizing-components/)
    section on how to enhance this pattern and how to include customizations
    inside addons.

### Providing addon configuration

The default export of your addon main `index.js` file should be a function with
the signature ``config => config``.
That is, it should take the ``global`` configuration object and return it,
possibly mutated or changed. So your main `index.js` will look like:

```js
export default function applyConfig(config) {
  config.blocks.blocksConfig.faq_viewer = {
    id: 'faq_viewer',
    title: 'FAQ Viewer',
    edit: FAQBlockEdit,
    view: FAQBlockView,
    icon: chartIcon,
    group: 'common',
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };
  return config;
}
```

And the `package.json` file of your addon:

```json
{
  "main": "src/index.js",
}
```

!!! warning
    An addon's default configuration method will always be loaded.

#### Multiple addon configurations

You can export additional configuration functions from your addon's main
`index.js`.

```js
import applyConfig, {loadOptionalBlocks,overrideSomeDefaultBlock} from './config';

export { loadOptionalBlocks, overrideSomeDefaultBlock };
export default applyConfig;
```

## Add third-party dependencies to your addon

If you're developing the addon and you wish to add an external dependency,
you'll have to switch your project to be a [Yarn Workspaces
root](https://classic.yarnpkg.com/en/docs/workspaces/).

So you'll need to add, in your Volto project's `package.json`:

```
"private": true,
"workspaces": [],
```

Then populate the `workspaces` key with the path to your development addons:

```
"workspaces": [
  "src/addons/my-volto-addon"
]
```
You'll have to manage the addon dependencies via the workspace root (your Volto
project). For example, to add a new dependency:

```
yarn workspace @plone/my-volto-addon add some-third-party-package
```

You can run `yarn workspaces info` to see a list of workspaces defined.

In case you want to add new dependencies to the Volto project, now you'll have
to run the `yarn add` command with the `-W` switch:

```
yarn add -W some-dependency
```

## Extending Razzle from an addon

Just like you can extend Razzle's configuration from the project, you can do so
with an addon, as well. You should provide a `razzle.extend.js` file in your
addon root folder. An example of such file where the theme.config alias is
changed, to enable a custom Semantic theme inside the addon:


```
const analyzerPlugin = {
  name: 'bundle-analyzer',
  options: {
    analyzerHost: '0.0.0.0',
    analyzerMode: 'static',
    generateStatsFile: true,
    statsFilename: 'stats.json',
    reportFilename: 'reports.html',
    openAnalyzer: false,
  },
};

const plugins = (defaultPlugins) => {
  return defaultPlugins.concat([analyzerPlugin]);
};
const modify = (config, { target, dev }, webpack) => {
  const themeConfigPath = `${__dirname}/theme/theme.config`;
  config.resolve.alias['../../theme.config$'] = themeConfigPath;

  return config;
};

module.exports = {
  plugins,
  modify,
};
```

## Addon dependencies

Sometimes your addon depends on another addon. You can declare addon dependency
in your addon's `addons` key, just like you do in your project. By doing so,
that other addon's configuration loader is executed first, so you can depend on
the configuration being already applied. Another benefit is that you'll have
to declare only the "top level" addon in your project, the dependencies will be
discovered and automatically treated as Volto addons. For example, volto-slate
depends on volto-object-widget's configuration being already applied, so
volto-slate can declare in its package.json:

```
{
  "name": "volto-slate",
  ...
  "addons": ['@eeacms/volto-object-widget']
}
```

And of course, the dependency addon can depend, on its turn, on other addons
which will be loaded as well. Circular dependencies should be avoided.

## Testing addons

We should let jest know about our aliases and make them available to it to
resolve them, so in `package.json`:

```json hl_lines="6"
  "jest": {
    "moduleNameMapper": {
      "@plone/volto/(.*)$": "<rootDir>/node_modules/@plone/volto/src/$1",
      "@package/(.*)$": "<rootDir>/src/$1",
      "@plone/some-volto-addon/(.*)$": "<rootDir>/src/addons/@plone/some-volto-addon/src/$1",
      'my-volto-addon/(.*)$': '<rootDir>/src/addons/my-volto-addon/src/$1',
      "~/(.*)$": "<rootDir>/src/$1"
    },
```

!!! tip
    We're in the process of moving the default scaffolding generators to
    provide a `jest.config.js` file in Volto, making this step unneeded.

You can use `yarn test src/addons/addon-name` to run tests.

## Code linting

If you have generated your Volto project recently (after the summer of 2020),
you don't have to do anything to have automatic integration with ESLint,
otherwise make sure to upgrade your project's `.eslintrc` to the `.eslintrc.js`
version, according to the [Upgrade Guide](/upgrade-guide).
