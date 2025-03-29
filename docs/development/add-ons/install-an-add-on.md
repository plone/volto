---
myst:
  html_meta:
    "description": "How to install an add-on in Volto"
    "property=og:description": "How to install an add-on in Volto"
    "property=og:title": "Install an add-on in Volto"
    "keywords": "add-on, Volto, install"
---

# Install an add-on in Volto

This document describes how to install an add-on in Volto.

You can install an add-on just like any other JavaScript package from the [npm Registry](https://www.npmjs.com/).

`````{tab-set}
:sync-group: install-add-on

````{tab-item} Volto 18
:sync: volto-18
```shell
pnpm --filter <name-of-your-policy-add-on> add <name-of-add-on>
```
````

````{tab-item} Volto 17
:sync: volto-17
```shell
yarn add <name-of-add-on>
```
````
`````

If the add-on is not published on the npm Registry, [you can install it directly from GitHub](https://pnpm.io/cli/add#install-from-git-repository).


`````{tab-set}
:sync-group: install-add-on

````{tab-item} Volto 18
:sync: volto-18
```shell
pnpm add collective/volto-dropdownmenu
```
````

````{tab-item} Volto 17
:sync: volto-17
```shell
yarn add collective/volto-dropdownmenu
```
````
`````

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
See {doc}`../../configuration/volto-config-js`.
```
