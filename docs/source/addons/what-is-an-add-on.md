---
myst:
  html_meta:
    "description": "What is a Volto add-on"
    "property=og:description": "What is a Volto add-on"
    "property=og:title": "What is a Volto add-on"
    "keywords": "add-on, Volto, create"
---
%Explanation
## What is a Volto add-on

There are several advanced scenarios where we might want to have more control and flexibility beyond using the plain Volto project to build a site.

We can build Volto {term}`add-on` products and make them available as generic JavaScript packages that can be included in any Volto project.
By doing so we can provide code and component reutilization across projects and, of course, benefit from open source collaboration.

Volto add-on packages are just CommonJS/ESM packages.
Their main purpose is encapsulate logic, configuration and customizations in a reusable way.
The only requirement is that their primary entry point (`main` key of their `package.json`) points to a module that exports a default function, which acts as a default configuration loader for that package.

Add-ons are applied in the order they are declared in the `addons` key of {file}`package.json` or programatically via a provided configuration file.
Add-ons can override configuration coming from other add-ons, providing a hierarchy of configuration stacks.

An add-on can be published in an npm registry, just as any other package.
However, add-ons are meant to not be transpiled, but built along with your app code.
They can be released as "source" packages or used directly in your app as local code.

Add-ons can be chained, where each one can configure the app in some way.
If needed, each add-on in the chain can override or extend the previous configuration that other add-ons set.
Thus, the order in which you register add-ons matters.

Add-ons can define shadowed components.
"Component shadowing" is a technique for overriding modules of other packages at build time.
This technique builds upon the `resolve.aliases` facilities of bundlers, so modules can be replaced when the app is being built.

Volto will automatically provide aliases for your (unreleased) package, so that
once you've released it, you don't need to change import paths, since you can
use the final ones from the very beginning. This means that you can use imports
such as `import { Something } from '@plone/my-volto-add-on'` without any extra
configuration.

```{note}
By declaring a JavaScript package as a Volto add-on, Volto provides
several integration features: language features (so they can be transpiled
by Babel), whole-process customization via razzle.extend.js and
integration with Volto's {term}`configuration registry`.
```

The add-on can be published to an npm registry or directly installed from github by the package manager.
By using [mrs-developer](https://github.com/collective/mrs-developer), it's possible to have a workflow similar to `zc.buildout`'s `mr.developer`, where you can "checkout" an add-on for development.

An add-on can configure any aspect of Volto:
- provide additional views and blocks
- override or extend Volto's builtin views, blocks, settings
- shadow (customize) Volto's (or another add-on's) modules
- register custom routes
- provide custom {term}`Redux` actions and reducers
- register custom Express middleware for Volto's server process
- tweak Volto's Webpack configuration, load custom Razzle and Webpack plugins
- even provide a custom theme
