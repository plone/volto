/**
 * Checks if the user has one or more given roles.
 * @method userHasRoles
 * @returns {boolean}
 */
export function userHasRoles(user: any, roles?: any[]): boolean;
/**
 * Checks if the user is Manager.
 * @method isManager
 * @returns {boolean}
 */
export function isManager(user: any): boolean;
/**
 * Checks if the user can assign group.
 * @method canAssignGroup
 * @returns {boolean}
 */
export function canAssignGroup(isManager: any, group: any): boolean;
/**
 * Checks if the user can assign role.
 * @method canDeleteGroup
 * @returns {boolean}
 */
export function canAssignRole(isManager: any, role: any): boolean;
