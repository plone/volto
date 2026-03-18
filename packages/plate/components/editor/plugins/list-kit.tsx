import { ListPlugin } from '@platejs/list/react';
import { KEYS } from 'platejs';

import { IndentKit } from './indent-kit';
import { BlockList } from '../../ui/block-list';
import { LegacyListPlugin } from './legacy-list-plugin';

export const ListKit = [
  ...IndentKit,
  ...LegacyListPlugin,
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
