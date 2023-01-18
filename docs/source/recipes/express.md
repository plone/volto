---
myst:
  html_meta:
    "description": "Volto uses the popular Express server for its server-side rendering implementation and static resource serving."
    "property=og:description": "Volto uses the popular Express server for its server-side rendering implementation and static resource serving."
    "property=og:title": "Custom Express middleware"
    "keywords": "Volto, Plone, frontend, React, custom, express, middleware"
---

# Custom Express middleware

Volto uses the popular [Express](https://expressjs.com/) server for its
{term}`server-side rendering` implementation and static resource serving.  In some
cases it is useful to extend this server with new functionality. For example,
Volto includes a middleware that proxies the backend and that can be used
during development. Other use cases might include a CORS proxy server, a proxy
to protect a database such as ElasticSearch or MongoDB, etc.

To add new middleware, use the ``settings.expressMiddleware`` configuration
key. This is a list that takes Express middleware functions.  For example:

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
  middleware.id = 'test-middleware'

  settings.expressMiddleware = [
    ...defaultSettings.expressMiddleware,
    middleware,
  ] ;
}
```

Now the [test-middleware](http://localhost:3000/test-middleware) page can be
visited and it will return the simple string and not the usual Volto pages.

Notice the use of the ``__SERVER__`` condition. Because the code in a Volto
project's ``config.js`` gets executed by both the server and the client
(browser), the server-side libraries need to "excluded" with conditions.

See [ExpressJS](https://expressjs.com/) website for more documentation.

```{note}
Addon authors should add the ``id`` property to the middleware so that it
can be identified and manipulated in Volto projects configuration.
```
