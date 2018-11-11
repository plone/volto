/**
 * Summary Box tile actions.
 * @module actions/tiles/summaryBox
 */

import { join, map, toPairs, pickBy } from 'lodash';

import {
  GET_SUMMARY_BOX_SEARCH_RESULTS,
  GET_SUMMARY_BOX_CONTENT,
  RESET_SUMMARY_BOX_CONTENT,
  RESET_SUMMARY_BOX_SEARCH,
} from '../../constants/ActionTypes';

/**
 * Get tile search results.
 * @function getSummaryBoxSearchResults
 * @param {string} url Url to use as base.
 * @param {Object} options Search options.
 * @returns {Object} Get tile search results action.
 */
export function getSummaryBoxSearchResults(url, options) {
  const querystring = options
    ? join(map(toPairs(pickBy(options)), item => join(item, '=')), '&')
    : '';
  return {
    type: GET_SUMMARY_BOX_SEARCH_RESULTS,
    request: {
      op: 'get',
      path: `${url}/@search${querystring ? `?${querystring}` : ''}`,
    },
  };
}

/**
 * Reset search results function.
 * @function resetSummaryBoxSearch
 * @returns {Object} Reset search results action.
 */
export function resetSummaryBoxSearch() {
  return {
    type: RESET_SUMMARY_BOX_SEARCH,
  };
}

/**
 * Get tile content.
 * @function getSummaryBoxContent
 * @param {string} url Path of the item
 * @returns {Object} Get tile content action.
 */
export function getSummaryBoxContent(url) {
  return {
    type: GET_SUMMARY_BOX_CONTENT,
    request: {
      op: 'get',
      path: `${url}?include_items=false`,
    },
  };
}

/**
 * Reset tile content function.
 * @function resetSummaryBoxContent
 * @returns {Object} Reset tile content action.
 */
export function resetSummaryBoxContent() {
  return {
    type: RESET_SUMMARY_BOX_CONTENT,
  };
}
