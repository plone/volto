import diff from './diff';
import { GET_DIFF } from '@plone/volto/constants/ActionTypes';

describe('Diff reducer', () => {
  it('should return the initial state', () => {
    expect(diff()).toEqual({
      error: null,
      data: [],
      loaded: false,
      loading: false,
    });
  });

  it('should handle GET_DIFF_PENDING', () => {
    expect(
      diff(undefined, {
        type: `${GET_DIFF}_PENDING`,
      }),
    ).toEqual({
      error: null,
      data: [],
      loaded: false,
      loading: true,
    });
  });

  it('should handle GET_DIFF_SUCCESS', () => {
    expect(
      diff(undefined, {
        type: `${GET_DIFF}_SUCCESS`,
        result: 'result',
      }),
    ).toEqual({
      error: null,
      data: 'result',
      loaded: true,
      loading: false,
    });
  });

  it('should handle GET_DIFF_FAIL', () => {
    expect(
      diff(undefined, {
        type: `${GET_DIFF}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      error: 'failed',
      data: [],
      loaded: false,
      loading: false,
    });
  });
});
