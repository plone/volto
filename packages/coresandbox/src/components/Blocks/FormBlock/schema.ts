import type { BlockConfigBase } from '@plone/types';

export const formBlockSchema: BlockConfigBase['blockSchema'] = ({ intl }) => ({
  title: 'form Block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title'],
    },
  ],
  properties: {
    title: {
      widget: 'textLine',
      title: 'Title',
    },
  },
  required: [],
});
