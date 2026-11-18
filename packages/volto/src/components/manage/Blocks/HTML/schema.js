/**
 * The HTML block data schema. It is registered as the `blockSchema` of the
 * `html` block. The HTML block has no sidebar form, since its only field,
 * `html`, is edited with the code editor in the block itself. The schema
 * describes the block data for consumers of the blocks configuration.
 */
export const HTMLBlockSchema = () => ({
  title: 'HTML',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['html'],
    },
  ],
  properties: {
    html: {
      title: 'HTML',
      description: 'The raw HTML markup rendered by the block.',
      widget: 'textarea',
    },
  },
  required: [],
});
