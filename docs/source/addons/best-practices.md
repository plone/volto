# Best practices for addons

Although the addon framework is relatively new in Volto's world, there are
quite a few generic addons that can be used in any Volto project.

Based on the experience gained developing some of these addons, we
recommend that you follow (no need for strictness, of course) these rough
guidelines:

## Integrate your addon with Volto's addon framework

Just like Plone addons provide some features by default, Volto addons should
register some features by default. For example, if your addon provides widgets,
register the most basic configuration of that widget with a name that can be
used.

On more complicated cases, see if you can structure your code to use the
`settings` configuration registry, or stash your configuration in your block
registration, for example.

As an example: let's say we're building a Color Picker widget and we want to
provide a palette of colors from which to choose. The widget should integrate
with a default `settings.colorWidgetPalette`, which would be a list of colors.

And of course, also provide a widget factory so it can be used to create
multiple instances of that color widget with custom color palettes.

### Provide additional configuration

An addon can ship with multiple Volto configuration loaders. This makes it
possible to provide configuration methods for demo purposes, for example, or to
ship with a default "shallow" integration, then provide another separate
configuration loader for a deeper integration.

## Avoid shadowing Volto files

This rule is meant to be broken. If you find that you need to customize
a particular file from Volto and you have multiple projects, better to create
an addon that holds that customized file, so that you have a single place to
maintain that "file fork", but otherwise it's a good idea to avoid shipping
generic addons with Volto customizations. Make sure to include this information
as a warning in your addon description!

See if your use case is generic enough, maybe Volto needs to be extended to
cover that use case, directly in core.

## Minimal documentation

Deadlines can be rough and documentation tends to be pushed as last priority,
but please add a minimal Readme with a couple of lines and, most importantly,
a screenshot.

Ideally, the Readme should also include install instructions and details on any
possible settings.

## Testing the addon

It is not easy, right now, to ship an addon with a self-bootstraping and
testing framework. But you can create a separate minimal Volto project that can
hold the Cypress integration tests and trigger the CI tests.

## Use appropriate npmjs tags

If you're releasing your addon to npmjs.com, please consider adding the
following tags, next to your addon-specific tags:

- volto-addon
- volto
- plone
- react

## Include in collective/awesome-volto

Even if you think your addon is not generic or it's tricky to integrate, please
consider including your addon in the
[collective/awesome-volto](https://github.com/collective/awesome-volto) addons
list. This provides visibility to your addon but also further solidifies
Volto's possition in our Plone community.
