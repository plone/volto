/**
 * Navigation reducer.
 * @module reducers/navigation/navigation
 */

import { map } from 'lodash-es';
import {
  flattenToAppURL,
  getBaseUrl,
  hasApiExpander,
} from '@plone/volto/helpers';

import {
  GET_CONTENT,
  GET_NAVIGATION,
} from '@plone/volto/constants/ActionTypes';

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
  return map(items, (item) => ({
    url: flattenToAppURL(item['@id']),
    ...item,
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
  let hasExpander;
  switch (action.type) {
    case `${GET_NAVIGATION}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_CONTENT}_SUCCESS`:
      hasExpander = hasApiExpander(
        'navigation',
        getBaseUrl(flattenToAppURL(action.result['@id'])),
      );
      if (hasExpander && !action.subrequest) {
        return {
          ...state,
          error: null,
          items: getRecursiveItems(
            action.result['@components'].navigation.items,
          ),
          loaded: true,
          loading: false,
        };
      }
      return state;
    case `${GET_NAVIGATION}_SUCCESS`:
      // Even if the expander is set or not, if the GET_NAVIGATION is
      // called, we want it to store the data if the actions data is
      // not set in the expander data (['@components']) but in the "normal"
      // action result (we look for the object property returned by the endpoint)
      if (!action.result?.['@components'] && action.result?.items) {
        return {
          ...state,
          error: null,
          items: getRecursiveItems(action.result.items),
          loaded: true,
          loading: false,
        };
      }
      return state;
    case `${GET_NAVIGATION}_FAIL`:
      return {
        ...state,
        error: action.error,
        items: [],
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
