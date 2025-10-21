---
myst:
  html_meta:
    "description": "Serve Volto on a subpath"
    "property=og:description": "Serve Volto on a subpath"
    "property=og:title": "Serve Volto on a subpath"
    "keywords": "Volto, Plone, path, prefix, virtual hosting"
---

# Serve Volto on a subpath

A Volto site can be served on a subpath, for example, `https://mysite.com/subpath`.

When this is enabled, both content and static assets are served on the subpath, which means a different website can be served at the root path.

To use a subpath, run Volto with the `RAZZLE_SUBPATH_PREFIX` environment variable set to the subpath.

```shell
RAZZLE_SUBPATH_PREFIX=/subpath make start
```

If you build bundles to run in production mode, you must set the environment variable at both build and run times as shown.

```shell
RAZZLE_SUBPATH_PREFIX=/subpath make build && pnpm prod:start
```

In the above example, you would access the site at `http://localhost:3000/subpath` in your browser.
