import { TOGGLE_BLOCKS_PREVIEW } from '@plone/volto/constants/ActionTypes';

export default function toggleBlocksPreview(state = false, action = {}) {
  switch (action.type) {
    case TOGGLE_BLOCKS_PREVIEW:
      return action.toggle;
    default:
      break;
  }
  return state;
}
