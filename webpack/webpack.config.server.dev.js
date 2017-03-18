import { serverConfiguration } from 'universal-webpack';
import webpack from 'webpack';
import settings from './universal-webpack-settings';
import configuration from './webpack.config.dev';

configuration.plugins.push(
    new webpack.DefinePlugin
    ({
      'process.env':
      {
        NODE_ENV: JSON.stringify('development'),
        BABEL_ENV: JSON.stringify('development/server')
      },
      __CLIENT__: false,
      __SERVER__: true,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true,
      __SSR__: true,
      __DEBUG__: true,
    })
);

export default serverConfiguration(configuration, settings);
