import React from 'react';

const ToCBlockInfo = {
  id: 'toc',
  title: 'Table of Contents',
  view: React.lazy(
    () => import(/* webpackChunkName: "plone-blocks" */ './ToCBlockView'),
  ),
  // edit: React.lazy(
  //   () => import(/* webpackChunkName: "plone-blocks" */ './ToCBlockEdit'),
  // ),
  category: 'common',
};

export default ToCBlockInfo;
