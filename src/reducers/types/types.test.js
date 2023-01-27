import types from './types';
import { GET_CONTENT, GET_TYPES } from '@plone/volto/constants/ActionTypes';
import config from '@plone/volto/registry';

describe('Types reducer', () => {
  it('should return the initial state', () => {
    expect(types()).toEqual({
      error: null,
      loaded: false,
      loading: false,
      types: [],
    });
  });

  it('should handle GET_TYPES_PENDING', () => {
    expect(
      types(undefined, {
        type: `${GET_TYPES}_PENDING`,
      }),
    ).toEqual({
      error: null,
      types: [],
      loaded: false,
      loading: true,
    });
  });

  it('should handle GET_TYPES_SUCCESS', () => {
    expect(
      types(undefined, {
        type: `${GET_TYPES}_SUCCESS`,
        result: 'My types',
      }),
    ).toEqual({
      error: null,
      loaded: true,
      loading: false,
      types: 'My types',
    });
  });

  it('should handle GET_TYPES_FAIL', () => {
    expect(
      types(undefined, {
        type: `${GET_TYPES}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      error: 'failed',
      loaded: false,
      loading: false,
      types: [],
    });
  });
});

describe('Types reducer - (TYPES)GET_CONTENT_SUCCESS', () => {
  beforeEach(() => {
    config.settings.apiExpanders = [
      {
        match: '',
        GET_CONTENT: ['types'],
      },
    ];
  });

  it('should handle (TYPES)GET_CONTENT_SUCCESS', () => {
    expect(
      types(undefined, {
        type: `${GET_CONTENT}_SUCCESS`,
        result: {
          '@components': {
            types: 'My types',
          },
        },
      }),
    ).toEqual({
      error: null,
      loaded: true,
      loading: false,
      types: 'My types',
    });
  });
});
