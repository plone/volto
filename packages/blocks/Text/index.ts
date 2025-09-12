import React from 'react';

const TextBlockInfo = {
  id: 'slate',
  title: 'Rich text',
  view: React.lazy(
    () => import(/* webpackChunkName: "plone-blocks" */ './TextBlockView'),
  ),
  edit: React.lazy(
    () => import(/* webpackChunkName: "plone-blocks" */ './TextBlockEdit'),
  ),
  category: 'text',
};

export default TextBlockInfo;
