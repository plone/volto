import { CLEAR_ERRORS } from '../../constants/ActionTypes';

export default function errors(state = [], action = {}) {
  if (action.error) return [...state, action];

  switch (action.type) {
    case CLEAR_ERRORS:
      return [];
    default:
      return state;
  }
}
