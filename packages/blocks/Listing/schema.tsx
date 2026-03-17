import type { JSONSchema } from '@plone/types';

export function ListingSchema(): JSONSchema {
  return {
    title: 'Listing',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['headline', 'querystring'],
      },
    ],
    properties: {
      headline: {
        title: 'Headline',
      },

      querystring: {
        title: 'Query',
        description:
          'Enter a querystring to filter the content items to be listed. For example: "Type: News Item" or "path: /news".',
      },
      widget: 'querystring',
    },
    required: ['querystring'],
  };
}
