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
```

It gets the default config from Volto and leave it available to you to customize it in your project.

The `addonRoutes` is a list of routes declaration, to be used as child sub-routes for the App component. A route declaration looks like this (an example):

```
  {
    path: '/**/chat',
    component: Chat,
  }
```

The addonRoutes have a higher priority compared to the default routes, so you can use them to override the existing routes, as well. See `src/routes.js` for more details.

!!! note
    This documentation is a work in progress. Please consider to contribute to this documentation.
