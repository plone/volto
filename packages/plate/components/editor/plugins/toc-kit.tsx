import { TocPlugin } from '@platejs/toc/react';

import { TocElement } from '../../ui/toc-node';
import { queryHeadingWithTitle } from './toc-query-heading';

export const TocKit = [
  TocPlugin.configure({
    options: {
      // isScroll requires the EditorContainer to have overflow-y: auto/scroll
      // Therefore, we have custom scrolling behaviour outside the EditorContainer
      isScroll: false,
      topOffset: 80,
      queryHeading: queryHeadingWithTitle,
    },
  }).withComponent(TocElement),
];
