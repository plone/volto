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
  table_block: {
    id: 'Table block',
    defaultMessage: 'Table block',
  },
});

function TableSchema(props) {
  const { intl } = props;
  return {
    title: intl.formatMessage(messages.table_block),
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
        helpUrl: 'https://6.docs.plone.org/user-manual/blocks.html',
      },
      sortable: {
        title: intl.formatMessage(messages.sortable),
        type: 'boolean',
        helpUrl: 'https://6.docs.plone.org/user-manual/blocks.html',
      },
      fixed: {
        title: intl.formatMessage(messages.fixed),
        type: 'boolean',
        helpUrl: 'https://6.docs.plone.org/user-manual/blocks.html',
      },
      celled: {
        title: intl.formatMessage(messages.celled),
        type: 'boolean',
        helpUrl: 'https://6.docs.plone.org/user-manual/blocks.html',
      },
      striped: {
        title: intl.formatMessage(messages.striped),
        type: 'boolean',
        helpUrl: 'https://6.docs.plone.org/user-manual/blocks.html',
      },
      compact: {
        title: intl.formatMessage(messages.compact),
        type: 'boolean',
        helpUrl: 'https://6.docs.plone.org/user-manual/blocks.html',
      },
      basic: {
        title: intl.formatMessage(messages.basic),
        type: 'boolean',
        helpUrl: 'https://6.docs.plone.org/user-manual/blocks.html',
      },
      inverted: {
        title: intl.formatMessage(messages.inverted),
        type: 'boolean',
        helpUrl: 'https://6.docs.plone.org/user-manual/blocks.html',
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
