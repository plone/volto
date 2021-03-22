/**
 * User helper.
 * @module helpers/AuthToken
 */

/**
 * Is controlpanel enabled method.
 * @method isControlpanelEnabled
 * @returns {undefined}
 */
export function isControlpanelEnabled(user) {
  return user?.roles
    ? user.roles.includes('Site Administrator') ||
        user.roles.includes('Manager')
    : false;
}
