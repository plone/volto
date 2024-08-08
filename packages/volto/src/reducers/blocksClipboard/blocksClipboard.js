import {
  SET_BLOCKS_CLIPBOARD,
  RESET_BLOCKS_CLIPBOARD,
} from '@plone/volto/constants/ActionTypes';

const initialState = {};

export default function blocks(state = initialState, action = {}) {
  switch (action.type) {
    case RESET_BLOCKS_CLIPBOARD:
      return initialState;
    case SET_BLOCKS_CLIPBOARD:
      return {
        ...Object.assign(
          {},
          action.cut ? { cut: action.cut } : {},
          action.copy ? { copy: action.copy } : {},
        ),
      };
    default:
      break;
  }
  return state;
}
