/**
 * User helper.
 * @module helpers/AuthToken
 */
import { intersection } from 'lodash';

/**
 * Checks if the user has one or more given roles.
 * @method userHasRoles
 * @returns {boolean}
 */
export function userHasRoles(user, roles = []) {
  return intersection(user?.roles ?? [], roles).length > 0;
}

/**
 * Checks if the user is Manager.
 * @method isManager
 * @returns {boolean}
 */
export function isManager(user) {
  return userHasRoles(user, ['Manager']);
}

/**
 * Checks if the user can assign group.
 * @method canAssignGroup
 * @returns {boolean}
 */
export function canAssignGroup(isManager, group) {
  if (isManager) return true;
  return !group.roles.includes('Manager');
}

/**
 * Checks if the user can assign role.
 * @method canDeleteGroup
 * @returns {boolean}
 */
export function canAssignRole(isManager, role) {
  if (isManager) return true;
  return role.id !== 'Manager';
}
