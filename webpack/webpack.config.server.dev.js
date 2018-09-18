import { serverConfiguration } from 'universal-webpack';
import webpack from 'webpack';
import settings from './universal-webpack-settings';
import configuration from './webpack.config.dev';

configuration.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
      BABEL_ENV: JSON.stringify('development/server'),
      HOST: process.env.HOST && process.env.HOST,
      PORT: process.env.PORT,
      API: process.env.API && JSON.stringify(process.env.API),
      API_PATH: process.env.API_PATH && JSON.stringify(process.env.API_PATH),
    },
    __CLIENT__: false,
    __SERVER__: true,
    __DEVELOPMENT__: true,
    __DEVTOOLS__: true,
    __SSR__: true,
    __DEBUG__: true,
  }),
);

export default serverConfiguration(configuration, settings);
