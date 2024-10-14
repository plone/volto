---
myst:
  html_meta:
    "description": "Extend ESlint configuration from add-ons"
    "property=og:description": "Extend ESlint configuration from add-ons"
    "property=og:title": "Extend ESlint configuration from add-ons"
    "keywords": "Volto, add-on, extensions, frontend, Plone, configuration, ESlint, lint"
---

# Extending Eslint configuration from an add-on

Starting with Volto v16.4.0, you can also customize the Eslint configuration from an add-on.
You should provide a `eslint.extend.js` file in your add-on root folder, which exports a `modify(defaultConfig)` function.
For example, to host some code outside the regular `src/` folder of your add-on, this `eslint.extend.js` file is needed:

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
code would be available under the `@plone-collective/extra` name.

```{note}
This is taking care only of the Eslint integration.
For proper language support, you'll still need to do it in the `razzle.extend.js` of your add-on.
```
