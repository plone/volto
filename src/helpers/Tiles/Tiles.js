/**
 * Tiles helper.
 * @module helpers/Tiles
 */

import { endsWith, find, keys } from 'lodash';

/**
 * Get tiles field.
 * @function getTilesFieldname
 * @param {Object} formData Form data.
 * @return {string} Field name of the tiles
 */
export function getTilesFieldname(formData) {
  return find(keys(formData), key => endsWith(key, 'tiles')) || 'tiles';
}

/**
 * Get tiles layout field.
 * @function getTilesLayoutFieldname
 * @param {Object} formData Form data.
 * @return {string} Field name of the tiles layout
 */
export function getTilesLayoutFieldname(formData) {
  return (
    find(keys(formData), key => endsWith(key, 'tiles_layout')) || 'tiles_layout'
  );
}

/**
 * Has tiles data.
 * @function hasTilesData
 * @param {Object} formData Form data.
 * @return {boolean} True if it has tiles data.
 */
export function hasTilesData(formData) {
  return (
    find(keys(formData), key => endsWith(key, 'tiles_layout')) !== undefined
  );
}
