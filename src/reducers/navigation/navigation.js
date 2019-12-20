/**
 * Navigation reducer.
 * @module reducers/navigation/navigation
 */

import { map } from 'lodash';
import { settings } from '~/config';

import { GET_NAVIGATION, GET_CONTENT } from '../../constants/ActionTypes';

const initialState = {
  error: null,
  items: [],
  loaded: false,
  loading: false,
};

/**
 * Recursive function that process the items returned by the navigation
 * endpoint
 * @function getRecursiveItems
 * @param {array} items The items inside a navigation response.
 * @returns {*} The navigation items object (recursive)
 */
function getRecursiveItems(items) {
  return map(items, item => ({
    title: item.title,
    url: item['@id'].replace(settings.apiPath, ''),
    ...(item.items && { items: getRecursiveItems(item.items) }),
  }));
}

/**
 * Navigation reducer.
 * @function navigation
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function navigation(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_NAVIGATION}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_CONTENT}_PENDING`:
      return settings.minimizeNetworkFetch
        ? {
            ...state,
            error: null,
            loaded: false,
            loading: true,
          }
        : state;
    case `${GET_NAVIGATION}_FAIL`:
      return {
        ...state,
        error: action.error,
        items: [],
        loaded: false,
        loading: false,
      };
    case `${GET_CONTENT}_FAIL`:
      return settings.minimizeNetworkFetch
        ? {
            ...state,
            error: action.error,
            items: [],
            loaded: false,
            loading: false,
          }
        : state;
    case `${GET_NAVIGATION}_SUCCESS`:
      return {
        ...state,
        error: null,
        items: getRecursiveItems(action.result.items),
        loaded: true,
        loading: false,
      };
    case `${GET_CONTENT}_SUCCESS`:
      return settings.minimizeNetworkFetch
        ? {
            ...state,
            error: null,
            items: getRecursiveItems(
              action.result['@components'].navigation.items,
            ),
            loaded: true,
            loading: false,
          }
        : state;
    default:
      return state;
  }
}
