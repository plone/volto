import { BaseTocPlugin } from '@platejs/toc';

import { TocElementStatic } from '../../ui/toc-node-static';
import { queryHeadingWithTitle } from './toc-query-heading';

export const BaseTocKit = [
  BaseTocPlugin.configure({
    options: {
      queryHeading: queryHeadingWithTitle,
    },
  }).withComponent(TocElementStatic),
];
