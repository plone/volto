/**
 * Search actions.
 * @module actions/search/search
 */

import {
  SEARCH_CONTENT_PENDING,
  SEARCH_CONTENT_SUCCESS,
  SEARCH_CONTENT_FAIL,
} from '../../constants/ActionTypes';

/**
 * Search content function.
 * @function searchContent
 * @param {string} text Search text.
 * @returns {Object} Search content action.
 */
export default function searchContent(text) {
  return {
    types: [
      SEARCH_CONTENT_PENDING,
      SEARCH_CONTENT_SUCCESS,
      SEARCH_CONTENT_FAIL,
    ],
    promise: api => api.get(`/@search?SearchableText=${text}`),
  };
}
