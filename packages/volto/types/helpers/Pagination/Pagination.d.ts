/**
 * Pagination helpers.
 * @module helpers/Pagination/Pagination
 */
/**
 * A value that is meant to represent an integer, but which reaches us from
 * user-editable block settings. The querystring widget stores `offset`,
 * `limit` and `b_size` as JSON schema `number` fields, so a value may arrive
 * as a string (`'3'`), as a float (`3.7`), or not at all.
 */
export type IntegerLike = number | string | null | undefined;
/**
 * Compute the `b_start` index for a `@querystring-search` request: the index
 * of the first item the backend should return for the requested page.
 *
 * `offset` shifts the whole result set, letting a listing skip the first N
 * items of its query while paginating over the remainder.
 *
 * Every parameter is coerced to an integer and the result is always a
 * non-negative integer, so a malformed block setting degrades to a sane batch
 * rather than sending `NaN` to the backend. When neither `bSize` nor
 * `defaultPageSize` yields a positive batch size, paging cannot be applied and
 * the result is `offset` alone.
 * @function computeBStart
 * @param {IntegerLike} page 1-based page number. Defaults to the first page.
 * @param {IntegerLike} offset Number of leading items to skip. Defaults to 0.
 * @param {IntegerLike} bSize Batch size configured on the block, if any.
 * @param {IntegerLike} defaultPageSize Batch size to use when bSize is unset.
 * @returns {number} A non-negative integer `b_start` index.
 */
export declare function computeBStart(page: IntegerLike, offset: IntegerLike, bSize: IntegerLike, defaultPageSize: IntegerLike): number;
/**
 * Compute the effective `limit` for a `@querystring-search` request.
 *
 * A listing that skips the first `offset` items still wants `limit` items
 * afterwards, so the backend has to return the skipped items on top of the
 * wanted ones: `offset + limit`.
 *
 * A limit of zero, or one that resolves to no usable number, means "no limit"
 * — matching `plone.app.querystring`'s querybuilder, whose `limit` defaults to
 * 0 and is only applied when truthy. Returning `offset` in that case would cap
 * the batch at the very items the listing is about to skip, leaving it empty.
 * @function computeLimit
 * @param {IntegerLike} offset Number of leading items to skip. Defaults to 0.
 * @param {IntegerLike} limit Number of items the listing wants, if capped.
 * @returns {number | null} A positive integer limit, or null for no limit.
 */
export declare function computeLimit(offset: IntegerLike, limit: IntegerLike): number | null;
/**
 * Compute how many items a listing can actually show.
 *
 * The `items_total` reported by `@querystring-search` is the length of the
 * whole result set: `plone.restapi`'s HypermediaBatch derives it from the
 * sequence length, so `b_start` never reduces it. The items an offset skips
 * are counted in there even though the listing never renders them.
 * @function computeVisibleTotal
 * @param {IntegerLike} total The `items_total` reported by the backend.
 * @param {IntegerLike} offset Number of leading items skipped. Defaults to 0.
 * @returns {number} A non-negative integer count of reachable items.
 */
export declare function computeVisibleTotal(total: IntegerLike, offset: IntegerLike): number;
/**
 * Compute how many pages a listing spans.
 *
 * `total` is expected to be the reachable item count, so pass the result of
 * `computeVisibleTotal` for an offset listing rather than the raw backend
 * total. Otherwise the listing advertises pages that resolve to an empty batch.
 * @function computeTotalPages
 * @param {IntegerLike} total Number of items the listing can show.
 * @param {IntegerLike} bSize Batch size, i.e. items per page.
 * @returns {number} A non-negative integer page count, 0 when there is no
 * usable batch size.
 */
export declare function computeTotalPages(total: IntegerLike, bSize: IntegerLike): number;
