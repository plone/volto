/**
 * Content actions.
 * @module actions/content/content
 */

import {
  CREATE_CONTENT,
  DELETE_CONTENT,
  UPDATE_CONTENT,
  GET_CONTENT,
  ORDER_CONTENT,
} from '../../constants/ActionTypes';

/**
 * Create content function.
 * @function createContent
 * @param {string} url Parent url.
 * @param {Object|Array} content Content data.
 * @returns {Object} Create content action.
 */
export function createContent(url, content) {
  return {
    type: CREATE_CONTENT,
    promise: Array.isArray(content)
      ? api => Promise.all(content.map(item => api.post(url, { data: item })))
      : api => api.post(url, { data: content }),
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
    promise:
      typeof urls === 'string'
        ? api => api.del(urls)
        : api => Promise.all(urls.map(url => api.del(url))),
  };
}

/**
 * Update content function.
 * @function updateContent
 * @param {string|Array} urls Content url(s).
 * @param {Object|Array} content Content data.
 * @returns {Object} Update content action.
 */
export function updateContent(urls, content) {
  return {
    type: UPDATE_CONTENT,
    promise:
      typeof urls === 'string'
        ? api => api.patch(urls, { data: content })
        : api =>
            Promise.all(
              urls.map((url, index) =>
                api.patch(url, { data: content[index] }),
              ),
            ),
  };
}

/**
 * Order content function
 * @function orderContent
 * @param {string} parent Parent url
 * @param {string} url Content url
 * @param {string|number} delta Order delta
 * @param {Array} subset Subset ids
 * @returns {Object} Order content action
 */
export function orderContent(parent, url, delta, subset) {
  return {
    type: ORDER_CONTENT,
    promise: api =>
      api.patch(parent, {
        data: { ordering: { obj_id: url, delta, subset_ids: subset } },
      }),
  };
}

/**
 * Sort content function
 * @function sortContent
 * @param {string} url Content url
 * @param {string} on Sort on index
 * @param {string} order Sort order
 * @returns {Object} Sort content action
 */
export function sortContent(url, on, order) {
  return {
    type: UPDATE_CONTENT,
    promise: api =>
      api.patch(url, {
        data: { sort: { on, order } },
      }),
  };
}

/**
 * Get content function
 * @function getContent
 * @param {string} url Content url
 * @param {string} version Version id
 * @returns {Object} Get content action
 */
export function getContent(url, version) {
  return {
    type: GET_CONTENT,
    promise: api =>
      api.get(`${url}${version ? `/@history/${version}` : ''}?fullobjects`),
  };
}
