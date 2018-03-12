/**
 * Actions actions.
 * @module actions/actions/actions
 */

import { GET_ACTIONS } from '../../constants/ActionTypes';

/**
 * Get actions.
 * @function getActions
 * @param {string} url Content url.
 * @returns {Object} Get action action.
 */
export default function getActions(url) {
  return {
    type: GET_ACTIONS,
    promise: api => api.get(`${url}/@actions`),
  };
}
