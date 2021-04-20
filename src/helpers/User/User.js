/**
 * User helper.
 * @module helpers/AuthToken
 */

/**
 * Is admin user method.
 * @method isAdminUser
 * @returns {undefined}
 */
export function isAdminUser(user) {
  return user?.roles
    ? user.roles.includes('Site Administrator') ||
        user.roles.includes('Manager')
    : false;
}
