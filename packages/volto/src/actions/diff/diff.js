/**
 * Diff actions.
 * @module actions/diff/diff
 */

import { GET_DIFF } from '@plone/volto/constants/ActionTypes';

/**
 * Get diff.
 * @function getDiff
 * @param {string} url Content url.
 * @param {string} one First version id
 * @param {string} two Second version id
 * @returns {Object} Get diff action.
 */
export function getDiff(url, one, two) {
  return {
    type: GET_DIFF,
    request: [
      {
        op: 'get',
        path: `${url}/@history/${one}`,
      },
      {
        op: 'get',
        path: `${url}/@history/${two}`,
      },
    ],
  };
}
