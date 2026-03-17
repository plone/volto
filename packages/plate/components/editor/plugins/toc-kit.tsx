import { TocPlugin } from '@platejs/toc/react';

import { TocElement } from '../../ui/toc-node';
import { BLOCK_WIDTH_VALUES } from './block-width-plugin';
import { queryHeadingWithTitle } from './toc-query-heading';

export const TocKit = [
  TocPlugin.configure({
    options: {
      isScroll: true,
      topOffset: 80,
      queryHeading: queryHeadingWithTitle,
      blockWidth: {
        defaultWidth: BLOCK_WIDTH_VALUES.default,
      },
    },
  }).withComponent(TocElement),
];
