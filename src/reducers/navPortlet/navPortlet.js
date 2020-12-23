import { GET_NAVPORTLET } from '@plone/volto/constants/ActionTypes';

export default function rawdata(state = {}, action = {}) {
  let { result, url } = action;

  switch (action.type) {
    case `${GET_NAVPORTLET}_PENDING`:
      return {
        ...state,
        [url]: {
          ...state[url],
          loading: true,
          loaded: false,
          error: undefined,
        },
      };
    case `${GET_NAVPORTLET}_SUCCESS`:
      return {
        ...state,
        [url]: {
          ...state[url],
          loading: false,
          loaded: true,
          error: undefined,
          data: result,
        },
      };
    case `${GET_NAVPORTLET}_FAIL`:
      return {
        ...state,
        [url]: {
          ...state[url],
          loading: false,
          loaded: false,
          error: action.error,
        },
      };
    default:
      break;
  }
  return state;
}
