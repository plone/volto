import { GET_SITE } from '@plone/volto/constants/ActionTypes';

/**
 * Set sidebar tab function.
 * @function getSite
 * @returns {Object} Get the Site information
 */
export function getSite() {
  return {
    type: GET_SITE,
    request: {
      op: 'get',
      path: '/@site',
    },
  };
}
