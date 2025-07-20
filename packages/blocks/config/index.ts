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
    category: 'heading',
  },

  slate: {
    id: 'slate',
    title: 'Rich text',
    view: TextBlockView,
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
