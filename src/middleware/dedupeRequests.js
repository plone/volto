/**
 * Handlers to avoid having duplicated requests to the backend
 * See issue here https://github.com/plone/volto/issues/2781
 */

let requests = {};

/**
 * Checks if the given request is already running and pending
 * @param {string} request A serialized version of the request to use as key
 * @returns the pending promise or null in case there's none
 */
export function getPendingPromise(request) {
  return requests[request] ?? null;
}

/**
 * Tracks the given promise as pending
 * @param {string} request A serialized version of the request to use as key
 * @param {Promise} promise The promise to keep track of
 */
export function setPendingPromise(request, promise) {
  requests[request] = promise;
}

/**
 * Stop tracking the given request. To be used when the request is not pending anymore.
 * @param {string} request A serialized version of the request to use as key
 */
export function deletePendingPromise(request) {
  delete requests[request];
}

/**
 * Resets the tracking of pending promises.
 * To be used mainly for testing purposes
 */
export function resetPendingPromises() {
  requests = {};
}
