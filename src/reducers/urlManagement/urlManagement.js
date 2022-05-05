import { GET_ALIASES } from '@plone/volto/constants/ActionTypes';

/**
 * Alias reducer.
 * @module reducers/urlManagement/urlManagement
 */

// const initialState = {
//   update: {
//     loaded: false,
//     loading: false,
//     error: null,
//   },
//   get: {
//     loaded: false,
//     loading: false,
//     error: null,
//   },
//   data: {
//     available_roles: [],
//     entries: [],
//     inherit: null,
//   },
// };

/**
 * Aliases reducer.
 * @function aliases
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function aliases(state = {}, action = {}) {
  switch (action.type) {
    case `${GET_ALIASES}_PENDING`:
      return {
        ...state,
      };
    case `${GET_ALIASES}_SUCCESS`:
      return {
        ...state,
        data: action.result.aliases,
      };
    case `${GET_ALIASES}_FAIL`:
      return {
        ...state,
      };
    default:
      return state;
  }
}
