import { defineMessages } from 'react-intl';

const messages = defineMessages({
  hideHeaders: {
    id: 'Hide headers',
    defaultMessage: 'Hide headers',
  },
  sortable: {
    id: 'Make the table sortable',
    defaultMessage: 'Make the table sortable',
  },
  sortableDescription: {
    id: 'Visible only in view mode',
    defaultMessage: 'Visible only in view mode',
  },
  fixed: {
    id: 'Fixed width table cells',
    defaultMessage: 'Fixed width table cells',
  },
  compact: {
    id: 'Make the table compact',
    defaultMessage: 'Make the table compact',
  },
  basic: {
    id: 'Reduce complexity',
    defaultMessage: 'Reduce complexity',
  },
  celled: {
    id: 'Divide each row into separate cells',
    defaultMessage: 'Divide each row into separate cells',
  },
  inverted: {
    id: 'Table color inverted',
    defaultMessage: 'Table color inverted',
  },
  striped: {
    id: 'Stripe alternate rows with color',
    defaultMessage: 'Stripe alternate rows with color',
  },
});

function TableSchema(props) {
  const { intl } = props;
  return {
    title: 'Table block',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'hideHeaders',
          'sortable',
          'fixed',
          'celled',
          'striped',
          'compact',
          'basic',
          'inverted',
        ],
      },
    ],
    properties: {
      hideHeaders: {
        title: intl.formatMessage(messages.hideHeaders),
        type: 'boolean',
      },
      sortable: {
        title: intl.formatMessage(messages.sortable),
        type: 'boolean',
      },
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
      inverted: {
        title: intl.formatMessage(messages.inverted),
        type: 'boolean',
      },
    },
    required: [],
  };
}

export function TableBlockSchema(props) {
  return {
    title: 'Table block',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['table'],
      },
    ],
    properties: {
      table: {
        title: 'Table block',
        widget: 'object',
        schema: TableSchema(props),
      },
    },

    required: [],
  };
}

export default TableBlockSchema;
