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
};

export default clientConfiguration(configuration, settings, options);
