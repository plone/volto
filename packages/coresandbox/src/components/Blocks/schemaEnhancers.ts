import { defineMessages } from 'react-intl';
import { addExtensionFieldToSchema } from '@plone/volto/helpers/Extensions';
import type { BlockConfigBase } from '@plone/types';

const messages = defineMessages({
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
