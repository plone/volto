/**
 * Search actions.
 * @module actions/search/search
 */

import { SEARCH_CONTENT } from '../../constants/ActionTypes';

/**
 * Search content function.
 * @function searchContent
 * @param {string} text Search text.
 * @returns {Object} Search content action.
 */
export default function searchContent(text) {
  return {
    type: SEARCH_CONTENT,
    promise: api => api.get(`/@search?SearchableText=${text}`),
  };
}
