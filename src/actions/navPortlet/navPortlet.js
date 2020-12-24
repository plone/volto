/**
 * Navigation actions.
 * @module actions/navportlet/navportlet
 */

import { GET_NAVPORTLET } from '@plone/volto/constants/ActionTypes';

/**
 * Get navigation portlet
 * @function getNavPortlet
 * @param {string} url Content url.
 * @param {params} params Options for the navigation portlet
 * @returns {Object} Get navigation portlet.
 */
export function getNavPortlet(url, params = {}) {
  let qs = Object.keys(params)
    .sort()
    .map((key) => `expand.navportlet.${key}=${params[key]}`)
    .join('&');
  const path = `${url}/@navportlet${qs ? `?${qs}` : ''}`;

  return {
    type: GET_NAVPORTLET,
    url: path, // api middleware strips request
    request: {
      op: 'get',
      path,
    },
  };
}
