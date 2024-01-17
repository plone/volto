import { defineMessages } from 'react-intl';

const messages = defineMessages({
  Maps: {
    id: 'Maps',
    defaultMessage: 'Maps',
  },
  AltText: {
    id: 'Alt text',
    defaultMessage: 'Alt text',
  },
  MapsURL: {
    id: 'Maps URL',
    defaultMessage: 'Maps URL',
  },
  Alignment: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
});
export const MapsSchema = (props) => ({
  title: props.intl.formatMessage(messages.Maps),
  block: 'Maps',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['url', 'title', 'align'],
    },
  ],

  properties: {
    url: {
      title: props.intl.formatMessage(messages.MapsURL),
      widget: 'url',
    },
    title: {
      title: props.intl.formatMessage(messages.AltText),
    },
    align: {
      title: props.intl.formatMessage(messages.Alignment),
      widget: 'align',
    },
  },
  required: [],
});
