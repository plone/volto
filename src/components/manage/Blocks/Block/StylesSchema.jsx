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

const DEFAULT_COLORS = [
  { name: 'blue', label: 'Blue' },
  { name: 'grey', label: 'Grey' },
];

export const defaultStyleSchema = ({ schema, formData, intl }) => {
  const colors =
    config.blocks?.blocksConfig?.[formData['@type']]?.colors || DEFAULT_COLORS;
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
        widget: 'color_picker',
        title: intl.formatMessage(messages.backgroundColor),
        colors,
        defaultColor,
      },
    },
    required: [],
  };
};
