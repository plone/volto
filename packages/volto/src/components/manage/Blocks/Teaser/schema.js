import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';
import { defineMessages } from 'react-intl';

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
          'ob1',
          'ob2',
          'ob3',
          'ob4',
          'overwrite',
          ...(data?.overwrite
            ? ['title', 'head_title', 'description', 'preview_image']
            : []),
        ],
      },
    ],

    properties: {
      ob1: {
        title: 'Single no text',
        widget: 'object_browser',
        mode: 'link',
      },
      ob2: {
        title: 'Single with text',
        widget: 'object_browser',
        mode: 'link',
        allowExternals: true,
      },
      ob3: {
        title: 'Multiple no text',
        widget: 'object_browser',
        mode: 'link',
        multiple: true,
      },
      ob4: {
        title: 'Multiple with text',
        widget: 'object_browser',
        mode: 'link',
        multiple: true,
        allowExternals: true,
      },
      overwrite: {
        title: intl.formatMessage(messages.overwrite),
        description: intl.formatMessage(messages.overwriteDescription),
        type: 'boolean',
        default: false,
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
    required: ['href'],
  };

  addStyling({ schema, intl });

  schema.properties.styles.schema.properties.align = {
    widget: 'align',
    title: intl.formatMessage(messages.align),
    actions: ['left', 'right', 'center'],
    default: 'left',
  };

  schema.properties.styles.schema.fieldsets[0].fields = ['align'];

  return schema;
};

export const gridTeaserDisableStylingSchema = ({ schema, formData, intl }) => {
  schema.fieldsets = schema.fieldsets.filter((item) => item.id !== 'styling');
  return schema;
};
