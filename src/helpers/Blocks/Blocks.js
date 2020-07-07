/**
 * Blocks helper.
 * @module helpers/Blocks
 */

import { endsWith, find, keys } from 'lodash';

/**
 * Get blocks field.
 * @function getBlocksFieldname
 * @param {Object} props Properties.
 * @return {string} Field name of the blocks
 */
export function getBlocksFieldname(props) {
  return (
    find(
      keys(props),
      (key) => key !== 'volto.blocks' && endsWith(key, 'blocks'),
    ) || null
  );
}

/**
 * Get blocks layout field.
 * @function getBlocksLayoutFieldname
 * @param {Object} props Properties.
 * @return {string} Field name of the blocks layout
 */
export function getBlocksLayoutFieldname(props) {
  return (
    find(
      keys(props),
      (key) => key !== 'volto.blocks' && endsWith(key, 'blocks_layout'),
    ) || null
  );
}

/**
 * Has blocks data.
 * @function hasBlocksData
 * @param {Object} props Properties.
 * @return {boolean} True if it has blocks data.
 */
export function hasBlocksData(props) {
  return (
    find(
      keys(props),
      (key) => key !== 'volto.blocks' && endsWith(key, 'blocks'),
    ) !== undefined
  );
}
