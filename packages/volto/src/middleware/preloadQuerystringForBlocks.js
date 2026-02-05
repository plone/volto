/**
 * Preload querystring when content is loaded so Sort on dropdowns show labels
 * (e.g. "Effective date") before tests or users interact.
 * - GET_CONTENT_SUCCESS: fire for any main content so visiting "/" starts the
 *   request early; by the time an edit form with a search block opens the dropdown,
 *   sortable_indexes is often already loaded.
 * - CREATE/UPDATE_CONTENT_SUCCESS: fire only when result has blocks so after save
 *   the view has querystring before re-render.
 * @module middleware/preloadQuerystringForBlocks
 */

import {
  GET_CONTENT,
  CREATE_CONTENT,
  UPDATE_CONTENT,
} from '@plone/volto/constants/ActionTypes';
import { hasBlocksData } from '@plone/volto/helpers/Blocks/Blocks';
import { getQuerystring } from '@plone/volto/actions/querystring/querystring';

const GET_CONTENT_SUCCESS = `${GET_CONTENT}_SUCCESS`;
const CREATE_CONTENT_SUCCESS = `${CREATE_CONTENT}_SUCCESS`;
const UPDATE_CONTENT_SUCCESS = `${UPDATE_CONTENT}_SUCCESS`;

export default function preloadQuerystringForBlocks({ dispatch, getState }) {
  return (next) => (action) => {
    const result = next(action);
    if (action.subrequest || !action.result) return result;
    if (action.type === GET_CONTENT_SUCCESS) {
      dispatch(getQuerystring());
      return result;
    }
    // Only preload on save when querystring is not already loaded; otherwise
    // we'd dispatch getQuerystring(), trigger PENDING (loaded: false), and
    // overwrite good state so SortOn shows "Loading…" until the new request
    // completes instead of reusing e.g. sortable_indexes from the initial visit.
    if (
      (action.type === CREATE_CONTENT_SUCCESS ||
        action.type === UPDATE_CONTENT_SUCCESS) &&
      hasBlocksData(action.result) &&
      !getState().querystring?.loaded
    ) {
      dispatch(getQuerystring());
    }
    return result;
  };
}
