---
myst:
  html_meta:
    "description": "How to shadow a component or module in Volto"
    "property=og:description": "How to shadow a component or module in Volto"
    "property=og:title": "Shadow a component or module in Volto"
    "keywords": "Volto, shadow, override, component, frontend"
---

# Shadow a component or module

Component or module shadowing allows you to override a component from an existing package in a clean and structured way, without directly modifying third-party code.
This technique is particularly useful for customizing the behavior or appearance of specific components in Volto or any add-ons.

This mechanism is powered by Webpack's [`resolve.alias`](https://webpack.js.org/configuration/resolve/#resolvealias), which maps a module path to an alternative file or folder.
Webpack resolves the override at build time, replacing the original module with your custom implementation.

To shadow a component, perform the following tasks.

-   Locate the component you want to override or shadow.
-   Replicate the component's original folder structure inside a {file}`src/customizations` folder in your add-on.


## Folders and files hierarchy structure pattern for shadowing

To shadow components, you must follow a folders and files hierarchy structure pattern.

### Customizing Volto core components/modules

Assume the component you want to shadow is located in Volto core at `node_modules/@plone/volto/src/components/theme/Logo/Logo.svg`.

Since you want to customize a Volto core component, the first folder must be `volto`
You'll need to replicate this structure under {file}`src/customizations` as shown.

```
customizations/
└── volto/
    └── components/
        └── theme/
            └── Logo/
                └── Logo.svg
```

```{tip}
Please note the absence of the `src/` folder in the shadowed module paths.
This is because the build ignores and removes the `src/` prefix when resolving modules.
```

```{tip}
Use absolute imports in your shadowed modules to avoid resolution issues.
```

### Customizing add-ons components/modules

Assume the component you want to shadow is located in Volto core at `node_modules/@kitconcept/volto-light-theme/src/components/Header/Header.tsx`.

Since you want to customize an add-on component, the first folder must be the full name of the add-on (including the namespace, if any, separated in folders), `@kitconcept/volto-light-theme`.
You'll need to replicate this structure under {file}`src/customizations` as shown.
```
customizations/
└── @kitconcept/
    └── volto-light-theme/
        └── components/
            └── Header/
                └── Header.tsx
```

## Debugging shadowing

You can enable an environment variable to help with debugging shadowing issues.
Set the `DEBUG` environment variable to `shadowing:*` to see detailed logs about the module resolution process.

```shell
DEBUG=volto:shadowing pnpm start
```

## Identifying components to shadow

To determine what and where to shadow:

-   Use the React Developer Tools add-on for either [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) or [Chrome](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) to inspect the live DOM tree and identify component names.
-   Search those component names in the corresponding source package inside {file}`node_modules/`.
-   Follow import paths and folder structures to map to the original file.

## Caution when upgrading

```{warning}
If you update a dependency or add-on that contains shadowed components, always verify whether the shadowed component's structure, API, or dependencies have changed.

Failure to adapt your shadowed code to the new version may break your application silently or cause unexpected behavior.
```

## Clarification: only registered add-ons can be shadowed

Shadowing only works with **registered add-ons** that are explicitly declared as such in {file}`registry.config.ts`.
If you attempt to shadow a module from a package that is not registered as an add-on, the override will **not be resolved**, and your changes will be silently ignored.
Always ensure the package you want to shadow is installed and registered in your application configuration.

## Summary

-   Component shadowing is safe and modular when done properly.
-   The key is to mirror the original file path in the {file}`src/customizations` folder.
-   Only registered add-ons can be shadowed.
-   Keep your shadowed components up to date with upstream changes.
