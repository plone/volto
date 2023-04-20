import { defineMessages } from 'react-intl';
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';

const messages = defineMessages({
  Target: {
    id: 'Target',
    defaultMessage: 'Target',
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
    defaultMessage: 'Head title',
  },
  teaser: {
    id: 'Teaser',
    defaultMessage: 'Teaser',
  },
  align: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
  scale: {
    id: 'image_scale',
    defaultMessage: 'Image size',
  },
  mini: {
    id: 'Mini',
    defaultMessage: 'Mini',
  },
  preview: {
    id: 'Preview',
    defaultMessage: 'Preview',
  },
  large: {
    id: 'Large',
    defaultMessage: 'Large',
  },
  great: {
    id: 'Great',
    defaultMessage: 'Great',
  },
});

export const TeaserSchema = ({ intl }) => {
  const schema = {
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
        title: intl.formatMessage(messages.Target),
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: [
          'Title',
          'head_title',
          'Description',
          'hasPreviewImage',
          'image_field',
          'image_scales',
          '@type',
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
        selectedItemAttrs: ['image_field', 'image_scales'],
      },
      openLinkInNewTab: {
        title: intl.formatMessage(messages.openLinkInNewTab),
        type: 'boolean',
      },
    },
    required: [],
  };

  addStyling({ schema, intl });

  schema.properties.styles.schema.properties.align = {
    widget: 'align',
    title: intl.formatMessage(messages.align),
    actions: ['left', 'right', 'center'],
    default: 'left',
  };
  schema.properties.styles.schema.properties.scale = {
    title: intl.formatMessage(messages.scale),
    choices: [
      ['mini', intl.formatMessage(messages.mini)],
      ['preview', intl.formatMessage(messages.preview)],
      ['teaser', intl.formatMessage(messages.teaser)],
      ['large', intl.formatMessage(messages.large)],
      ['great', intl.formatMessage(messages.great)],
    ],
    default: 'teaser',
  };

  schema.properties.styles.schema.fieldsets[0].fields = ['align', 'scale'];

  return schema;
};
