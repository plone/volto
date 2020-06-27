# Custom Express middleware

Volto uses the popular [Express](https://expressjs.com/) server for its
Server-Side Rendering implementation and static resource serving.
In some cases it is useful to extend this
server with new functionality. For example, Volto includes an Express proxy
middleware for the backend that can be used during development. Another use
case might include a CORS proxy server, a proxy to protect a database such as
ElasticSearch or MongoDB, etc.

To add new middleware, use the ``settings.expressMiddleware`` configuration
key. This is a list that takes objects with ``id`` and ``middleware`` as
keys. The ``id`` should be a simple identification string for that
middleware. For example:

```js
import {
  settings as defaultSettings,
} from '@plone/volto/config';

const settings = { ...defaultSettings };


if (__SERVER__) {
  const express = require('express');
  const middleware = express.Router();

  middleware.all('/test-middleware', function (req, res, next) {
    res.send('Hello world');
  });

  settings.expressMiddleware = [
    ...defaultSettings.expressMiddleware,
    {
      id: 'just-a-test-middleware',
      middleware,
    }
  ] ;
}
```

Now the [test-middleware](http://localhost:3000/test-middleware) page can be
visited and it will return the simple string and not the usual Volto pages.

Notice the use of the ``__SERVER__`` condition. Because the code in a Volto
project's ``config.js`` gets executed by both the server and the client
(browser), the server-side libraries need to "excluded" with conditions.

See [ExpressJS](https://expressjs.com/) website for more documentation.

!!! note
    This documentation is a work in progress. Please consider to contribute to this documentation.
