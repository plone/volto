import { serverConfiguration } from 'universal-webpack';
import webpack from 'webpack';
import settings from './universal-webpack-settings';
import configuration from './webpack.config.prod';

configuration.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
      BABEL_ENV: JSON.stringify('production/server'),
      HOST: process.env.HOST && process.env.HOST,
      PORT: process.env.PORT,
      API_PATH: process.env.API_PATH && JSON.stringify(process.env.API_PATH),
      WEBSOCKETS: process.env.WEBSOCKETS,
      // SENTRY_DSN - Enable Sentry error reporting
      // You need the full Sentry DSN (private) configured here for Node Raven to work
      // Uncomment the next lines and replace the value with the private DSN for your Sentry project
      // SENTRY_DSN: JSON.stringify(
      //   '<your_private_SentryDSN>',
      // ),
    },
    __CLIENT__: false,
    __SERVER__: true,
    __DEVELOPMENT__: false,
    __DEVTOOLS__: false,
    __SSR__: true,
    __DEBUG__: false,
  }),
);

export default serverConfiguration(configuration, settings);
