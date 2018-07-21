/**
 * Vocabularies actions.
 * @module actions/vocabularies/vocabularies
 */

import { GET_VOCABULARY } from '../../constants/ActionTypes';

/**
 * Get vocabulary.
 * @function getVocabulary
 * @param {string} vocabulary Vocabulary to get.
 * @returns {Object} Get vocabulary action.
 */
export function getVocabulary(vocabulary) {
  return {
    type: GET_VOCABULARY,
    vocabulary,
    request: {
      op: 'get',
      path: `/@vocabularies/${vocabulary}`,
    },
  };
}
