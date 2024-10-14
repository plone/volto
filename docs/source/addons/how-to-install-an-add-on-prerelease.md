---
myst:
  html_meta:
    "description": "How to install a frontend add-on in your Volto project"
    "property=og:description": "How to install a frontend add-on in your Volto project"
    "property=og:title": "How to install a frontend add-on"
    "keywords": "add-on, Volto, install"
---

# How to install an add-on in your Volto project (development or pre-release)

You can install a Volto add-on just like any other JS package:

```shell
pnpm --filter <name-of-your-policy-addon> add <name-of-add-on>
```

If the add-on is not published on the npm registry, [you can retrieve it directly from Github](https://pnpm.io/cli/add#install-from-git-repository):

```shell
pnpm add collective/volto-dropdownmenu
```

Next, you'll need to add the add-on (identified by its JS package name) to the
`addons` key of your Volto project's `package.json`.

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
`zcml` section of `zc.buildout`.
```

```{seealso}
Alternatively, you can use `volto.config.js` to declare add-ons in your Plone project:
{doc}`../configuration/volto-config-js`
```

