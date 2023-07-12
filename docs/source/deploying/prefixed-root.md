---
myst:
  html_meta:
    "description": "Prefixed (non-root) deployment for Volto"
    "property=og:description": "Prefixed (non-root) deployment for Volto"
    "property=og:title": "Prefixed (non-root) deployment"
    "keywords": "Volto, deployment"
---

# Prefixed (non-root) deployment

If you're integrating a Volto website within another existing website, you may need to run Volto on a virtual path inside that website instead of the root path.

The first step is to set an environment variable `RAZZLE_PREFIX_PATH` to the prefixed path of your Volto.
For example, if you want Volto's root to be hosted at `http://example.com/my-prefix`, you need to start Volto with:

```shell
RAZZLE_PREFIX_PATH=/my-prefix yarn start
```

If you need to debug and understand how the requests are rewritten by the Volto SSR, you can add the following environment variables to the Volto start line:


```shell
DEBUG_HPM=true DEBUG=superagent RAZZLE_PREFIX_PATH=/my-prefix yarn start
```

The prefix location will be used regardless of how you start Volto, whether in development or production mode.
When developing, though, if your backend is something other then `http://localhost:8080`, you'll need to provide your own solution for how to handle things.

For a production setup, when hosting Volto behind a proxy HTTP server, you can configure your rewrite rules to something like the following, in this case for Apache.

```apache
RewriteRule ^/level-1/\+\+api\+\+(.*) http://plone:8080/VirtualHostBase/http/example.com:80/Plone/VirtualHostRoot/_vh_level-1$1 [P,L]
RewriteRule ^/level-1(.*) http://volto:3000/level-1$1 [P,L]
```

In case you have a deeper prefix path (for example, `/level1/level2`), you can do the following.
Notice the multiple `_vh_` segments in the rewrite rule.

```apache
RewriteRule ^/level-1/level-2/\+\+api\+\+(.*) http://plone:8080/VirtualHostBase/http/example.com:80/Plone/VirtualHostRoot/_vh_level-1/_vh_level-2$1 [P,L]
RewriteRule ^/level-1/level-2(.*) http://volto:3000/level-1/level-2$1 [P,L]
```

And start Volto with the following.

```shell
RAZZLE_PREFIX_PATH=/level1/level2 RAZZLE_API_PATH=http://example.com/level1/level2 yarn start
```

Note, as you'll be integrating Volto with an existing website, you need to configure `config.settings.externalRoutes` so that the router knows which routes it should consider internal.

Finally, because `RAZZLE_PREFIX_PATH` is also used to configure the location of the static resources in webpack, when you build the static resources bundle, you must use a command such as the following.

```shell
RAZZLE_PREFIX_PATH=/level1/level2 yarn build
```
