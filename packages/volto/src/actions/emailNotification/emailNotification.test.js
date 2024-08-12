import { emailNotification } from './emailNotification';
import { EMAIL_NOTIFICATION } from '@plone/volto/constants/ActionTypes';

describe('Send email notification', () => {
  describe('emailNotification', () => {
    it('should create an action to send a mail notification', () => {
      const action = emailNotification();

      expect(action.type).toEqual(EMAIL_NOTIFICATION);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual('/@email-notification');
      expect(action.request.data).toEqual({
        from: undefined,
        message: undefined,
        name: undefined,
        subject: undefined,
      });
    });
  });
});
