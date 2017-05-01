/**
 * Diff actions.
 * @module actions/diff/diff
 */

import { GET_DIFF } from '../../constants/ActionTypes';

/**
 * Get diff.
 * @function getDiff
 * @param {string} url Content url.
 * @param {string} one First version id
 * @param {string} two Second version id
 * @returns {Object} Get diff action.
 */
export default function getDiff(url, one, two) {
  return {
    type: GET_DIFF,
    promise: api =>
      Promise.all([
        api.get(`${url}/@history/${one}`),
        api.get(`${url}/@history/${two}`),
      ]),
  };
}
