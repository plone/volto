import React from 'react';
import type { BlockConfigBase } from '@plone/types';

const ListingBlockInfo = {
  id: 'listing',
  title: 'Listing',
  view: React.lazy(
    () => import(/* webpackChunkName: "plone-blocks" */ './ListingBlockView'),
  ),
  category: 'common',
} satisfies Partial<BlockConfigBase>;

export default ListingBlockInfo;
