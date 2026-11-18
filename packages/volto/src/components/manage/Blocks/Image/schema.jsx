import { defineMessages } from 'react-intl';

const messages = defineMessages({
  Image: {
    id: 'Image',
    defaultMessage: 'Image',
  },
  AltText: {
    id: 'Alt text',
    defaultMessage: 'Alt text',
  },
  Align: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
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
  AltTextHint: {
    id: 'Alt text hint',
    defaultMessage: 'Leave empty if the image is purely decorative.',
  },
  AltTextHintLinkText: {
    id: 'Alt text hint link text',
    defaultMessage: 'Describe the purpose of the image.',
  },
  linkSettings: {
    id: 'Link settings',
    defaultMessage: 'Link settings',
  },
});

/**
 * The Image block data schema. It is registered as the `blockSchema` of the
 * `image` block, and the Image block sidebar reads it from there.
 */
export function ImageSchema({ formData, data, intl }) {
  const { url } = formData || data || {};
  return {
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [...(url ? ['alt', 'align', 'size'] : [])],
      },
      ...(url
        ? [
            {
              id: 'link_settings',
              title: intl.formatMessage(messages.linkSettings),
              fields: ['href', 'openLinkInNewTab'],
            },
          ]
        : []),
    ],
    properties: {
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
        default: 'center',
      },
      size: {
        title: intl.formatMessage(messages.size),
        widget: 'image_size',
        default: 'l',
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

export const gridImageDisableSizeAndPositionHandlersSchema = ({
  schema,
  formData,
  intl,
}) => {
  schema.fieldsets[0].fields = schema.fieldsets[0].fields.filter(
    (item) => !['align', 'size'].includes(item),
  );
  return schema;
};
