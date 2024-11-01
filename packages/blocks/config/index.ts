import TitleBlockView from '../Title/View';
import TextBlockView from '../Text/View';
import ImageBlockView from '../Image';

export * from './slate';

export const blocksConfig = {
  title: {
    id: 'title',
    title: 'Title',
    view: TitleBlockView,
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
};
