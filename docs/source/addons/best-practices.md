---
myst:
  html_meta:
    "description": "Integrate your add-on with Volto's add-on framework"
    "property=og:description": "Integrate your add-on with Volto's add-on framework"
    "property=og:title": "Best practices for add-ons"
    "keywords": "Volto, Plone, frontend, React, best practices, add-ons"
---

# Best practices for add-ons

Although the add-on framework is relatively new in Volto's world, there are
quite a few generic add-ons that can be used in any Volto project.

Based on the experience gained developing some of these add-ons, we
recommend that you follow (no need for strictness, of course) these rough
guidelines:

## Integrate your add-on with Volto's add-on framework

Just like Plone add-ons provide some features by default, Volto add-ons should
register some features by default. For example, if your add-on provides widgets,
register the most basic configuration of that widget with a name that can be
used.

On more complicated cases, see if you can structure your code to use the
`settings` {term}`configuration registry`, or stash your configuration in your block
registration, for example.

As an example: let's say we're building a Color Picker widget and we want to
provide a palette of colors from which to choose. The widget should integrate
with a default `settings.colorWidgetPalette`, which would be a list of colors.

And of course, also provide a widget factory so it can be used to create
multiple instances of that color widget with custom color palettes.

### Provide additional configuration

An add-on can ship with multiple {term}`Volto configuration loader`s. This makes it
possible to provide configuration methods for demo purposes, for example, or to
ship with a default "shallow" integration, then provide another separate
configuration loader for a deeper integration.

## Avoid shadowing Volto files

This rule is meant to be broken. If you find that you need to customize
a particular file from Volto and you have multiple projects, better to create
an add-on that holds that customized file, so that you have a single place to
maintain that "file fork", but otherwise it's a good idea to avoid shipping
generic add-ons with Volto customizations. Make sure to include this information
as a warning in your add-on description!

See if your use case is generic enough, maybe Volto needs to be extended to
cover that use case, directly in core.

## Minimal documentation

Deadlines can be rough and documentation tends to be pushed as last priority,
but please add a minimal Readme with a couple of lines and, most importantly,
a screenshot.

Ideally, the Readme should also include install instructions and details on any
possible settings.

## Testing the add-on

It is not easy, right now, to ship an add-on with a self-bootstraping and
testing framework. But you can create a separate minimal Volto project that can
hold the Cypress integration tests and trigger the CI tests.

## Use appropriate npmjs tags

If you're releasing your add-on to `npmjs.com`, please consider adding the
following tags, next to your add-on-specific tags:

- volto-addon
- volto
- plone
- react

## Include in collective/awesome-volto

Even if you think your add-on is not generic or it's tricky to integrate, please
consider including your add-on in the
[collective/awesome-volto](https://github.com/collective/awesome-volto) add-ons
list. This provides visibility to your add-on but also further solidifies
Volto's possition in our Plone community.
