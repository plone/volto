import querystring from './querystring';
import { GET_QUERYSTRING } from '../../constants/ActionTypes';

describe('Querystring reducer', () => {
  it('should return the initial state', () => {
    expect(querystring()).toEqual({
      error: null,
      fields: [],
      operations: [],
      loaded: false,
      loading: false,
    });
  });

  it('should handle GET_QUERYSTRING_PENDING', () => {
    expect(
      querystring(undefined, {
        type: `${GET_QUERYSTRING}_PENDING`,
      }),
    ).toEqual({
      error: null,
      fields: [],
      operations: [],
      loaded: false,
      loading: true,
    });
  });

  it('should handle GET_QUERYSTRING_SUCCESS', () => {
    expect(
      querystring(undefined, {
        type: `${GET_QUERYSTRING}_SUCCESS`,
        result: {
          fields: 'fields',
          operations: 'operations',
        },
      }),
    ).toEqual({
      error: null,
      fields: 'fields',
      operations: 'operations',
      loaded: true,
      loading: false,
    });
  });

  it('should handle GET_QUERYSTRING_FAIL', () => {
    expect(
      querystring(undefined, {
        type: `${GET_QUERYSTRING}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      error: 'failed',
      fields: [],
      operations: [],
      loaded: false,
      loading: false,
    });
  });
});
