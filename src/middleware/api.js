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

  const { request, type, ...rest } = action;

  if (!request) {
    return next(action);
  }

  next({ ...rest, type: `${type}_PENDING` });

  const actionPromise = Array.isArray(request)
    ? Promise.all(
        request.map(item => api[item.op](item.path, { data: item.data })),
      )
    : api[request.op](request.path, { data: request.data });
  actionPromise.then(
    result => next({ ...rest, result, type: `${type}_SUCCESS` }),
    error => next({ ...rest, error, type: `${type}_FAIL` }),
  );

  return actionPromise;
};
