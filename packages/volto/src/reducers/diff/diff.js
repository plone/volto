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

      let first_result = action.result[0];
      let second_result = action.result[1];
      if (first_result['@static_behaviors']) {
        map(first_result['@static_behaviors'], (behavior) => {
          first_result = {
            ...omit(first_result, behavior),
            ...mapKeys(
              first_result[behavior],
              (value, key) => `${behavior}.${key}`,
            ),
          };
        });
      }
      if (second_result['@static_behaviors']) {
        map(second_result['@static_behaviors'], (behavior) => {
          second_result = {
            ...omit(second_result, behavior),
            ...mapKeys(
              second_result[behavior],
              (value, key) => `${behavior}.${key}`,
            ),
          };
        });
      }
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
