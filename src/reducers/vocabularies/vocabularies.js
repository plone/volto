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
  const vocabState = state[action.vocabBaseUrl] || {};
  let items;
  switch (action.type) {
    case `${GET_VOCABULARY}_PENDING`:
      return {
        ...state,
        [action.vocabBaseUrl]: {
          error: null,
          loaded: vocabState.loaded || false,
          loading: (vocabState.loading || 0) + 1,
          items: [],
        },
      };
    case `${GET_VOCABULARY}_SUCCESS`:
      items = [...vocabState.items];
      items.splice(
        action.start,
        action.result.items.length,
        ...action.result.items,
      );
      return {
        ...state,
        [action.vocabBaseUrl]: {
          error: null,
          loaded: true,
          loading: vocabState.loading - 1,
          items,
          batching: action.result.batching,
        },
      };
    case `${GET_VOCABULARY}_FAIL`:
      return {
        ...state,
        [action.vocabBaseUrl]: {
          error: action.error,
          loaded: false,
          loading: vocabState.loading - 1,
        },
      };
    default:
      return state;
  }
}
