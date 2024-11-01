---
myst:
  html_meta:
    "description": "Volto add-ons extend the core functionality of the Plone CMS user interface."
    "property=og:description": "Volto add-ons extend the core functionality of the Plone CMS user interface."
    "property=og:title": "Volto add-ons"
    "keywords": "Volto, add-on, extensions, user interface, frontend, Plone"
---

# Volto add-on concepts

This guide describes Volto add-on concepts.


## What is a Volto add-on?

Volto add-ons are just CommonJS or ESM packages.
Their main purpose is to encapsulate logic, configuration, components, customizations, and even themes in a reusable way.

Suppose you want to have more control and flexibility beyond the plain Volto project when building a site.
You can build a Volto {term}`add-on` and make it available as a generic JavaScript package.
Then you can reuse and include it in any Volto project.

An add-on can configure or provide any of the following aspects of Volto.

-   Provide additional views and blocks.
-   Override or extend Volto's built-in views, blocks, and settings.
-   Shadow or customize Volto's, or another add-on's, modules.
-   Register custom routes.
-   Provide custom {term}`Redux` actions and reducers.
-   Register custom Express middleware for Volto's server process.
-   Tweak Volto's webpack configuration, loading custom Razzle and webpack plugins.
-   Provide even a custom theme.


## Volto registry

Volto has a built-in extensible and pluggable system to enhance the Plone CMS user interface.
It helps developers extend Volto in a pluggable way through {term}`add-on`s.
This system is implemented through Volto's registry.

For Volto 17 and earlier, the registry was integrated into Volto core.

From Volto 18 onward, the Volto registry is in its own package [`@plone/registry`](https://plone-registry.readthedocs.io/).


## Add-on configuration pipeline

A Volto app's configuration is determined through a pipeline starting with Volto's default configuration, then each of your app's add-ons' configuration.
In Volto 17 and earlier, you can also use project configuration at the end of the pipeline after any add-ons.

```{deprecated} Volto 18.0.0
The project configuration approach is deprecated and will be removed in Volto 19.
```

Add-ons are applied in the order they are declared in the `addons` key of {file}`package.json` or programmatically via a provided configuration file.
Add-ons can override configuration coming from other add-ons, providing a hierarchy of configuration stacks.

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
These include {doc}`JavaScript language features <../contributing/language-features>` with transpilation by Babel, whole-process customization via {file}`razzle.extend.js`, and integration with Volto's {term}`configuration registry`.
```


### Practical application

In practice with the configuration pipeline, for example, you can create a "policy" core add-on for your project, and use another add-on for your project's theme.
This way the project itself renders as a simple boilerplate, which you can extend or rebuild at any time.

You can also reuse add-ons across projects, and adjust them using other add-ons, depending on the other projects' requirements.


% TODO: Should this section be moved to a how-to guide?
### Define your add-ons programmatically

The `addons` key in the {file}`package.json` file alone might not be flexible enough in complex scenarios.
You can programmatically load your add-ons outside your {file}`package.json` file using a {file}`volto.config.js` file with the following content.

```js
module.exports = {
    addons: ['@eeacms/volto-accordion-block']
}
```

This creates an "escape hatch", where you can use logic and environment conditions to define the add-ons to load in the current project, as in the next example.
The add-ons that you define here will be added to the existing ones in {file}`package.json`.

```js
let addons = [];
if (process.env.MY_SPECIAL_ENV_VAR) { // Does not have to be RAZZLE_
  addons = ['volto-my-awesome-special-add-on'];
}

if (process.env.MARKER_FOR_MY_SECRET_PROJECT) { // Does not have to be RAZZLE_
  addons = [
    '@kitconcept/volto-heading-block',
    '@kitconcept/volto-slider-block',
    'volto-my-secret-project-add-on',
  ];
}

module.exports = {
  addons: addons,
};
```

```{important}
You must add the `addons` key with the value of your add-on package's name wherever you configure it.
In Plone terminology, it is like including a Python egg in the `zcml` section of `zc.buildout`.
```

```{seealso}
{doc}`../configuration/volto-config-js`
```


## Publish an add-on

Volto add-ons should not be transpiled.
They should be released as "source" packages.

Their primary entry point (the `main` key of their {file}`package.json`) must point to a module that exports a default function, which acts as a default configuration loader for that package.

You can publish an add-on to an npm registry or to a remote repository host such as GitHub or GitLab, like any other package.
If you publish your add-on to the [npm Registry](https://www.npmjs.com/) or make your repository public, as a bonus, you will benefit from collaborating on open source software.


% Where does this go?
By using [`mrs-developer`](https://github.com/collective/mrs-developer), it's possible to have a workflow similar to `zc.buildout`'s `mr.developer`, where you can "checkout" an add-on for development.
[Eric Brehault](https://github.com/ebrehault) ported this amazing Python tool.



```{toctree}
:maxdepth: 1
:hidden:

how-an-add-on-works
```
