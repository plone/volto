import config from '@plone/volto/registry';

const TableOfContentsSchema = ({ data }) => {
  const { block_extension = 'default' } = data;
  const extensions = config.blocks.blocksConfig.toc.extensions;

  return {
    title: 'Table of Contents',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'title',
          'hide_title',
          ...(block_extension === 'default' ? ['ordered'] : []),
          'levels',
          'block_extension',
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
      block_extension: {
        title: 'Extension',
        choices: extensions.map((extension) => [extension.id, extension.title]),
        defaultValue: 'default',
      },
      ordered: {
        title: 'Ordered',
        type: 'boolean',
      },
    },
    required: [],
  };
};

export default TableOfContentsSchema;
