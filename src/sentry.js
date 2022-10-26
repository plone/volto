import config from '@plone/volto/registry';

const reserved_option_names = ['tags', 'extras'];

const initSentry = (libraries) => {
  const { Sentry } = libraries;
  const { settings } = config;
  let sentry_config = __SENTRY__;

  if (__SENTRY__) {
    if (!sentry_config) {
      sentry_config = {};
    }
    sentry_config.SENTRY_DSN = __SENTRY__.SENTRY_DSN;
    sentry_config.SENTRY_CONFIG = __SENTRY__.SENTRY_CONFIG;
  }

  if (__SERVER__) {
    if (process.env.RAZZLE_SENTRY_DSN) {
      if (!sentry_config) {
        sentry_config = {};
      }
      sentry_config.SENTRY_DSN = process.env.RAZZLE_SENTRY_DSN;
    }
    if (sentry_config) {
      if (process.env.RAZZLE_SENTRY_BACKEND_CONFIG) {
        sentry_config.SENTRY_CONFIG = JSON.parse(
          process.env.RAZZLE_SENTRY_BACKEND_CONFIG,
        );
      }
      if (process.env.RAZZLE_SENTRY_RELEASE) {
        if (!sentry_config.SENTRY_CONFIG) {
          sentry_config.SENTRY_CONFIG = {};
        }
        sentry_config.SENTRY_CONFIG.release = process.env.RAZZLE_SENTRY_RELEASE;
      }
    }
  }

  if (__CLIENT__) {
    if (window?.env?.RAZZLE_SENTRY_DSN) {
      if (!sentry_config) {
        sentry_config = {};
      }
      sentry_config.SENTRY_DSN = window.env.RAZZLE_SENTRY_DSN;
    }
    if (sentry_config) {
      if (window?.env?.RAZZLE_SENTRY_FRONTEND_CONFIG) {
        sentry_config.SENTRY_CONFIG = JSON.parse(
          window.env.RAZZLE_SENTRY_FRONTEND_CONFIG,
        );
      }
      if (window?.env?.RAZZLE_SENTRY_RELEASE) {
        if (!sentry_config.SENTRY_CONFIG) {
          sentry_config.SENTRY_CONFIG = {};
        }
        sentry_config.SENTRY_CONFIG.release = window.env.RAZZLE_SENTRY_RELEASE;
      }
    }
  }

  const sentryOptions = settings.sentryOptions
    ? settings.sentryOptions(libraries)
    : {};

  if (sentry_config || sentryOptions.dsn) {
    let sentry_options = {
      ...sentryOptions,
    };
    if (sentry_config?.SENTRY_DSN) {
      sentry_options.dsn = sentry_config.SENTRY_DSN;
    }
    if (sentry_config?.SENTRY_CONFIG !== undefined) {
      const options = Object.keys(sentry_config.SENTRY_CONFIG);
      options.forEach((field) => {
        if (!reserved_option_names.includes(field)) {
          sentry_options[field] = sentry_config.SENTRY_CONFIG[field];
        }
      });
    }
    Sentry.init(sentry_options);
    if (sentry_options?.tags) {
      Sentry.setTags(sentry_options.tags);
    }
    if (sentry_options?.extras) {
      Sentry.setExtras(sentry_options.extras);
    }

    if (sentry_config?.SENTRY_CONFIG !== undefined) {
      if (sentry_config?.SENTRY_CONFIG?.tags !== undefined) {
        Sentry.setTags(sentry_config.SENTRY_CONFIG.tags);
      }
      if (sentry_config?.SENTRY_CONFIG?.extras !== undefined) {
        Sentry.setExtras(sentry_config.SENTRY_CONFIG.extras);
      }
    }
  }
};

export default initSentry;
