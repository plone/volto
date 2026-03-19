import React from 'react';

const ListingBlockInfo = {
  id: 'listing',
  title: 'Listing',
  view: React.lazy(
    () => import(/* webpackChunkName: "plone-blocks" */ './ListingBlockView'),
  ),
  category: 'common',
};

export default ListingBlockInfo;
