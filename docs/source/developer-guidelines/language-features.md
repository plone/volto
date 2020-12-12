# Language features and conventions

## Babel

Volto is developed using Babel to transpile modern Javascript to Javascript that
browsers are able to understand and execute.

Ecma International's TC39 (https://tc39.es/) is a group of JavaScript developers,
implementers, academics, and more, collaborating with the community to maintain and
evolve the definition of JavaScript. They stablished a process
(https://tc39.es/process-document/) where the proposals are discussed, developed, and
eventually approved (or dropped). The process has five stages (0 to 4) where reaching
the stage 4 means the proposal is accepted and it becomes part of the Javascript
specification.

Babel enables a series of features and syntax that the developer can use in code to
develop Volto on. These features are the proposals the TC39 is working on in the
different stages of evolution.

Volto uses `babel-razzle-preset` which in turns uses `@babel/preset-env` which enables
the use of all TC39 proposals currently in TC39's stage 4
(https://github.com/tc39/proposals/blob/HEAD/finished-proposals.md#finished-proposals).

### Browser compatibility

Babel preset-env uses `browserlist` which gives the ability to micromanage the
transformations needed by the current project depending of the browser support you are
currently targeting.

By doing this, enables the bundles to be smaller, as the resultant code does not need to
support old browsers (thus, transform your code to ES5 compatible code) as Babel will
apply only the required transforms that your target enviroments need. For more
information: https://babeljs.io/docs/en/babel-preset-env#browserslist-integration

Volto project generators use this browserlist by default (you can find it in your local `package.json`):

```json
  "browserslist": [
    ">1%",
    "last 4 versions",
    "Firefox ESR",
    "not ie 11",
    "not dead"
  ],
```

which you can adjust depending on the environments you are targeting in your local
`package.json` file. You can find more information about how the queries in `broserlist`
works in: https://github.com/browserslist/browserslist#queries

### Support to deprecated browsers

!!! warning
    Volto does not support deprecated browsers from its vendor (eg. IE11).

If you still need to support deprecated browsers, you should use `browserslist` in your
project to enable the required transforms for the target deprecated environments you
have to support.

However, Volto (or its dependencies) might not be compatible with old browsers anyways,
and you might need to provide some other workarounds to make the build work (and the
deprecated browser not crash). You can refer to [this (outdated)
document](../ie11compat.md) in order to get some hints on how to do it.
