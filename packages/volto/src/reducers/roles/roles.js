/**
 * Roles reducer.
 * @module reducers/roles/roles
 */

import { LIST_ROLES } from '@plone/volto/constants/ActionTypes';

const initialState = {
  error: null,
  roles: [],
  loaded: false,
  loading: false,
};

/**
 * Roles reducer.
 * @function roles
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function roles(state = initialState, action = {}) {
  switch (action.type) {
    case `${LIST_ROLES}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${LIST_ROLES}_SUCCESS`:
      return {
        ...state,
        error: null,
        roles: action.result,
        loaded: true,
        loading: false,
      };
    case `${LIST_ROLES}_FAIL`:
      return {
        ...state,
        error: action.error,
        roles: [],
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
