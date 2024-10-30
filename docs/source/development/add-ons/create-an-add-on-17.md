---
myst:
  html_meta:
    "description": "How to create an add-on for Volto 17"
    "property=og:description": "How to create an add-on for Volto 17"
    "property=og:title": "Create an add-on for Volto 17"
    "keywords": "add-on, Volto, create"
---

# Create an add-on for Volto 17

Volto add-on packages are just CommonJS packages.
The only requirement is that they point the `main` key of their {file}`package.json` to a module that exports as a default function, acting as a {term}`Volto configuration loader`.

You can use Plone's Yeoman-based generator [`generator-volto`](https://github.com/plone/generator-volto) to create a Volto add-on.

```shell
npm install -g @plone/generator-volto
yo @plone/volto:addon [<addonName>] [options]
```
