---
myst:
  html_meta:
    "description": "How to shadow a component or module in Seven"
    "property=og:description": "How to shadow a component or module in Seven"
    "property=og:title": "Shadow a component or module in Seven"
    "keywords": "Seven, shadow, override, component, frontend"
---

# Shadow a component or module

Component or module shadowing allows you to override a component from an existing package in a clean and structured way, without directly modifying third-party code.
This technique is particularly useful for customizing the behavior or appearance of specific components in Seven or any add-ons.

This mechanism is powered by Vite's [`resolve.alias`](https://vite.dev/config/shared-options#resolve-alias), which maps a module path to an alternative file or folder.
Vite resolves the override at build time, replacing the original module with your custom implementation.

To shadow a component, perform the following tasks.

-   Locate the component you want to override or shadow.
-   Replicate the component's original file structure inside a {file}`customizations` folder in your add-on.


## File structure for shadowing

To shadow components, you must follow a file structure pattern.

Assume the component you want to shadow is located at `node_modules/@plone/layout/components/Logo/Logo.svg`.

You'll need to replicate this structure under {file}`customizations` as shown.

```
customizations/
└── @plone/
    └── layout/
        └── components/
            └── Logo/
                └── Logo.svg
```

```{tip}
Use absolute imports in your shadowed modules to avoid resolution issues.
```

## Clarification: only registered add-ons can be shadowed

Shadowing only works with **registered add-ons** that are explicitly declared as such in {file}`registry.config.ts`.
If you attempt to shadow a module from a package that is not registered as an add-on, the override will **not be resolved**, and your changes will be silently ignored.
Always ensure the package you want to shadow is installed and registered in your application configuration.

## Summary

-   Component shadowing is safe and modular when done properly.
-   The key is to mirror the original file path in the {file}`customizations` folder.
-   Only registered add-ons can be shadowed.
-   Keep your shadowed components up to date with upstream changes.
