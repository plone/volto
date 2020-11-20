/**
 * An adaptation of MIT licensed for Razzle ^3.3
 * https://github.com/nimacsoft/razzle-plugin-bundle-analyzer
 */

const defaultOptions = {
  concatenateModules: false,
  analyzerHost: '0.0.0.0',
  analyzerMode: 'static',
  generateStatsFile: true,
  statsFilename: 'stats.json',
  reportFilename: 'reports.html',
  openAnalyzer: false,
};

function modifyWebpackConfig({
  env: { target, dev },
  webpackConfig: config,
  webpackObject,
  options: { pluginOptions, razzleOptions, webpackOptions },
}) {
  const options = Object.assign({}, defaultOptions, pluginOptions);

  if (process.env.BUNDLE_ANALYZE === 'true' && target === 'web') {
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
