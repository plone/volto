import FormValidation from './FormValidation';
import { messages } from '../MessageLabels/MessageLabels';
import config from '@plone/volto/registry';
import { urlValidator } from './validators';

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

    it('required - validates missing', () => {
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

    it('required - do not treat 0 as missing required value', () => {
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

    it('email - validates incorrect', () => {
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

    it('email - validates', () => {
      formData.email = 'test@domain.name';
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema,
          formData,
          formatMessage,
        }),
      ).toEqual({});
    });

    it('url - validates incorrect url', () => {
      formData.url = 'foo';
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema,
          formData,
          formatMessage,
        }),
      ).toEqual({ url: [messages.isValidURL.defaultMessage] });
    });

    it('url - validates', () => {
      formData.url = 'https://plone.org/';
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema,
          formData,
          formatMessage,
        }),
      ).toEqual({});
    });

    it('url - validates url with ip', () => {
      formData.url = 'http://127.0.0.1:8080/Plone';
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema,
          formData,
          formatMessage,
        }),
      ).toEqual({});
    });

    it('url - validates url with localhost', () => {
      formData.url = 'http://localhost:8080/Plone';
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema,
          formData,
          formatMessage,
        }),
      ).toEqual({});
    });

    it('default - min lenght', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            title: 'password',
            description: '',
            minLength: '8',
          },
        },
        required: [],
      };
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: {
            username: 'test username',
            customField: 'asd',
          },
          formatMessage,
        }),
      ).toEqual({
        customField: [messages.minLength.defaultMessage],
      });
    });

    it('default - max lenght', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            title: 'password',
            description: '',
            maxLength: '8',
          },
        },
        required: [],
      };
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: {
            username: 'test username',
            customField: 'asdasdasdasdasd',
          },
          formatMessage,
        }),
      ).toEqual({
        customField: [messages.maxLength.defaultMessage],
      });
    });

    it('number - isNumber', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            title: 'Number field',
            type: 'number',
            description: '',
          },
        },
        required: [],
      };
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: {
            username: 'test username',
            customField: '1',
          },
          formatMessage,
        }),
      ).toEqual({
        customField: [messages.isNumber.defaultMessage],
      });
    });

    it('number - minimum', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            title: 'Number field',
            type: 'number',
            description: '',
            minimum: 8,
          },
        },
        required: [],
      };
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: {
            username: 'test username',
            customField: 1,
          },
          formatMessage,
        }),
      ).toEqual({
        customField: [messages.minimum.defaultMessage],
      });
    });

    it('number - maximum', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            title: 'Number field',
            type: 'number',
            description: '',
            maximum: 8,
          },
        },
        required: [],
      };
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: {
            username: 'test username',
            customField: 10,
          },
          formatMessage,
        }),
      ).toEqual({
        customField: [messages.maximum.defaultMessage],
      });
    });

    it('integer - isInteger', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            title: 'Integer field',
            type: 'integer',
            description: '',
          },
        },
        required: [],
      };
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: {
            username: 'test username',
            customField: 1.5,
          },
          formatMessage,
        }),
      ).toEqual({
        customField: [messages.isInteger.defaultMessage],
      });
    });

    it('integer - minimum', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            title: 'Integer field',
            type: 'integer',
            description: '',
            minimum: 8,
          },
        },
        required: [],
      };
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: {
            username: 'test username',
            customField: 1,
          },
          formatMessage,
        }),
      ).toEqual({
        customField: [messages.minimum.defaultMessage],
      });
    });

    it('integer - maximum', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            title: 'Integer field',
            type: 'number',
            description: '',
            maximum: 8,
          },
        },
        required: [],
      };
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: {
            username: 'test username',
            customField: 10,
          },
          formatMessage,
        }),
      ).toEqual({
        customField: [messages.maximum.defaultMessage],
      });
    });

    it('password - min lenght', () => {
      let newSchema = {
        ...schema,
        properties: {
          ...schema.properties,
          password: {
            title: 'password',
            type: 'password',
            description: '',
            minLength: '8',
          },
        },
        required: [],
      };
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: { username: 'test username', password: 'asd' },
          formatMessage,
        }),
      ).toEqual({
        password: [messages.minLength.defaultMessage],
      });
    });

    it('password - max lenght', () => {
      let newSchema = {
        ...schema,
        properties: {
          ...schema.properties,
          password: {
            title: 'password',
            type: 'password',
            description: '',
            maxLength: '8',
          },
        },
        required: [],
      };
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: { username: 'test username', password: 'asdasdasdasdasd' },
          formatMessage,
        }),
      ).toEqual({
        password: [messages.maxLength.defaultMessage],
      });
    });

    it('array - uniqueItems', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            title: 'Array field',
            type: 'array',
            description: '',
            uniqueItems: true,
          },
        },
        required: [],
      };
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: {
            username: 'test username',
            customField: [1, 1],
          },
          formatMessage,
        }),
      ).toEqual({
        customField: [messages.uniqueItems.defaultMessage],
      });
    });

    it('array - uniqueItems false', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            title: 'Array field',
            type: 'array',
            description: '',
            uniqueItems: false,
          },
        },
        required: [],
      };
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: {
            username: 'test username',
            customField: [1, 1],
          },
          formatMessage,
        }),
      ).toEqual({});
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: {
            username: 'test username',
            customField: [1],
          },
          formatMessage,
        }),
      ).toEqual({});
    });

    it('default - specific validator set - Errors', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            title: 'Default field',
            description: '',
            validator: 'isURL',
          },
        },
        required: [],
      };
      config.registerComponent({
        name: 'fieldValidator',
        dependencies: ['isURL'],
        component: urlValidator,
      });
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: {
            username: 'test username',
            customField: 'foo',
          },
          formatMessage,
        }),
      ).toEqual({
        customField: [messages.isValidURL.defaultMessage],
      });
    });

    it('default - specific validator set - Succeeds', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            title: 'Default field',
            description: '',
            validator: 'isURL',
          },
        },
        required: [],
      };
      config.registerComponent({
        name: 'fieldValidator',
        dependencies: ['isURL'],
        component: urlValidator,
      });
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: {
            username: 'test username',
            customField: 'https://plone.org/',
          },
          formatMessage,
        }),
      ).toEqual({});
    });
  });

  // describe('validateBlockDataFields', () => {

  // });
});
