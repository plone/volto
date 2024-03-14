/**
 * Get auth token method (does not work in SSR)
 * @method getAuthToken
 * @returns {undefined}
 */
export function getAuthToken(): undefined;
/**
 * Persist auth token method.
 * @method persistAuthToken
 * @param {object} store Redux store.
 * @returns {undefined}
 */
export function persistAuthToken(store: object, req: any): undefined;
