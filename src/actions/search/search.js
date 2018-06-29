/**
 * Search actions.
 * @module actions/search/search
 */
import { join, map, toPairs, pickBy, isArray } from 'lodash';
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
  let querystring = '';
  if (options) {
    querystring = join(
      map(toPairs(pickBy(options)), item => {
        if (isArray(item[1])) {
          return join(item[1].map(value => `${item[0]}=${value}`), '&');
        }
        return join(item, '=');
      }),
      '&',
    );
  }
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
