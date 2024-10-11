---
myst:
  html_meta:
    "description": "What is a Volto add-on"
    "property=og:description": "What is a Volto add-on"
    "property=og:title": "What is a Volto add-on"
    "keywords": "add-on, Volto, create"
---
%Explanation
# What is a Volto add-on

There are several advanced scenarios where we might want to have more control and flexibility beyond using the plain Volto project to build a site.

We can build Volto {term}`add-on` products and make them available as generic JavaScript packages that can be included in any Volto project.
By doing so we can provide code and component reutilization across projects and, of course, benefit from open source collaboration.

Volto add-on packages are just CommonJS/ESM packages.
The only requirement is that they point the `main` key of their `package.json` to a module that exports, as a default function that acts as a {term}`Volto configuration loader`.

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

An add-on can be almost anything that a Volto project can be. They can:

- provide additional views and blocks
- override or extend Volto's builtin views, blocks, settings
- shadow (customize) Volto's (or another add-on's) modules
- register custom routes
- provide custom {term}`Redux` actions and reducers
- register custom Express middleware for Volto's server process
- tweak Volto's Webpack configuration, load custom Razzle and Webpack plugins
- even provide a custom theme, just like a regular Volto project does.
