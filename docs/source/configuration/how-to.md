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
```

It gets the default config from Volto and leave it available to you to customize it in your project.

!!! note
    This documentation is a work in progress. Please consider to contribute to this documentation.
