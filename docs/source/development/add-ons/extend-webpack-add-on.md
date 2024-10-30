---
myst:
  html_meta:
    "description": "Extend webpack setup from an add-on with razzle.extend.js"
    "property=og:description": "Extend webpack setup from an add-on with razzle.extend.js"
    "property=og:title": "Extend webpack setup from an add-on"
    "keywords": "Volto, Plone, webpack, add-on, razzle.extend.js, Razzle"
---

# Extend webpack setup from an add-on

Just like you can extend Razzle's configuration from the project, you can do the same with an add-on.
You should provide a {file}`razzle.extend.js` file in your add-on root folder.
The following code example manages two things.

-   Add a new webpack plugin, [`webpack-bundle-analyzer`](https://www.npmjs.com/package/webpack-bundle-analyzer).
-   Reconfigure the `theme.config` alias, to enable a custom Semantic UI theme inside the add-on.

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

```{seealso}
[`volto-searchlib`'s {file}`razzle.extend.js`](https://github.com/eea/volto-searchlib/blob/d84fec8eec1def0088d8025eaf5d7197074b95a7/razzle.extend.js) file for an example of how to include additional paths for the Babel configuration, and how to add additional webpack name aliases.
```
