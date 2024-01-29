/**
 * User helper.
 * @module helpers/AuthToken
 */
import intersection from 'lodash/intersection';

/**
 * Checks if the user has one or more given roles.
 * @method userHasRoles
 * @returns {boolean}
 */
export function userHasRoles(user, roles = []) {
  return intersection(user?.roles ?? [], roles).length > 0;
}
