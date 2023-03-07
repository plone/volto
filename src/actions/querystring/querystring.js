/**
 * Querystring actions.
 * @module actions/querystring/querystring
 */

import { GET_QUERYSTRING } from '@plone/volto/constants/ActionTypes';

/**
 * Get querystring.
 * @function getQuerystring
 * @returns {Object} Get querystring action.
 */

// Below functin is performing and action of GET_QUERYSTRING when get reuqest is done
export function getQuerystring() {
  return {
    type: GET_QUERYSTRING,
    request: {
      op: 'get',
      path: '/@querystring',
    },
  };
}
