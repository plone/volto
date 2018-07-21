import React from 'react';
import { Map } from 'immutable';
import { DefaultDraftBlockRenderMap } from 'draft-js';

const blockRenderMap = Map({
  callout: {
    element: 'p',
  },
  unstyled: {
    element: 'p',
  },
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

const blockStyleFn = contentBlock => {
  const type = contentBlock.getType();
  if (type === 'callout') {
    return 'callout';
  }
  return null;
};

export { extendedBlockRenderMap, blockStyleFn };
