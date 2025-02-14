import sharing from './sharing';
import {
  UPDATE_SHARING,
  GET_SHARING,
} from '@plone/volto/constants/ActionTypes';

describe('Sharing reducer', () => {
  it('should return the initial state', () => {
    expect(sharing()).toEqual({
      update: {
        loaded: false,
        loading: false,
        error: null,
      },
      get: {
        loaded: false,
        loading: false,
        error: null,
      },
      data: {
        available_roles: [],
        entries: [],
        inherit: null,
      },
    });
  });

  it('should handle UPDATE_SHARING_PENDING', () => {
    expect(
      sharing(undefined, {
        type: `${UPDATE_SHARING}_PENDING`,
      }),
    ).toEqual({
      update: {
        loaded: false,
        loading: true,
        error: null,
      },
      get: {
        loaded: false,
        loading: false,
        error: null,
      },
      data: {
        available_roles: [],
        entries: [],
        inherit: null,
      },
    });
  });

  it('should handle UPDATE_SHARING_SUCCESS', () => {
    expect(
      sharing(undefined, {
        type: `${UPDATE_SHARING}_SUCCESS`,
      }),
    ).toEqual({
      update: {
        loaded: true,
        loading: false,
        error: null,
      },
      get: {
        loaded: false,
        loading: false,
        error: null,
      },
      data: {
        available_roles: [],
        entries: [],
        inherit: null,
      },
    });
  });

  it('should handle UPDATE_SHARING_FAIL', () => {
    expect(
      sharing(undefined, {
        type: `${UPDATE_SHARING}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      update: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
      get: {
        loaded: false,
        loading: false,
        error: null,
      },
      data: {
        available_roles: [],
        entries: [],
        inherit: null,
      },
    });
  });

  it('should handle GET_SHARING_PENDING', () => {
    expect(
      sharing(undefined, {
        type: `${GET_SHARING}_PENDING`,
      }),
    ).toEqual({
      update: {
        loaded: false,
        loading: false,
        error: null,
      },
      get: {
        loaded: false,
        loading: true,
        error: null,
      },
      data: {
        available_roles: [],
        entries: [],
        inherit: null,
      },
    });
  });

  it('should handle GET_SHARING_SUCCESS', () => {
    expect(
      sharing(undefined, {
        type: `${GET_SHARING}_SUCCESS`,
        result: 'result',
      }),
    ).toEqual({
      update: {
        loaded: false,
        loading: false,
        error: null,
      },
      get: {
        loaded: true,
        loading: false,
        error: null,
      },
      data: 'result',
    });
  });

  it('should handle GET_SHARING_FAIL', () => {
    expect(
      sharing(undefined, {
        type: `${GET_SHARING}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      update: {
        loaded: false,
        loading: false,
        error: null,
      },
      get: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
      data: {
        available_roles: [],
        entries: [],
        inherit: null,
      },
    });
  });
});
