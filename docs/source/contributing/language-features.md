---
myst:
  html_meta:
    "description": "Volto uses several tools and follows conventions that provide features and browser support for the JavaScript language."
    "property=og:description": "Volto uses several tools and follows conventions that provide features and browser support for the JavaScript language."
    "property=og:title": "JavaScript language features and browser support"
    "keywords": "Volto, Plone, frontend, React, Babel, JavaScript, transpilation"
---
% Mixture of conceptual guide and how-to guide
# JavaScript language features and browser support

Volto uses several tools and follows conventions that provide features and browser support for the JavaScript language.


% Conceptual guide
## Babel

Babel transpiles {term}`ECMAScript` code, including React and JSX, into a backwards compatible version of JavaScript in current and older browsers or environments.

Babel provides features and syntax that you can use in code when you develop on Volto.
These features derive from the proposals that the {term}`TC39` produces.

Volto uses `babel-razzle-preset`, which in turns uses `@babel/preset-env`, which together enable the use of all [TC39 finished proposals](https://github.com/tc39/proposals/blob/HEAD/finished-proposals.md#finished-proposals).


% How-to guide
## Browser compatibility

`@babel/preset-env` uses `browserslist`, which you can use to manage the transformations needed to target specific browser support in your project.
This reduces the size of bundles, as Babel will apply only the required transforms that your target environment needs.

```{seealso}
https://babeljs.io/docs/babel-preset-env#browserslist-integration
```

Volto project generators use `browserslist` queries by default, which is in your local {file}`package.json`.
You can adjust this file according to the environments you want to target.

```json
"browserslist": [
  ">1%",
  "last 4 versions",
  "Firefox ESR",
  "not dead"
],
```

```{seealso}
For usage and syntax, see the `browserslist` documentation of [Queries](https://github.com/browserslist/browserslist#queries).
```


% How-to guide
## Support of deprecated browsers

```{warning}
Volto does not support deprecated browsers, such as Internet Explorer 11.
```

If you still need to support deprecated browsers, you should use `browserslist` in your project to enable the required transforms for the target deprecated environments you must support.

However, Volto or its dependencies might not be compatible with old browsers.
You might need to create some workarounds to make the build work, and the deprecated browser not crash.
