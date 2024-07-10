import type { BlockConfigBase } from '@plone/types';

export const inputBlockSchema: BlockConfigBase['blockSchema'] = ({ intl }) => ({
  title: 'Input Block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['url'],
    },
  ],
  properties: {
    url: {
      widget: 'internal_url',
      title: 'url',
    },
  },
  required: [],
});
