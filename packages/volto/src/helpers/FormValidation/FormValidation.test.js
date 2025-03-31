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
      const validationErrorMessages = [messages.required.defaultMessage];
      validationErrorMessages.title = 'Username';

      expect(
        FormValidation.validateFieldsPerFieldset({
          schema,
          formData: {},
          formatMessage,
        }),
      ).toEqual({
        username: validationErrorMessages,
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

      const validationErrorMessages = [messages.required.defaultMessage];
      validationErrorMessages.title = 'age';

      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: { username: 'test username', age: null },
          formatMessage,
        }),
      ).toEqual({
        age: validationErrorMessages,
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
      const validationErrorMessages = [messages.isValidEmail.defaultMessage];
      validationErrorMessages.title = 'Email';

      expect(
        FormValidation.validateFieldsPerFieldset({
          schema,
          formData,
          formatMessage,
        }),
      ).toEqual({
        email: validationErrorMessages,
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
      const validationErrorMessages = [messages.isValidURL.defaultMessage];
      validationErrorMessages.title = 'url';

      expect(
        FormValidation.validateFieldsPerFieldset({
          schema,
          formData: { url: 'foo', username: 'test username' },
          formatMessage,
        }),
      ).toEqual({
        url: validationErrorMessages,
      });
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

    it('widget - validator from block - Fails', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            title: 'Default field',
            description: '',
            widget: 'url',
          },
        },
        required: [],
      };

      const validationErrorMessages = [messages.isValidURL.defaultMessage];
      validationErrorMessages.title = 'Default field';

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
        customField: validationErrorMessages,
      });
    });

    it('type + widget - validator from block - Fails', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            title: 'Default field',
            description: '',
            type: 'customfieldtype',
            widget: 'url',
          },
        },
        required: [],
      };
      config.registerUtility({
        type: 'validator',
        name: 'alwaysFail',
        dependencies: { fieldType: 'customfieldtype' },
        method: () => 'Fails',
      });

      const validationErrorMessages = [
        'Fails',
        messages.isValidURL.defaultMessage,
      ];
      validationErrorMessages.title = 'Default field';

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
        customField: validationErrorMessages,
      });
    });

    it('widget - validator from content type set - Fails', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            title: 'Default field',
            description: '',
            widgetOptions: {
              frontendOptions: {
                widget: 'url',
              },
            },
          },
        },
        required: [],
      };

      const validationErrorMessages = [messages.isValidURL.defaultMessage];
      validationErrorMessages.title = 'Default field';

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
        customField: validationErrorMessages,
      });
    });

    it('string - min length', () => {
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

      const validationErrorMessages = [messages.minLength.defaultMessage];
      validationErrorMessages.title = 'password';

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
        customField: validationErrorMessages,
      });
    });

    it('string - max length', () => {
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

      const validationErrorMessages = [messages.maxLength.defaultMessage];
      validationErrorMessages.title = 'password';

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
        customField: validationErrorMessages,
      });
    });

    it('string - pattern - Fail', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            title: 'password',
            description: '',
            pattern: '^[a-zA-Z0-9]*$',
          },
        },
        required: [],
      };

      const validationErrorMessages = [messages.pattern.defaultMessage];
      validationErrorMessages.title = 'password';

      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: {
            username: 'test username',
            customField: 'as#',
          },
          formatMessage,
        }),
      ).toEqual({
        customField: validationErrorMessages,
      });
    });

    it('string - pattern - Succeeds', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            title: 'password',
            description: '',
            pattern: '^[a-zA-Z0-9]*$',
          },
        },
        required: [],
      };
      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: {
            username: 'test username',
            customField: 'asasd',
          },
          formatMessage,
        }),
      ).toEqual({});
    });

    it('number - isNumber - fails (not string|number as number)', () => {
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

      const validationErrorMessages = [messages.isNumber.defaultMessage];
      validationErrorMessages.title = 'Number field';

      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: {
            username: 'test username',
            //since 'number' can accept digits in string & number format hence testing it with an alphabet
            customField: 'n',
          },
          formatMessage,
        }),
      ).toEqual({
        customField: validationErrorMessages,
      });
    });

    it('number - isNumber - as string', () => {
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
            //since 'number' can accept digits in string & number format hence testing it with an alphabet
            customField: '1',
          },
          formatMessage,
        }),
      ).toEqual({});
    });

    it('number - isNumber - as number', () => {
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
            //since 'number' can accept digits in string & number format hence testing it with an alphabet
            customField: 1,
          },
          formatMessage,
        }),
      ).toEqual({});
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

      const validationErrorMessages = [messages.minimum.defaultMessage];
      validationErrorMessages.title = 'Number field';

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
        customField: validationErrorMessages,
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

      const validationErrorMessages = [messages.maximum.defaultMessage];
      validationErrorMessages.title = 'Number field';

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
        customField: validationErrorMessages,
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

      const validationErrorMessages = [messages.isInteger.defaultMessage];
      validationErrorMessages.title = 'Integer field';

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
        customField: validationErrorMessages,
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

      const validationErrorMessages = [messages.minimum.defaultMessage];
      validationErrorMessages.title = 'Integer field';

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
        customField: validationErrorMessages,
      });
    });

    it('integer - maximum', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            title: 'Integer field',
            type: 'integer',
            description: '',
            maximum: 8,
          },
        },
        required: [],
      };

      const validationErrorMessages = [messages.maximum.defaultMessage];
      validationErrorMessages.title = 'Integer field';

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
        customField: validationErrorMessages,
      });
    });

    it('password - min length', () => {
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

      const validationErrorMessages = [messages.minLength.defaultMessage];
      validationErrorMessages.title = 'password';

      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: { username: 'test username', password: 'asd' },
          formatMessage,
        }),
      ).toEqual({
        password: validationErrorMessages,
      });
    });

    it('description - min length from server side', () => {
      let newSchema = {
        ...schema,
        properties: {
          ...schema.properties,
          description: {
            title: 'description',
            type: 'string',
            description: '',
            widgetOptions: {
              frontendOptions: {
                widgetProps: {
                  minLength: 8,
                },
              },
            },
          },
        },
        required: [],
      };

      const validationErrorMessages = [messages.minLength.defaultMessage];
      validationErrorMessages.title = 'description';

      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: {
            username: 'test username',
            description: 'asd',
          },
          formatMessage,
        }),
      ).toEqual({
        description: validationErrorMessages,
      });
    });

    it('password - max length', () => {
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

      const validationErrorMessages = [messages.maxLength.defaultMessage];
      validationErrorMessages.title = 'password';

      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: { username: 'test username', password: 'asdasdasdasdasd' },
          formatMessage,
        }),
      ).toEqual({
        password: validationErrorMessages,
      });
    });

    it('description - max length from server side', () => {
      let newSchema = {
        ...schema,
        properties: {
          ...schema.properties,
          description: {
            title: 'description',
            type: 'string',
            description: '',
            widgetOptions: {
              frontendOptions: {
                widgetProps: {
                  maxLength: 8,
                },
              },
            },
          },
        },
        required: [],
      };

      const validationErrorMessages = [messages.maxLength.defaultMessage];
      validationErrorMessages.title = 'description';

      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: {
            username: 'test username',
            description: 'asdasdasdasdasd',
          },
          formatMessage,
        }),
      ).toEqual({
        description: validationErrorMessages,
      });
    });

    it('array - maxItems', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            title: 'Array field',
            type: 'array',
            description: '',
            maxItems: 1,
          },
        },
        required: [],
      };

      const validationErrorMessages = [messages.maxItems.defaultMessage];
      validationErrorMessages.title = 'Array field';

      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: {
            username: 'test username',
            customField: [1, 2],
          },
          formatMessage,
        }),
      ).toEqual({
        customField: validationErrorMessages,
      });
    });

    it('array - minItems', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            title: 'Array field',
            type: 'array',
            description: '',
            minItems: 3,
          },
        },
        required: [],
      };

      const validationErrorMessages = [messages.minItems.defaultMessage];
      validationErrorMessages.title = 'Array field';

      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: {
            username: 'test username',
            customField: [1],
          },
          formatMessage,
        }),
      ).toEqual({
        customField: validationErrorMessages,
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

      const validationErrorMessages = [messages.uniqueItems.defaultMessage];
      validationErrorMessages.title = 'Array field';

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
        customField: validationErrorMessages,
      });
    });

    it('array - uniqueItems - false', () => {
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

    it('format - specific validator set - Errors', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            title: 'Default field',
            description: '',
            format: 'url',
          },
        },
        required: [],
      };
      config.registerUtility({
        type: 'validator',
        name: 'url',
        dependencies: { format: 'url' },
        method: urlValidator,
      });

      const validationErrorMessages = [messages.isValidURL.defaultMessage];
      validationErrorMessages.title = 'Default field';

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
        customField: validationErrorMessages,
      });
    });

    it('format - specific validator set - Succeeds', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            title: 'Default field',
            description: '',
            format: 'url',
          },
        },
        required: [],
      };
      config.registerUtility({
        type: 'validator',
        name: 'url',
        dependencies: { format: 'url' },
        method: urlValidator,
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

    it('format - specific validator from content type set - Fails', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            title: 'Default field',
            description: '',
            widgetOptions: {
              frontendOptions: {
                format: 'url',
              },
            },
          },
        },
        required: [],
      };
      config.registerUtility({
        type: 'validator',
        name: 'url',
        dependencies: { format: 'url' },
        method: urlValidator,
      });

      const validationErrorMessages = [messages.isValidURL.defaultMessage];
      validationErrorMessages.title = 'Default field';

      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: {
            username: 'test username',
            customField: 'asdasd',
          },
          formatMessage,
        }),
      ).toEqual({
        customField: validationErrorMessages,
      });
    });

    it('format - specific validator from content type set - Succeeds', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            title: 'Default field',
            description: '',
            widgetOptions: {
              frontendOptions: {
                format: 'url',
              },
            },
          },
        },
        required: [],
      };
      config.registerUtility({
        type: 'validator',
        name: 'url',
        dependencies: { format: 'url' },
        method: urlValidator,
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

    it('behavior + fieldName - Fails', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            behavior: 'plone.eventbasic',
            title: 'Default field',
            description: '',
          },
        },
        required: [],
      };
      config.registerUtility({
        type: 'validator',
        name: 'url',
        dependencies: {
          behaviorName: 'plone.eventbasic',
          fieldName: 'customField',
          format: 'url',
        },
        method: urlValidator,
      });

      const validationErrorMessages = [messages.isValidURL.defaultMessage];
      validationErrorMessages.title = 'Default field';

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
        customField: validationErrorMessages,
      });
    });

    it('behavior + fieldName - start date in Event - Fails', () => {
      let contentTypeSchema = {
        properties: {
          ...schema.properties,
          start: {
            behavior: 'plone.eventbasic',
            type: 'string',
            title: 'Start date',
            description: '',
          },
        },
        required: [],
      };

      const validationErrorMessages = [messages.startEventRange.defaultMessage];
      validationErrorMessages.title = 'Start date';

      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: contentTypeSchema,
          formData: {
            start: '2024-08-01T11:00:00+00:00',
            end: '2024-04-01T11:00:00+00:00',
          },
          formatMessage,
        }),
      ).toEqual({
        start: validationErrorMessages,
      });
    });

    it('behavior + fieldName - end date in Event - Fails', () => {
      let contentTypeSchema = {
        properties: {
          ...schema.properties,
          end: {
            behavior: 'plone.eventbasic',
            type: 'string',
            title: 'End date',
            description: '',
          },
        },
        required: [],
      };

      const validationErrorMessages = [messages.endEventRange.defaultMessage];
      validationErrorMessages.title = 'End date';

      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: contentTypeSchema,
          formData: {
            start: '2024-08-01T11:00:00+00:00',
            end: '2024-04-01T11:00:00+00:00',
          },
          formatMessage,
        }),
      ).toEqual({
        end: validationErrorMessages,
      });
    });

    it('block - per block type and fieldID specific - Fails', () => {
      let newSchema = {
        properties: {
          ...schema.properties,
          customField: {
            title: 'Default field',
            description: '',
          },
        },
        required: [],
      };
      config.registerUtility({
        type: 'validator',
        dependencies: { blockType: 'slider', fieldName: 'customField' },
        method: urlValidator,
      });

      const validationErrorMessages = [messages.isValidURL.defaultMessage];
      validationErrorMessages.title = 'Default field';

      expect(
        FormValidation.validateFieldsPerFieldset({
          schema: newSchema,
          formData: {
            '@type': 'slider',
            username: 'test username',
            customField: 'asd',
          },
          formatMessage,
        }),
      ).toEqual({
        customField: validationErrorMessages,
      });
    });
  });
});
