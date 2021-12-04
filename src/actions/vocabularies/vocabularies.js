/**
 * Vocabularies actions.
 * @module actions/vocabularies/vocabularies
 */

import {
  GET_VOCABULARY,
  GET_VOCABULARY_TOKEN_TITLE,
} from '@plone/volto/constants/ActionTypes';
import { getVocabName } from '@plone/volto/helpers/Vocabularies/Vocabularies';

/**
 * Get vocabulary given a URL (coming from a Schema) or from a vocabulary name.
 * @function getVocabulary
 * @param {string} vocabNameOrURL Full API URL of vocabulary or vocabulary name
 * @param {string} query Only include results containing this string.
 * @param {number} start Start of result batch.
 * @returns {Object} Get vocabulary action.
 */
export function getVocabulary(
  vocabNameOrURL,
  query = null,
  start = 0,
  b_size,
  subrequest,
) {
  const vocabulary = getVocabName(vocabNameOrURL);

  let queryString = `${b_size !== -1 ? `b_start=${start}` : ''} ${
    b_size ? '&b_size=' + b_size : ''
  }`;

  if (query) {
    queryString = `${queryString}&title=${query}`;
  }
  return {
    type: GET_VOCABULARY,
    vocabulary: vocabNameOrURL,
    start,
    request: {
      op: 'get',
      path: `/@vocabularies/${vocabulary}?${queryString}`,
    },
    subrequest,
  };
}

/**
 * Get the title value given a token from vocabulary given a vocabulary URL
 * (coming from a Schema) or from a vocabulary name.
 * @function getVocabularyTokenTitle
 * @param {string} vocabNameOrURL Full API URL of vocabulary or vocabulary name
 * @param {string} token Only include results containing this string.
 * @returns {Object} Get vocabulary action.
 */
export function getVocabularyTokenTitle(
  vocabNameOrURL,
  token = null,
  subrequest,
) {
  // In case we have a URL, we have to get the vocabulary name
  const vocabulary = getVocabName(vocabNameOrURL);

  return {
    type: GET_VOCABULARY_TOKEN_TITLE,
    vocabulary: vocabNameOrURL,
    token,
    subrequest,
    request: {
      op: 'get',
      path: `/@vocabularies/${vocabulary}?token=${token}`,
    },
  };
}
