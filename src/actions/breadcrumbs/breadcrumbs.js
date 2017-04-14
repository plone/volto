/**
 * Breadcrumbs actions.
 * @module actions/breadcrumbs/breadcrumbs
 */

import { GET_BREADCRUMBS } from '../../constants/ActionTypes';

/**
 * Get breadcrumbs.
 * @function getBreadcrumbs
 * @param {string} url Content url.
 * @returns {Object} Get breadcrumbs action.
 */
export default function getBreadcrumbs(url) {
  return {
    type: GET_BREADCRUMBS,
    promise: api => api.get(`${url}/@components/breadcrumbs`),
  };
}
