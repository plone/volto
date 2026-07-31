/**
 * Querystring search actions.
 * @module actions/querystringsearch/querystringsearch
 */

import { GET_QUERYSTRING_RESULTS } from '@plone/volto/constants/ActionTypes';
import config from '@plone/volto/registry';
import {
  computeBStart,
  computeLimit,
  type IntegerLike,
} from '@plone/volto/helpers/Pagination/Pagination';

/**
 * A single `plone.app.querystring` criterion: index, operation, value.
 */
export interface QuerystringCriterion {
  i: string;
  o: string;
  v?: unknown;
}

/**
 * The querystring settings stored on a block. Numeric fields are typed as
 * `IntegerLike` because they are edited through JSON schema `number` widgets
 * and may reach us as strings.
 */
export interface QuerystringData {
  query?: QuerystringCriterion[];
  sort_on?: string;
  sort_order?: string | boolean | null;
  b_size?: IntegerLike;
  offset?: IntegerLike;
  limit?: IntegerLike;
  depth?: IntegerLike;
  [key: string]: unknown;
}

/**
 * The payload sent to the `@querystring-search` endpoint. `b_start` is only
 * present once a page or an offset places the batch past the beginning.
 */
export interface QuerystringSearchQuery extends QuerystringData {
  b_start?: number;
}

export interface GetQueryStringResultsAction {
  type: typeof GET_QUERYSTRING_RESULTS;
  subrequest?: string;
  request: {
    op: 'get' | 'post';
    path: string;
    data: QuerystringSearchQuery | null;
  };
}

/**
 * Get querystring results.
 * @function getQueryStringResults
 * @param {string} path Path to search under.
 * @param {QuerystringData} data Querystring settings from the block.
 * @param {string} subrequest Subrequest id used to store the results.
 * @param {IntegerLike} page 1-based page number. Defaults to the first page.
 * @returns {GetQueryStringResultsAction} Get querystringsearch results action.
 */
export function getQueryStringResults(
  path: string,
  data: QuerystringData,
  subrequest?: string,
  page?: IntegerLike,
): GetQueryStringResultsAction {
  const { settings } = config;

  // fixes https://github.com/plone/volto/issues/1059
  const requestData: QuerystringData = JSON.parse(JSON.stringify(data));

  if (data?.depth != null) {
    delete requestData.depth;
    requestData.query?.forEach((q) => {
      if (q.i === 'path') {
        // fixes https://github.com/plone/volto/issues/8349
        // Skip if depth is already embedded in the path value (e.g. set via object browser)
        const value = String(q.v);
        const hasEmbeddedDepth = /::\d+$/.test(value);
        if (!hasEmbeddedDepth) q.v = `${value}::${data.depth}`;
      }
    });
  }

  // fixes https://github.com/plone/volto/issues/2397
  if (requestData?.sort_order !== null) {
    if (typeof requestData.sort_order === 'boolean') {
      requestData.sort_order = requestData.sort_order
        ? 'descending'
        : 'ascending';
    }
  }

  const b_start = computeBStart(
    page,
    requestData.offset,
    requestData.b_size,
    settings.defaultPageSize,
  );
  // A listing that skips the first `offset` items still wants `limit` of them
  // afterwards, so the backend has to return the skipped ones on top.
  const limit = computeLimit(requestData.offset, requestData.limit);

  const query: QuerystringSearchQuery = {
    ...requestData,
    ...(!requestData.b_size && {
      b_size: settings.defaultPageSize,
    }),
    // Keep the payload as it was before offsets existed: a caller that passes
    // neither a page nor an offset gets no b_start at all, and a limit that
    // needs no raising is forwarded untouched.
    ...((page || b_start > 0) && { b_start }),
    ...(limit !== null && { limit }),
    query: requestData?.query,
  };

  return {
    type: GET_QUERYSTRING_RESULTS,
    subrequest,
    request: {
      op: settings.querystringSearchGet ? 'get' : 'post',
      path: `${path}/@querystring-search${
        settings.querystringSearchGet
          ? `?query=${encodeURIComponent(JSON.stringify(query))}`
          : ''
      }`,
      data: settings.querystringSearchGet ? null : query,
    },
  };
}
