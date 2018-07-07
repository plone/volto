import Raven from 'raven-js';

const crashReporter = store => next => action => {
  try {
    return next(action);
  } catch (error) {
    if (__CLIENT__ && process.env.SENTRY_DSN) {
      Raven.captureException(error, {
        extra: {
          action,
          state: store.getState(),
        },
      });
    }
    throw error;
  }
};

export default crashReporter;
