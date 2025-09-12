import React from 'react';

const ImageBlockInfo = {
  id: 'image',
  title: 'Image',
  view: React.lazy(
    () => import(/* webpackChunkName: "plone-blocks" */ './ImageBlockView'),
  ),
  // edit: React.lazy(
  //   () => import(/* webpackChunkName: "plone-blocks" */ './ImageBlockEdit'),
  // ),
  category: 'media',
};

export default ImageBlockInfo;
