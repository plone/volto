# API expanders

You can configure the API expanders Volto uses using the `settings.apiExpanders` like this:

```js
import config from '@plone/volto/registry';
import { GET_CONTENT } from '@plone/volto/constants/ActionTypes';

config.settings.apiExpanders = [
    {
      match: '',
      GET_CONTENT: ['mycustomexpander'],
    },
    {
      match: '/de',
      GET_CONTENT: ['myothercustomexpander'],
    }
]
```

The config accepts a list of matchers with the ability to filter by request path and action type, for maximum flexibility.
