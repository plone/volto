import { Map } from 'immutable';
import { DefaultDraftBlockRenderMap } from 'draft-js';

const blockRenderMap = Map({
  callout: {
    element: 'p',
  },
  unstyled: {
    element: 'div',
  },
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

const blockStyleFn = (contentBlock) => {
  const type = contentBlock.getType();
  if (type === 'callout') {
    return 'callout';
  }
  return null;
};

const listBlockTypes = ['unordered-list-item', 'ordered-list-item'];

export { extendedBlockRenderMap, blockStyleFn, listBlockTypes };
