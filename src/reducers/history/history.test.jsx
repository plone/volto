import history from './history';
import { GET_HISTORY } from '../../constants/ActionTypes';

describe('History reducer', () => {
  it('should return the initial state', () => {
    expect(history()).toEqual({
      error: null,
      entries: [],
      loaded: false,
      loading: false,
    });
  });

  it('should handle GET_HISTORY_PENDING', () => {
    expect(
      history(undefined, {
        type: `${GET_HISTORY}_PENDING`,
      }),
    ).toEqual({
      error: null,
      entries: [],
      loaded: false,
      loading: true,
    });
  });

  it('should handle GET_HISTORY_SUCCESS', () => {
    expect(
      history(undefined, {
        type: `${GET_HISTORY}_SUCCESS`,
        result: 'result',
      }),
    ).toEqual({
      error: null,
      entries: 'result',
      loaded: true,
      loading: false,
    });
  });

  it('should handle GET_HISTORY_FAIL', () => {
    expect(
      history(undefined, {
        type: `${GET_HISTORY}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      error: 'failed',
      entries: [],
      loaded: false,
      loading: false,
    });
  });
});
