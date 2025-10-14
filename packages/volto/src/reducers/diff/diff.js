/**
 * Diff reducer.
 * @module reducers/diff/diff
 */

import { GET_DIFF } from '@plone/volto/constants/ActionTypes';

import map from 'lodash/map';
import mapKeys from 'lodash/mapKeys';
import omit from 'lodash/omit';

const initialState = {
  error: null,
  data: [],
  loaded: false,
  loading: false,
};

/**
 * Flattens static behaviors into the parent object with dot-notation keys.
 * @function flattenStaticBehaviors
 * @param {Object} result The result object containing static behaviors.
 * @returns {Object} Result object with flattened static behaviors.
 */
function flattenStaticBehaviors(result) {
  if (!result['@static_behaviors']) {
    return result;
  }

  let flattened = result;
  map(result['@static_behaviors'], (behavior) => {
    flattened = {
      ...omit(flattened, behavior),
      ...mapKeys(flattened[behavior], (value, key) => `${behavior}.${key}`),
    };
  });

  return flattened;
}

/**
 * Diff reducer.
 * @function diff
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function diff(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_DIFF}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_DIFF}_SUCCESS`:
      if (!Array.isArray(action.result)) {
        return {
          ...state,
          error: null,
          data: action.result,
          loaded: true,
          loading: false,
        };
      }

      const first_result = flattenStaticBehaviors(action.result[0]);
      const second_result = flattenStaticBehaviors(action.result[1]);

      return {
        ...state,
        error: null,
        data: [first_result, second_result],
        loaded: true,
        loading: false,
      };
    case `${GET_DIFF}_FAIL`:
      return {
        ...state,
        error: action.error,
        data: [],
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
