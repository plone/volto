import actions from './actions';
import { GET_ACTIONS } from '../../constants/ActionTypes';

describe('Actions reducer', () => {
  it('should return the initial state', () => {
    expect(actions()).toEqual({
      error: null,
      actions: [],
      loaded: false,
      loading: false,
    });
  });

  it('should handle GET_ACTIONS_PENDING', () => {
    expect(
      actions(undefined, {
        type: `${GET_ACTIONS}_PENDING`,
      }),
    ).toEqual({
      error: null,
      actions: [],
      loaded: false,
      loading: true,
    });
  });

  it('should handle GET_ACTIONS_SUCCESS', () => {
    expect(
      actions(undefined, {
        type: `${GET_ACTIONS}_SUCCESS`,
        result: {
          actions: [],
        },
      }),
    ).toEqual({
      error: null,
      actions: [],
      loaded: true,
      loading: false,
    });
  });

  it('should handle GET_ACTIONS_FAIL', () => {
    expect(
      actions(undefined, {
        type: `${GET_ACTIONS}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      error: 'failed',
      actions: [],
      loaded: false,
      loading: false,
    });
  });
});
