/**
 * Site reducer.
 * @module reducers/site/site
 */

import { GET_SITE } from '@plone/volto/constants/ActionTypes';
import {
  flattenToAppURL,
  getBaseUrl,
  hasApiExpander,
} from '@plone/volto/helpers';
import { PortalInner } from 'semantic-ui-react';

const initialState = {
  error: null,
  site: {},
  loaded: false,
  loading: false,
};

/**
 * Actions reducer.
 * @function site
 * @param {Object} state Current state.
 * @param {Object} site Action to be handled.
 * @returns {Object} New state.
 */
export default function site(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_SITE}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_SITE}_SUCCESS`:
      return {
        ...state,
        error: null,
        site: action.result,
        loaded: true,
        loading: false,
      };

    case `${GET_SITE}_FAIL`:
      return {
        ...state,
        error: action.error,
        siteData: {},
        siteTitle: '',
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
