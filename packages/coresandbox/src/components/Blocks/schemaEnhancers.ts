import { defineMessages } from 'react-intl';
import { addExtensionFieldToSchema } from '@plone/volto/helpers/Extensions';
import type { BlockConfigBase } from '@plone/types';

const messages = defineMessages({
  Source: {
    id: 'Source',
    defaultMessage: 'Source',
  },
  Slider: {
    id: 'Slider',
    defaultMessage: 'Slider',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  imageOverride: {
    id: 'Image override',
    defaultMessage: 'Image override',
  },
  item: {
    id: 'Item',
    defaultMessage: 'Item',
  },
  items: {
    id: 'Items',
    defaultMessage: 'Items',
  },
  addItem: {
    id: 'Add item',
    defaultMessage: 'Add item',
  },
  variation: {
    id: 'Variation',
    defaultMessage: 'Variation',
  },
});

export const conditionalVariationsSchemaEnhancer: BlockConfigBase['schemaEnhancer'] =
  ({ schema, formData, intl, navRoot, contentType }) => {
    if (contentType === 'Event') {
      // We redefine the variations in the case that it's an Event content type
      const variations = [
        {
          id: 'default',
          title: 'Default',
          isDefault: true,
        },
        {
          id: 'custom',
          title: 'Custom modified variation',
        },
      ];

      schema = addExtensionFieldToSchema({
        schema,
        name: 'variation',
        items: variations,
        intl,
        title: messages.variation,
      });
    }
    return schema;
  };

// export const FormFieldSchemaEnhancer: BlockConfigBase['schemaEnhancer'] =
// ({ schema, formData, intl, navRoot, contentType }) => {
//   if (contentType === 'Document') {
//     // We redefine the variations in the case that it's an Event content type
//     const variations = [
//       {
//         id: 'default',
//         title: 'Default',
//         isDefault: true,
//       },
//       {
//         id: 'custom',
//         title: 'Custom modified variation',
//       },
//     ];

//     schema = addExtensionFieldToSchema({
//       schema,
//       name: 'variation',
//       items: variations,
//       intl,
//       title: messages.variation,
//     });
//   }
//   return schema;
// };
export const FormFieldSchemaEnhancer: BlockConfigBase['schemaEnhancer'] = ({
  intl,
}) => {
  return {
    title: intl.formatMessage(messages.item),
    addMessage: intl.formatMessage(messages.addItem),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'href',
          'title',
          'description',
          'preview_image',
          'extraDefault',
        ],
      },
    ],

    properties: {
      href: {
        title: intl.formatMessage(messages.Source),
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: [
          'Title',
          'Description',
          'hasPreviewImage',
          'headtitle',
        ],
        allowExternals: true,
      },
      title: {
        title: intl.formatMessage(messages.title),
      },
      description: {
        title: intl.formatMessage(messages.description),
      },
      preview_image: {
        title: intl.formatMessage(messages.imageOverride),
        widget: 'object_browser',
        mode: 'image',
        allowExternals: true,
      },
      extraDefault: {
        title: 'Extra',
        default: 'Extra default',
      },
    },
    required: [],
  };
};
