import { defineMessages } from 'react-intl';

const messages = defineMessages({
  toc: {
    id: 'toc',
    defaultMessage: 'Table of Contents',
  },
  Title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  HideTitle: {
    id: 'Hide title',
    defaultMessage: 'Hide title',
  },
  Entries: {
    id: 'Entries',
    defaultMessage: 'Entries',
  },
  Ordered: {
    id: 'Ordered',
    defaultMessage: 'Ordered',
  },
  Sticky: {
    id: 'Sticky',
    defaultMessage: 'Sticky',
  },
});

const TableOfContentsSchema = ({ data, intl }) => {
  const { variation = 'default' } = data;

  return {
    title: intl.formatMessage(messages.toc),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'title',
          'hide_title',
          ...(variation === 'default' ? ['ordered'] : ['sticky']),
          'levels',
        ],
      },
    ],
    properties: {
      title: {
        title: intl.formatMessage(messages.Title),
      },
      hide_title: {
        title: intl.formatMessage(messages.HideTitle),
        type: 'boolean',
      },
      levels: {
        title: intl.formatMessage(messages.Entries),
        isMulti: true,
        choices: [
          ['h1', 'h1'],
          ['h2', 'h2'],
          ['h3', 'h3'],
          ['h4', 'h4'],
          ['h5', 'h5'],
          ['h6', 'h6'],
        ],
      },
      ordered: {
        title: intl.formatMessage(messages.Ordered),
        type: 'boolean',
      },
      sticky: {
        title: intl.formatMessage(messages.Sticky),
        type: 'boolean',
      },
    },
    required: [],
  };
};

export default TableOfContentsSchema;
