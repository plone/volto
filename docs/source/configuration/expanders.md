---
myst:
  html_meta:
    "description": "Configure the API expanders in Volto using the `settings.apiExpanders`"
    "property=og:description": "Configure the API expanders in Volto using the `settings.apiExpanders`"
    "property=og:title": "API expanders"
    "keywords": "Volto, Plone, frontend, React, API expanders"
---

# API expanders

You can configure the API expanders Volto uses using the `settings.apiExpanders` like this:

```jsx
import { GET_CONTENT } from '@plone/volto/constants/ActionTypes';

export default function applyConfig (config) {
  config.settings.apiExpanders = [
      ...config.settings.apiExpanders,
      {
        match: '',
        GET_CONTENT: ['mycustomexpander'],
      },
      {
        match: '/de',
        GET_CONTENT: ['myothercustomexpander'],
      },
      {
        match: '/de',
        GET_CONTENT: ['navigation'],
        querystring: {
          'expand.navigation.depth': 3,
        },
      }
  ];

  return config;
}
```

The config accepts a list of matchers with the ability to filter by request path and action type, for maximum flexibility.
It also accepts a `querystring` object that allows to configure the expandeders via querystring params (eg. the navigation expander).
The `querystring` object accepts a querystring object or a function that returns a querystring object.

```js
export default function applyConfig (config) {
  config.settings.apiExpanders = [
      ...config.settings.apiExpanders,
      {
        match: '',
        GET_CONTENT: ['mycustomexpander'],
      },
      {
        match: '/de',
        GET_CONTENT: ['myothercustomexpander'],
      },
      {
        match: '/de',
        GET_CONTENT: ['navigation'],
        querystring: (config) => ({
          'expand.navigation.depth': config.settings.navDepth,
        }),
      }
  ];

  return config;
}
```

This is used in case that you want to pass current (as in resultant, in place) config options to the querystring object.
