import type { BlocksData, Content } from '@plone/types';
import { nanoid, type TElement, type TText } from '@udecode/plate';

type SlateNode = TElement;
type ExtendedSlateNode = SlateNode & {
  id: string;
  '@type'?: string;
  value?: SlateNode[];
};

export function blocksToPlate(content: Content) {
  const { blocks, blocks_layout } = content;

  const plateData: Array<ExtendedSlateNode> = blocks_layout.items.map(
    (blockId) => {
      const block = blocks[blockId];

      if (block['@type'] === 'slate') {
        const { '@type': blockType, value, plaintext, ...blockValue } = block;
        return {
          ...value[0],
          id: blockId,
          ...blockValue,
        };
      } else if (block['@type'] === 'title') {
        return {
          type: 'title',
          children: [
            {
              text: content.title,
            },
          ],
          id: blockId,
          ...block,
        };
      } else if (block['@type'] === 'teaser') {
        return {
          type: 'teaser',
          children: [{ text: '' }],
          id: blockId,
          ...block,
        };
      }

      return {
        type: 'unknown',
        // We need not to render anything
        children: [{ text: '' }],
        id: blockId,
        ...block,
      };
    },
  );

  return plateData.filter((block) => block !== undefined);
}

export function plateToBlocks(plateData: Array<ExtendedSlateNode>) {
  const blocks: BlocksData['blocks'] = {};
  const blocks_layout: BlocksData['blocks_layout'] = { items: [] };
  // console.log('plateData', plateData);
  plateData.forEach((node) => {
    const id = node.id || nanoid(10);
    if (node['@type']) {
      const { id, type, children, ...nodeValue } = node;
      blocks[id] = {
        ...nodeValue,
      };
    } else {
      const { id, ...nodeValue } = node;
      blocks[id] = {
        '@type': 'slate',
        value: [nodeValue],
      };
    }
    blocks_layout.items.push(id);
  });

  return { blocks, blocks_layout };
}
