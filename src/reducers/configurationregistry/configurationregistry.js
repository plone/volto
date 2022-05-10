/**
 * Configuration registry reducer.
 * @module reducers/configurationregistry/configurationregistry
 */

import { GET_CONFIGURATIONREGISTRY } from '@plone/volto/constants/ActionTypes';

const initialState = {
  record: {},
  records: [],
  get: {
    error: null,
    loaded: false,
    loading: false,
  },
};

/**
 * Configuration registry reducer.
 * @function registry
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function configurationregistry(
  state = initialState,
  action = {},
) {
  switch (action.type) {
    case `${GET_CONFIGURATIONREGISTRY}_PENDING`:
      return {
        ...state,
        record: {
          ...state.record,
          [action.recordidentifier]: {
            record: {},
            error: null,
            loaded: false,
            loading: true,
          },
        },
      };
    case `${GET_CONFIGURATIONREGISTRY}_SUCCESS`:
      return {
        ...state,
        record: {
          ...state.record,
          [action.recordidentifier]: {
            record: action.result,
            error: null,
            loaded: true,
            loading: false,
          },
        },
      };
    case `${GET_CONFIGURATIONREGISTRY}_FAIL`:
      return {
        ...state,
        record: {
          ...state.record,
          [action.recordidentifier]: {
            record: {},
            error: action.error,
            loaded: false,
            loading: false,
          },
        },
      };
    default:
      return state;
  }
}
