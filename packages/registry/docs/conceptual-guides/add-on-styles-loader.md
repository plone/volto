---
myst:
  html_meta:
    "description": "An explanation of the add-ons styles loader in @plone/registry"
    "property=og:description": "An explanation of the add-ons styles loader in @plone/registry"
    "property=og:title": "Add-ons styles loader"
    "keywords": "@plone/registry, registry, add-ons, loader"
---

# Add-ons styles loader

Add-ons that are compatible with the `@plone/registry` may declare styles that should be loaded by the app.
To do so, create a file {file}`styles/main.css` at the root of your project which serves as the entry point.
This file is a `.css` file containing the styles that you want your app to load.

`@plone/registry` has a helper utility `createAddonsStyleLoader` which generates an add-ons loader file.
That file contains the aggregated files from all the registered add-ons, keeping the order in which they were defined.

This loader is also a `.css` file and is placed in the root of your application.
By default, it's called {file}`addons.styles.css`.

```{important}
This file is generated and maintained by `@plone/registry`.
You should neither modify it nor add your own styles in here.
It will be overwritten in the next bundler run.
```

The add-ons loader generator is meant to be run before bundling your app or by the bundler when it runs.
The `@plone/registry` Vite plugin generates this file, so the framework can load it during app bootstrap time.

```js
  const projectRootPath = path.resolve('.');
  const { registry, shadowAliases } = AddonRegistry.init(projectRootPath);

  createAddonsStyleLoader(registry.getAddonStyles());
```

This will create {file}`addons.styles.css` in the root of your app.
Afterwards, configure your app to load the CSS according to the framework's convention, and in both a centralized and performant manner.

```css
@import "tailwind";
@import "./addons.styles.css"
```

```{note}
If you use a Vite-powered framework, use the `@plone/registry` Vite plugin.
If you use a non-Vite framework, you will have to build your own integration.
You can take the implementation of the Vite plugin as reference.
```
