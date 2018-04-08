/**
 * Tiles reducer.
 * @module reducers/tiles/tiles
 */

import { GET_TILES } from '../../constants/ActionTypes';

const initialState = {
  error: null,
  tiles: [],
  loaded: false,
  loading: false,
};

/**
 * Tiles reducer.
 * @function tiles
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function tiles(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_TILES}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_TILES}_SUCCESS`:
      return {
        ...state,
        error: null,
        tiles: action.result.tiles,
        loaded: true,
        loading: false,
      };
    case `${GET_TILES}_FAIL`:
      return {
        ...state,
        error: action.error,
        tiles: [],
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
