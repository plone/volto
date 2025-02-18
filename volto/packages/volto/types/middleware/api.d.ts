/**
 *
 * Add configured expanders to an api call for an action
 * Requirements:
 *
 * - It should add the expanders set in the config settings
 * - It should preserve any query if present
 * - It should preserve (and add) any expand parameter (if present) e.g. translations
 * - It should take use the correct codification for arrays in querystring (repeated parameter for each member of the array)
 *
 * @function addExpandersToPath
 * @param {string} path The url/path including the querystring
 * @param {*} type The action type
 * @returns {string} The url/path with the configured expanders added to the query string
 */
export function addExpandersToPath(path: string, type: any, isAnonymous: any): string;
export default apiMiddlewareFactory;
/**
 * Api middleware.
 * @function
 * @param {Object} api Api object.
 * @returns {Promise} Action promise.
 */
declare function apiMiddlewareFactory(api: any): Promise<any>;
