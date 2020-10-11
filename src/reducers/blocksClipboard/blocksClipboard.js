import {
  SET_BLOCKS_CLIPBOARD,
  RESET_BLOCKS_CLIPBOARD,
} from '@plone/volto/constants/ActionTypes';

const initialState = {
  blocksData: [],
};

export default function blocks(state = initialState, action = {}) {
  switch (action.type) {
    case RESET_BLOCKS_CLIPBOARD:
      return initialState;
    case SET_BLOCKS_CLIPBOARD:
      return {
        blocksData: action.blocksData,
      };
    default:
      break;
  }
  return state;
}
