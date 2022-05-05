import { defineMessages } from 'react-intl';

import { isEmpty } from 'lodash';

const messages = defineMessages({
  Source: {
    id: 'Source',
    defaultMessage: 'Source',
  },
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
  Align: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  size: {
    id: 'Image size',
    defaultMessage: 'Image size',
  },
  LinkTo: {
    id: 'Link to',
    defaultMessage: 'Link to',
  },
  openLinkInNewTab: {
    id: 'Open in a new tab',
    defaultMessage: 'Open in a new tab',
  },
  NoImageSelected: {
    id: 'No image selected',
    defaultMessage: 'No image selected',
  },
  externalURL: {
    id: 'External URL',
    defaultMessage: 'External URL',
  },
  AltTextHint: {
    id: 'Alt text hint',
    defaultMessage: 'Leave empty if the image is purely decorative.',
  },
  AltTextHintLinkText: {
    id: 'Alt text hint link text',
    defaultMessage: 'Describe the purpose of the image.',
  },
});

export function ImageSchema({ formData, intl }) {
  return {
    title: intl.formatMessage(messages.Image),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'source',
          ...(!isEmpty(formData.source) || formData.url
            ? ['alt', 'align', 'size']
            : []),
        ],
      },
      ...(!isEmpty(formData.source) || formData.url
        ? [
            {
              id: 'link_settings',
              title: 'Link settings',
              fields: ['href', 'openLinkInNewTab'],
            },
          ]
        : []),
    ],
    properties: {
      source: {
        title: intl.formatMessage(messages.Source),
        widget: 'object_browser',
        mode: 'image',
        legacy: true,
        allowExternals: true,
      },
      title: {
        title: intl.formatMessage(messages.title),
      },
      alt: {
        title: intl.formatMessage(messages.AltText),
        description: (
          <>
            <a
              href="https://www.w3.org/WAI/tutorials/images/decision-tree/"
              title={intl.formatMessage(messages.openLinkInNewTab)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {intl.formatMessage(messages.AltTextHintLinkText)}
            </a>{' '}
            {intl.formatMessage(messages.AltTextHint)}
          </>
        ),
      },
      align: {
        title: intl.formatMessage(messages.Align),
        widget: 'align',
      },
      size: {
        title: intl.formatMessage(messages.size),
        widget: 'image_size',
      },
      href: {
        title: intl.formatMessage(messages.LinkTo),
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: ['Title', 'Description', 'hasPreviewImage'],
        allowExternals: true,
      },
      openLinkInNewTab: {
        title: intl.formatMessage(messages.openLinkInNewTab),
        type: 'boolean',
      },
    },
    required: [],
  };
}
