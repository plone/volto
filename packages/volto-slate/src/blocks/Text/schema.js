const TextBlockSchema = (data) => {
  const { override_toc } = data;
  return {
    title: 'Advanced settings',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'override_toc',
          ...(override_toc ? ['level', 'entry_text'] : []),
        ],
      },
    ],
    properties: {
      override_toc: {
        title: 'Override TOC entry',
        type: 'boolean',
      },
      level: {
        title: 'TOC entry level',
        choices: [
          ['h1', 'h1'],
          ['h2', 'h2'],
          ['h3', 'h3'],
          ['h4', 'h4'],
          ['h5', 'h5'],
          ['h6', 'h6'],
        ],
      },
      entry_text: {
        title: 'Entry text for TOC',
      },
    },
    required: [],
  };
};

export default TextBlockSchema;
