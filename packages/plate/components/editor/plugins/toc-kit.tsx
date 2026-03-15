import { TocPlugin } from '@platejs/toc/react';

import { TocElement } from '../../ui/toc-node';
import { BLOCK_WIDTH_VALUES } from './block-width-plugin';

export const TocKit = [
  TocPlugin.configure({
    options: {
      // isScroll: true,
      topOffset: 80,
      blockWidth: {
        defaultWidth: BLOCK_WIDTH_VALUES.default,
      },
    },
  }).withComponent(TocElement),
];
