---
myst:
  html_meta:
    "description": "Volto add-on concepts"
    "property=og:description": "Volto add-on concepts"
    "property=og:title": "Volto add-on concepts"
    "keywords": "add-on, Volto, package"
---

# Volto add-on concepts

Volto add-on packages are just CommonJS or ESM packages.
Their main purpose is to encapsulate logic, configuration, components, customizations, and even themes in a reusable way.

Suppose you want to have more control and flexibility beyond the plain Volto project when building a site.
You can build a Volto {term}`add-on` and make it available as a generic JavaScript package by publishing it to an npm registry.
Then you can reuse and include it in any Volto project.
As a bonus, you will benefit from collaborating on open source software.



Volto add-ons should not be transpiled.
They should be released as "source" packages.
Their primary entry point (the `main` key of their {file}`package.json`) must point to a module that exports a default function, which acts as a default configuration loader for that package.




Add-ons are applied in the order they are declared in the `addons` key of {file}`package.json` or programmatically via a provided configuration file.
Add-ons can override configuration coming from other add-ons, providing a hierarchy of configuration stacks.

An add-on can be published in an npm registry, just as any other package.
However, add-ons are meant not to be transpiled, but built along with your app code.
They can be released as "source" packages or used directly in your app as local code.

Add-ons can be chained, where each one can configure the app in some way.
If needed, each add-on in the chain can override or extend the previous configuration that other add-ons set.
Thus, the order in which you register add-ons matters.

Add-ons can define shadowed components.
"Component shadowing" is a technique for overriding modules of other packages at build time.
This technique builds upon the `resolve.aliases` facilities of bundlers, so modules can be replaced when the app is being built.

Volto will automatically provide aliases for your package.
Once you've released it, you don't need to change import paths, since you can use the final ones from the very beginning.
This means that you can use imports, such as `import { Something } from '@plone/my-volto-add-on'` without any extra configuration.

```{note}
By declaring a JavaScript package as a Volto add-on, Volto provides several integration features.
These include language features with transpilation by Babel, whole-process customization via {file}`razzle.extend.js`, and integration with Volto's {term}`configuration registry`.
```

The add-on can be published to an npm registry or directly installed from GitHub by the package manager.
By using [`mrs-developer`](https://github.com/collective/mrs-developer), it's possible to have a workflow similar to `zc.buildout`'s `mr.developer`, where you can "checkout" an add-on for development.
[Eric Brehault](https://github.com/ebrehault) ported this amazing Python tool.

An add-on can configure any of the following aspects of Volto.

-   provide additional views and blocks
-   override or extend Volto's built-in views, blocks, and settings
-   shadow or customize Volto's, or another add-on's, modules
-   register custom routes
-   provide custom {term}`Redux` actions and reducers
-   register custom Express middleware for Volto's server process
-   tweak Volto's webpack configuration, loading custom Razzle and webpack plugins
-   even provide a custom theme
