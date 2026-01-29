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
      helpUrl: 'https://6.docs.plone.org/user-manual/blocks.html',
    },
    title: {
      title: props.intl.formatMessage(messages.AltText),
      helpUrl: 'https://6.docs.plone.org/user-manual/blocks.html',
    },
    align: {
      title: props.intl.formatMessage(messages.Alignment),
      widget: 'align',
      helpUrl: 'https://6.docs.plone.org/user-manual/blocks.html',
    },
  },
  required: [],
});
