/**
 * Preload @querystring when content with blocks is loaded.
 * Ensures sort labels (e.g. "Effective date") are available when Search/Listing
 * blocks render, avoiding raw index keys (e.g. "effective") in the UI.
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
