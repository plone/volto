/**
 * Get vocabulary given a URL (coming from a Schema) or from a vocabulary name.
 * @function getVocabulary
 * @param {string} vocabNameOrURL Full API URL of vocabulary or vocabulary name
 * @param {string} query Only include results containing this string.
 * @param {number} start Start of result batch.
 * @param {number} b_size The size of the batch.
 * @param {string} subrequest Name of the subrequest.
 * @returns {Object} Get vocabulary action.
 */
export function getVocabulary({ vocabNameOrURL, query, start, size, subrequest, }: string): any;
/**
 * Get the title value given a token from vocabulary given a vocabulary URL
 * (coming from a Schema) or from a vocabulary name.
 * @function getVocabularyTokenTitle
 * @param {string} vocabNameOrURL Full API URL of vocabulary or vocabulary name
 * @param {string} token Only include results containing this string.
 * @returns {Object} Get vocabulary action.
 */
export function getVocabularyTokenTitle({ vocabNameOrURL, token, tokens, subrequest, }: string): any;
