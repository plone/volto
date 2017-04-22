/**
 * Content actions.
 * @module actions/search/search
 */

import {
  ADD_CONTENT,
  DELETE_CONTENT,
  EDIT_CONTENT,
  GET_CONTENT,
} from '../../constants/ActionTypes';

/**
 * Add content function.
 * @function addContent
 * @param {string} url Parent url.
 * @param {Object} content Content data.
 * @returns {Object} Add content action.
 */
export function addContent(url, content) {
  return {
    type: ADD_CONTENT,
    promise: api => api.post(url, { data: content }),
  };
}

/**
 * Delete content function.
 * @function deleteContent
 * @param {string|Array} urls Content url(s).
 * @returns {Object} Delete content action.
 */
export function deleteContent(urls) {
  return {
    type: DELETE_CONTENT,
    promise: typeof urls === 'string'
      ? api => api.del(urls)
      : api => Promise.all(urls.map(url => api.del(url))),
  };
}

/**
 * Edit content function.
 * @function editContent
 * @param {string} url Content url.
 * @param {Object} content Content data.
 * @returns {Object} Edit content action.
 */
export function editContent(url, content) {
  return {
    type: EDIT_CONTENT,
    promise: api => api.patch(url, { data: content }),
  };
}

/**
 * Get content function.
 * @function getContent
 * @param {string} url Content url.
 * @returns {Object} Get content action.
 */
export function getContent(url) {
  return {
    type: GET_CONTENT,
    promise: api => api.get(url),
  };
}
