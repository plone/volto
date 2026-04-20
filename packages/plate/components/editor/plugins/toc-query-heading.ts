import type { SlateEditor, TElement } from 'platejs';

import { type Heading, isHeading } from '@platejs/toc';
import { NodeApi } from 'platejs';

import { TITLE_BLOCK_TYPE } from './title';

const headingDepth: Record<string, number> = {
  [TITLE_BLOCK_TYPE]: 1,
  h1: 1,
  h2: 2,
  h3: 3,
  h4: 4,
  h5: 5,
  h6: 6,
};

export const queryHeadingWithTitle = (editor: SlateEditor): Heading[] => {
  const headingList: Heading[] = [];

  const values = editor.api.nodes<TElement>({
    at: [],
    match: (n) => isHeading(n) || n.type === TITLE_BLOCK_TYPE,
  });

  if (!values) return [];

  Array.from(values, ([node, path]) => {
    const { type } = node;
    const title = NodeApi.string(node);
    const depth = headingDepth[type];
    const id = node.id as string;

    if (title) {
      headingList.push({ id, depth, path, title, type });
    }
  });

  return headingList;
};
