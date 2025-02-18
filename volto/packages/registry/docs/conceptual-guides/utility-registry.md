---
myst:
  html_meta:
    "description": "An explanation of the utility registry in @plone/registry"
    "property=og:description": "An explanation of the utility registry in @plone/registry"
    "property=og:title": "Utility registry"
    "keywords": "@plone/registry, registry, utility"
---

# Utility registry

The configuration registry stores a utility registry in itself.
The component registry is a mapping of a `name` and a `type` to a method or function.
The utility registry works similarly, but for methods and functions, and with additional query argument `type`.
