---
myst:
  html_meta:
    "description": "An explanation of the add-ons styles loader in @plone/registry"
    "property=og:description": "An explanation of the add-ons styles loader in @plone/registry"
    "property=og:title": "Add-ons styles loader"
    "keywords": "@plone/registry, registry, add-ons, loader"
---

# Add-ons styles loader

The `@plone/registry` compatible add-ons are able to declare styles that should be loaded by the app.
This is achieved by creating a folder {file}`styles` with a {file}`main.css` file that serves as entry point.
This file is a `.css` file containing the styles that we want our app to load.

`@plone/registry` has a helper utility `createAddonsStyleLoader` for generating an add-ons style loader file that contains the aggregated files from all the registered add-ons, keeping the order in which they were defined.

This loader is also a `.css` file and is placed in the root of your application.
By default, it's called {file}`.addons.styles.css`.

```{important}
This file is generated and maintained by `@plone/registry`.
You should not modify it and add your own styles in here.
It will be overwriten in the next bundler run.
```

The add-ons loader generator is meant to be run before bundling your app or by the bundler when it runs.
The `@plone/registry` Vite plugin generates this file so the framework can load it on app bootstrap time.

```js
  const projectRootPath = path.resolve('.');
  const { registry, shadowAliases } = AddonRegistry.init(projectRootPath);

  createAddonsStyleLoader(registry.getAddonStyles());
```

This will create {file}`.addons.styles.css` in the root of your app.
Afterwards, you have to make sure that your app loads the css, in the preferred way of the framework to do it properly, centralized, and in a performant way.

```css
@import "tailwind";
@import "./.addons.styles.css"
```

```{note}
If you are using a Vite-powered framework, just use the `@plone/registry` Vite plugin.
Only in the case that you are using a non-Vite framework, you will have to build your own integration.
You can take the implementation of the Vite plugin as reference.
```
