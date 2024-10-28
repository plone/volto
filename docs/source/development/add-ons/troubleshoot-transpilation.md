---
myst:
  html_meta:
    "description": "Problems with untranspiled add-on dependencies"
    "property=og:description": "Problems with untranspiled add-on dependencies"
    "property=og:title": "Problems with untranspiled add-on dependencies"
    "keywords": "Volto, add-on, extensions, frontend, Plone, configuration"
---

# Problems with untranspiled add-on dependencies

```{note}
From Volto 18, the Babel support for ES specifications like the null coalescence operator has improved.
However, this procedure can be useful in other scenarios.
We are keeping it as reference.
```

When using external add-ons in your project, sometimes you will run into add-ons
that are not securely transpiled or haven't been transpiled at all. In that case
you might see an error like the following:

```console
Module parse failed: Unexpected token (10:41) in @react-leaflet/core/esm/path.js
...
const options = props.pathOptions ?? {};
...
```

Babel automatically transpiles the code in your add-on, but `node_modules` are
excluded from this process, so we need to include the add-on path in the list of
modules to be transpiled. This can be accomplished by customizing the webpack
configuration in the `razzle.config.js` file in your add-on. For example,
suppose that we want to use react-leaflet, which has a known transpilation
issue:

```js
const path = require('path');
const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder');

const babelLoaderFinder = makeLoaderFinder('babel-loader');

const jsConfig = require('./jsconfig').compilerOptions;

const pathsConfig = jsConfig.paths;
let voltoPath = './node_modules/@plone/volto';
Object.keys(pathsConfig).forEach((pkg) => {
  if (pkg === '@plone/volto') {
    voltoPath = `./${jsConfig.baseUrl}/${pathsConfig[pkg][0]}`;
  }
});

const { modifyWebpackConfig, plugins } = require(`${voltoPath}/razzle.config`);

const customModifyWebpackConfig = ({ env, webpackConfig, webpackObject, options }) => {
  const config = modifyWebpackConfig({
    env,
    webpackConfig,
    webpackObject,
    options,
  });
  const babelLoader = config.module.rules.find(babelLoaderFinder);
  const { include } = babelLoader;
  const corePath = path.join(
    path.dirname(require.resolve('@react-leaflet/core')),
    '..',
  );
  const esmPath = path.join(
    path.dirname(require.resolve('react-leaflet')),
    '..',
  );

  include.push(corePath);
  include.push(esmPath);
  return config;
};

module.exports = { modifyWebpackConfig: customModifyWebpackConfig, plugins };
```

First we need some setup to get the webpack configuration from Volto's configuration.
Once we have that, we need to resolve the path to the desired add-ons and push it
into the Babel loader include list. After this, the add-ons will load correctly.
