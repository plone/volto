---
html_meta:
  "description": "Configure the API expanders in Volto using the `settings.apiExpanders`"
  "property=og:description": "Configure the API expanders in Volto using the `settings.apiExpanders`"
  "property=og:title": "API expanders"
  "keywords": "Volto, Plone, frontend, React, api expanders"
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
      }
  ];

  return config;
}
```

The config accepts a list of matchers with the ability to filter by request path and action type, for maximum flexibility.
