/**
 * Roles actions.
 * @module actions/roles/roles
 */

import { LIST_ROLES } from '../../constants/ActionTypes';

/**
 * List roles.
 * @function listRoles
 * @returns {Object} List roles action.
 */
export function listRoles() {
  return {
    type: LIST_ROLES,
    promise: api => api.get('/@roles'),
  };
}
