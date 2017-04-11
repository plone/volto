/**
 * Content actions.
 * @module actions/search/search
 */

import {
  ADD_CONTENT_PENDING, ADD_CONTENT_SUCCESS, ADD_CONTENT_FAIL,
  DELETE_CONTENT_PENDING, DELETE_CONTENT_SUCCESS, DELETE_CONTENT_FAIL,
  EDIT_CONTENT_PENDING, EDIT_CONTENT_SUCCESS, EDIT_CONTENT_FAIL,
  GET_CONTENT_PENDING, GET_CONTENT_SUCCESS, GET_CONTENT_FAIL,
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
    types: [ADD_CONTENT_PENDING, ADD_CONTENT_SUCCESS, ADD_CONTENT_FAIL],
    promise: api => api.post(url, { data: content }),
  };
}

/**
 * Delete content function.
 * @function deleteContent
 * @param {string} url Content url.
 * @returns {Object} Delete content action.
 */
export function deleteContent(url) {
  return {
    types: [DELETE_CONTENT_PENDING, DELETE_CONTENT_SUCCESS, DELETE_CONTENT_FAIL],
    promise: api => api.del(url),
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
    types: [EDIT_CONTENT_PENDING, EDIT_CONTENT_SUCCESS, EDIT_CONTENT_FAIL],
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
    types: [GET_CONTENT_PENDING, GET_CONTENT_SUCCESS, GET_CONTENT_FAIL],
    promise: api => api.get(url),
  };
}
