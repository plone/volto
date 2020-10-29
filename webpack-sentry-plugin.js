const webpack = require('webpack');
// const SentryCliPlugin = require('@sentry/webpack-plugin');

const SENTRY_KEYS = [
  'SENTRY_AUTH_TOKEN',
  'SENTRY_URL',
  'SENTRY_ORG',
  'SENTRY_PROJECT',
  'SENTRY_RELEASE',
];

function validateSentryConfiguration(env) {
  return SENTRY_KEYS.findIndex((k) => env[k] === undefined) > -1;
}

const sentryPlugin = (config, { target, dev }) => {
  let SENTRY = undefined;

  if (process.env.SENTRY_DSN) {
    SENTRY = {
      SENTRY_DSN: process.env.SENTRY_DSN,
    };
  }

  if (!validateSentryConfiguration(process.env)) {
    return config;
  }

  if (target === 'web') {
    if (SENTRY && process.env.SENTRY_FRONTEND_CONFIG) {
      // config.plugins.push(
      //   new SentryCliPlugin({
      //     include: './build/public',
      //     ignore: ['node_modules', 'webpack.config.js'],
      //     release: process.env.SENTRY_RELEASE,
      //   }),
      // );
      try {
        SENTRY.SENTRY_CONFIG = JSON.parse(process.env.SENTRY_FRONTEND_CONFIG);
        if (process.env.SENTRY_RELEASE !== undefined) {
          SENTRY.SENTRY_CONFIG.release = process.env.SENTRY_RELEASE;
        }
      } catch (e) {
        console.log('Error parsing SENTRY_FRONTEND_CONFIG');
        throw e;
      }
    }
  }

  if (target === 'node') {
    if (SENTRY) {
      SENTRY.SENTRY_CONFIG = undefined;
      if (process.env.SENTRY_BACKEND_CONFIG) {
        try {
          SENTRY.SENTRY_CONFIG = JSON.parse(process.env.SENTRY_BACKEND_CONFIG);
          if (process.env.SENTRY_RELEASE !== undefined) {
            SENTRY.SENTRY_CONFIG.release = process.env.SENTRY_RELEASE;
          }
        } catch (e) {
          console.log('Error parsing SENTRY_BACKEND_CONFIG');
          throw e;
        }
      }
    }
  }
  config.plugins.unshift(
    new webpack.DefinePlugin({
      __SENTRY__: SENTRY ? JSON.stringify(SENTRY) : undefined,
    }),
  );

  return config;
};

module.exports = { sentryPlugin };
