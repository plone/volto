---
myst:
  html_meta:
    "description": "How to shadow a component or module in Seven"
    "property=og:description": "How to shadow a component or module in Seven"
    "property=og:title": "Shadow a component or module"
    "keywords": "Seven, shadow, override, component, frontend"
---

# Shadow a component or module in Seven

Component or module shadowing allows you to override a component from an existing package in a clean and structured way, without directly modifying third-party code. This technique is particularly useful for customizing the behavior or appearance of specific components in Seven or any add-ons.

This mechanism is powered by Vite's `resolve.alias`, which maps a module path to an alternative file or folder. The override is resolved **at build time**, replacing the original module with your custom implementation.

## How it works

1. Locate the component you want to override (a.k.a. "shadow").
2. Replicate the original folder structure within a `customizations` folder inside your project.
3. Vite will resolve the alias to your version during the build.

## Project structure for shadowing

Suppose the component you want to shadow is located at:

```
node_modules/@plone/slots/components/Logo/Logo.svg
```

You will need to replicate this structure under `src/customizations`, like so:

```
customizations/
└── @plone/
    └── slots/
        └── components/
            └── Logo/
                └── Logo.svg
```

> Tip: Use absolute imports in your shadowed modules to avoid resolution issues.

## Identifying components to shadow

To determine what and where to shadow:

- Use [React Developer Tools](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) to inspect the live DOM tree and identify component names.
- Search those component names in the corresponding source package inside `node_modules/`.
- Follow import paths and folder structures to map to the original file.

## Caution when upgrading

```{warning}
If you update a dependency or add-on that contains shadowed components, always verify whether the shadowed component's structure, API, or dependencies have changed.

Failure to adapt your shadowed code to the new version may break your application silently or cause unexpected behavior.
```

## Clarification: only registered add-ons can be shadowed

Shadowing only works with **registered add-ons** that are explicitly declared as such and included in the Vite aliasing configuration. In Seven, only add-ons that are properly registered via the `add-ons` mechanism (e.g., through `configureAddons`) will be available for component shadowing.

If you attempt to shadow a module from a package that is not registered as an add-on, the override will **not be resolved**, and your changes will be silently ignored.

> Always ensure the package you want to shadow is installed and registered in your application configuration.

## Summary

- Component shadowing is safe and modular when done properly.
- The key is to mirror the original file path in the `customizations` folder.
- Only registered add-ons can be shadowed.
- Keep your shadowed components up to date with upstream changes.
