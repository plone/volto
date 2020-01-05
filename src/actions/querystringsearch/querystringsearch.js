import { GET_QUERYSTRING_RESULTS } from '../../constants/ActionTypes';

/**
 * Get querystring results.
 * @function getQueryStringResults
 * @param {Object} data Data.
 * @returns {Object} Get querystringsearch results action.
 */
export function getQueryStringResults(path, data, subrequest) {
  // fixes https://github.com/plone/volto/issues/1059
  const fixedQuery = data?.query?.map(queryElem => {
    if (queryElem.o === 'plone.app.querystring.operation.string.relativePath') {
      return {
        ...queryElem,
        v: `${path}/${queryElem.v}`,
      };
    }
    return queryElem;
  });

  return {
    type: GET_QUERYSTRING_RESULTS,
    subrequest,
    request: {
      op: 'post',
      path: '/@querystring-search',
      data: {
        ...data,
        query: fixedQuery,
      },
    },
  };
}
