/**
 * Breadcrumbs actions.
 * @module actions/breadcrumbs/breadcrumbs
 */

import {
  GET_BREADCRUMBS_PENDING,
  GET_BREADCRUMBS_SUCCESS,
  GET_BREADCRUMBS_FAIL,
} from '../../constants/ActionTypes';

/**
 * Get breadcrumbs.
 * @function getBreadcrumbs
 * @param {string} url Content url.
 * @returns {Object} Get breadcrumbs action.
 */
export default function getBreadcrumbs(url) {
  return {
    types: [
      GET_BREADCRUMBS_PENDING,
      GET_BREADCRUMBS_SUCCESS,
      GET_BREADCRUMBS_FAIL,
    ],
    promise: api => api.get(`${url}/@components/breadcrumbs`),
  };
}
