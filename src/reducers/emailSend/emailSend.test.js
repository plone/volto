import emailSend from './emailSend';
import { EMAIL_SEND } from '@plone/volto/constants/ActionTypes';

describe('emailSend reducer', () => {
  it('should return the initial state', () => {
    expect(emailSend()).toEqual({
      error: null,
      loaded: false,
      loading: false,
    });
  });

  it('should handle EMAIL_SEND_PENDING', () => {
    expect(
      emailSend(undefined, {
        type: `${EMAIL_SEND}_PENDING`,
      }),
    ).toEqual({
      error: null,
      loaded: false,
      loading: true,
    });
  });

  it('should handle EMAIL_SEND_SUCCESS', () => {
    expect(
      emailSend(undefined, {
        type: `${EMAIL_SEND}_SUCCESS`,
      }),
    ).toEqual({
      error: null,
      loaded: true,
      loading: false,
    });
  });

  it('should handle EMAIL_SEND_FAIL', () => {
    expect(
      emailSend(undefined, {
        type: `${EMAIL_SEND}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      error: 'failed',
      loaded: false,
      loading: false,
    });
  });
});
