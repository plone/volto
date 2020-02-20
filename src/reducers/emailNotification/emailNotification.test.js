import emailNotification from './emailNotification';
import { EMAIL_NOTIFICATION } from '@plone/volto/constants/ActionTypes';

describe('emailNotification reducer', () => {
  it('should return the initial state', () => {
    expect(emailNotification()).toEqual({
      error: null,
      loaded: false,
      loading: false,
    });
  });

  it('should handle EMAIL_NOTIFICATION_PENDING', () => {
    expect(
      emailNotification(undefined, {
        type: `${EMAIL_NOTIFICATION}_PENDING`,
      }),
    ).toEqual({
      error: null,
      loaded: false,
      loading: true,
    });
  });

  it('should handle EMAIL_NOTIFICATION_SUCCESS', () => {
    expect(
      emailNotification(undefined, {
        type: `${EMAIL_NOTIFICATION}_SUCCESS`,
      }),
    ).toEqual({
      error: null,
      loaded: true,
      loading: false,
    });
  });

  it('should handle EMAIL_NOTIFICATION_FAIL', () => {
    expect(
      emailNotification(undefined, {
        type: `${EMAIL_NOTIFICATION}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      error: 'failed',
      loaded: false,
      loading: false,
    });
  });
});
