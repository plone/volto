/**
 * History actions.
 * @module actions/history/history
 */

import {
  GET_HISTORY,
  REVERT_HISTORY,
} from '@plone/volto/constants/ActionTypes';

/**
 * Get history function.
 * @function getHistory
 * @param {string} url Content url.
 * @returns {Object} Get history action.
 */
export function getHistory(url) {
  return {
    type: GET_HISTORY,
    request: {
      op: 'get',
      path: `${url}/@history`,
    },
  };
}

/**
 * Revert history function.
 * @function revertHistory
 * @param {string} url Content url.
 * @param {number} version Revert version.
 * @returns {Object} Revet history action.
 */
export function revertHistory(url, version) {
  return {
    type: REVERT_HISTORY,
    request: {
      op: 'patch',
      path: `${url}/@history`,
      data: { version },
    },
  };
}
