/**
 * Search actions.
 * @module actions/search/search
 */

import qs from 'query-string';

import {
  RESET_SEARCH_CONTENT,
  SEARCH_CONTENT,
} from '@plone/volto/constants/ActionTypes';

/**
 * Search content function.
 * @function searchContent
 * @param {string} url Url to use as base.
 * @param {Object} options Search options.
 * @param {string} subrequest Key of the subrequest.
 * @returns {Object} Search content action.
 */
export function searchContent(url, options, subrequest = null) {
  if (options && Object.keys(options).includes('SearchableText')) {
    // Adds the wildcard to the SearchableText param
    options.SearchableText = `${options.SearchableText}*`;
  }
  const querystring = qs.stringify(options, {
    encode: false,
    arrayFormat: 'colon-list-separator',
  });

  return {
    type: SEARCH_CONTENT,
    subrequest,
    request: {
      op: 'get',
      path: `${url}/@search${querystring ? `?${querystring}` : ''}`,
    },
  };
}

/**
 * Reset search content function.
 * @function resetSearchContent
 * @param {string} subrequest Key of the subrequest.
 * @returns {Object} Search content action.
 */
export function resetSearchContent(subrequest = null) {
  return {
    type: RESET_SEARCH_CONTENT,
    subrequest,
  };
}
