import comments from './comments';
import { ADD_COMMENT, LIST_COMMENTS } from '@plone/volto/constants/ActionTypes';

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
      update: {
        loaded: false,
        loading: false,
        error: null,
      },
      list: {
        loaded: false,
        loading: false,
        error: null,
      },
      items: [],
      items_total: null,
      permissions: {},
      next: null,
    });
  });

  it('should handle ADD_COMMENT_PENDING', () => {
    expect(
      comments(undefined, {
        type: `${ADD_COMMENT}_PENDING`,
      }),
    ).toMatchObject({
      add: {
        loaded: false,
        loading: true,
        error: null,
      },
    });
  });

  it('should handle ADD_COMMENT_SUCCESS', () => {
    expect(
      comments(undefined, {
        type: `${ADD_COMMENT}_SUCCESS`,
      }),
    ).toMatchObject({
      add: {
        loaded: true,
        loading: false,
        error: null,
      },
    });
  });

  it('should handle ADD_COMMENT_FAIL', () => {
    expect(
      comments(undefined, {
        type: `${ADD_COMMENT}_FAIL`,
        error: 'failed',
      }),
    ).toMatchObject({
      add: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
    });
  });

  it('should handle LIST_COMMENTS_PENDING', () => {
    expect(
      comments(undefined, {
        type: `${LIST_COMMENTS}_PENDING`,
      }),
    ).toMatchObject({
      list: {
        loaded: false,
        loading: true,
        error: null,
      },
    });
  });

  it('should handle LIST_COMMENTS_SUCCESS', () => {
    expect(
      comments(undefined, {
        type: `${LIST_COMMENTS}_SUCCESS`,
        result: { items: 'comments' },
      }),
    ).toMatchObject({
      list: {
        loaded: true,
        loading: false,
        error: null,
      },
      items: 'comments',
    });
  });

  it('should handle LIST_COMMENTS_FAIL', () => {
    expect(
      comments(undefined, {
        type: `${LIST_COMMENTS}_FAIL`,
        error: 'failed',
      }),
    ).toMatchObject({
      list: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
    });
  });
});
