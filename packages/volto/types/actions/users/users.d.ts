/**
 * Create user function.
 * @function createUser
 * @param {Object|Array} content User data.
 * @returns {Object} Create user action.
 */
export function createUser(content: any | any[], sendPasswordReset?: any): any;
/**
 * Delete user function.
 * @function deleteUser
 * @param {string} id User id
 * @returns {Object} Delete user action.
 */
export function deleteUser(id: string): any;
/**
 * Get user function
 * @function getUser
 * @param {string} id User id
 * @returns {Object} Get user action
 */
export function getUser(id: string): any;
/**
 * List users function
 * 'query' and 'search' are mutually exclusive parameters. 'search' wins.
 * Query either for username or search for username, fullname, email.
 * @function listUsers
 * @param {string} query for username
 * @param {string} search for  username, fullname, email.
 * @param {list} groups_filter restrict to group membership
 * @param {int} limit
 * @returns {Object} List users action
 */
export function listUsers(options?: {}): any;
/**
 * Update user function
 * @function updateUser
 * @param {string} id User id
 * @param {Object} user User data.
 * @returns {Object} Update user action.
 */
export function updateUser(id: string, user: any): any;
/**
 * Update password function
 * @function updatePassword
 * @param {string} id User id
 * @param {string} oldPassword Old password.
 * @param {string} newPassword New password.
 * @returns {Object} Update password action.
 */
export function updatePassword(id: string, oldPassword: string, newPassword: string): any;
/**
 * Set initial password function
 * @function setInitialPassword
 * @param {string} id User id
 * @param {string} token One time user token.
 * @param {string} newPassword New password.
 * @returns {Object} Set initial password action.
 */
export function setInitialPassword(id: string, token: string, newPassword: string): any;
/**
 * Reset password function
 * @function resetPassword
 * @param {string} id User id
 * @returns {Object} Reset password action.
 */
export function resetPassword(id: string): any;
