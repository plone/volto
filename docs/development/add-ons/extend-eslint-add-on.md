---
myst:
  html_meta:
    "description": "Extend ESLint configuration from an add-on"
    "property=og:description": "Extend ESLint configuration from an add-on"
    "property=og:title": "Extend ESLint configuration from an add-on"
    "keywords": "Volto, add-on, extensions, frontend, Plone, configuration, ESLint, lint"
---

# Extend ESLint configuration from an add-on

```{versionadded} Volto 16.4.0
```

Starting with Volto v16.4.0, you can customize the ESLint configuration from an add-on.
You should provide a {file}`eslint.extend.js` file in your add-on's root folder, which exports a `modify(defaultConfig)` function.
For example, to host some code outside the regular {file}`src/` folder of your add-on, you need to add the following {file}`eslint.extend.js` file:

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

This allows the add-on `@plone-collective/some-volto-add-on` to host some code outside its normal {file}`src/` folder.
If you put that code in the {file}`extra` folder, that code would be available under the `@plone-collective/extra` name.

```{note}
This takes care only of the ESLint integration.
For proper language support, you'll still need to configure it in the {file}`razzle.extend.js` file of your add-on.
```
