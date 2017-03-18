import { clientConfiguration } from 'universal-webpack';
import webpack from 'webpack';
import settings from './universal-webpack-settings';
import configuration from './webpack.config.prod';

configuration.plugins.push(
    new webpack.DefinePlugin
    ({
      'process.env':
      {
        NODE_ENV: JSON.stringify('production'),
        BABEL_ENV: JSON.stringify('production/client'),
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      __SSR__: true,
      __DEBUG__: false,
    })
);

export default clientConfiguration(configuration, settings);
