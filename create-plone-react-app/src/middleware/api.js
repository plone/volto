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
export default api => ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  const { promise, type, ...rest } = action;

  if (!promise) {
    return next(action);
  }

  next({ ...rest, type: `${type}_PENDING` });

  const actionPromise = promise(api);
  actionPromise.then(
    result => next({ ...rest, result, type: `${type}_SUCCESS` }),
    error => next({ ...rest, error, type: `${type}_FAIL` }),
  );
  /*
    .catch(error => {
      next({ ...rest, error, type: `${type}_ERROR` });
    });
    */

  return actionPromise;
};
