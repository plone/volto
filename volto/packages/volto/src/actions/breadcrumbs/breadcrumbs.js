/**
 * Breadcrumbs actions.
 * @module actions/breadcrumbs/breadcrumbs
 */

import { GET_BREADCRUMBS } from '@plone/volto/constants/ActionTypes';

/**
 * Get breadcrumbs.
 * @function getBreadcrumbs
 * @param {string} url Content url.
 * @returns {Object} Get breadcrumbs action.
 */
export function getBreadcrumbs(url) {
  return {
    type: GET_BREADCRUMBS,
    request: {
      op: 'get',
      path: `${url}/@breadcrumbs`,
    },
  };
}
