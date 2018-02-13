import users from './users';
import { GET_USER, EDIT_USER } from '../../constants/ActionTypes';

describe('Users reducer', () => {
  it('should return the initial state', () => {
    expect(users()).toEqual({
      user: {},
      add: {
        error: null,
        loaded: false,
        loading: false,
      },
      get: {
        error: null,
        loaded: false,
        loading: false,
      },
      edit: {
        error: null,
        loaded: false,
        loading: false,
      },
      password: {
        error: null,
        loaded: false,
        loading: false,
      },
      initial: {
        error: null,
        loaded: false,
        loading: false,
      },
    });
  });

  it('should handle GET_USER_PENDING', () => {
    expect(
      users(undefined, {
        type: `${GET_USER}_PENDING`,
      }),
    ).toEqual({
      user: {},
      add: {
        error: null,
        loaded: false,
        loading: false,
      },
      get: {
        error: null,
        loaded: false,
        loading: true,
      },
      edit: {
        error: null,
        loaded: false,
        loading: false,
      },
      password: {
        error: null,
        loaded: false,
        loading: false,
      },
      initial: {
        error: null,
        loaded: false,
        loading: false,
      },
    });
  });

  it('should handle GET_USER_SUCCESS', () => {
    expect(
      users(undefined, {
        type: `${GET_USER}_SUCCESS`,
        result: 'result',
      }),
    ).toEqual({
      user: 'result',
      add: {
        error: null,
        loaded: false,
        loading: false,
      },
      get: {
        error: null,
        loaded: true,
        loading: false,
      },
      edit: {
        error: null,
        loaded: false,
        loading: false,
      },
      password: {
        error: null,
        loaded: false,
        loading: false,
      },
      initial: {
        error: null,
        loaded: false,
        loading: false,
      },
    });
  });

  it('should handle GET_USER_FAIL', () => {
    expect(
      users(undefined, {
        type: `${GET_USER}_FAIL`,
        error: {
          error: 'failed',
        },
      }),
    ).toEqual({
      user: {},
      add: {
        error: null,
        loaded: false,
        loading: false,
      },
      get: {
        error: 'failed',
        loaded: false,
        loading: false,
      },
      edit: {
        error: null,
        loaded: false,
        loading: false,
      },
      password: {
        error: null,
        loaded: false,
        loading: false,
      },
      initial: {
        error: null,
        loaded: false,
        loading: false,
      },
    });
  });

  it('should handle EDIT_USER_SUCCESS', () => {
    expect(
      users(undefined, {
        type: `${EDIT_USER}_SUCCESS`,
      }),
    ).toEqual({
      user: {},
      add: {
        error: null,
        loaded: false,
        loading: false,
      },
      get: {
        error: null,
        loaded: false,
        loading: false,
      },
      edit: {
        error: null,
        loaded: true,
        loading: false,
      },
      password: {
        error: null,
        loaded: false,
        loading: false,
      },
      initial: {
        error: null,
        loaded: false,
        loading: false,
      },
    });
  });

  it('should handle EDIT_USER_FAIL', () => {
    expect(
      users(undefined, {
        type: `${EDIT_USER}_FAIL`,
        error: {
          error: 'failed',
        },
      }),
    ).toEqual({
      user: {},
      add: {
        error: null,
        loaded: false,
        loading: false,
      },
      get: {
        error: null,
        loaded: false,
        loading: false,
      },
      edit: {
        error: 'failed',
        loaded: false,
        loading: false,
      },
      password: {
        error: null,
        loaded: false,
        loading: false,
      },
      initial: {
        error: null,
        loaded: false,
        loading: false,
      },
    });
  });
});
