import { GET_NAVROOT } from '@plone/volto/constants/ActionTypes';

/**
 * Set sidebar tab function.
 * @function getSite
 * @returns {Object} Get the Navroot information
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
