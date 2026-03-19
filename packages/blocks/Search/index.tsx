import React from 'react';

const SearchBlockInfo = {
  id: 'search',
  title: 'Search',
  view: React.lazy(
    () => import(/* webpackChunkName: "plone-blocks" */ './SearchBlockView'),
  ),
  category: 'common',
};

export default SearchBlockInfo;
