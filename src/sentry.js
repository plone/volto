const reserved_option_names = ['tags', 'extras'];

const initSentry = (Sentry) => {
  if (__SENTRY__) {
    let sentry_options = { dsn: __SENTRY__.SENTRY_DSN };
    if (__SENTRY__.SENTRY_CONFIG !== undefined) {
      const options = Object.keys(__SENTRY__.SENTRY_CONFIG);
      options.forEach((field) => {
        if (!reserved_option_names.includes(field)) {
          sentry_options[field] = __SENTRY__.SENTRY_CONFIG[field];
        }
      });
    }
    Sentry.init(sentry_options);

    if (__SENTRY__.SENTRY_CONFIG !== undefined) {
      if (__SENTRY__.SENTRY_CONFIG.tags !== undefined) {
        Sentry.setTags(__SENTRY__.SENTRY_CONFIG.tags);
      }
      if (__SENTRY__.SENTRY_CONFIG.extras !== undefined) {
        Sentry.setExtras(__SENTRY__.SENTRY_CONFIG.extras);
      }
    }
  }
};

export default initSentry;
