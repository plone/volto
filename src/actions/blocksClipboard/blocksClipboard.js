import {
  SET_BLOCKS_CLIPBOARD,
  RESET_BLOCKS_CLIPBOARD,
} from '@plone/volto/constants/ActionTypes';

/**
 * Copy blocks to clipboard function.
 * @function copyBlocks
 * @param {array} blocksData Block data
 * @returns {Object} Copy action.
 */
export function setBlocksClipboard(blocksData) {
  return {
    type: SET_BLOCKS_CLIPBOARD,
    blocksData,
  };
}

/**
 * Reset blocks clipboard function.
 * @function resetBlocksClipboard
 * @returns {Object} Reset blocks clipboard
 */
export function resetBlocksClipboard() {
  return {
    type: RESET_BLOCKS_CLIPBOARD,
  };
}
