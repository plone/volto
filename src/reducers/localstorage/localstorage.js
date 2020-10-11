import {
  GET_LOCALSTORAGE,
  SET_LOCALSTORAGE,
  UNSET_LOCALSTORAGE,
  CLEAR_LOCALSTORAGE,
} from '@plone/volto/constants/ActionTypes';

const initialState = {};

export default function localstorage(state = initialState, action = {}) {
  if (__SERVER__) return state;

  switch (action.type) {
    case GET_LOCALSTORAGE:
      return state[action.key];
    case SET_LOCALSTORAGE:
      return {
        ...state,
        [action.key]: action.value,
      };
    case UNSET_LOCALSTORAGE:
      return {
        ...state,
        [action.key]: undefined,
      };
    case CLEAR_LOCALSTORAGE:
      return initialState;
    default:
      break;
  }
  return state;
}
