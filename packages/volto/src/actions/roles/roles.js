/**
 * Roles actions.
 * @module actions/roles/roles
 */

import { LIST_ROLES } from '@plone/volto/constants/ActionTypes';

/**
 * List roles.
 * @function listRoles
 * @returns {Object} List roles action.
 */
export function listRoles() {
  return {
    type: LIST_ROLES,
    request: {
      op: 'get',
      path: '/@roles',
    },
  };
}
