/**
 * Vocabularies actions.
 * @module actions/vocabularies/vocabularies
 */

import {
  GET_VOCABULARY,
  GET_VOCABULARY_TOKEN_TITLE,
} from '@plone/volto/constants/ActionTypes';
import config from '@plone/registry';
import { flattenToAppURL } from '@plone/volto/helpers';
import { getVocabName } from '@plone/volto/helpers/Vocabularies/Vocabularies';
import qs from 'query-string';

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
export function getVocabulary({
  vocabNameOrURL,
  query = null,
  start = 0,
  size,
  subrequest,
}) {
  const vocabulary = getVocabName(vocabNameOrURL);
  const contextualVocabularies = config.settings.contextualVocabularies;
  const vocabPath =
    contextualVocabularies &&
    contextualVocabularies.includes(vocabulary) &&
    vocabulary !== vocabNameOrURL
      ? flattenToAppURL(vocabNameOrURL)
      : `/@vocabularies/${vocabulary}`;

  let queryString = `b_start=${start}${size ? '&b_size=' + size : ''}`;

  if (query) {
    queryString = `${queryString}&title=${query}`;
  }
  return {
    type: GET_VOCABULARY,
    vocabulary: vocabNameOrURL,
    start,
    request: {
      op: 'get',
      path: `${vocabPath}?${queryString}`,
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
export function getVocabularyTokenTitle({
  vocabNameOrURL,
  token = null,
  tokens = null,
  subrequest,
}) {
  // In case we have a URL, we have to get the vocabulary name
  const vocabulary = getVocabName(vocabNameOrURL);
  const contextualVocabularies = config.settings.contextualVocabularies;
  const vocabPath =
    contextualVocabularies &&
    contextualVocabularies.includes(vocabulary) &&
    vocabulary !== vocabNameOrURL
      ? flattenToAppURL(vocabNameOrURL)
      : `/@vocabularies/${vocabulary}`;
  const queryString = {
    ...(token && { token }),
    ...(tokens && { tokens }),
  };

  return {
    type: GET_VOCABULARY_TOKEN_TITLE,
    vocabulary: vocabNameOrURL,
    token,
    tokens,
    subrequest,
    request: {
      op: 'get',
      path: `${vocabPath}?b_size=-1&${qs.stringify(queryString, {
        encode: false,
      })}`,
    },
  };
}
