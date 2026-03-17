import React from 'react';
import { MapsSchema } from './schema';
import { WorldIcon } from '@plone/components/Icons';

const MapsBlockInfo = {
  id: 'maps',
  title: 'Maps',
  view: React.lazy(
    () => import(/* webpackChunkName: "plone-blocks" */ './MapsBlockView'),
  ),
  edit: React.lazy(
    () => import(/* webpackChunkName: "plone-blocks" */ './MapsBlockEdit'),
  ),
  category: 'common',
  blockSchema: MapsSchema,
  icon: WorldIcon,
};

export default MapsBlockInfo;
