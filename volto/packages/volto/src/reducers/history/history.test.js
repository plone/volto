import history from './history';
import {
  GET_HISTORY,
  REVERT_HISTORY,
} from '@plone/volto/constants/ActionTypes';

describe('History reducer', () => {
  it('should return the initial state', () => {
    expect(history()).toEqual({
      entries: [],
      get: {
        error: null,
        loaded: false,
        loading: false,
      },
      revert: {
        error: null,
        loaded: false,
        loading: false,
      },
    });
  });

  it('should handle GET_HISTORY_PENDING', () => {
    expect(
      history(undefined, {
        type: `${GET_HISTORY}_PENDING`,
      }),
    ).toEqual({
      entries: [],
      get: {
        error: null,
        loaded: false,
        loading: true,
      },
      revert: {
        error: null,
        loaded: false,
        loading: false,
      },
    });
  });

  it('should handle GET_HISTORY_SUCCESS', () => {
    expect(
      history(undefined, {
        type: `${GET_HISTORY}_SUCCESS`,
        result: 'result',
      }),
    ).toEqual({
      entries: 'result',
      get: {
        error: null,
        loaded: true,
        loading: false,
      },
      revert: {
        error: null,
        loaded: false,
        loading: false,
      },
    });
  });

  it('should handle GET_HISTORY_FAIL', () => {
    expect(
      history(undefined, {
        type: `${GET_HISTORY}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      entries: [],
      get: {
        error: 'failed',
        loaded: false,
        loading: false,
      },
      revert: {
        error: null,
        loaded: false,
        loading: false,
      },
    });
  });

  it('should handle REVERT_HISTORY_SUCCESS', () => {
    expect(
      history(undefined, {
        type: `${REVERT_HISTORY}_SUCCESS`,
      }),
    ).toEqual({
      entries: [],
      get: {
        error: null,
        loaded: false,
        loading: false,
      },
      revert: {
        error: null,
        loaded: true,
        loading: false,
      },
    });
  });
});
