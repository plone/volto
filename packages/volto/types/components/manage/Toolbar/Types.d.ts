/**
 * Languages the content can still be translated to from the Add menu.
 * Only applies on multilingual sites: plone.restapi advertises the
 * `translations` component whenever plone.app.multilingual is installed,
 * even when it is not activated on the site.
 * @function getTranslationsLeft
 * @param {Object} args
 * @param {Object} args.content Current content.
 * @param {Array} args.availableLanguages Site available languages.
 * @param {string} args.currentLanguage Current frontend language.
 * @param {boolean} args.isMultilingual Whether the site is multilingual.
 * @returns {Array} Backend language codes still missing a translation.
 */
export function getTranslationsLeft({ content, availableLanguages, currentLanguage, isMultilingual, }: {
    content: any;
    availableLanguages: any[];
    currentLanguage: string;
    isMultilingual: boolean;
}): any[];
/**
 * Whether the Add menu has anything to show.
 * @function hasAddMenuItems
 * @param {Object} args Same as `getTranslationsLeft`, plus `types`.
 * @returns {boolean} True if there are addable types or translations left.
 */
export function hasAddMenuItems({ types, ...args }: any): boolean;
declare const _default: any;
export default _default;
