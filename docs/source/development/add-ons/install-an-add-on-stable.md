---
myst:
  html_meta:
    "description": "How to install an add-on in Volto 17 (stable release)"
    "property=og:description": "How to install an add-on in Volto 17 (stable release)"
    "property=og:title": "Install an add-on in Volto 17 (stable release)"
    "keywords": "add-on, Volto, install"
---

# Install an add-on in Volto 17 (stable release)

This document describes how to install an add-on in Volto 17, the latest stable release.

You can install an add-on just like any other JavaScript package from the [npm Registry](https://www.npmjs.com/).

```shell
yarn add name-of-add-on
```

If the add-on is not published on the npm Registry, you can install it directly from GitHub.

```shell
yarn add collective/volto-dropdownmenu
```

Next, you need to add the add-on to the `addons` key of your Plone project's {file}`package.json`.

```json
{
  "name": "my-volto-project",
  "addons": [
    "name-of-add-on"
  ]
}
```

```{seealso}
Alternatively, you can use {file}`volto.config.js` to declare add-ons in your Plone project.
See {doc}`../configuration/volto-config-js`.
```
