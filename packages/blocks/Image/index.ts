import React from 'react';
import { ImageSchema } from './schema';

const ImageBlockInfo = {
  id: 'image',
  title: 'Image',
  view: React.lazy(
    () => import(/* webpackChunkName: "plone-blocks" */ './ImageBlockView'),
  ),
  edit: React.lazy(
    () => import(/* webpackChunkName: "plone-blocks" */ './ImageBlockEdit'),
  ),
  category: 'media',
  blockSchema: ImageSchema,
};

export default ImageBlockInfo;
