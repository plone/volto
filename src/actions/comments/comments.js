/**
 * Comments actions.
 * @module actions/comments/comments
 */

import {
  ADD_COMMENT,
  DELETE_COMMENT,
  LIST_COMMENTS,
  LIST_MORE_COMMENTS,
  UPDATE_COMMENT,
} from '@plone/volto/constants/ActionTypes';

/**
 * Add comment function.
 * @function addComment
 * @param {string} url Content url.
 * @param {string} text Body of the comment.
 * @returns {Object} Add comment action.
 */
export function addComment(url, text, commentId) {
  const path = commentId ? `${url}/@comments/${commentId}` : `${url}/@comments`;

  return {
    type: ADD_COMMENT,
    request: {
      op: 'post',
      path,
      data: { text },
    },
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
    request: {
      op: 'get',
      path: `${url}/@comments`,
    },
  };
}

export function listMoreComments(url) {
  return {
    type: LIST_MORE_COMMENTS,
    request: {
      op: 'get',
      path: `${url}`,
    },
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
    request: {
      op: 'del',
      path: url,
    },
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
    request: {
      op: 'patch',
      path: url,
      data: { text },
    },
  };
}
