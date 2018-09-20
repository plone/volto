/**
 * Tiles helper.
 * @module helpers/Tiles
 */

import { endsWith, find, keys } from 'lodash';

/**
 * Get tiles field.
 * @function getTilesFieldname
 * @param {Object} props Properties.
 * @return {string} Field name of the tiles
 */
export function getTilesFieldname(props) {
  return find(keys(props), key => endsWith(key, 'tiles')) || 'tiles';
}

/**
 * Get tiles layout field.
 * @function getTilesLayoutFieldname
 * @param {Object} props Properties.
 * @return {string} Field name of the tiles layout
 */
export function getTilesLayoutFieldname(props) {
  return (
    find(keys(props), key => endsWith(key, 'tiles_layout')) || 'tiles_layout'
  );
}

/**
 * Has tiles data.
 * @function hasTilesData
 * @param {Object} props Properties.
 * @return {boolean} True if it has tiles data.
 */
export function hasTilesData(props) {
  return find(keys(props), key => endsWith(key, 'tiles')) !== undefined;
}
