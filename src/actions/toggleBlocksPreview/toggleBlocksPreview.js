import { TOGGLE_BLOCKS_PREVIEW } from '@plone/volto/constants/ActionTypes';

/**
 * Function .
 * @function setToggleBlocksPreview
 * @param {value} value boolean
 * @returns {Object} toggle action.
 */
export function setToggleBlocksPreview(value) {
  return {
    type: TOGGLE_BLOCKS_PREVIEW,
    toggle: value,
  };
}
