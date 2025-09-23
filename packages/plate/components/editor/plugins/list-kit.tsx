import { ListPlugin } from '@platejs/list/react';
import { KEYS } from 'platejs';

import { IndentKit } from './indent-kit';
import { BlockList } from '../../ui/block-list';

export const ListKit = [
  ...IndentKit,
  ListPlugin.configure({
    inject: {
      targetPlugins: [
        ...KEYS.heading,
        KEYS.p,
        KEYS.blockquote,
        KEYS.codeBlock,
        KEYS.toggle,
        KEYS.img,
      ],
    },
    render: {
      belowNodes: BlockList,
    },
  }),
];
