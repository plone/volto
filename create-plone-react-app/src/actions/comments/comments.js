/**
 * Comments actions.
 * @module actions/comments/comments
 */

import {
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  LIST_COMMENTS,
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
 * List comments function
 * @function listComments
 * @param {string} url Content url
 * @returns {Object} List comment action
 */
export function listComments(url) {
  return {
    type: LIST_COMMENTS,
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
 * Update comment function.
 * @function updateComment
 * @param {string} url Content url(s).
 * @param {string} text Body of the comment.
 * @returns {Object} Update content action.
 */
export function updateComment(url, text) {
  return {
    type: UPDATE_COMMENT,
    promise: api => api.patch(url, { data: { text } }),
  };
}
