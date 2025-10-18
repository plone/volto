---
myst:
  html_meta:
    "description": "Serve Volto on a subpath"
    "property=og:description": "Serve Volto on a subpath"
    "property=og:title": "Serve Volto on a subpath"
    "keywords": "Volto, Plone, path, prefix, virtual hosting"
---

# Serve Volto on a subpath

Volto can be served on a subpath, e.g. `https://mysite.com/subpath`.

When this is enabled, both content and static assets are served on the subpath, which means a different website can be served at the root path.

To use a subpath, run Volto with the `RAZZLE_PREFIX_PATH` environment variable set:

```shell
RAZZLE_PREFIX_PATH=/subpath make start
```

If you are building bundles to run in production mode, the environment variable must be set at both build and run time:

```shell
RAZZLE_PREFIX_PATH=/subpath make build && pnpm prod:start
```

Now you can access http://localhost:3000/subpath in your browser.
