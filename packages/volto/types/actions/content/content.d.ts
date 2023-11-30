/**
 * Create content function.
 * @function createContent
 * @param {string} url Parent URL.
 * @param {Object|Array} content Content data.
 * @param {string} subrequest Optional. Key of the subrequest.
 * @returns {Object} Create content action.
 */
export function createContent(url: string, content: any | any[], subrequest: string): any;
/**
 * Delete content function.
 * @function deleteContent
 * @param {string|Array} urls Content url(s).
 * @returns {Object} Delete content action.
 */
export function deleteContent(urls: string | any[]): any;
/**
 * Update content function.
 * @function updateContent
 * @param {string|Array} urls Content url(s).
 * @param {Object|Array} content Content data.
 * @param {Object|Array} headers Custom headers.
 * @returns {Object} Update content action.
 */
export function updateContent(urls: string | any[], content: any | any[], headers?: any | any[]): any;
/**
 * Order content function
 * @function orderContent
 * @param {string} parent Parent url
 * @param {string} url Content url
 * @param {string|number} delta Order delta
 * @param {Array} subset Subset ids
 * @returns {Object} Order content action
 */
export function orderContent(parent: string, url: string, delta: string | number, subset: any[]): any;
/**
 * Sort content function
 * @function sortContent
 * @param {string} url Content url
 * @param {string} on Sort on index
 * @param {string} order Sort order
 * @returns {Object} Sort content action
 */
export function sortContent(url: string, on: string, order: string): any;
/**
 * Get content function
 * @function getContent
 * @param {string} url Content url
 * @param {string} version Version id
 * @param {string} subrequest Key of the subrequest.
 * @param {boolean} fullobjects If full object information should be retrieved
 * @returns {Object} Get content action
 */
export function getContent(url: string, version?: string, subrequest?: string, page?: any, fullobjects?: boolean): any;
/**
 * Reset content function
 * @function resetContent
 * @param {string} subrequest Key of the subrequest.
 * @returns {Object} Get content action
 */
export function resetContent(subrequest?: string): any;
/**
 * Add, remove or order indexes
 * @param {string} url Content url
 * @param {string} index indexes with order
 * @returns {Object} Index content action
 */
export function updateColumnsContent(url: string, index: string): any;
/**
 * Lock content function.
 * @function lockContent
 * @param {string} urls Content url(s)
 * @returns {Object} Lock content action.
 */
export function lockContent(urls: string): any;
/**
 * Unlock content function.
 * @function unlockContent
 * @param {string|Array} urls Content url(s).
 * @returns {Object} Unlock content action.
 */
export function unlockContent(urls: string | any[], force?: boolean): any;
export function linkIntegrityCheck(selection: any): {
    type: any;
    mode: string;
    request: {
        op: string;
        path: string;
    };
};
