import { emailSend } from './emailSend';
import { EMAIL_SEND } from '@plone/volto/constants/ActionTypes';

describe('Send email message', () => {
  describe('emailSend', () => {
    it('should create an action to send a mail notification', () => {
      const action = emailSend(
        'John Doe',
        'john@doe.com',
        'jane@doe.com',
        'Hello!',
        'Just want to say hi.',
      );

      expect(action.type).toEqual(EMAIL_SEND);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual('/@email-send');
      expect(action.request.data).toEqual({
        name: 'John Doe',
        from: 'john@doe.com',
        to: 'jane@doe.com',
        subject: 'Hello!',
        message: 'Just want to say hi.',
      });
    });
  });
});
