const TableOfContentsSchema = ({ data }) => {
  const { variation = 'default' } = data;

  return {
    title: 'Table of Contents',
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
        title: 'Block title',
      },
      hide_title: {
        title: 'Hide title',
        type: 'boolean',
      },
      levels: {
        title: 'Entries',
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
        title: 'Ordered',
        type: 'boolean',
      },
      sticky: {
        title: 'Sticky',
        type: 'boolean',
      },
    },
    required: [],
  };
};

export default TableOfContentsSchema;
