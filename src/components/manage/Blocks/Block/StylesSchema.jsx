import config from '@plone/volto/registry';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  styles: {
    id: 'Styles',
    defaultMessage: 'Styles',
  },
  color: {
    id: 'Color',
    defaultMessage: 'Color',
  },
  backgroundColor: {
    id: 'Background color',
    defaultMessage: 'Background color',
  },
});

export const defaultSchema = ({ schema, formData, intl }) => {
  const availableColors =
    config.blocks?.blocksConfig?.[formData['@type']]?.availableColors;
  const defaultColor =
    config.blocks?.blocksConfig?.[formData['@type']]?.defaultColor;

  return {
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['backgroundColor'],
      },
    ],
    properties: {
      backgroundColor: {
        widget: 'basic_color_picker',
        title: intl.formatMessage(messages.backgroundColor),
        availableColors,
        defaultColor,
      },
    },
    required: [],
  };
};

export const styleSchemaEnhancer = ({ schema, formData, intl }) => {
  const stylesSchema =
    config.blocks?.blocksConfig?.[formData['@type']]?.stylesSchema ||
    defaultSchema;

  schema.fieldsets.push({
    id: 'styling',
    title: 'Styling',
    fields: ['styles'],
  });

  schema.properties.styles = {
    widget: 'style_widget',
    title: intl.formatMessage(messages.styles),
    schema: stylesSchema({ schema, formData, intl }),
  };

  return schema;
};
