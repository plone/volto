# The configuration registry

Volto has a centralized configuration registry used to parameterize Volto. It has the
form of a singleton that can be called and queried from anywhere in your code like this:

```js
import config from '@plone/volto/registry';
```

then access any of its internal configuration to retrieve the configuration you require
like:

```js
const absoluteUrl = `${config.settings.apiPath}/${content.url}`
```

Both add-ons and projects can extend Volto's configuration registry. First the add-ons
configuration is applied, in the order they are defined in `package.json`, then finally
the project configuration is applied. Visualized like a pipe would be:

> Default Volto configuration -> Add-on 1 -> Add-on 2 -> ... -> Add-on n -> Project

Both use the same method, using a function as the default export. This function takes a
`config` and should return the `config` once you've ended your modifications. For
add-ons, it must be provided in the main `index.js` module of the add-on. For project's
it must be provided in the `src/config.js` module of the project.

See the [Add-ons](/addons) section for extended information on how to work with add-ons.

## Extending configuration in a project

You must provide a function as default export in your `src/config.js`:

```js
export default function applyConfig(config) {
  config.settings = {
    ...config.settings,
    isMultilingual: true,
    supportedLanguages: ['en', 'de'],
    defaultLanguage: 'de',
    navDepth: 3,
  };

  return config;
}
```

you have all Volto's default configuration and the already applied from your project's
add-ons configuration in `config` argument. Next, perform all the required modifications
to the config and finally, return the config object.

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

The `settings` object of the configruration registry is a big registry of miscellaneous
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

## blocks

The `blocks` registry holds the information of all the registered blocks in Volto. There are 4 configurations available:

- blocksConfig
- requiredBlocks
- groupBlocksOrder
- initialBlocks

See [Blocks](/blocks/settings) for more information.

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
