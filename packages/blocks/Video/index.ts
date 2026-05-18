import React from 'react';
import type { BlockConfigBase } from '@plone/types';

const VideoBlockInfo = {
  id: 'video',
  title: 'Video',
  view: React.lazy(
    () => import(/* webpackChunkName: "plone-blocks" */ './VideoBlockView'),
  ),
  category: 'media',
  allowedPeertubeInstances: [] as string[],
} satisfies Partial<BlockConfigBase> & {
  allowedPeertubeInstances?: string[];
};

export default VideoBlockInfo;
