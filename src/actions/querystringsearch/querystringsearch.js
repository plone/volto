import { GET_QUERYSTRING_RESULTS } from '@plone/volto/constants/ActionTypes';
import config from '@plone/volto/registry';

/**
 * Get querystring results.
 * @function getQueryStringResults
 * @param {Object} data Data.
 * @returns {Object} Get querystringsearch results action.
 */
export function getQueryStringResults(path, data, subrequest, page) {
  const { settings } = config;
  // fixes https://github.com/plone/volto/issues/1059

  let requestData = JSON.parse(JSON.stringify(data));
  if (data?.depth != null) {
    delete requestData.depth;
    requestData.query.forEach((q) => {
      if (q.i === 'path') {
        q.v += '::' + data.depth;
      }
    });
  }

  return {
    type: GET_QUERYSTRING_RESULTS,
    subrequest,
    request: {
      op: 'post',
      path: `${path}/@querystring-search`,
      data: {
        ...requestData,
        ...(!requestData.b_size && {
          b_size: settings.defaultPageSize,
        }),
        ...(page && {
          b_start: requestData.b_size
            ? data.b_size * (page - 1)
            : settings.defaultPageSize * (page - 1),
        }),
        query: requestData?.query,
      },
    },
  };
}
