# The configuration object

Volto has a central configuration object used to parameterize Volto. It lives in Volto itself but it can be customized in a per project basis.

You can find it in Volto in the `src/config` module.

When you create your project via the generator, you can find it in `src/config.js`.

```js
import {
  settings as defaultSettings,
  views as defaultViews,
  widgets as defaultWidgets,
  blocks as defaultBlocks,
  addonReducers as defaultAddonReducers,
} from '@plone/volto/config';

export const settings = {
  ...defaultSettings,
};

export const views = {
  ...defaultViews,
};

export const widgets = {
  ...defaultWidgets,
};

export const blocks = {
  ...defaultBlocks,
};

export const addonRoutes = [];

export const addonReducers = {
  ...defaultAddonReducers,
}
```

It gets the default config from Volto and leave it available to you to customize it in your project.

Reading the source code for the `~/config` registry is an absolute key in
understanding Volto and what can be configured.

As you can see from the snipet above, in your Volto project you'll have
a `src/config.js` file. This file is referenced throughout the codebase as
`~/config`. You can see that, in its default version, all it does is import
Volto's default configuration objects and export them further.

By reading Volto's
[src/config/index.js](https://github.com/plone/volto/tree/master/src/config/index.js),
you'll get to see that Volto provides some default configuration objects
(`blocks`, `widgets`, `settings`, etc), passes them through the
`applyAddonConfiguration()` function, which allows any installed addons to
modify this configuration, then spreads and exports its configuration objects.
This allows Volto to work the same way in either standalone version (when
developing Volto itself), but also when used as a library, referenced from
a Volto project.

## settings

The `settings` object of the `~/config` is a big registry of miscellaneous
settings. See the [Settings reference](/configuration/settings-reference) for
a bit more details.

## widgets

The `widgets` object holds the widget registry, used to decide which widget
should be used when rendering forms. Check [its
definition](https://github.com/plone/volto/blob/master/src/config/Widgets.jsx)
but also the [lookup
mechanism](https://github.com/plone/volto/blob/6fd62cb2860bc7cf3cb7c36ea86bfd8bd03247d9/src/components/manage/Form/Field.jsx#L112)
to understand how things work.

## views

The `views` registry allows configuration of the components that will be used
to render the content. There are 4 types of views:

- layout views, which are used based on the `layout` field of the incoming
  content
- content type views, registered view components per Plone content type
- the default view, which can render the composite page Volto blocks
- and the error views, to be used for regular error pages (Forbidden, Not
  Found, etc).

## addonReducers

In the `addonReducers` you can register and potentially override (by name) any
registered reducer from Volto or other loaded Volto addons.

## addonRoutes

The `addonRoutes` is a list of routes declaration, to be used as child
sub-routes for the App component. A route declaration looks like this (an
example):

```
  {
    path: '/**/chat',
    component: Chat,
  }
```

The `addonRoutes` have a higher priority compared to the default routes, so you
can use them to override the existing routes, as well. See `src/routes.js` for
more details. In its configuration, an addon would push additional routes to
this data structure:

```
config.addonRoutes.push({ path: '/**/chat', component: Chat });
```
