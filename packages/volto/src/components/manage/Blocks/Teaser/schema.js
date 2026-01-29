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
  kicker: {
    id: 'head_title',
    defaultMessage: 'Kicker',
  },
  kicker_description: {
    id: 'The kicker is a line of text shown above the title.',
    defaultMessage: 'The kicker is a line of text shown above the title.',
  },
  teaser: {
    id: 'Teaser',
    defaultMessage: 'Teaser',
  },
  align: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
  overwrite: {
    id: 'Customize teaser content',
    defaultMessage: 'Customize teaser content',
  },
  overwriteDescription: {
    id: 'Check this box to customize the title, description, or image of the target content item for this teaser. Leave it unchecked to show updates to the target content item if it is edited later.',
    defaultMessage:
      'Check this box to customize the title, description, or image of the target content item for this teaser. Leave it unchecked to show updates to the target content item if it is edited later.',
  },
});

export const TeaserSchema = ({ data, intl }) => {
  const schema = {
    title: intl.formatMessage(messages.teaser),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'href',
          'overwrite',
          ...(data?.overwrite
            ? ['title', 'head_title', 'description', 'preview_image']
            : []),
        ],
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
        helpUrl: 'https://6.docs.plone.org/user-manual/blocks.html',
      },
      overwrite: {
        title: intl.formatMessage(messages.overwrite),
        description: intl.formatMessage(messages.overwriteDescription),
        type: 'boolean',
        default: false,
        helpUrl: 'https://6.docs.plone.org/user-manual/blocks.html',
      },
      title: {
        title: intl.formatMessage(messages.title),
        helpUrl: 'https://6.docs.plone.org/user-manual/blocks.html',
      },
      head_title: {
        title: intl.formatMessage(messages.kicker),
        description: intl.formatMessage(messages.kicker_description),
        helpUrl: 'https://6.docs.plone.org/user-manual/blocks.html',
      },
      description: {
        title: intl.formatMessage(messages.description),
        widget: 'textarea',
        helpUrl: 'https://6.docs.plone.org/user-manual/blocks.html',
      },
      preview_image: {
        title: intl.formatMessage(messages.imageOverride),
        widget: 'object_browser',
        mode: 'image',
        allowExternals: true,
        selectedItemAttrs: ['image_field', 'image_scales'],
        helpUrl: 'https://6.docs.plone.org/user-manual/blocks.html',
      },
      openLinkInNewTab: {
        title: intl.formatMessage(messages.openLinkInNewTab),
        type: 'boolean',
        helpUrl: 'https://6.docs.plone.org/user-manual/blocks.html',
      },
    },
    required: ['href'],
  };

  addStyling({ schema, intl });

  schema.properties.styles.schema.properties.align = {
    widget: 'align',
    title: intl.formatMessage(messages.align),
    actions: ['left', 'right', 'center'],
    default: 'left',
    helpUrl: 'https://6.docs.plone.org/user-manual/blocks.html',
  };

  schema.properties.styles.schema.fieldsets[0].fields = ['align'];

  return schema;
};

export const gridTeaserDisableStylingSchema = ({ schema, formData, intl }) => {
  schema.fieldsets = schema.fieldsets.filter((item) => item.id !== 'styling');
  return schema;
};
