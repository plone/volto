/**
 * Querystring search actions.
 * @module actions/querystringsearch/querystringsearch
 */
import { GET_QUERYSTRING_RESULTS } from '@plone/volto/constants/ActionTypes';
import { type IntegerLike } from '@plone/volto/helpers/Pagination/Pagination';
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
export declare function getQueryStringResults(path: string, data: QuerystringData, subrequest?: string, page?: IntegerLike): GetQueryStringResultsAction;
