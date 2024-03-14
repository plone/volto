/**
 * Get string as Boolean.
 * @function getBoolean
 * @param {Object} value The value.
 * @return {string} Field name of the layout
 */
export function getBoolean(value: any): string;
/**
 * Get vocabulary from hint.
 * @function getVocabFromHint
 * @param {Object} props The props.
 * @return {string} Field name of the layout
 */
export function getVocabFromHint(props: any): string;
/**
 * Get vocabulary from field.
 * @function getVocabFromField
 * @param {Object} props The props.
 * @return {string} Field name of the layout
 */
export function getVocabFromField(props: any): string;
/**
 * Get vocabulary from items.
 * @function getVocabFromItems
 * @param {Object} props The props.
 * @return {string} Field name of the layout
 */
export function getVocabFromItems(props: any): string;
/**
 * Get vocabulary given a URL (coming from a Schema) or from a vocabulary name.
 * @function getVocabName
 * @param {string} vocabNameOrURL
 * @returns {string} Vocabulary name
 */
export function getVocabName(vocabNameOrURL: string): string;
/**
 * Get Fields vocabulary
 * @function getFieldsVocabulary
 * @returns {Object} Fields vocabulary
 */
export function getFieldsVocabulary(): any;
