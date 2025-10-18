import React from 'react';

const VideoBlockInfo = {
  id: 'video',
  title: 'Video',
  view: React.lazy(
    () => import(/* webpackChunkName: "plone-blocks" */ './VideoBlockView'),
  ),
  category: 'media',
};

export default VideoBlockInfo;
