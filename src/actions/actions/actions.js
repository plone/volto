/**
 * Actions actions.
 * @module actions/actions/actions
 */

import { LIST_ACTIONS } from '@plone/volto/constants/ActionTypes';
import { getBaseUrl, hasApiExpander } from '@plone/volto/helpers';

/**
 * List actions.
 * @function listActions
 * @param {string} url Content url.
 * @returns {Object} List actions action.
 */
export function listActions(url) {
  return (dispatch, getState) => {
    if (!hasApiExpander('actions', getBaseUrl(url))) {
      dispatch({
        type: LIST_ACTIONS,
        request: {
          op: 'get',
          path: `${url}/@actions`,
        },
      });
    }
  };
}
