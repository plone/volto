/**
 * site actions.
 * @module actions/site/site
 */

import { GET_SITE } from '@plone/volto/constants/ActionTypes';

/**
 * List actions.
 * @function getSite
 * @param {string} url Content url.
 * @returns {Object} Get site action.
 */
export function getSite(url) {
  return {
    type: GET_SITE,
    request: {
      op: 'get',
      path: `${url}/@site`,
    },
  };
}
