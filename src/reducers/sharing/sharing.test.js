import sharing from './sharing';
import { EDIT_SHARING, GET_SHARING } from '../../constants/ActionTypes';

describe('Sharing reducer', () => {
  it('should return the initial state', () => {
    expect(sharing()).toEqual({
      edit: {
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

  it('should handle EDIT_SHARING_PENDING', () => {
    expect(
      sharing(undefined, {
        type: `${EDIT_SHARING}_PENDING`,
      }),
    ).toEqual({
      edit: {
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

  it('should handle EDIT_SHARING_SUCCESS', () => {
    expect(
      sharing(undefined, {
        type: `${EDIT_SHARING}_SUCCESS`,
      }),
    ).toEqual({
      edit: {
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

  it('should handle EDIT_SHARING_FAIL', () => {
    expect(
      sharing(undefined, {
        type: `${EDIT_SHARING}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      edit: {
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
      edit: {
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
      edit: {
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
      edit: {
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
