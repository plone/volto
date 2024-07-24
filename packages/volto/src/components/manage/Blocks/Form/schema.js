import { defineMessages } from 'react-intl';

const messages = defineMessages({
  form: {
    id: 'Form',
    defaultMessage: 'Form',
  },
  Recipient: {
    id: 'Recipient',
    defaultMessage: 'Recipient',
  },
});

const defaultSchema = {
  schema: {
    fieldsets: [
      {
        behavior: 'plone',
        fields: ['name', 'from', 'subject', 'message'],
        id: 'default',
        title: 'Default',
      },
    ],
    properties: {
      name: {
        description: 'Please enter your full name',
        factory: 'Text',
        title: 'Name',
        type: 'string',
        widget: 'text',
      },
      from: {
        description: 'Please enter your e-mail address',
        factory: 'Text',
        title: 'From',
        type: 'string',
        widget: 'text',
      },
      subject: {
        description: '',
        factory: 'Text',
        title: 'Subject',
        type: 'string',
        widget: 'text',
      },
      message: {
        description: 'Please enter the message you want to send',
        factory: 'Text',
        title: 'Message',
        type: 'string',
        widget: 'text',
      },
    },
    required: [],
    title: 'Form',
    type: 'object',
  },
};

const FormSchema = ({ data, intl }) => {
  return {
    title: intl.formatMessage(messages.form),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['schema', 'recipient'],
      },
    ],
    properties: {
      schema: {
        title: 'Schema',
        default: defaultSchema,
      },
      recipient: {
        title: intl.formatMessage(messages.Recipient),
      },
    },
    required: [],
  };
};

export default FormSchema;
