import React from 'react';
import type { BlockConfigBase } from '@plone/types';
import { ListIcon } from '@plone/components/Icons';
import { ListingSchema } from './schema';

const ListingBlockInfo = {
  id: 'listing',
  title: 'Listing',
  view: React.lazy(
    () => import(/* webpackChunkName: "plone-blocks" */ './ListingBlockView'),
  ),
  edit: React.lazy(
    () => import(/* webpackChunkName: "plone-blocks" */ './ListingBlockEdit'),
  ),
  blockSchema: ListingSchema,
  icon: ListIcon,
  category: 'common',
} satisfies Partial<BlockConfigBase>;

export default ListingBlockInfo;
