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
 * @param {Object|Array} content Content data.
 * @returns {Object} Add content action.
 */
export function addContent(url, content) {
  return {
    type: ADD_CONTENT,
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
 * Order content function
 * @function orderContent
 * @param {string} parent Parent url
 * @param {string} url Content url
 * @param {string|number} delta Order delta
 * @param {Array} subset Subset ids
 * @returns {Object} Edit content action
 */
export function orderContent(parent, url, delta, subset) {
  return {
    type: EDIT_CONTENT,
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
 * @returns {Object} Edit content action
 */
export function sortContent(url, on, order) {
  return {
    type: EDIT_CONTENT,
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
 * @param {string} versionId Version id
 * @returns {Object} Get content action
 */
export function getContent(url, versionId) {
  return {
    type: GET_CONTENT,
    promise: api =>
      api.get(`${url}${versionId ? `?version_id=${versionId}` : ''}`),
  };
}
