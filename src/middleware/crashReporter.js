import * as Sentry from '@sentry/browser';

const crashReporter = (store) => (next) => (action) => {
  try {
    return next(action);
  } catch (error) {
    if (__CLIENT__) {
      Sentry.withScope((scope) => {
        scope.setExtras({
          action,
          state: store.getState(),
        });
        Sentry.captureException(error);
      });
    }
  }
};

export default crashReporter;
