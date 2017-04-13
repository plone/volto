import content from './content';
import {
  ADD_CONTENT_PENDING,
  ADD_CONTENT_SUCCESS,
  ADD_CONTENT_FAIL,
  DELETE_CONTENT_PENDING,
  DELETE_CONTENT_SUCCESS,
  DELETE_CONTENT_FAIL,
  EDIT_CONTENT_PENDING,
  EDIT_CONTENT_SUCCESS,
  EDIT_CONTENT_FAIL,
  GET_CONTENT_PENDING,
  GET_CONTENT_SUCCESS,
  GET_CONTENT_FAIL,
} from '../../constants/ActionTypes';
import config from '../../config';

describe('Content reducer', () => {
  it('should return the initial state', () => {
    expect(content()).toEqual({
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
      data: null,
    });
  });

  it('should handle ADD_CONTENT_PENDING', () => {
    expect(
      content(undefined, {
        type: ADD_CONTENT_PENDING,
      }),
    ).toEqual({
      add: {
        loaded: false,
        loading: true,
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
      data: null,
    });
  });

  it('should handle ADD_CONTENT_SUCCESS', () => {
    expect(
      content(undefined, {
        type: ADD_CONTENT_SUCCESS,
      }),
    ).toEqual({
      add: {
        loaded: true,
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
      data: {
        items: undefined,
      },
    });
  });

  it('should handle ADD_CONTENT_FAIL', () => {
    expect(
      content(undefined, {
        type: ADD_CONTENT_FAIL,
        error: 'failed',
      }),
    ).toEqual({
      add: {
        loaded: false,
        loading: false,
        error: 'failed',
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
      data: null,
    });
  });

  it('should handle DELETE_CONTENT_PENDING', () => {
    expect(
      content(undefined, {
        type: DELETE_CONTENT_PENDING,
      }),
    ).toEqual({
      add: {
        loaded: false,
        loading: false,
        error: null,
      },
      delete: {
        loaded: false,
        loading: true,
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
      data: null,
    });
  });

  it('should handle DELETE_CONTENT_SUCCESS', () => {
    expect(
      content(undefined, {
        type: DELETE_CONTENT_SUCCESS,
      }),
    ).toEqual({
      add: {
        loaded: false,
        loading: false,
        error: null,
      },
      delete: {
        loaded: true,
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
      data: {
        items: undefined,
      },
    });
  });

  it('should handle DELETE_CONTENT_FAIL', () => {
    expect(
      content(undefined, {
        type: DELETE_CONTENT_FAIL,
        error: 'failed',
      }),
    ).toEqual({
      add: {
        loaded: false,
        loading: false,
        error: null,
      },
      delete: {
        loaded: false,
        loading: false,
        error: 'failed',
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
      data: null,
    });
  });

  it('should handle EDIT_CONTENT_PENDING', () => {
    expect(
      content(undefined, {
        type: EDIT_CONTENT_PENDING,
      }),
    ).toEqual({
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
        loading: true,
        error: null,
      },
      get: {
        loaded: false,
        loading: false,
        error: null,
      },
      data: null,
    });
  });

  it('should handle EDIT_CONTENT_SUCCESS', () => {
    expect(
      content(undefined, {
        type: EDIT_CONTENT_SUCCESS,
      }),
    ).toEqual({
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
        items: undefined,
      },
    });
  });

  it('should handle EDIT_CONTENT_FAIL', () => {
    expect(
      content(undefined, {
        type: EDIT_CONTENT_FAIL,
        error: 'failed',
      }),
    ).toEqual({
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
        error: 'failed',
      },
      get: {
        loaded: false,
        loading: false,
        error: null,
      },
      data: null,
    });
  });

  it('should handle GET_CONTENT_PENDING', () => {
    expect(
      content(undefined, {
        type: GET_CONTENT_PENDING,
      }),
    ).toEqual({
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
        loading: true,
        error: null,
      },
      data: null,
    });
  });

  it('should handle GET_CONTENT_SUCCESS', () => {
    expect(
      content(undefined, {
        type: GET_CONTENT_SUCCESS,
        result: {
          items: [
            {
              '@id': `${config.apiPath}/home-page`,
            },
          ],
        },
      }),
    ).toEqual({
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
        loaded: true,
        loading: false,
        error: null,
      },
      data: {
        items: [
          {
            '@id': `${config.apiPath}/home-page`,
            url: '/home-page',
          },
        ],
      },
    });
  });

  it('should handle GET_CONTENT_FAIL', () => {
    expect(
      content(undefined, {
        type: GET_CONTENT_FAIL,
        error: 'failed',
      }),
    ).toEqual({
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
        error: 'failed',
      },
      data: null,
    });
  });
});
