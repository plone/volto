import React from 'react';
import type { BlockConfigBase } from '@plone/types';
import { LinkIcon } from '@plone/components/Icons';
import { TeaserSchema } from './schema';

const TeaserBlockInfo = {
  id: 'teaser',
  title: 'Teaser',
  view: React.lazy(
    () => import(/* webpackChunkName: "plone-blocks" */ './TeaserBlockView'),
  ),
  edit: React.lazy(
    () => import(/* webpackChunkName: "plone-blocks" */ './TeaserEdit'),
  ),
  category: 'teaser',
  blockSchema: TeaserSchema,
  icon: LinkIcon,
} satisfies Partial<BlockConfigBase>;

export default TeaserBlockInfo;
