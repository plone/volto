import apierror from './apierror';
import { RESET_APIERROR, SET_APIERROR } from '../../constants/ActionTypes';

describe('apierror reducer', () => {
  it('should return the initial state', () => {
    expect(apierror()).toEqual({
      error: null,
      statusCode: null,
      message: null,
      connectionRefused: false,
    });
  });

  it('should handle SET_APIERROR', () => {
    expect(
      apierror(undefined, {
        type: SET_APIERROR,
        error: {
          code: 'ECONNREFUSED',
        },
        statusCode: 'ECONNREFUSED',
        message: null,
        connectionRefused: true,
      }),
    ).toEqual({
      error: {
        code: 'ECONNREFUSED',
      },
      statusCode: 'ECONNREFUSED',
      connectionRefused: true,
      message: null,
    });
  });

  it('should handle RESET_APIERROR', () => {
    expect(
      apierror(undefined, {
        type: RESET_APIERROR,
      }),
    ).toEqual({
      error: null,
      statusCode: null,
      connectionRefused: false,
      message: null,
    });
  });
});
