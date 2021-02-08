import comments from './groups';
import {
  CREATE_GROUP,
  DELETE_GROUP,
  GET_GROUP,
  LIST_GROUPS,
  UPDATE_GROUP,
} from '@plone/volto/constants/ActionTypes';

describe('Groups reducer', () => {
  it('should return the initial state', () => {
    expect(comments()).toEqual({
      create: {
        loaded: false,
        loading: false,
        error: null,
      },
      delete: {
        loaded: false,
        loading: false,
        error: null,
      },
      get: {
        loaded: false,
        loading: false,
        error: null,
      },
      list: {
        loaded: false,
        loading: false,
        error: null,
      },
      update: {
        loaded: false,
        loading: false,
        error: null,
      },
      group: {},
      groups: [],
    });
  });

  it('should handle CREATE_GROUP_PENDING', () => {
    expect(
      comments(undefined, {
        type: `${CREATE_GROUP}_PENDING`,
      }),
    ).toMatchObject({
      create: {
        loaded: false,
        loading: true,
        error: null,
      },
    });
  });

  it('should handle CREATE_GROUP_SUCCESS', () => {
    expect(
      comments(undefined, {
        type: `${CREATE_GROUP}_SUCCESS`,
      }),
    ).toMatchObject({
      create: {
        loaded: true,
        loading: false,
        error: null,
      },
    });
  });

  it('should handle CREATE_GROUP_FAIL', () => {
    expect(
      comments(undefined, {
        type: `${CREATE_GROUP}_FAIL`,
        error: 'failed',
      }),
    ).toMatchObject({
      create: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
    });
  });

  it('should handle DELETE_GROUP_PENDING', () => {
    expect(
      comments(undefined, {
        type: `${DELETE_GROUP}_PENDING`,
      }),
    ).toMatchObject({
      delete: {
        loaded: false,
        loading: true,
        error: null,
      },
    });
  });

  it('should handle DELETE_GROUP_SUCCESS', () => {
    expect(
      comments(undefined, {
        type: `${DELETE_GROUP}_SUCCESS`,
      }),
    ).toMatchObject({
      delete: {
        loaded: true,
        loading: false,
        error: null,
      },
    });
  });

  it('should handle DELETE_GROUP_FAIL', () => {
    expect(
      comments(undefined, {
        type: `${DELETE_GROUP}_FAIL`,
        error: 'failed',
      }),
    ).toMatchObject({
      delete: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
    });
  });

  it('should handle GET_GROUP_PENDING', () => {
    expect(
      comments(undefined, {
        type: `${GET_GROUP}_PENDING`,
      }),
    ).toMatchObject({
      get: {
        loaded: false,
        loading: true,
        error: null,
      },
    });
  });

  it('should handle GET_GROUP_SUCCESS', () => {
    expect(
      comments(undefined, {
        type: `${GET_GROUP}_SUCCESS`,
        result: 'group',
      }),
    ).toMatchObject({
      get: {
        loaded: true,
        loading: false,
        error: null,
      },
      group: 'group',
    });
  });

  it('should handle GET_GROUP_FAIL', () => {
    expect(
      comments(undefined, {
        type: `${GET_GROUP}_FAIL`,
        error: 'failed',
      }),
    ).toMatchObject({
      get: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
      group: {},
    });
  });

  it('should handle LIST_GROUPS_PENDING', () => {
    expect(
      comments(undefined, {
        type: `${LIST_GROUPS}_PENDING`,
      }),
    ).toMatchObject({
      list: {
        loaded: false,
        loading: true,
        error: null,
      },
    });
  });

  it('should handle LIST_GROUPS_SUCCESS', () => {
    expect(
      comments(undefined, {
        type: `${LIST_GROUPS}_SUCCESS`,
        result: 'group',
      }),
    ).toMatchObject({
      list: {
        loaded: true,
        loading: false,
        error: null,
      },
      groups: 'group',
    });
  });

  it('should handle LIST_GROUPS_FAIL', () => {
    expect(
      comments(undefined, {
        type: `${LIST_GROUPS}_FAIL`,
        error: 'failed',
      }),
    ).toMatchObject({
      list: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
      groups: [],
    });
  });

  it('should handle UPDATE_GROUP_PENDING', () => {
    expect(
      comments(undefined, {
        type: `${UPDATE_GROUP}_PENDING`,
      }),
    ).toMatchObject({
      update: {
        loaded: false,
        loading: true,
        error: null,
      },
    });
  });

  it('should handle UPDATE_GROUP_SUCCESS', () => {
    expect(
      comments(undefined, {
        type: `${UPDATE_GROUP}_SUCCESS`,
      }),
    ).toMatchObject({
      update: {
        loaded: true,
        loading: false,
        error: null,
      },
    });
  });

  it('should handle UPDATE_GROUP_FAIL', () => {
    expect(
      comments(undefined, {
        type: `${UPDATE_GROUP}_FAIL`,
        error: 'failed',
      }),
    ).toMatchObject({
      update: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
    });
  });
});
