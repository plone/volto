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
Currently, the loader loads styles for both the end user interface (Public UI) part, which displays content to both authenticated and anonymous users, and the content management system user interface (CMSUI) part of the app.

## Public UI Styles

To load Public UI styles, create a file {file}`styles/publicui.css` at the root of your add-on package to serve as the entry point.
This file is a `.css` file containing the styles that you want your app to load for the Public UI.

## CMSUI Styles

Similar to the Public UI, you can create a file {file}`styles/cmsui.css` at the root of your add-on package to serve as the entry point for the CMSUI styles.
This file is also a CSS file containing the styles that you want your app to load for the CMSUI.

`@plone/registry` has a helper utility `createAddonsStyleLoader` which generates an add-ons loader file.
That file contains the aggregated files from all the registered add-ons, keeping the order in which they were defined.

This loader is also a `.css` file and is placed in the {file}`.plone` directory in the root of your application.
By default, it's called {file}`publicui.css` for the Public UI and {file}`cmsui.css` for the CMSUI.

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

createAddonsStyleLoader(registry);
```

This will create {file}`publicui.css` in the {file}`.plone` directory in the root of your app.
Afterwards, configure your app to load the CSS according to the framework's convention, and in both a centralized and performant manner.

```css
@import 'tailwind';
@import './.plone/publicui.css';
```

```{note}
If you use a Vite-powered framework, use the `@plone/registry` Vite plugin.
If you use a non-Vite framework, you will have to build your own integration.
You can take the implementation of the Vite plugin as reference.
```
