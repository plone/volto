import React from 'react';
import { ListIcon } from '@plone/components/Icons';
import { ListingSchema } from './schema';

const ListingBlockInfo = {
  id: 'listing',
  title: 'Listing',
  view: React.lazy(
    () => import(/* webpackChunkName: "plone-blocks" */ './ListingBlockView'),
  ),
  edit: React.lazy(
    () => import(/* webpackChunkName: "plone-blocks" */ './ListingEdit'),
  ),
  category: 'common',
  blockSchema: ListingSchema,
  icon: ListIcon,
};

export default ListingBlockInfo;
