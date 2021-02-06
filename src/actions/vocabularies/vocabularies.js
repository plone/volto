/**
 * Vocabularies actions.
 * @module actions/vocabularies/vocabularies
 */

import {
  GET_VOCABULARY,
  GET_VOCABULARY_TOKEN_TITLE,
} from '@plone/volto/constants/ActionTypes';
import config from '@plone/volto/registry';

/**
 * Get vocabulary given a URL (coming from a Schema) or from a vocabulary name.
 * @function getVocabulary
 * @param {string} vocabNameOrURL Full API URL of vocabulary or vocabulary name
 * @param {string} query Only include results containing this string.
 * @param {number} start Start of result batch.
 * @returns {Object} Get vocabulary action.
 */
export function getVocabulary(vocabNameOrURL, query = null, start = 0) {
  const { settings } = config;
  // In case we have a URL, we have to get the vocabulary name
  const vocabulary =
    vocabNameOrURL &&
    vocabNameOrURL.replace(`${settings.apiPath}/@vocabularies/`, '');
  let queryString = `b_start=${start}`;
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
export function getVocabularyTokenTitle(vocabNameOrURL, token = null) {
  const { settings } = config;
  // In case we have a URL, we have to get the vocabulary name
  const vocabulary = vocabNameOrURL.replace(
    `${settings.apiPath}/@vocabularies/`,
    '',
  );

  return {
    type: GET_VOCABULARY_TOKEN_TITLE,
    vocabulary: vocabNameOrURL,
    token,
    request: {
      op: 'get',
      path: `/@vocabularies/${vocabulary}?token=${token}`,
    },
  };
}
