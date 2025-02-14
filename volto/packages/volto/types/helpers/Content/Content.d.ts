/**
 * Nest content.
 * @function nestContent
 * @param {Object} props Properties.
 * @return {string} Field name of the block
 */
export function nestContent(props: any): string;
/**
 * Get layout field.
 * @function getLayoutFieldname
 * @param {Object} props Properties.
 * @return {string} Field name of the layout
 */
export function getLayoutFieldname(props: any): string;
/**
 * Get content icon.
 * @description Configurable in config
 * @function getContentIcon
 * @param {string} type Content type
 * @param {boolean} isFolderish
 * @returns {Object} Icon component
 */
export function getContentIcon(type: string, isFolderish: boolean): any;
/**
 * Get the language independent fields presents in a schema.
 * @description Configurable in config
 * @function getLanguageIndependentFields
 * @param {string} schema content type JSON Schema serialization
 * @returns {array} List of language independent fields
 */
export function getLanguageIndependentFields(schema: string): any[];
