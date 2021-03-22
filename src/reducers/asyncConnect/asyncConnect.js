const initialState = {
  loaded: false,
  loadState: {},
};

export default function asyncConnect(state = initialState, action = {}) {
  const { key, data, error } = action;
  switch (action.type) {
    case '@redux-conn/BEGIN_GLOBAL_LOAD':
      return {
        ...state,
        loaded: false,
      };
    case '@redux-conn/END_GLOBAL_LOAD':
      return {
        ...state,
        loaded: true,
      };
    case '@redux-conn/LOAD':
      return {
        ...state,
        loadState: {
          ...state.loadState,
          [key]: {
            loading: true,
            loaded: false,
          },
        },
      };
    case '@redux-conn/LOAD_SUCCESS':
      return {
        ...state,
        loadState: {
          ...state.loadState,
          [key]: {
            loading: false,
            loaded: true,
            error: null,
          },
        },
        [key]: data,
      };
    case '@redux-conn/LOAD_FAIL':
      return {
        ...state,
        loadState: {
          ...state.loadState,
          [key]: {
            loading: false,
            loaded: false,
            error: error,
          },
        },
      };
    case '@redux-conn/CLEAR':
      return {
        ...state,
        loadState: {
          ...state.loadState,
          [key]: {
            loading: false,
            loaded: false,
            error: null,
          },
        },
        [key]: null,
      };
    default:
      break;
  }
  return state;
}
