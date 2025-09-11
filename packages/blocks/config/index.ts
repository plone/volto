import TitleBlockView from '../Title/View';
import TitleBlockEdit from '../Title/Edit';
import TextBlockView from '../Text/View';
import ImageBlockView from '../Image';
import TeaserBlockView from '../Teaser';
import TextBlockEdit from '../Text/Edit';

export * from './slate';

export const blocksConfig = {
  title: {
    id: 'title',
    title: 'Title',
    view: TitleBlockView,
    edit: TitleBlockEdit,
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
};
