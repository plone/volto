import TitleBlockView from '../Title/View';
import TextBlockView from '../Text/View';
import ImageBlockView from '../Image';
import TeaserBlockView from '../Teaser';

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
  },

  slate: {
    id: 'slate',
    title: 'Rich text',
    view: TextBlockView,
  },

  image: {
    id: 'image',
    title: 'Image',
    view: ImageBlockView,
  },

  teaser: {
    id: 'teaser',
    title: 'Teaser',
    view: TeaserBlockView,
  },
};
