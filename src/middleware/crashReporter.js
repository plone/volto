const Sentry = __CLIENT__
  ? require('@sentry/browser')
  : require('@sentry/node');

const crashReporter = (store) => (next) => (action) => {
  try {
    return next(action);
  } catch (error) {
    Sentry.withScope((scope) => {
      scope.setExtras({
        action,
        state: store.getState(),
      });
      Sentry.captureException(error);
    });
    throw error;
  }
};

export default crashReporter;
