/**
 * Create group function.
 * @function createGroup
 * @param {Object} data Group data.
 * @returns {Object} Create group action.
 */
export function createGroup(data: any): any;
/**
 * Delete group function.
 * @function deleteGroup
 * @param {string} id Group id
 * @returns {Object} Delete group action.
 */
export function deleteGroup(id: string): any;
/**
 * Get group function
 * @function getGroup
 * @param {string} id Group id
 * @returns {Object} Get group action
 */
export function getGroup(id: string): any;
/**
 * List groups function
 * Two group lists needed by user group membership control panel: one for joining, one for filtering users.
 * @function listGroups
 * @returns {Object} List groups action
 */
export function listGroups(query: any, query_group_filter: any): any;
/**
 * Update group function.
 * @function updateGroup
 * @param {string} id Group id
 * @param {Object} data Group data.
 * @returns {Object} Update group action.
 */
export function updateGroup(id: string, data: any): any;
