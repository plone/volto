const Schema = {
  title: 'Block settings',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['placeholder', 'required', 'fixed', 'readOnly'],
    },
  ],
  properties: {
    placeholder: {
      title: 'Helper text',
      description:
        'A short hint that describes the expected value within this block',
      type: 'string',
    },
    required: {
      title: 'Required',
      description: "Don't allow deletion of this block",
      type: 'boolean',
    },
    fixed: {
      title: 'Fixed position',
      description: 'Disable drag & drop on this block',
      type: 'boolean',
    },
    readOnly: {
      title: 'Read-only',
      description: 'Disable editing on this block',
      type: 'boolean',
    },
  },
  required: [],
};

export default Schema;
