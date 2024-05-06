import { GET_NAVROOT } from '@plone/volto/constants/ActionTypes';

/**
 * Get the navigation root information.
 * @function getNavroot
 * @returns {import('redux').AnyAction} navroot
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
