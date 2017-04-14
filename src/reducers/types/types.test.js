import types from './types';
import { GET_TYPES } from '../../constants/ActionTypes';

describe('Types reducer', () => {
  it('should return the initial state', () => {
    expect(types()).toEqual({
      error: null,
      loaded: false,
      loading: false,
      types: [],
    });
  });

  it('should handle GET_TYPES_PENDING', () => {
    expect(
      types(undefined, {
        type: `${GET_TYPES}_PENDING`,
      }),
    ).toEqual({
      error: null,
      types: [],
      loaded: false,
      loading: true,
    });
  });

  it('should handle GET_TYPES_SUCCESS', () => {
    expect(
      types(undefined, {
        type: `${GET_TYPES}_SUCCESS`,
        result: 'My types',
      }),
    ).toEqual({
      error: null,
      loaded: true,
      loading: false,
      types: 'My types',
    });
  });

  it('should handle GET_TYPES_FAIL', () => {
    expect(
      types(undefined, {
        type: `${GET_TYPES}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      error: 'failed',
      loaded: false,
      loading: false,
      types: [],
    });
  });
});
