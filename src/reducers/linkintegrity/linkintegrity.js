/**
 * Linkintegrity reducer.
 * @module reducers/linkintegrity/linkintegrity
 */

import { GET_LINKINTEGRITY } from '@plone/volto/constants/ActionTypes';

const initialState = {
  result: [],
  error: null,
  loaded: false,
  loading: false,
};

export default function linkintegrity(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_LINKINTEGRITY}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_LINKINTEGRITY}_SUCCESS`:
      return {
        ...state,
        result: action.result,
        error: null,
        loaded: true,
        loading: false,
      };
    case `${GET_LINKINTEGRITY}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
