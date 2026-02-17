/**
 * Get aliases function.
 * @function getAliases
 * @param {string} url Content url.
 * @param {Object} options Options data.
 * @returns {Object} Get aliases action.
 */
export function getAliases(url: string, options?: any): any;
/**
 * Add alias function.
 * @function addAliases
 * @param {string} url Content url.
 * @param {Object} data Aliases to add data object.
 * @returns {Object} Add alias action.
 */
export function addAliases(url: string, data: any): any;
/**
 * Remove aliases function.
 * @function removeAliases
 * @param {string} url Content url.
 * @param {Object} data Aliases to remove data object.
 * @returns {Object} Remove alias action.
 */
export function removeAliases(url: string, data: any): any;
/**
 * Upload aliases function.
 * @function uploadAliases
 * @param {Object} file CSV file.
 * @returns {Object} Upload aliases action.
 */
export function uploadAliases(file: any): any;
