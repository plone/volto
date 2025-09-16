import React from 'react';

const TeaserBlockInfo = {
  id: 'teaser',
  title: 'Teaser',
  view: React.lazy(
    () => import(/* webpackChunkName: "plone-blocks" */ './TeaserBlockView'),
  ),
  // edit: React.lazy(
  //   () => import(/* webpackChunkName: "plone-blocks" */ './TextBlockEdit'),
  // ),
  category: 'teaser',
};

export default TeaserBlockInfo;
