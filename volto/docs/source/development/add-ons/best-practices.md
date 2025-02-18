---
myst:
  html_meta:
    "description": "Best practices for developing Volto add-ons"
    "property=og:description": "Best practices for developing Volto add-ons"
    "property=og:title": "Best practices for add-ons"
    "keywords": "Volto, Plone, frontend, React, best, practices, add-ons"
---

# Best practices for add-ons

This document describes the best practices when you develop your add-on.


## Integrate your add-on with Volto's add-on framework

Just like Plone add-ons provide some features by default, Volto add-ons should register some features by default.
For example, if your add-on provides widgets, then register the most basic configuration of that widget with a name that it uses.

For more complicated cases, see if you can structure your code to use the `settings` {term}`configuration registry`, or stash your configuration in your block registration.

Let's say you're building a color picker widget.
You might want to provide a palette of colors from which to choose.
Your widget should integrate with a default `settings.colorWidgetPalette`, which would be a list of colors.

You should also provide a widget factory, so it can be used to create multiple instances of that color widget with custom color palettes.


## Provide additional configuration

An add-on can ship with multiple {term}`Volto configuration loader`s.
This makes it possible to provide multiple configuration methods for specific demonstration purposes.
Alternatively you could ship your add-on with a default "shallow" integration, then provide another separate configuration loader for a deeper integration.


## Avoid shadowing core Volto files

This rule is meant to be broken.
If you need to customize a specific file in Volto core and you have multiple projects, it may be better to create an add-on that holds that customized file.
Doing so creates a single place to maintain that "file fork".
Otherwise, it's best to avoid shipping generic add-ons with Volto core customizations.

If you customize core Volto files, you should warn consumers of your add-on in its description.

If your use case is generic enough, [file a feature request](https://github.com/plone/volto/issues/new?assignees=&labels=04+type%3A+enhancement&projects=&template=feature_request.md&title=) to discuss with the Volto Team whether your customization should be included directly in core.


## Documentation

"If it ain't documented, it's broken."

At least create a README with a brief description and a screenshot or video of what your add-on does.

Ideally, the README should include requirements or compatability with various versions of Volto and Plone, and installation and configuration instructions.


## Test the add-on

```{versionadded} Volto 18.0.0-alpha.43
```

Cookieplone provides a self-bootstrapping and testing framework in Volto 18.
See {doc}`test-add-ons-18`.

Previously in Volto 17 and early alpha versions of Volto 18, it was not easy to ship an add-on with a self-bootstrapping and testing framework.
However, for these older versions of Volto you can create a separate minimal Volto project that can hold the Cypress integration tests and trigger the CI tests.


## Use appropriate npm Registry tags

If you release your add-on to the [npm Registry](https://www.npmjs.com/), consider adding the following tags, next to your add-on-specific tags.

-   `volto-addon`
-   `volto`
-   `plone`
-   `react`


## Add to `collective/awesome-volto`

Consider adding your add-on to the [`collective/awesome-volto`](https://github.com/collective/awesome-volto) add-ons list.
This list provides visibility to your add-on, as well as further solidifies Volto's position in the Plone community.
