/**
 * Get id from url.
 * @function getId
 * @param {string} url Url to be parsed.
 * @return {string} Id of content object.
 */
export function getId(url: string): string;
/**
 * Get view of an url.
 * @function getView
 * @param {string} url Url to be parsed.
 * @return {string} View of content object.
 */
export function getView(url: string): string;
/**
 * Flatten to app server URL - Given a URL if it starts with the API server URL
 * this method flattens it (removes) the server part
 * TODO: Update it when implementing non-root based app location (on a
 * directory other than /, eg. /myapp)
 * @method flattenToAppURL
 * @param {string} url URL of the object
 * @returns {string} Flattened URL to the app server
 */
export function flattenToAppURL(url: string): string;
/**
 * Given a URL it remove the querystring from the URL.
 * @method stripQuerystring
 * @param {string} url URL of the object
 * @returns {string} URL without querystring
 */
export function stripQuerystring(url: string): string;
/**
 * Given a URL if it starts with the API server URL
 * this method removes the /api or the /Plone part.
 * @method toPublicURL
 * @param {string} url URL of the object
 * @returns {string} public URL
 */
export function toPublicURL(url: string): string;
/**
 * Flatten to app server HTML - Given a text if it contains some urls that starts
 * with the API server URL this method flattens it (removes) the server part.
 * TODO: Update it when implementing non-root based app location (on a
 * directory other than /, eg. /myapp)
 * @method flattenHTMLToAppURL
 * @param {string} html Some html snippet
 * @returns {string} Same HTML with Flattened URLs to the app server
 */
export function flattenHTMLToAppURL(html: string): string;
/**
 * Add the app url
 * @method addAppURL
 * @param {string} url URL of the object
 * @returns {string} New URL with app
 */
export function addAppURL(url: string): string;
/**
 * Given a URL expands it to the backend URL
 * Useful when you have to actually call the backend from the
 * frontend code (eg. ICS calendar download)
 * It is seamless mode aware
 * @method expandToBackendURL
 * @param {string} url URL or path of the object
 * @returns {string} New URL with the backend URL
 */
export function expandToBackendURL(path: any): string;
/**
 * Check if internal url
 * @method isInternalURL
 * @param {string} url URL of the object
 * @returns {boolean} True if internal url
 */
export function isInternalURL(url: string): boolean;
/**
 * Check if it's a valid url
 * @method isUrl
 * @param {string} url URL of the object
 * @returns {boolean} True if is a valid url
 */
export function isUrl(url: string): boolean;
/**
 * Normalize URL, adds protocol (if required eg. user has not entered the protocol)
 * @method normalizeUrl
 * @param {string} url URL of the object
 * @returns {boolean} URL with the protocol
 */
export function normalizeUrl(url: string): boolean;
/**
 * Removes protocol from URL (for display)
 * @method removeProtocol
 * @param {string} url URL of the object
 * @returns {string} URL without the protocol part
 */
export function removeProtocol(url: string): string;
export function isMail(text: any): boolean;
export function isTelephone(text: any): boolean;
export function normaliseMail(email: any): any;
export function normalizeTelephone(tel: any): any;
export function checkAndNormalizeUrl(url: any): {
    isMail: boolean;
    isTelephone: boolean;
    url: any;
    isValid: boolean;
};
/**
 * Given an image info object, it does flatten all the scales information to
 * match the ones stored in the catalog
 * 'http://localhost:3000/{path}/@@images/{scalefile}' -> '@images/{scalefile}'
 * @function flattenScales
 * @param {string} path path of the content object
 * @param {object} image image information object
 * @returns {object} New object with the flattened scale URLs
 */
export function flattenScales(path: string, image: object): object;
/**
 * Get base url.
 * @function getBaseUrl
 * @param {string} url Url to be parsed.
 * @return {string} Base url of content object.
 */
export const getBaseUrl: ((url: any) => any) & import("lodash").MemoizedFunction;
/**
 * Get parent url.
 * @function getParentUrl
 * @param {string} url Url to be parsed.
 * @return {string} Parent url of content object.
 */
export const getParentUrl: ((url: any) => any) & import("lodash").MemoizedFunction;
/**
 * Returns true if the current view is a cms ui view
 * @method isCmsUi
 * @param {string} currentPathname pathname of the current view
 * @returns {boolean} true if the current view is a cms ui view
 */
export const isCmsUi: ((currentPathname: any) => boolean) & import("lodash").MemoizedFunction;
export function getFieldURL(data: object): string | any;
export namespace URLUtils {
    export { normalizeTelephone };
    export { normaliseMail };
    export { normalizeUrl };
    export { isTelephone };
    export { isMail };
    export { isUrl };
    export { checkAndNormalizeUrl };
}
