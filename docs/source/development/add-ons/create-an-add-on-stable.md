---
myst:
  html_meta:
    "description": "How to create a frontend add-on"
    "property=og:description": "How to create a frontend add-on"
    "property=og:title": "How to create a frontend add-on"
    "keywords": "add-on, Volto, create"
---

# How to create a frontend add-on (stable release)

Volto add-on packages are just CommonJS packages.
The only requirement is that they point the `main` key of their `package.json` to a module that exports, as a default function that acts as a {term}`Volto configuration loader`.

Although you could simply use `npm init` to generate an add-on initial code, we now have a nice
[Yeoman-based generator](https://github.com/plone/generator-volto) that you can use:

```shell
npm install -g @plone/generator-volto
yo @plone/volto:addon [<addonName>] [options]
```
