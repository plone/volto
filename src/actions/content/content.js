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
  RESET_CONTENT,
} from '@plone/volto/constants/ActionTypes';
import { nestContent } from '@plone/volto/helpers';
import { settings } from '~/config';

/**
 * Create content function.
 * @function createContent
 * @param {string} url Parent URL.
 * @param {Object|Array} content Content data.
 * @param {string} origin Optional. The ID of the block into which the content should be uploaded.
 * @returns {Object} Create content action.
 */
export function createContent(url, content, origin) {
  return {
    type: CREATE_CONTENT,
    subrequest: origin,
    request: Array.isArray(content)
      ? content.map((item) => ({ op: 'post', path: url, data: item }))
      : { op: 'post', path: url, data: nestContent(content) },
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
    request:
      typeof urls === 'string'
        ? { op: 'del', path: urls }
        : urls.map((url) => ({ op: 'del', path: url })),
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
    request:
      typeof urls === 'string'
        ? { op: 'patch', path: urls, data: nestContent(content) }
        : urls.map((url, index) => ({
            op: 'patch',
            path: url,
            data: nestContent(content[index]),
          })),
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
    request: {
      op: 'patch',
      path: parent,
      data: { ordering: { obj_id: url, delta, subset_ids: subset } },
    },
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
    sort: { on, order },
    request: {
      op: 'patch',
      path: url,
      data: { sort: { on, order } },
    },
  };
}

/**
 * Get content function
 * @function getContent
 * @param {string} url Content url
 * @param {string} version Version id
 * @param {string} subrequest Key of the subrequest.
 * @returns {Object} Get content action
 */
export function getContent(
  url,
  version = null,
  subrequest = null,
  page = null,
) {
  let qs = page
    ? `?fullobjects&b_start=${settings.defaultPageSize * (page - 1)}&b_size=${
        settings.defaultPageSize
      }`
    : '?fullobjects';

  if (settings.isMultilingual) {
    qs = qs + '&expand=translations';
  }

  return {
    type: GET_CONTENT,
    subrequest,
    request: {
      op: 'get',
      path: `${url}${version ? `/@history/${version}` : ''}${qs}`,
    },
  };
}

/**
 * Reset content function
 * @function resetContent
 * @param {string} subrequest Key of the subrequest.
 * @returns {Object} Get content action
 */
export function resetContent(subrequest = null) {
  return {
    type: RESET_CONTENT,
    subrequest,
  };
}
