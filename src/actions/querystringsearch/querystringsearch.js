import { GET_QUERYSTRING_RESULTS } from '../../constants/ActionTypes';

/**
 * Get querystring results.
 * @function getQueryStringResults
 * @param {Object} data Data.
 * @returns {Object} Get querystringsearch results action.
 */
export function getQueryStringResults(data, subrequest) {
  return {
    type: GET_QUERYSTRING_RESULTS,
    subrequest,
    request: {
      op: 'post',
      path: '/@querystring-search',
      data,
    },
  };
}
