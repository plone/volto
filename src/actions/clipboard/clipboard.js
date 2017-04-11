/**
 * Clipboard actions.
 * @module actions/clipboard/clipboard
 */

import {
  COPY_PENDING, COPY_SUCCESS, COPY_FAIL,
  MOVE_PENDING, MOVE_SUCCESS, MOVE_FAIL,
  COPY, CUT,
} from '../../constants/ActionTypes';

/**
 * Copy content function.
 * @function copyContent
 * @param {string} source Source url.
 * @param {string} target Target url.
 * @returns {Object} Copy content action.
 */
export function copyContent(source, target) {
  return {
    types: [COPY_PENDING, COPY_SUCCESS, COPY_FAIL],
    promise: api => api.post(`${target}/@copy`, { data: { source } }),
  };
}

/**
 * Move content function.
 * @function moveContent
 * @param {string} source Source url.
 * @param {string} target Target url.
 * @returns {Object} Move content action.
 */
export function moveContent(source, target) {
  return {
    types: [MOVE_PENDING, MOVE_SUCCESS, MOVE_FAIL],
    promise: api => api.post(`${target}/@move`, { data: { source } }),
  };
}

/**
 * Copy function.
 * @function copy
 * @returns {Object} Copy action.
 */
export function copy(url) {
  return {
    type: COPY,
    source: url,
  };
}

/**
 * Cut function.
 * @function cut
 * @returns {Object} Cut action.
 */
export function cut(url) {
  return {
    type: CUT,
    source: url,
  };
}
