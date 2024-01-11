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
  UPDATECOLUMNS_CONTENT,
  LOCK_CONTENT,
  UNLOCK_CONTENT,
  LINK_INTEGRITY_CHECK,
} from '@plone/volto/constants/ActionTypes';
import { nestContent } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

/**
 * Create content function.
 * @function createContent
 * @param {string} url Parent URL.
 * @param {Object|Array} content Content data.
 * @param {string} subrequest Optional. Key of the subrequest.
 * @returns {Object} Create content action.
 */
export function createContent(url, content, subrequest) {
  return {
    type: CREATE_CONTENT,
    subrequest,
    mode: 'serial',
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
    mode: 'serial',
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
 * @param {Object|Array} headers Custom headers.
 * @returns {Object} Update content action.
 */
export function updateContent(urls, content, headers = {}) {
  return {
    type: UPDATE_CONTENT,
    request:
      typeof urls === 'string'
        ? {
            op: 'patch',
            path: urls,
            data: nestContent(content),
            headers: headers,
          }
        : urls.map((url, index) => ({
            op: 'patch',
            path: url,
            data: nestContent(content[index]),
            headers: headers,
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
 * @param {boolean} fullobjects If full object information should be retrieved
 * @returns {Object} Get content action
 */
export function getContent(
  url,
  version = null,
  subrequest = null,
  page = null,
  fullobjects = false,
) {
  const { settings } = config;
  const query = Object.assign(
    {},
    fullobjects || settings.bbb_getContentFetchesFullobjects
      ? { fullobjects: true }
      : {},
    page
      ? {
          b_start: settings.defaultPageSize * (page - 1),
          b_size: settings.defaultPageSize,
        }
      : {},
    settings.isMultilingual ? { expand: 'translations' } : {},
  );

  let qs = Object.keys(query)
    .map(function (key) {
      return key + '=' + query[key];
    })
    .join('&');

  return {
    type: GET_CONTENT,
    subrequest,
    request: {
      op: 'get',
      path: `${url}${version ? `/@history/${version}` : ''}${
        qs ? `?${qs}` : ''
      }`,
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

/**
 * Add, remove or order indexes
 * @param {string} url Content url
 * @param {string} index indexes with order
 * @returns {Object} Index content action
 */
export function updateColumnsContent(url, index) {
  return {
    type: UPDATECOLUMNS_CONTENT,
    indexcolumns: index,
  };
}

/**
 * Lock content function.
 * @function lockContent
 * @param {string} urls Content url(s)
 * @returns {Object} Lock content action.
 */
export function lockContent(urls) {
  return {
    type: LOCK_CONTENT,
    mode: 'serial',
    request:
      typeof urls === 'string'
        ? { op: 'post', path: `${urls}/@lock` }
        : urls.map((url) => ({ op: 'post', path: `${url}/@lock` })),
  };
}

/**
 * Unlock content function.
 * @function unlockContent
 * @param {string|Array} urls Content url(s).
 * @returns {Object} Unlock content action.
 */
export function unlockContent(urls, force = false) {
  return {
    type: UNLOCK_CONTENT,
    mode: 'serial',
    request:
      typeof urls === 'string'
        ? {
            op: 'del',
            path: `${urls}/@lock`,
            data: force ? { force: true } : {},
          }
        : urls.map((url) => ({
            op: 'del',
            path: `${url}/@lock`,
            data: force ? { force: true } : {},
          })),
  };
}

export function linkIntegrityCheck(selection) {
  return {
    type: LINK_INTEGRITY_CHECK,
    mode: 'serial',
    request: {
      op: 'get',
      path: '@linkintegrity?' + selection.map((uid) => `uids=${uid}`).join('&'),
    },
  };
}
