import { emailNotification } from './emailNotification';
import { EMAIL_NOTIFICATION } from '../../constants/ActionTypes';

describe('Send email notification', () => {
  describe('emailNotification', () => {
    it('should create an action to send a mail notification', () => {
      const action = emailNotification();

      expect(action.type).toEqual(EMAIL_NOTIFICATION);

      const apiMock = {
        post: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.post).toBeCalledWith('/@email-notification', {
        data: {
          from: undefined,
          message: undefined,
          name: undefined,
          subject: undefined,
        },
      });
    });
  });
});
