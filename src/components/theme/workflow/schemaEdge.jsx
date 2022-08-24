import { defineMessages } from 'react-intl';

const messages = defineMessages({
  Source: {
    id: 'Source',
    defaultMessage: 'Source',
  },
  imageOverride: {
    id: 'Image override',
    defaultMessage: 'Image override',
  },
  openLinkInNewTab: {
    id: 'Open in a new tab',
    defaultMessage: 'Open in a new tab',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  head_title: {
    id: 'head_title',
    defaultMessage: 'head title',
  },
  teaser: {
    id: 'Teaser',
    defaultMessage: 'Teaser',
  },
});

export const EdgeSchema = (props) => {
  const { intl } = props;

  return {
    title: 'Edge',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title', 'description', 'height'],
      },
    ],

    properties: {
      title: {
        title: intl.formatMessage(messages.title),
      },
      description: {
        title: intl.formatMessage(messages.description),
        widget: 'textarea',
      },
    },
    required: [],
  };
};
