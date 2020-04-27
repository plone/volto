/**
 * Translations reducer.
 * @module reducers/translations/translations
 */
import { flattenToAppURL } from '@plone/volto/helpers';

import { GET_TRANSLATION_LOCATOR } from '@plone/volto/constants/ActionTypes';

const initialState = {
  error: null,
  translationLocation: null,
  loaded: false,
  loading: false,
};

/**
 * Translations reducer.
 * @function translations
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function translations(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_TRANSLATION_LOCATOR}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_TRANSLATION_LOCATOR}_SUCCESS`:
      return {
        ...state,
        error: null,
        translationLocation: flattenToAppURL(action.result['@id']),
        loaded: true,
        loading: false,
      };
    case `${GET_TRANSLATION_LOCATOR}_FAIL`:
      return {
        ...state,
        error: action.error,
        translationLocation: null,
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
