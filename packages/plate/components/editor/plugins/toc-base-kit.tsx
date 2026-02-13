import { BaseTocPlugin } from '@platejs/toc';

import { TocElementStatic } from '../../ui/toc-node-static';
import { BLOCK_WIDTH_VALUES } from './block-width-plugin';

export const BaseTocKit = [
  BaseTocPlugin.configure({
    options: {
      blockWidth: {
        defaultWidth: BLOCK_WIDTH_VALUES.default,
      },
    },
  }).withComponent(TocElementStatic),
];
