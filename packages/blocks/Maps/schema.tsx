import type { JSONSchema } from '@plone/types';

type MapsSchemaArgs = {
  formData?: {
    url?: string;
  };
};

export function MapsSchema(_args: MapsSchemaArgs = {}): JSONSchema {
  return {
    title: 'Maps',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['url', 'title', 'align'],
      },
    ],
    properties: {
      url: {
        title: 'Maps URL',
        widget: 'url',
      },
      title: {
        title: 'Map title',
      },
      align: {
        title: 'Alignment',
        widget: 'align',
        default: 'center',
        actions: ['left', 'right', 'center'],
      },
    },
    required: [],
  };
}
