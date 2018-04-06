import users from './users';
import {
  GET_USER,
  GET_USERS,
  EDIT_PASSWORD,
  EDIT_USER,
} from '../../constants/ActionTypes';

describe('Users reducer', () => {
  it('should return the initial state', () => {
    expect(users()).toEqual({
      user: {},
      users: [],
      add: {
        error: null,
        loaded: false,
        loading: false,
      },
      delete: {
        error: null,
        loaded: false,
        loading: false,
      },
      get: {
        error: null,
        loaded: false,
        loading: false,
      },
      get_all: {
        error: null,
        loaded: false,
        loading: false,
      },
      edit: {
        error: null,
        loaded: false,
        loading: false,
      },
      edit_password: {
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
      reset: {
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
    ).toMatchObject({
      get: {
        error: null,
        loaded: false,
        loading: true,
      },
    });
  });

  it('should handle GET_USER_SUCCESS', () => {
    expect(
      users(undefined, {
        type: `${GET_USER}_SUCCESS`,
        result: 'result',
      }),
    ).toMatchObject({
      user: 'result',
      get: {
        error: null,
        loaded: true,
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
    ).toMatchObject({
      user: {},
      get: {
        error: 'failed',
        loaded: false,
        loading: false,
      },
    });
  });

  it('should handle GET_USERS_SUCCESS', () => {
    expect(
      users(undefined, {
        type: `${GET_USERS}_SUCCESS`,
        result: 'result',
      }),
    ).toMatchObject({
      users: 'result',
      get_all: {
        error: null,
        loaded: true,
        loading: false,
      },
    });
  });

  it('should handle GET_USERS_FAIL', () => {
    expect(
      users(undefined, {
        type: `${GET_USERS}_FAIL`,
        error: {
          error: 'failed',
        },
      }),
    ).toMatchObject({
      users: {},
      get_all: {
        error: 'failed',
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
    ).toMatchObject({
      edit: {
        error: null,
        loaded: true,
        loading: false,
      },
    });
  });

  it('should handle EDIT_PASSWORD_PENDING', () => {
    expect(
      users(undefined, {
        type: `${EDIT_PASSWORD}_PENDING`,
      }),
    ).toMatchObject({
      edit_password: {
        error: null,
        loaded: false,
        loading: true,
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
    ).toMatchObject({
      edit: {
        error: 'failed',
        loaded: false,
        loading: false,
      },
    });
  });
});
