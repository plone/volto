import schema from './schema';
import { GET_SCHEMA } from '../../constants/ActionTypes';

describe('Schema reducer', () => {
  it('should return the initial state', () => {
    expect(schema()).toEqual({
      error: null,
      loaded: false,
      loading: false,
      schema: null,
    });
  });

  it('should handle GET_SCHEMA_PENDING', () => {
    expect(
      schema(undefined, {
        type: `${GET_SCHEMA}_PENDING`,
      }),
    ).toEqual({
      error: null,
      schema: null,
      loaded: false,
      loading: true,
    });
  });

  it('should handle GET_SCHEMA_SUCCESS', () => {
    expect(
      schema(undefined, {
        type: `${GET_SCHEMA}_SUCCESS`,
        result: {
          required: [],
          properties: {},
        },
      }),
    ).toEqual({
      error: null,
      loaded: true,
      loading: false,
      schema: {
        fieldsets: [],
        required: [],
        properties: {},
      },
    });
  });

  it('should handle GET_SCHEMA_FAIL', () => {
    expect(
      schema(undefined, {
        type: `${GET_SCHEMA}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      error: 'failed',
      loaded: false,
      loading: false,
      schema: null,
    });
  });
});
