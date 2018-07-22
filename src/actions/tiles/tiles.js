/**
 * Tiles actions.
 * @module actions/tiles/tiles
 */

import { GET_TILES } from '../../constants/ActionTypes';

/**
 * Get tiles.
 * @function getTiles
 * @returns {Object} Get tiles action.
 */
export function getTiles() {
  return {
    type: GET_TILES,
    request: {
      op: 'get',
      path: '/@tiles',
    },
  };
}
