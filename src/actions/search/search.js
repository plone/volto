/**
 * Search actions.
 * @module actions/search/search
 */

import { join, map, toPairs } from 'lodash';

import { SEARCH_CONTENT } from '../../constants/ActionTypes';

/**
 * Search content function.
 * @function searchContent
 * @param {string} url Url to use as base.
 * @param {Object} options Search options.
 * @returns {Object} Search content action.
 */
export default function searchContent(url, options) {
  const querystring = options
    ? join(map(toPairs(options), item => join(item, '=')), '&')
    : '';
  return {
    type: SEARCH_CONTENT,
    promise: api =>
      api.get(`${url}/@search${querystring ? `?${querystring}` : ''}`),
  };
}
