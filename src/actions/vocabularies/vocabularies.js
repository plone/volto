/**
 * Vocabularies actions.
 * @module actions/vocabularies/vocabularies
 */

import { settings } from '~/config';
import { GET_VOCABULARY } from '../../constants/ActionTypes';

/**
 * Get vocabulary given a URL (coming from a Schema) or from a vocabulary name.
 * @function getVocabulary
 * @param {string} vocabNameOrURL Full API URL of vocabulary or vocabulary name
 * @param {string} query Only include results containing this string.
 * @param {number} start Start of result batch.
 * @returns {Object} Get vocabulary action.
 */
export function getVocabulary(vocabNameOrURL, query = null, start = 0) {
  // In case we have a URL, we have to get the vocabulary name
  const vocabulary = vocabNameOrURL.replace(
    `${settings.apiPath}/@vocabularies/`,
    '',
  );
  let queryString = `b_start=${start}`;
  if (query) {
    queryString = `${queryString}&q=${query}`;
  }
  return {
    type: GET_VOCABULARY,
    vocabulary: vocabNameOrURL,
    start,
    request: {
      op: 'get',
      path: `/@vocabularies/${vocabulary}?${queryString}`,
    },
  };
}
