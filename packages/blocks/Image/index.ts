import React from 'react';
import type { BlockConfigBase } from '@plone/types';
import { ImageSchema } from './schema';
import { ImageIcon } from '@plone/components/Icons';

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
  icon: ImageIcon,
} satisfies Partial<BlockConfigBase>;

export default ImageBlockInfo;
