const initialState = {
  hash: null,
  data: {},
  counter: 0,
};

export default function hashlink(state = initialState, action = {}) {
  const { type, hash, data = {} } = action;
  switch (type) {
    case 'SET_HASH_LINK':
      return {
        ...state,
        hash,
        data,
        counter: state.counter + 1,
      };
    case 'RESET_HASH_LINK':
      return {
        ...state,
        hash: null,
        data: {},
        counter: 0,
      };
    default:
      return state;
  }
}
