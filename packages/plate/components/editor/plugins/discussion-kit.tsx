import type { TComment } from '../../ui/comment';

import { createPlatePlugin } from 'platejs/react';
import { BlockDiscussion } from '../../ui/block-discussion';

export interface TDiscussion {
  id: string;
  comments: TComment[];
  createdAt: Date;
  isResolved: boolean;
  userId: string;
  documentContent?: string;
}

export type TDiscussionUser = {
  id: string;
  avatarUrl?: string;
  name: string;
  hue?: number;
};

export const discussionPlugin = createPlatePlugin({
  key: 'discussion',
}).configure({
  render: { belowNodes: BlockDiscussion },
});

export const DiscussionKit = [discussionPlugin];
