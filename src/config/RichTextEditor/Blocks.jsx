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
  arrowList: {
    element: 'li',
    wrapper: <ul className="arrow-list" />,
  },
  checkmarksList: {
    element: 'li',
    wrapper: <ul className="checkmarks-list" />,
  },
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

const blockStyleFn = contentBlock => {
  const type = contentBlock.getType();
  if (type === 'callout') {
    return 'callout';
  }
  if (type === 'arrowList') {
    return 'arrow-list';
  }
  if (type === 'checkmarksList') {
    return 'checkmarks-list';
  }
  return null;
};

export { extendedBlockRenderMap, blockStyleFn };
