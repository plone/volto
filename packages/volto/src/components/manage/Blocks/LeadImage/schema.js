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
  title: props.intl.formatMessage(messages.Image),
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
      title: props.intl.formatMessage(messages.Image),
      type: 'string',
    },
    origin: {
      title: props.intl.formatMessage(messages.Origin),
      type: 'string',
    },
    altText: {
      title: props.intl.formatMessage(messages.AltText),
      type: 'string',
    },
  },
  required: [],
});

export default LeadImageSchema;
