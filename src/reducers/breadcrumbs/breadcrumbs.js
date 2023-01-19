/**
 * Breadcrumbs reducer.
 * @module reducers/breadcrumbs/breadcrumbs
 */

import { map } from 'lodash';
import {
  flattenToAppURL,
  getBaseUrl,
  hasApiExpander,
} from '@plone/volto/helpers';

import {
  GET_BREADCRUMBS,
  GET_CONTENT,
} from '@plone/volto/constants/ActionTypes';

const initialState = {
  error: null,
  items: [],
  root: null,
  loaded: false,
  loading: false,
};

/**
 * Breadcrumbs reducer.
 * @function breadcrumbs
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function breadcrumbs(state = initialState, action = {}) {
  let hasExpander;
  switch (action.type) {
    case `${GET_BREADCRUMBS}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_CONTENT}_SUCCESS`:
      hasExpander = hasApiExpander(
        'breadcrumbs',
        getBaseUrl(flattenToAppURL(action.result['@id'])),
      );
      if (hasExpander) {
        return {
          ...state,
          error: null,
          items: map(
            action.result['@components'].breadcrumbs.items,
            (item) => ({
              title: item.title,
              url: flattenToAppURL(item['@id']),
            }),
          ),
          root: flattenToAppURL(action.result['@components'].breadcrumbs.root),
          loaded: true,
          loading: false,
        };
      }
      return state;
    case `${GET_BREADCRUMBS}_SUCCESS`:
      hasExpander = hasApiExpander(
        'breadcrumbs',
        getBaseUrl(flattenToAppURL(action.result['@id'])),
      );
      if (!hasExpander) {
        return {
          ...state,
          error: null,
          items: map(action.result.items, (item) => ({
            title: item.title,
            url: flattenToAppURL(item['@id']),
          })),
          root: flattenToAppURL(action.result.root),
          loaded: true,
          loading: false,
        };
      }
      return state;
    case `${GET_BREADCRUMBS}_FAIL`:
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
