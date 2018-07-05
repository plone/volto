import tiles from './tiles';
import { GET_TILES } from '../../constants/ActionTypes';

describe('Tiles reducer', () => {
  it('should return the initial state', () => {
    expect(tiles()).toEqual({
      error: null,
      tiles: [],
      loaded: false,
      loading: false,
    });
  });

  it('should handle GET_TILES_PENDING', () => {
    expect(
      tiles(undefined, {
        type: `${GET_TILES}_PENDING`,
      }),
    ).toEqual({
      error: null,
      tiles: [],
      loaded: false,
      loading: true,
    });
  });

  it('should handle GET_TILES_SUCCESS', () => {
    expect(
      tiles(undefined, {
        type: `${GET_TILES}_SUCCESS`,
        result: {
          tiles: [],
        },
      }),
    ).toEqual({
      error: null,
      tiles: [],
      loaded: true,
      loading: false,
    });
  });

  it('should handle GET_TILES_FAIL', () => {
    expect(
      tiles(undefined, {
        type: `${GET_TILES}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      error: 'failed',
      tiles: [],
      loaded: false,
      loading: false,
    });
  });
});
