import React from 'react';
import ToCVariations from './variations';

const ToCBlockInfo = {
  id: 'toc',
  title: 'Table of Contents',
  view: React.lazy(
    () => import(/* webpackChunkName: "plone-blocks" */ './ToCBlockView'),
  ),
  // edit: React.lazy(
  //   () => import(/* webpackChunkName: "plone-blocks" */ './ToCBlockEdit'),
  // ),
  variations: ToCVariations,
  category: 'common',
};

export default ToCBlockInfo;
