import TitleBlockView from '../Title/View';
import TextBlockView from '../Text/View';

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
};
