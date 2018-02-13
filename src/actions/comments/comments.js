/**
 * Comments actions.
 * @module actions/comments/comments
 */

import {
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  GET_COMMENTS,
} from '../../constants/ActionTypes';

/**
 * Add comment function.
 * @function addComment
 * @param {string} url Content url.
 * @param {string} text Body of the comment.
 * @returns {Object} Add comment action.
 */
export function addComment(url, text) {
  return {
    type: ADD_COMMENT,
    promise: api => api.post(`${url}/@comments`, { data: { text } }),
  };
}

/**
 * Get comments function
 * @function getComments
 * @param {string} url Content url
 * @returns {Object} Get comment action
 */
export function getComments(url) {
  return {
    type: GET_COMMENTS,
    promise: api => api.get(`${url}/@comments`),
  };
}

/**
 * Delete comment function.
 * @function deleteComment
 * @param {string} url Content url.
 * @returns {Object} Delete comment action.
 */
export function deleteComment(url) {
  return {
    type: DELETE_COMMENT,
    promise: api => api.del(url),
  };
}

/**
 * Edit comment function.
 * @function editComment
 * @param {string} url Content url(s).
 * @param {string} text Body of the comment.
 * @returns {Object} Edit content action.
 */
export function editComment(url, text) {
  return {
    type: EDIT_COMMENT,
    promise: api => api.patch(url, { data: { text } }),
  };
}
