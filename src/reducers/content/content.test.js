import config from '~/config';
import content from './content';
import {
  CREATE_CONTENT,
  DELETE_CONTENT,
  UPDATE_CONTENT,
  GET_CONTENT,
} from '../../constants/ActionTypes';

describe('Content reducer', () => {
  it('should return the initial state', () => {
    expect(content()).toEqual({
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
      order: {
        loaded: false,
        loading: false,
        error: null,
      },
      data: null,
    });
  });

  it('should handle CREATE_CONTENT_PENDING', () => {
    expect(
      content(undefined, {
        type: `${CREATE_CONTENT}_PENDING`,
      }),
    ).toMatchObject({
      create: {
        loaded: false,
        loading: true,
        error: null,
      },
    });
  });

  it('should handle CREATE_CONTENT_SUCCESS', () => {
    expect(
      content(undefined, {
        type: `${CREATE_CONTENT}_SUCCESS`,
        result: {
          items: [
            {
              '@id': `${config.apiPath}/home-page`,
            },
          ],
        },
      }),
    ).toMatchObject({
      create: {
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

  it('should handle CREATE_CONTENT_FAIL', () => {
    expect(
      content(undefined, {
        type: `${CREATE_CONTENT}_FAIL`,
        error: 'failed',
      }),
    ).toMatchObject({
      create: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
      data: null,
    });
  });

  it('should handle DELETE_CONTENT_PENDING', () => {
    expect(
      content(undefined, {
        type: `${DELETE_CONTENT}_PENDING`,
      }),
    ).toMatchObject({
      delete: {
        loaded: false,
        loading: true,
        error: null,
      },
    });
  });

  it('should handle DELETE_CONTENT_SUCCESS', () => {
    expect(
      content(undefined, {
        type: `${DELETE_CONTENT}_SUCCESS`,
      }),
    ).toMatchObject({
      delete: {
        loaded: true,
        loading: false,
        error: null,
      },
    });
  });

  it('should handle DELETE_CONTENT_FAIL', () => {
    expect(
      content(undefined, {
        type: `${DELETE_CONTENT}_FAIL`,
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

  it('should handle UPDATE_CONTENT_PENDING', () => {
    expect(
      content(undefined, {
        type: `${UPDATE_CONTENT}_PENDING`,
      }),
    ).toMatchObject({
      update: {
        loaded: false,
        loading: true,
        error: null,
      },
    });
  });

  it('should handle UPDATE_CONTENT_SUCCESS', () => {
    expect(
      content(undefined, {
        type: `${UPDATE_CONTENT}_SUCCESS`,
      }),
    ).toMatchObject({
      update: {
        loaded: true,
        loading: false,
        error: null,
      },
    });
  });

  it('should handle UPDATE_CONTENT_FAIL', () => {
    expect(
      content(undefined, {
        type: `${UPDATE_CONTENT}_FAIL`,
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

  it('should handle GET_CONTENT_PENDING', () => {
    expect(
      content(undefined, {
        type: `${GET_CONTENT}_PENDING`,
      }),
    ).toMatchObject({
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
        type: `${GET_CONTENT}_SUCCESS`,
        result: {
          items: [
            {
              '@id': `${config.apiPath}/home-page`,
            },
          ],
        },
      }),
    ).toMatchObject({
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
        type: `${GET_CONTENT}_FAIL`,
        error: 'failed',
      }),
    ).toMatchObject({
      get: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
      data: null,
    });
  });
});
