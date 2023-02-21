---
myst:
  html_meta:
    "description": "Volto add-ons extend the core functionality of the Plone CMS frontend."
    "property=og:description": "Volto add-ons extend the core functionality of the Plone CMS frontend."
    "property=og:title": "Volto add-ons"
    "keywords": "Volto, add-on, extensions, frontend, Plone"
---

# Volto add-ons

```{toctree}
:maxdepth: 1

i18n
best-practices
```

There are several advanced scenarios where we might want to have more control
and flexibility beyond using the plain Volto project to build a site.

We can build Volto {term}`add-on` products and make them available as generic
JavaScript packages that can be included in any Volto project. By doing so we
can provide code and component reutilization across projects and, of course,
benefit from open source collaboration.

```{note}
By declaring a JavaScript package as a Volto add-on, Volto provides
several integration features: language features (so they can be transpiled
by Babel), whole-process customization via razzle.extend.js and
integration with Volto's {term}`configuration registry`.
```

The add-on can be published to an NPM registry or directly installed from github
by Yarn. By using [mrs-develop](https://github.com/collective/mrs-developer),
it's possible to have a workflow similar to zc.buildout's mr.developer, where
you can "checkout" an add-on for development.

An add-on can be almost anything that a Volto project can be. They can:

- provide additional views and blocks
- override or extend Volto's builtin views, blocks, settings
- shadow (customize) Volto's (or another add-on's) modules
- register custom routes
- provide custom {term}`Redux` actions and reducers
- register custom Express middleware for Volto's server process
- tweak Volto's Webpack configuration, load custom Razzle and Webpack plugins
- even provide a custom theme, just like a regular Volto project does.

## Configuring a Volto project to use an add-on

You can install a Volto add-on just like any other JS package:

```shell
yarn add name-of-add-on
```

If the add-on is not published on NPM, you can retrieve it directly from Github:

```shell
yarn add collective/volto-dropdownmenu
```

Next, you'll need to add the add-on (identified by its JS package name) to the
`addons` key of your Volto project's `package.json`. More details in the next
section.

### Loading add-on configuration

As a convenience, an add-on can export configuration functions that can mutate,
in-place, the overall Volto {term}`configuration registry`. An add-on can export multiple
configurations methods, making it possible to selectively choose which specific
add-on functionality you want to load.

In your Volto project's ``package.json`` you can allow the add-on to alter the
global configuration by adding, in the `addons` key, a list of volto add-on
package names, like:

```js
{
  "name": "my-nice-volto-project",

  "addons": [
    "acme-volto-foo-add-on",
    "@plone/some-add-on",
    "collective-another-volto-add-on"
  ],

}
```

```{warning}
Adding the add-on package to the `addons` key is mandatory! It allows Volto
to treat that package properly and provide it with BabelJS language
features. In Plone terminology, it is like including a Python egg to the
`zcml` section of zc.buildout.
```

Some add-ons might choose to allow the Volto project to selectively load some of
their configuration, so they may offer additional configuration functions,
which you can load by overloading the add-on name in the `addons` package.json
key, like so:

```{code-block} json
:emphasize-lines: 4

{
  "name": "my-nice-volto-project",
  "addons": [
    "acme-volto-foo-add-on:loadOptionalBlocks,overrideSomeDefaultBlock",
    "volto-ga"
  ],
}
```

```{note}
The additional comma-separated names should be exported from the add-on
package's ``index.js``. The main configuration function should be exported as
the default. An add-on's default configuration method will always be loaded.
```

If for some reason, you want to manually load the add-on, you could always do,
in your project's ``config.js`` module:

```js
import loadExampleAddon, { enableOptionalBlocks } from 'volto-example-add-on';
import * as voltoConfig from '@plone/volto/config';

const config = enableOptionalBlocks(loadExampleAddon(voltoConfig));

export blocks = {
  ...config.blocks,
}
```

As this is a common operation, Volto provides a helper method for this:

```js
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
config object, avoiding odd and hard to track errors when developing add-ons.

## Creating add-ons

Volto add-on packages are just CommonJS packages. The only requirement is that
they point the `main` key of their `package.json` to a module that exports, as
a default function that acts as a {term}`Volto configuration loader`.

Although you could simply use `npm init` to generate an add-on initial code,
we now have a nice
[Yeoman-based generator](https://github.com/plone/generator-volto) that you can use:

```shell
npm install -g @plone/generator-volto
yo @plone/volto:addon [<addonName>] [options]
```

Volto will automatically provide aliases for your (unreleased) package, so that
once you've released it, you don't need to change import paths, since you can
use the final ones from the very beginning. This means that you can use imports
such as `import { Something } from '@plone/my-volto-add-on'` without any extra
configuration.

### Use mrs-developer to manage the development cycle

#### Add mrs-developer dependency and related script

[Eric Brehault](https://github.com/ebrehault) ported this amazing Python tool,
which provides a way to pull a package from git and set it up as a dependency
for the current project codebase.

To facilitate add-on development lifecycle we recommend using
[mrs-developer](https://www.npmjs.com/package/mrs-developer).

By doing this, you can develop both the project and the add-on product as if
they were both part of the current codebase. Once the add-on development is
done, you can publish the package to an npm repository.

```shell
yarn add mrs-developer
```

Then, in `package.json`:

```{code-block} json
:emphasize-lines: 2
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
  "acme-volto-foo-add-on": {
    "package": "@acme/volto-foo-add-on",
    "url": "git@github.com:acme/my-volto-add-on.git",
    "path": "src"
  }
}
```

Then run:

```shell
yarn develop
```

Now the add-on is found in `src/addons/`.

```{note}
`package` property is optional, set it up only if your package has a scope.
`src` is required if the content of your add-on is located in the `src`
directory (but, as that is the convention recommended for all Volto add-on
packages, you will always include it)
```

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
      "acme-volto-foo-add-on": [
        "addons/acme-volto-foo-add-on/src"
      ]
    },
    "baseUrl": "src"
  }
}
```

```{warning}
Please note that both `paths` and `baseUrl` are required to match your
project layout.
```

```{tip}
You should use the `src` path inside your package and point the `main` key
in `package.json` to the `index.js` file in `src/index.js`.
```

### Customizations

add-on packages can include customization folders, just like the Volto projects.
The customizations are resolved in the order: add-ons (as sorted in the `addons`
key of your project's `package.json`) then the customizations in the Volto
project, last one wins.

```{tip}
See the {ref}`advanced-customization-scenarios-label`
section on how to enhance this pattern and how to include customizations
inside add-ons.
```

### Providing add-on configuration

The default export of your add-on main `index.js` file should be a function with
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
  };
  return config;
}
```

And the `package.json` file of your add-on:

```json
{
  "main": "src/index.js",
}
```

```{warning}
An add-on's default configuration method will always be loaded.
```

#### Multiple add-on configurations

You can export additional configuration functions from your add-on's main
`index.js`.

```js
import applyConfig, {loadOptionalBlocks,overrideSomeDefaultBlock} from './config';

export { loadOptionalBlocks, overrideSomeDefaultBlock };
export default applyConfig;
```

## Add third-party dependencies to your add-on

If you're developing the add-on and you wish to add an external dependency,
you'll have to switch your project to be a [Yarn Workspaces
root](https://classic.yarnpkg.com/en/docs/workspaces/).

So you'll need to add, in your Volto project's `package.json`:

```json
"private": true,
"workspaces": [],
```

Then populate the `workspaces` key with the path to your development add-ons:

```json
"workspaces": [
  "src/addons/my-volto-add-on"
]
```
You'll have to manage the add-on dependencies via the workspace root (your Volto
project). For example, to add a new dependency:

```shell
yarn workspace @plone/my-volto-add-on add some-third-party-package
```

You can run `yarn workspaces info` to see a list of workspaces defined.

In case you want to add new dependencies to the Volto project, now you'll have
to run the `yarn add` command with the `-W` switch:

```shell
yarn add -W some-dependency
```

## Extending Razzle from an add-on

Just like you can extend Razzle's configuration from the project, you can do so
with an add-on, as well. You should provide a `razzle.extend.js` file in your
add-on root folder. An example of such file where the theme.config alias is
changed, to enable a custom Semantic theme inside the add-on:


```js
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

## Extending Eslint configuration from an add-on

Starting with Volto v16.4.0, you can also customize the Eslint configuration
from an add-on. You should provide a `eslint.extend.js` file in your
add-on root folder, which exports a `modify(defaultConfig)` function. For
example, to host some code outside the regular `src/` folder of your add-on,
this `eslint.extend.js` file is needed:

```js
const path = require('path');

module.exports = {
  modify(defaultConfig) {
    const aliasMap = defaultConfig.settings['import/resolver'].alias.map;
    const addonPath = aliasMap.find(
      ([name]) => name === '@plone-collective/some-volto-add-on',
    )[1];

    const extraPath = path.resolve(`${addonPath}/../extra`);
    aliasMap.push(['@plone-collective/extra', extraPath]);

    return defaultConfig;
  },
};
```

This would allow the `@plone-collective/some-volto-add-on` to host some code
outside of its normal `src/` folder, let's say in the `extra` folder, and that
code would be available under the `@plone-collective/extra` name. Note: this is
taking care only of the Eslint integration. For proper language support, you'll
still need to do it in the `razzle.extend.js` of your add-on.

## add-on dependencies

Sometimes your add-on depends on another add-on. You can declare add-on dependency
in your add-on's `addons` key, just like you do in your project. By doing so,
that other add-on's configuration loader is executed first, so you can depend on
the configuration being already applied. Another benefit is that you'll have
to declare only the "top level" add-on in your project, the dependencies will be
discovered and automatically treated as Volto add-ons. For example, volto-slate
depends on volto-object-widget's configuration being already applied, so
volto-slate can declare in its `package.json`:

```json
{
  "name": "volto-slate",

  "addons": ["@eeacms/volto-object-widget"]
}
```

And of course, the dependency add-on can depend, on its turn, on other add-ons
which will be loaded as well. Circular dependencies should be avoided.

## Problems with untranspiled add-on dependencies

When using external add-ons in your project, sometimes you will run into add-ons
that are not securely transpiled or haven't been transpiled at all. In that case
you might see an error like the following:

```console
Module parse failed: Unexpected token (10:41) in @react-leaflet/core/esm/path.js
...
const options = props.pathOptions ?? {};
...
```

Babel automatically transpiles the code in your add-on, but `node_modules` are
excluded from this process, so we need to include the add-on path in the list of
modules to be transpiled. This can be accomplished by customizing the webpack
configuration in the `razzle.config.js` file in your add-on. For example,
suppose that we want to use react-leaflet, which has a known transpilation
issue:

```js
const path = require('path');
const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder');

const babelLoaderFinder = makeLoaderFinder('babel-loader');

const jsConfig = require('./jsconfig').compilerOptions;

const pathsConfig = jsConfig.paths;
let voltoPath = './node_modules/@plone/volto';
Object.keys(pathsConfig).forEach((pkg) => {
  if (pkg === '@plone/volto') {
    voltoPath = `./${jsConfig.baseUrl}/${pathsConfig[pkg][0]}`;
  }
});

const { modifyWebpackConfig, plugins } = require(`${voltoPath}/razzle.config`);

const customModifyWebpackConfig = ({ env, webpackConfig, webpackObject, options }) => {
  const config = modifyWebpackConfig({
    env,
    webpackConfig,
    webpackObject,
    options,
  });
  const babelLoader = config.module.rules.find(babelLoaderFinder);
  const { include } = babelLoader;
  const corePath = path.join(
    path.dirname(require.resolve('@react-leaflet/core')),
    '..',
  );
  const esmPath = path.join(
    path.dirname(require.resolve('react-leaflet')),
    '..',
  );

  include.push(corePath);
  include.push(esmPath);
  return config;
};

module.exports = { modifyWebpackConfig: customModifyWebpackConfig, plugins };
```

First we need some setup to get the webpack configuration from Volto's configuration.
Once we have that, we need to resolve the path to the desired add-ons and push it
into the Babel loader include list. After this, the add-ons will load correctly.

## Testing add-ons

We should let jest know about our aliases and make them available to it to
resolve them, so in `package.json`:

```{code-block} json
:emphasize-lines: 6

"jest": {
  "moduleNameMapper": {
    "@plone/volto/(.*)$": "<rootDir>/node_modules/@plone/volto/src/$1",
    "@package/(.*)$": "<rootDir>/src/$1",
    "@plone/some-volto-add-on/(.*)$": "<rootDir>/src/addons/@plone/some-volto-add-on/src/$1",
    "my-volto-add-on/(.*)$": "<rootDir>/src/addons/my-volto-add-on/src/$1",
    "~/(.*)$": "<rootDir>/src/$1"
  },
```

```{tip}
We're in the process of moving the default scaffolding generators to
provide a `jest.config.js` file in Volto, making this step unneeded.
```

You can use `yarn test src/addons/add-on-name` to run tests.

## Code linting

If you have generated your Volto project recently (after the summer of 2020),
you don't have to do anything to have automatic integration with ESLint,
otherwise make sure to upgrade your project's `.eslintrc` to the `.eslintrc.js`
version, according to the {doc}`../upgrade-guide/index`.
