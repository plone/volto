import { defineMessages } from 'react-intl';

const messages = defineMessages({
    Image: {
      id: 'Image',
      defaultMessage: 'Image',
    },
    Origin: {
      id: 'Origin',
      defaultMessage: 'Origin',
    },
    AltText: {
      id: 'Alt text',
      defaultMessage: 'Alt text',
    },
});

export const LeadImageSchema = (props) => ({
  title: intl.formatMessage(messages.Image),
  block: 'Image',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['image', 'origin', 'altText'],
    },
  ],

  properties: {
    image: {
        title: intl.formatMessage(messages.Image),
        type: 'string',
      },
      origin: {
        title: intl.formatMessage(messages.Origin),
        type: 'string',
      },
      altText: {
        title: intl.formatMessage(messages.AltText),
        type: 'string',
      },
  },
  required: [],
});

export default LeadImageSchema;
