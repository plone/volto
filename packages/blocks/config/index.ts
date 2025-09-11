import TitleBlockView from '../Title/View';
import TextBlockView from '../Text/View';
import TextBlockEdit from '../Text/Edit';
import ImageBlockView from '../Image';
import TeaserBlockView from '../Teaser';
import type { ConfigType } from '@plone/registry';

export * from './slate';

export const blocksConfig = {
  title: {
    id: 'title',
    title: 'Title',
    view: TitleBlockView,
    // Just for testing purposes, we must remove this
    // Uncomment and define blockSchema if needed
    // blockSchema: {
    //   fieldsets: [
    //     {
    //       id: 'default',
    //       title: 'Default',
    //       fields: ['title', 'description'], // Example fields, adjust as needed
    //     },
    //   ],
    //   properties: {
    //     title: {
    //       type: 'string',
    //       title: 'Title',
    //     },
    //     description: {
    //       type: 'string',
    //       title: 'Description',
    //     },
    //   },
    //   required: ['title'],
    // },
    category: 'heading',
  },

  slate: {
    id: 'slate',
    title: 'Rich text',
    view: TextBlockView,
    edit: TextBlockEdit,
    category: 'text',
    blockSchema: {
      title: 'Rich text settings',
      fieldsets: [
        {
          id: 'default',
          title: 'Default',
          fields: ['placeholder'], // Example field, adjust as needed
        },
      ],
      properties: {
        placeholder: {
          type: 'string',
          title: 'Placeholder',
        },
      },
      required: [],
    },
  },

  image: {
    id: 'image',
    title: 'Image',
    view: ImageBlockView,
    category: 'media',
  },

  teaser: {
    id: 'teaser',
    title: 'Teaser',
    view: TeaserBlockView,
    category: 'card',
  },
} satisfies ConfigType['blocks']['blocksConfig'];
