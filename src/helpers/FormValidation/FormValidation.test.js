import FormValidation from './FormValidation';
import { messages } from '../MessageLabels/MessageLabels';

const schema = {
  properties: {
    username: { title: 'Username', type: 'string', description: '' },
    email: { title: 'Email', type: 'string', widget: 'email', description: '' },
  },
  fieldsets: [
    { id: 'default', title: 'FIXME: User Data', fields: ['username'] },
    { id: 'second', title: 'Second: User Data', fields: ['email'] },
  ],
  required: ['username'],
};
const errors = { email: ['The specified email is not valid.'] };
const formData = { username: 'test username', email: 'test' };
const formatMessage = (messageObj) => {
  return messageObj?.defaultMessage;
};
const errorJSON =
  "[{'message': 'The specified email is not valid.', 'field': 'email', 'error': 'ValidationError'}]";

describe('FormValidation', () => {
  describe('showFirstTabWithErrors', () => {
    it('does not break without arguments', () => {
      expect(FormValidation.showFirstTabWithErrors()).toEqual(0);
    });
    it('shows the correct tab index', () => {
      expect(
        FormValidation.showFirstTabWithErrors({
          errors,
          schema,
        }),
      ).toEqual(1);
    });
  });

  describe('giveServerErrorsToCorrespondingFields', () => {
    it('does not break without arguments', () => {
      expect(FormValidation.giveServerErrorsToCorrespondingFields()).toEqual(
        {},
      );
    });
    it('fix JSON and show correct error', () => {
      expect(
        FormValidation.giveServerErrorsToCorrespondingFields(errorJSON),
      ).toEqual({ email: ['The specified email is not valid.'] });
    });
  });

  describe('validateFieldsPerFieldset', () => {
    it('does not break without arguments', () => {
      expect(FormValidation.validateFieldsPerFieldset()).toEqual({});
    });

    it('validates missing required', () => {
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema,
          formData: {},
          formatMessage,
        }),
      ).toEqual({
        username: [messages.required.defaultMessage],
      });
    });

    it('validates incorrect email', () => {
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema,
          formData,
          formatMessage,
        }),
      ).toEqual({
        email: [messages.isValidEmail.defaultMessage],
      });
    });
  });
});
