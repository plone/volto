# IE11 compatibility

There are some caveats if we still want to target IE11 as supported browser.

## Version pinning

These package versions should be pinned to this especific versions, unless
their code or dependencies have some es6 only compatible, because their
maintainers mainly target the node world.

* "query-string": "4.1.0"
* "superagent": "3.8.2"

## Polyfills

Then in the project that should target it, these changes are required:

add as a dependency `babel-polyfill` (as we are still in Babel 6).

  yarn add babel-polyfill

and in `src/client.jsx`:

```
import 'babel-polyfill';
```

## babel-env

Razzle supports babel-env, that supports including `browserlist` in
`package.json`. So you can add this to `package.json`:

```
  "browserslist": [
    "last 2 version",
    "IE 11"
  ],
```

This supports the query specific DSL for `browserlist` targeting the browsers
that you need to add.
