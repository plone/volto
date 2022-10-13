/**
 * An adaptation of MIT licensed for Razzle ^3.3
 * https://github.com/nimacsoft/razzle-plugin-bundle-analyzer
 */

const offline = process.env.OFFLINE_BUNDLE_ANALYZE === 'true' ? true : false;

const defaultOptions = {
  concatenateModules: false,
  analyzerHost: '0.0.0.0',
  analyzerMode: offline ? 'static' : 'server',
  generateStatsFile: true,
  statsFilename: 'stats.json',
  reportFilename: 'reports.html',
  openAnalyzer: offline ? false : true,
};

function modifyWebpackConfig({
  env: { target, dev },
  webpackConfig: config,
  webpackObject,
  options: { pluginOptions, razzleOptions, webpackOptions },
}) {
  const options = Object.assign({}, defaultOptions, pluginOptions);

  if ((process.env.BUNDLE_ANALYZE === 'true' || offline) && target === 'web') {
    const { concatenateModules, ...bundleAnalyzerOptions } = options;

    config.optimization.concatenateModules = concatenateModules;
    config.plugins.push(
      new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)(
        bundleAnalyzerOptions,
      ),
    );
  }

  return config;
}

module.exports = { modifyWebpackConfig };
