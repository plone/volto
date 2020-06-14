/**
 * Field Schema reducer.
 * @module reducers/fieldSchema/fieldSchema
 */

import { GET_CONTENT_TYPE_FIELD_SCHEMA } from '@plone/volto/constants/ActionTypes';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  fieldSchema: null,
};

/**
 * FieldSchema reducer.
 * @function fieldSchema
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function fieldSchema(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_CONTENT_TYPE_FIELD_SCHEMA}_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      };
    case `${GET_CONTENT_TYPE_FIELD_SCHEMA}_SUCCESS`:
      return {
        ...state,
        error: null,
        loading: false,
        loaded: true,
        fieldSchema: action,
      };
    case `${GET_CONTENT_TYPE_FIELD_SCHEMA}_FAIL`:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
        fieldSchema: null,
      };
    default:
      return state;
  }
}
