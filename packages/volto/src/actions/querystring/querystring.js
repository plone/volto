/**
 * Querystring actions.
 * @module actions/querystring/querystring
 */

import { GET_QUERYSTRING } from '@plone/volto/constants/ActionTypes';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';

/**
 * Get querystring.
 * @function getQuerystring
 * @returns {Object} Get querystring action.
 */
export function getQuerystring() {
  return (dispatch, getState) => {
    const state = getState();
    const path = flattenToAppURL(state.content?.data?.['@id'] || '');
    dispatch({
      type: GET_QUERYSTRING,
      request: {
        op: 'get',
        path: `${path}/@querystring`,
      },
    });
  };
}
