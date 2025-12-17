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

## Static middleware

The `staticMiddleware` is for serving static files such as style sheets and client-side JavaScript files from the `BUILD_DIR/PUBLIC` or `PUBLIC_DIR` directory.
It uses the `express.static()` function to serve static files, and the `setHeaders()` function to add response headers to the files that it serves.

```js
import { settings as defaultSettings } from '@plone/volto/config';
import express from 'express';

const settings = { ...defaultSettings };
if (__SERVER__) {
    const customStaticMiddleware = express.static('test/static/files');

    function setCustomHeaders(req, res, next) {
        res.setHeader('Cache-Control', 'public, max-age=3600');
        next();
    }

    customStaticMiddleware.setHeaders = setCustomHeaders;
    customStaticMiddleware.id = 'custom-static-middleware';

    settings.expressMiddleware = [
        ...defaultSettings.expressMiddleware,
        customStaticMiddleware,
    ];
}
```

### Function `setHeaders(path)`

The `setHeaders()` function is used to update the response headers for a file.
It takes the path of the file being served as an argument, and adds the response headers to that file.
It uses the `config` object specified in `config.settings.serverConfig.staticFiles` to determine which response headers should be added to the file.

### Configuration

The `config.settings.staticFiles` is an array of objects with three properties:

`id`
: a string identifier for the static file rule

`match`
: a regular expression that evaluates the path of the requested resource

`headers`
: an object containing the headers added if the match is successful

The following example shows how to add the response header `Cache-Control: public, max-age=3600` to a file named {file}`styles.css` located in the `BUILD_DIR/PUBLIC` directory:

```js
import {
    settings as defaultSettings,
} from '@plone/volto/config';

const settings = { ...defaultSettings };
settings.staticFiles = [
    ...defaultSettings.staticFiles, {
        id: 'styles_css',
        match: /^\/styles\.css$/,
        headers: {
            'Cache-Control': 'public, max-age=3600',
        },
    }
]
```

The rules are checked in sequential order, and the search stops at the first match.
The default rules add headers that set the browser cache to 365 days for resources under the `/static` path and 60 seconds for all other paths.

Notice the use of the ``__SERVER__`` condition. Because the code in a Volto
project's ``config.js`` gets executed by both the server and the client
(browser), the server-side libraries need to "excluded" with conditions.

See [ExpressJS](https://expressjs.com/) website for more documentation.

```{note}
Addon authors should add the ``id`` property to the middleware so that it
can be identified and manipulated in Volto projects configuration.
```