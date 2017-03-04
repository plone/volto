/**
 * AuthToken helper.
 * @module helpers/AuthToken
 */

/**
 * Get auth token method.
 * @method getAuthToken
 * @returns {undefined}
 */
export function getAuthToken() {
  return localStorage.getItem('auth_token');
}

/**
 * Persist auth token method.
 * @method persistAuthToken
 * @param {object} store Redux store.
 * @returns {undefined}
 */
export function persistAuthToken(store) {
  let currentValue = getAuthToken();

  /**
   * handleChange method.
   * @method handleChange
   * @returns {undefined}
   */
  function handleChange() {
    const previousValue = currentValue;
    const state = store.getState();
    currentValue = state.userSession.token;

    if (previousValue !== currentValue) {
      if (currentValue === null) {
        localStorage.removeItem('auth_token');
      } else {
        localStorage.setItem('auth_token', currentValue);
      }
    }
  }

  store.subscribe(handleChange);
  handleChange();
}
