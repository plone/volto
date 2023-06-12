/**
 * navroot actions.
 * @module actions/site/site
 */

import { GET_NAVROOT } from '@plone/volto/constants/ActionTypes';

/**
 * Navroot actions.
 * @function getNavroot
 * @param {string} url Content url.
 * @returns {Object} Get site action.
 */
export function getNavroot(url) {
  return {
    type: GET_NAVROOT,
    request: {
      op: 'get',
      path: `${url}/@navroot`,
    },
  };
}
