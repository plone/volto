# The configuration object

Volto has a central configuration object used to parameterize Volto. It lives in Volto itself but it can be customized in a per project basis.

You can find it in Volto in the `src/config` module.

When you create your project via `create-volto-app` you can find it in `src/config.js`.

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

In the ``addonReducers`` you can register and potentially override (by name) any registered reducer from Volto or other loaded Volto addons.

It gets the default config from Volto and leave it available to you to customize it in your project.

The `addonRoutes` is a list of routes declaration, to be used as child sub-routes for the App component. A route declaration looks like this (an example):

```
  {
    path: '/**/chat',
    component: Chat,
  }
```

The addonRoutes have a higher priority compared to the default routes, so you can use them to override the existing routes, as well. See `src/routes.js` for more details. An addon, in its configuration, would push additional routes to this data structure:

```
config.addonRoutes.push({ path: '/**/chat', component: Chat });
```

!!! note
    This documentation is a work in progress. Please consider to contribute to this documentation.
