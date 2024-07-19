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

const FormSchema = ({ data, intl }) => {
  return {
    title: intl.formatMessage(messages.form),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['recipient'],
      },
    ],
    properties: {
      recipient: {
        title: intl.formatMessage(messages.Recipient),
      },
    },
    required: [],
  };
};

export default FormSchema;
