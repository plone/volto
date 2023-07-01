---
myst:
  html_meta:
    "description": "Dynamic Volto Addons Configuration programmatically via volto.config.js"
    "property=og:description": "Dynamic Volto Addons Configuration programmatically via volto.config.js"
    "property=og:title": "Dynamic Volto Addons Configuration"
    "keywords": "Volto, Plone, frontend, React, config"
---

(volto-config-js)=

# Programatically define the active add-ons and theme

Volto allows you to define the active `add-ons` and `theme` via a file in the root of your project called `volto.config.js`.

## Dynamic Volto Addons Configuration

There are some cases where defining the Volto addons your project is going to use via `package.json` `addons` key is not enough, and you need more control over it.
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
