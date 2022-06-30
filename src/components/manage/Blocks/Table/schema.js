import { defineMessages } from 'react-intl';

const messages = defineMessages({
  fixed: {
    id: 'Fixed width table cells',
    defaultMessage: 'Fixed width columns',
  },
  compact: {
    id: 'Make the table compact',
    defaultMessage: 'Reduce cell padding',
  },
  basic: {
    id: 'Reduce complexity',
    defaultMessage: 'Minimalistic table design',
  },
  celled: {
    id: 'Divide each row into separate cells',
    defaultMessage: 'Add border to inner columns',
  },
  striped: {
    id: 'Stripe alternate rows with color',
    defaultMessage: 'Alternate row background color',
  },
  headerCell: {
    id: 'Header cell',
    defaultMessage: 'Header cell',
  },
});

export function TableSchema({ formData, intl }) {
  return {
    fieldsets: [
      {
        id: 'default',
        title: 'Table',
        fields: ['fixed', 'celled', 'striped', 'compact', 'basic'],
      },
      {
        id: 'cell',
        title: 'Cell',
        fields: ['cellType'],
      },
    ],

    properties: {
      fixed: {
        title: intl.formatMessage(messages.fixed),
        type: 'boolean',
      },
      celled: {
        title: intl.formatMessage(messages.celled),
        type: 'boolean',
      },
      striped: {
        title: intl.formatMessage(messages.striped),
        type: 'boolean',
      },
      compact: {
        title: intl.formatMessage(messages.compact),
        type: 'boolean',
      },
      basic: {
        title: intl.formatMessage(messages.basic),
        type: 'boolean',
      },
      cellType: {
        type: 'boolean',
        title: intl.formatMessage(messages.headerCell),
      },
    },
    title: 'Table',
    required: [],
  };
}
