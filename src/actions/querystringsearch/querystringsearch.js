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

  let d = JSON.parse(JSON.stringify(data));
  if (data?.depth != null) {
    delete d.depth;
    d.query.forEach((q) => {
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
        ...d,
        ...(!d.b_size && {
          b_size: settings.defaultPageSize,
        }),
        ...(page && {
          b_start: d.b_size
            ? data.b_size * (page - 1)
            : settings.defaultPageSize * (page - 1),
        }),
        query: d?.query,
      },
    },
  };
}
