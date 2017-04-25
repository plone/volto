/**
 * History actions.
 * @module actions/history/history
 */

import { GET_HISTORY } from '../../constants/ActionTypes';

/**
 * Get history function.
 * @function getHistory
 * @param {string} url Content url.
 * @returns {Object} Get sharing action.
 */
export default function getHistory(url) {
  return {
    type: GET_HISTORY,
    promise: api => api.get(`${url}/@history`),
  };
}
