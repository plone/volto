---
myst:
  html_meta:
    "description": "Legacy browser support with polyfills, babel-env, and pre- and post-transpiling"
    "property=og:description": "Legacy browser support with polyfills, babel-env, and pre- and post-transpiling"
    "property=og:title": "Legacy Browser Support (IE11 compatibility)"
    "keywords": "Volto, Plone, frontend, React, IE11 compatability, polyfills, legacy browser support"
---

# Legacy Browser Support (IE11 compatibility)

There are some caveats if we still want to target IE11 as supported browser.

```{important}
This documentation is orientative. Volto does NOT support legacy or vendor deprecated browsers (as in IE11).
```

## Version pinning

These package versions should be pinned to this especific versions, unless
their code or dependencies have some es6 only compatible, because their
maintainers mainly target the node world.

* "query-string": "4.1.0"
* "superagent": "3.8.2"

## Polyfills

Then in the project that should target it, these changes are required:

add as a dependency `@babel/polyfill`.

    yarn add @babel/polyfill

and in `src/client.jsx`:

```js
import '@babel/polyfill';
```

```{seealso}
See https://babeljs.io/docs/babel-polyfill for more updated information
```

## babel-env

Razzle supports `@babel/preset-env`, that supports including `browserlist` in
`package.json`. So you can add this to `package.json`:

```json
  "browserslist": [
    "last 2 version",
    "IE 11"
  ],
```

This supports the query specific DSL for `browserlist` targeting the browsers
that you need to add.

## Pre-transpiling

Some packages in `node_modules` are ES6 only, for some older browsers, you might want to add a pre (or post) transpiling. There's a script `pre-build-transpiling.js` (Volto root folder) that might help you with it. Also this command line might help:

    ./node_modules/.bin/babel --presets="@babel/env" XXX --out-dir XXX
