/**
 * Search actions.
 * @module actions/search/search
 */

import { join, map, toPairs, pickBy } from 'lodash';

import {
  RESET_SEARCH_CONTENT,
  SEARCH_CONTENT,
} from '../../constants/ActionTypes';

/**
 * Search content function.
 * @function searchContent
 * @param {string} url Url to use as base.
 * @param {Object} options Search options.
 * @returns {Object} Search content action.
 */
export function searchContent(url, options) {
  const querystring = options
    ? join(map(toPairs(pickBy(options)), item => join(item, '=')), '&')
    : '';
  return {
    type: SEARCH_CONTENT,
    request: {
      op: 'get',
      path: `${url}/@search${querystring ? `?${querystring}` : ''}`,
    },
  };
}

/**
 * Reset search content function.
 * @function resetSearchContent
 * @returns {Object} Search content action.
 */
export function resetSearchContent() {
  return {
    type: RESET_SEARCH_CONTENT,
  };
}
