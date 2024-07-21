import FormValidation from './FormValidation';
import { messages } from '../MessageLabels/MessageLabels';

const schema = {
  properties: {
    username: { title: 'Username', type: 'string', description: '' },
    email: { title: 'Email', type: 'string', widget: 'email', description: '' },
    url: { title: 'url', type: 'string', widget: 'url', description: '' },
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

    it('do not treat 0 as missing required value', () => {
      let newSchema = {
        ...schema,
        properties: {
          ...schema.properties,
          age: {
            title: 'age',
            type: 'integer',
            widget: 'number',
            description: '',
          },
        },
        required: ['age'],
      };
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: { username: 'test username', age: null },
          formatMessage,
        }),
      ).toEqual({
        age: [messages.required.defaultMessage],
      });
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: { username: 'test username', age: 0 },
          formatMessage,
        }),
      ).toEqual({});
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

    it('validates correct email', () => {
      formData.email = 'test@domain.name';
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema,
          formData,
          formatMessage,
        }),
      ).toEqual({});
    });
    it('validates incorrect url', () => {
      formData.url = 'foo';
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema,
          formData,
          formatMessage,
        }),
      ).toEqual({ url: [messages.isValidURL.defaultMessage] });
    });
    it('validates url', () => {
      formData.url = 'https://plone.org/';
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema,
          formData,
          formatMessage,
        }),
      ).toEqual({});
    });
    it('validates url with ip', () => {
      formData.url = 'http://127.0.0.1:8080/Plone';
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema,
          formData,
          formatMessage,
        }),
      ).toEqual({});
    });
    it('validates url with localhost', () => {
      formData.url = 'http://localhost:8080/Plone';
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema,
          formData,
          formatMessage,
        }),
      ).toEqual({});
    });
  });
});
