---
myst:
  html_meta:
    'description': 'The `AppExtras` component is a general use insertion point for general purpose code spanning the whole application or for third party services code.'
    'property=og:description': 'The `AppExtras` component is a general use insertion point for general purpose code spanning the whole application or for third party services code.'
    'property=og:title': 'AppExtras component'
    'keywords': 'Volto, Plone, frontend, React, app extra component'
---

# AppExtras component

```{versionchanged} 17.11.6 and 16.30.3
Added the `ignore` property.
```

The `AppExtras` component is a general use insertion point for things like
analytics, general purpose code spanning the whole application or third party
services code. AppExtras component inserts will be rendered by the `App`
component.

## How to use it

You can either use it by overriding it via {term}`component shadowing` by placing
a custom `src/customizations/components/theme/AppExtras/AppExtras.jsx`...

Or you can use the new key of `config.settings`, the `appExtras`. This is
a list of registrations, each registration is an object with:

- `match`: The `match` key is for objects compatible with [react-router's `matchPath`](https://v5.reactrouter.com/web/api/matchPath). It can be either a string or a [`match`](https://v5.reactrouter.com/web/api/match) object.
  matchPath](https://v5.reactrouter.com/web/api/matchPath), so it can be either
  a simple string or a match object.
- `ignore`: The `ignore` key is for routes compatible with the match property from above and
  ignores all the results that are also compatible with the ignore rule.
- `component`. Use the `component` to link the component to be used.
- `props`: Extra props to be injected into the actual component used.

For example:

```jsx
import { settings as defaultSettings } from '@plone/volto/config'

export settings = {
  ...defaultSettings,
  appExtras: [
    ...defaultSettings.appExtras,
    {
      match: '',
      component: GoogleAnalyticsPing
      props: {
        'google-tag': '123456'
      }
    },
    {
      match: {
        path: '/blogs',
        exact: true,
      },
      component: WordClouds
    },
    {
      path: '/blog/**/edit',
      component: ExtraToolbarButton,
    },
     {
      match: {
       match: '/frontpage',
       ignore: '/frontpage/images',
      },
      component: FrontPage
    },
  ]
}
```

You can use this to render, for example, `<Portal>` components to be inserted
somewhere on the website.
