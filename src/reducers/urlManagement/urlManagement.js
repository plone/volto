import { GET_ALIASES, ADD_ALIAS } from '@plone/volto/constants/ActionTypes';

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
    case `${ADD_ALIAS}_SUCCESS`:
      return {
        ...state,
        data: [...state.data, action.added],
      };
    default:
      return state;
  }
}
