/**
 * Actions actions.
 * @module actions/actions/actions
 */

import { LIST_ACTIONS } from '@plone/volto/constants/ActionTypes';

/**
 * List actions.
 * @function listActions
 * @param {string} url Content url.
 * @returns {Object} List actions action.
 */
export function listActions(url) {
  return {
    type: LIST_ACTIONS,
    request: {
      op: 'get',
      path: `${url}/@actions`,
    },
  };
}
