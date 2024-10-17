---
myst:
  html_meta:
    "description": "Extend Webpack setup from an add-on with `razzle.extend.js`"
    "property=og:description": "Extend Webpack setup from an add-on with `razzle.extend.js`"
    "property=og:title": "Extend Webpack setup from an add-on with `razzle.extend.js`"
    "keywords": "Volto, Plone, Webpack, Volto add-on"
---

# Extend Webpack setup from an add-on with `razzle.extend.js`

Just like you can extend Razzle's configuration from the project, you can do so
with an addon, as well. You should provide a `razzle.extend.js` file in your
addon root folder. Here's an example of such file, where we achieve two things:

- we add a new webpack plugin, the
  [bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)
- we reconfigure the `theme.config` alias, to enable a custom Semantic theme inside the addon:

```js
const analyzerPlugin = {
  name: 'bundle-analyzer',
  options: {
    analyzerHost: '0.0.0.0',
    analyzerMode: 'static',
    generateStatsFile: true,
    statsFilename: 'stats.json',
    reportFilename: 'reports.html',
    openAnalyzer: false,
  },
};

const plugins = (defaultPlugins) => {
  return defaultPlugins.concat([analyzerPlugin]);
};
const modify = (config, { target, dev }, webpack) => {
  const themeConfigPath = `${__dirname}/theme/theme.config`;
  config.resolve.alias['../../theme.config$'] = themeConfigPath;

  return config;
};

module.exports = {
  plugins,
  modify,
};
```

Check
[volto-searchlib razzle.extend.js](https://github.com/eea/volto-searchlib/blob/d84fec8eec1def0088d8025eaf5d7197074b95a7/razzle.extend.js) file for an example on how to include additional paths to the Babel configuration and how to add additional webpack name aliases.
