/**
 * Vocabularies reducer.
 * @module reducers/vocabularies/vocabularies
 */

import { GET_VOCABULARY } from '../../constants/ActionTypes';

const initialState = {};

/**
 * Vocabularies reducer.
 * @function vocabularies
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function vocabularies(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_VOCABULARY}_PENDING`:
      return {
        ...state,
        [action.vocabulary]: {
          error: null,
          loaded: false,
          loading: true,
          terms: [],
        },
      };
    case `${GET_VOCABULARY}_SUCCESS`:
      return {
        ...state,
        [action.vocabulary]: {
          error: null,
          loaded: true,
          loading: false,
          terms: action.result.terms,
        },
      };
    case `${GET_VOCABULARY}_FAIL`:
      return {
        ...state,
        [action.vocabulary]: {
          error: action.error,
          loaded: false,
          loading: false,
        },
      };
    default:
      return state;
  }
}
