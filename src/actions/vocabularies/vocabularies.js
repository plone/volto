/**
 * Vocabularies actions.
 * @module actions/vocabularies/vocabularies
 */

import config from '../../config';
import { GET_VOCABULARY } from '../../constants/ActionTypes';

/**
 * Get vocabulary.
 * @function getVocabulary
 * @param {string} vocabBaseUrl Full API URL of vocabulary.
 * @param {string} query Only include results containing this string.
 * @param {number} start Start of result batch.
 * @returns {Object} Get vocabulary action.
 */
export function getVocabulary(vocabBaseUrl, query = null, start = 0) {
  const vocabBasePath = vocabBaseUrl.replace(config.apiPath, '');
  let vocabPath = `${vocabBasePath}?b_start=${start}`;
  if (query) {
    vocabPath = `${vocabBasePath}?q=${query}&b_start=${start}`;
  }
  return {
    type: GET_VOCABULARY,
    vocabBaseUrl,
    start,
    request: {
      op: 'get',
      path: vocabPath,
    },
  };
}
