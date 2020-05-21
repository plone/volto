import { GET_QUERYSTRING_RESULTS } from '@plone/volto/constants/ActionTypes';
import { settings } from '~/config';

/**
 * Get querystring results.
 * @function getQueryStringResults
 * @param {Object} data Data.
 * @returns {Object} Get querystringsearch results action.
 */
export function getQueryStringResults(path, data, subrequest, page) {
  // fixes https://github.com/plone/volto/issues/1059
  const fixedQuery = data?.query?.map((queryElem) => {
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
      path: `${path}/@querystring-search`,
      data: {
        ...data,
        ...(!data.b_size && {
          b_size: settings.defaultPageSize,
        }),
        ...(page && {
          b_start: data.b_size
            ? data.b_size * (page - 1)
            : settings.defaultPageSize * (page - 1),
        }),
        query: fixedQuery,
      },
    },
  };
}
