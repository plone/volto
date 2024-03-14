/**
 * Get translations function.
 * @function getTranslationLocator
 * @param {string} url URL type.
 * @returns {Object} Get translations action.
 */
export function getTranslationLocator(url: string, lang: any): any;
/**
 * Link translations function.
 * @function linkTranslation
 * @param {string} url URL type origin object to be linked to.
 * @param {string} target URL type (absolute, relative or UUID).
 * @returns {Object} Get translations action.
 */
export function linkTranslation(url: string, target: string): any;
/**
 * Delete link translations function.
 * @function linkTranslation
 * @param {string} url URL type origin object to be linked to.
 * @param {string} lang short language code of the translation to be deleted.
 * @returns {Object} Get translations action.
 */
export function deleteLinkTranslation(url: string, lang: string): any;
