---
myst:
  html_meta:
    "description": "Dynamic Volto Addons Configuration programmatically via volto.config.js"
    "property=og:description": "Dynamic Volto Addons Configuration programmatically via volto.config.js"
    "property=og:title": "Dynamic Volto Addons Configuration"
    "keywords": "Volto, Plone, frontend, React, config"
---

(volto-config-js)=

# Programatically configure Volto

Volto allows you to define the active `add-ons` and `theme` via a file in the root of your project called {file}`volto.config.js`.

It also allows you to define the `publicPath` to be used by Volto.
The `public` directory contains static resources that you want to add to the build.
It is accessed from the root of the server.
These files include {file}`favicon.ico`, {file}`robot.txt`, and other static assets.

## Dynamic Volto add-ons configuration

There are some cases where defining the Volto add-ons in your project via {file}`package.json`'s `addons` key is not enough, and you need more control over it.
For example, when you have several builds under the umbrella of the same project that share the core of the code, but each build have special requirements, like other CSS, customizations, {term}`shadowing` or the features of other addons available.

This is an example of a `volto.config.js` file.
This module exports an object and can have arbitrary code depending on your needs:

```js
let addons = [];
if (process.env.MY_SPECIAL_CUSTOM_BUILD) {
  addons = ['volto-custom-addon'];
}

if (process.env.MY_SPECIAL_SECOND_CUSTOM_BUILD) {
  addons = ['volto-custom-addon', 'volto-custom-addon-additional'];
}

module.exports = {
  addons,
};
```

In the case above, we delegate to the presence of an environment variable (`MY_SPECIAL_CUSTOM_BUILD`) the use of the list of addons specified.

This list, sums up to the one defined in `package.json` (it does not override it), and the addons added are placed at the end of the addons list, so the config in there is applied after the ones in the `package.json`.

## Dynamic Volto active theme configuration

The same applies for the active theme:

```js
let addons = [];
let theme;
if (process.env.MY_SPECIAL_CUSTOM_BUILD) {
  addons = ['volto-custom-addon'];
  theme = 'volto-my-theme';
}

if (process.env.MY_SPECIAL_SECOND_CUSTOM_BUILD) {
  addons = ['volto-custom-addon-alternative', 'volto-custom-addon-additional'];
  theme = 'volto-my-alternate-theme';
}

module.exports = {
  addons,
  theme
};
```

## Define `public` directory

The public path must be either relative to the Volto files repository or an absolute path.
This configuration is the one that works in a project-less frontend setup.

```js
let addons = [];
let theme;
let publicPath = '../../../public';

module.exports = {
  addons,
  theme,
  publicPath
};
```

## `VOLTOCONFIG` environment variable usage

This environment variable allows you to specify a custom location for {file}`volto.config.js`.

It can be relative to the current project or absolute.

```shell
VOLTOCONFIG=../../volto.config.js yarn start
```

```shell
VOLTOCONFIG=$(pwd)/volto.config.js yarn start
```

You can also set it from the root of the monorepo:

```shell
VOLTOCONFIG=../../volto.config.js pnpm --filter @plone/volto start
```
