---
html_meta:
  "description": ""
  "property=og:description": ""
  "property=og:title": ""
  "keywords": ""
---

# Prefixed (non-root) deployment

If you're integrating a Volto website with another existing website, you may
need to have Volto running on an "folder" inside that website, rather than
having Volto serve directly the root folder.

The first step is to set an environment variable, `RAZZLE_PREFIX_PATH` to the
path "prefixed path" of your Volto. For example, if I want Volto's root to be
hosted at **example.com/my-prefix**, you need to start Volto with:

```
RAZZLE_PREFIX_PATH=my-prefix yarn start
```

If you need to debug and understand how the requests are rewritten by the Volto
SSR, you can add the following environment variables to the Volto start line:


```
DEBUG_HPM=true DEBUG=superagent RAZZLE_PREFIX_PATH=my-prefix yarn start
```

Notice the absence of a slash in the prefix name. Correct: `my-prefix`,
incorrect: `/my-prefix`.


The prefix location will be used regardless of how you start Volto, in
development or production mode. When developing, though, if your backend is
something other then `http://localhost:8080`, you'll need to provide your own
solution on how to handle things.

For production setup, when hosting Volto behind a proxy HTTP server, you can
configure your rewrite rules to something like this (in this case, for Apache):

```
RewriteRule ^/my-prefix/\+\+api\+\+/(.*) \
  http://plone:8080/VirtualHostBase/http/example.com:80/Plone/VirtualHostRoot/_vh_my-prefix/$$1 [P,L]
RewriteRule ^/my-prefix(.*) http://volto:3000/my-prefix$$1 [P,L]
```

In case you have a deeper prefix path (for ex, `level1/level2`), you can do like:

```
RewriteRule ^/level1/level2/\+\+api\+\+/(.*) \
  http://plone:8080/VirtualHostBase/http/example.com:80/Plone/VirtualHostRoot/_vh_level1/_vh_level2/$$1 [P,L]
RewriteRule ^/level1/level2(.*) http://volto:3000/level1/level2$$1 [P,L]
```

And start Volto with:

```
RAZZLE_PREFIX_PATH=level1/level2 RAZZLE_API_PATH=http://example.com/level1/level2 yarn start
```
