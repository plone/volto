import config from '@plone/volto/registry';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  color: {
    id: 'Color',
    defaultMessage: 'Color',
  },
  align: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
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

export const defaultStyleSchema = ({ formData, intl }) => {
  const colors =
    config.blocks?.blocksConfig?.[formData['@type']]?.colors || DEFAULT_COLORS;
  const defaultBGColor =
    config.blocks?.blocksConfig?.[formData['@type']]?.defaultBGColor;

  return {
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        // fields: ['align', 'backgroundColor'],
        fields: ['align'],
      },
    ],
    properties: {
      align: {
        widget: 'align',
        title: intl.formatMessage(messages.align),
        actions: ['center', 'wide', 'full'],
      },
      backgroundColor: {
        widget: 'color_picker',
        title: intl.formatMessage(messages.backgroundColor),
        colors,
        default: defaultBGColor,
      },
    },
    required: [],
  };
};
