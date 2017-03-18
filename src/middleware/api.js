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
export default api => ({ dispatch, getState }) => next => (action) => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  const { promise, types, ...rest } = action;

  if (!promise) {
    return next(action);
  }

  const [REQUEST] = types;
  next({ ...rest, type: REQUEST });

  const actionPromise = promise(api);
  actionPromise.then(
    result => next({ ...rest, result, type: `${REQUEST}_SUCCESS` }),
    error => next({ ...rest, error, type: `${REQUEST}_ERROR` }),
  ).catch((error) => {
    next({ ...rest, error, type: `${REQUEST}_ERROR` });
  });

  return actionPromise;
};
