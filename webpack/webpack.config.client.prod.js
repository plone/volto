import { clientConfiguration } from 'universal-webpack';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
import webpack from 'webpack';
import settings from './universal-webpack-settings';
import configuration from './webpack.config.prod';

configuration.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
      BABEL_ENV: JSON.stringify('production/client'),
      HOST: process.env.HOST && process.env.HOST,
      PORT: process.env.PORT,
      API_PATH: process.env.API_PATH && JSON.stringify(process.env.API_PATH),
      WEBSOCKETS: process.env.WEBSOCKETS,
      // SENTRY_DSN - Enable Sentry error reporting
      // You need to pass the (public) Sentry DSN for JS Raven to work
      // Uncomment the next lines and replace the value with the DSN for your Sentry project
      // SENTRY_DSN: JSON.stringify(
      //   '<your_public_SentryDSN>',
      // ),
    },
    __CLIENT__: true,
    __SERVER__: false,
    __DEVELOPMENT__: false,
    __DEVTOOLS__: false,
    __SSR__: true,
    __DEBUG__: false,
  }),
  new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: 'report.html',
    generateStatsFile: true,
    openAnalyzer: false,
  }),
);

const options = {
  development: false,
  useMiniCssExtractPlugin: true,
};

export default clientConfiguration(configuration, settings, options);
