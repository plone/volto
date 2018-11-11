/**
 * Summary Box tile reducer.
 * @module reducers/tiles/summaryBox
 */

import { settings } from '~/config';

import {
  GET_SUMMARY_BOX_SEARCH_RESULTS,
  GET_SUMMARY_BOX_CONTENT,
  RESET_SUMMARY_BOX_CONTENT,
  RESET_SUMMARY_BOX_SEARCH,
} from '../../constants/ActionTypes';

const initialState = {
  errorContent: null,
  errorSearch: null,
  items: [],
  content: {},
  loadedContent: false,
  loadingContent: false,
  loadedSearch: false,
  loadingSearch: false,
};

/**
 * Summary box reducer.
 * @function summaryBox
 * @param {Object} state Current state
 * @param {Object} action Action to be handled
 * @returns {Object} New state
 */
export default function summaryBox(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_SUMMARY_BOX_SEARCH_RESULTS}_PENDING`:
      return {
        ...state,
        errorSearch: null,
        loadedSearch: false,
        loadingSearch: true,
      };
    case `${GET_SUMMARY_BOX_SEARCH_RESULTS}_SUCCESS`:
      return {
        ...state,
        errorSearch: null,
        items: action.result.items.map(item => ({
          ...item,
          '@id': item['@id'].replace(settings.apiPath, ''),
        })),
        loadedSearch: true,
        loadingSearch: false,
      };
    case `${GET_SUMMARY_BOX_SEARCH_RESULTS}_FAIL`:
      return {
        ...state,
        errorSearch: action.error,
        items: [],
        loadingSearch: false,
        loadedSearch: false,
      };
    case RESET_SUMMARY_BOX_SEARCH:
      return {
        ...state,
        errorSearch: null,
        items: [],
        loadingSearch: false,
        loadedSearch: false,
      };
    case `${GET_SUMMARY_BOX_CONTENT}_PENDING`:
      return {
        ...state,
        loadingContent: true,
        loadedContent: false,
        errorContent: null,
      };
    case `${GET_SUMMARY_BOX_CONTENT}_SUCCESS`: {
      return {
        ...state,
        content: {
          ...action.result,
        },
        loadedContent: true,
        loadingContent: false,
        errorContent: null,
      };
    }
    case `${GET_SUMMARY_BOX_CONTENT}_FAIL`:
      return {
        ...state,
        content: {},
        loadingContent: false,
        loadedContent: false,
        errorContent: action.error,
      };
    case RESET_SUMMARY_BOX_CONTENT:
      return {
        ...state,
        errorContent: null,
        content: {},
        loadingContent: false,
        loadedContent: false,
      };
    default:
      return { ...state };
  }
}
