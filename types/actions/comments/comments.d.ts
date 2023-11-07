/**
 * Add comment function.
 * @function addComment
 * @param {string} url Content url.
 * @param {string} text Body of the comment.
 * @returns {Object} Add comment action.
 */
export function addComment(url: string, text: string, commentId: any): any;
/**
 * List comments function
 * @function listComments
 * @param {string} url Content url
 * @returns {Object} List comment action
 */
export function listComments(url: string): any;
export function listMoreComments(url: any): {
    type: any;
    request: {
        op: string;
        path: string;
    };
};
/**
 * Delete comment function.
 * @function deleteComment
 * @param {string} url Content url.
 * @returns {Object} Delete comment action.
 */
export function deleteComment(url: string): any;
/**
 * Update comment function.
 * @function updateComment
 * @param {string} url Content url(s).
 * @param {string} text Body of the comment.
 * @returns {Object} Update content action.
 */
export function updateComment(url: string, text: string): any;
