import { GET_BLOCKTYPES_INDEX } from '@plone/volto/constants/ActionTypes';

const initialState = {
  error: null,
  items: {},
  loaded: false,
  loading: false,
};

export default function blocktypes(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_BLOCKTYPES_INDEX}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_BLOCKTYPES_INDEX}_SUCCESS`:
      return {
        ...state,
        error: null,
        items: action.result,
        loaded: true,
        loading: false,
      };
    case `${GET_BLOCKTYPES_INDEX}_FAIL`:
      return {
        ...state,
        error: action.error,
        items: {},
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
