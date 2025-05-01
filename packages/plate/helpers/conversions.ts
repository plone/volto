import type { BlocksData, Content } from '@plone/types';
import type { TElement, TText } from '@udecode/plate';

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
        return {
          type: 'p',
          children: [block.value[0]],
          id: blockId,
          ...block,
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
      }

      return {
        type: block['@type'],
        // We need not to render anything
        children: [{ text: '' }],
        id: blockId,
        ...block,
      };
    },
  );

  // Add a default paragraph block at the end
  plateData.push({
    type: 'p',
    '@type': 'slate',
    children: [
      {
        text: '',
      },
    ],
  });
  return plateData.filter((block) => block !== undefined);
}

export function plateToBlocks(plateData: Array<ExtendedSlateNode>) {
  const blocks: BlocksData['blocks'] = {};
  const blocks_layout: BlocksData['blocks_layout'] = { items: [] };

  const VOID_BLOCKS = ['image'];

  plateData.forEach((node) => {
    if (VOID_BLOCKS.includes(node.type as string)) {
      blocks[node.id] = {
        '@type': node.type,
        ...node,
      };
    } else {
      blocks[node.id] = {
        '@type': 'slate',
        value: node.children,
        ...node,
      };
    }
    blocks_layout.items.push(node.id);
  });

  return { blocks, blocks_layout };
}
