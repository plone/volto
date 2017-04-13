/**
 * Api middleware.
 * @module middleware/api
 */

/**
 * Api middleware.
 * @function
 * @param {Object} api Api object.
 * @returns {Promise} Action promise.
 */
export default api =>
  ({ dispatch, getState }) =>
    next =>
      action => {
        if (typeof action === 'function') {
          return action(dispatch, getState);
        }

        const { promise, types, ...rest } = action;

        if (!promise) {
          return next(action);
        }

        next({ ...rest, type: types[0] });

        const actionPromise = promise(api);
        actionPromise
          .then(
            result => next({ ...rest, result, type: types[1] }),
            error => next({ ...rest, error, type: types[2] }),
          )
          .catch(error => {
            next({ ...rest, error, type: types[2] });
          });

        return actionPromise;
      };
