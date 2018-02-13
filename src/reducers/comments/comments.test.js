import comments from './comments';
import { ADD_COMMENT, GET_COMMENTS } from '../../constants/ActionTypes';

describe('Content reducer', () => {
  it('should return the initial state', () => {
    expect(comments()).toEqual({
      add: {
        loaded: false,
        loading: false,
        error: null,
      },
      delete: {
        loaded: false,
        loading: false,
        error: null,
      },
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
      items: [],
    });
  });

  it('should handle ADD_COMMENT_PENDING', () => {
    expect(
      comments(undefined, {
        type: `${ADD_COMMENT}_PENDING`,
      }),
    ).toEqual({
      add: {
        loaded: false,
        loading: true,
        error: null,
      },
      delete: {
        error: null,
        loaded: false,
        loading: false,
      },
      edit: {
        error: null,
        loaded: false,
        loading: false,
      },
      get: {
        loaded: false,
        loading: false,
        error: null,
      },
      items: [],
    });
  });

  it('should handle ADD_COMMENT_SUCCESS', () => {
    expect(
      comments(undefined, {
        type: `${ADD_COMMENT}_SUCCESS`,
      }),
    ).toEqual({
      add: {
        loaded: true,
        loading: false,
        error: null,
      },
      delete: {
        error: null,
        loaded: false,
        loading: false,
      },
      edit: {
        error: null,
        loaded: false,
        loading: false,
      },
      get: {
        loaded: false,
        loading: false,
        error: null,
      },
      items: [],
    });
  });

  it('should handle ADD_COMMENT_FAIL', () => {
    expect(
      comments(undefined, {
        type: `${ADD_COMMENT}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      add: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
      delete: {
        error: null,
        loaded: false,
        loading: false,
      },
      edit: {
        error: null,
        loaded: false,
        loading: false,
      },
      get: {
        loaded: false,
        loading: false,
        error: null,
      },
      items: [],
    });
  });

  it('should handle GET_COMMENTS_PENDING', () => {
    expect(
      comments(undefined, {
        type: `${GET_COMMENTS}_PENDING`,
      }),
    ).toEqual({
      add: {
        loaded: false,
        loading: false,
        error: null,
      },
      delete: {
        error: null,
        loaded: false,
        loading: false,
      },
      edit: {
        error: null,
        loaded: false,
        loading: false,
      },
      get: {
        loaded: false,
        loading: true,
        error: null,
      },
      items: [],
    });
  });

  it('should handle GET_COMMENTS_SUCCESS', () => {
    expect(
      comments(undefined, {
        type: `${GET_COMMENTS}_SUCCESS`,
        result: { items: 'comments' },
      }),
    ).toEqual({
      add: {
        loaded: false,
        loading: false,
        error: null,
      },
      delete: {
        error: null,
        loaded: false,
        loading: false,
      },
      edit: {
        error: null,
        loaded: false,
        loading: false,
      },
      get: {
        loaded: true,
        loading: false,
        error: null,
      },
      items: 'comments',
    });
  });

  it('should handle GET_COMMENTS_FAIL', () => {
    expect(
      comments(undefined, {
        type: `${GET_COMMENTS}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      add: {
        loaded: false,
        loading: false,
        error: null,
      },
      delete: {
        error: null,
        loaded: false,
        loading: false,
      },
      edit: {
        error: null,
        loaded: false,
        loading: false,
      },
      get: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
      items: [],
    });
  });
});
