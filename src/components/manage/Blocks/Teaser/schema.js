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

export const TeaserSchema = (props) => {
  const { intl } = props;

  return {
    title: intl.formatMessage(messages.teaser),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['href', 'title', 'head_title', 'description', 'preview_image'],
      },
    ],

    properties: {
      href: {
        title: intl.formatMessage(messages.Source),
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: [
          'Title',
          'head_title',
          'Description',
          'hasPreviewImage',
          'image_field',
        ],
        allowExternals: true,
      },
      title: {
        title: intl.formatMessage(messages.title),
      },
      head_title: {
        title: intl.formatMessage(messages.head_title),
      },
      description: {
        title: intl.formatMessage(messages.description),
        widget: 'textarea',
      },
      preview_image: {
        title: intl.formatMessage(messages.imageOverride),
        widget: 'object_browser',
        mode: 'image',
        allowExternals: true,
      },
      openLinkInNewTab: {
        title: intl.formatMessage(messages.openLinkInNewTab),
        type: 'boolean',
      },
    },
    required: [],
  };
};
