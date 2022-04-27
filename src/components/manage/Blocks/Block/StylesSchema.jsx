import config from '@plone/volto/registry';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  color: {
    id: 'Color',
    defaultMessage: 'Color',
  },
  backgroundColor: {
    id: 'Background color',
    defaultMessage: 'Background color',
  },
});

export const defaultStyleSchema = ({ schema, formData, intl }) => {
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
