import { BaseTocPlugin } from '@platejs/toc';

import { TocElementStatic } from '../../ui/toc-node-static';
import { BLOCK_WIDTH_VALUES } from './block-width-plugin';
import { queryHeadingWithTitle } from './toc-query-heading';

export const BaseTocKit = [
  BaseTocPlugin.configure({
    options: {
      queryHeading: queryHeadingWithTitle,
      blockWidth: {
        defaultWidth: BLOCK_WIDTH_VALUES.default,
      },
    },
  }).withComponent(TocElementStatic),
];
