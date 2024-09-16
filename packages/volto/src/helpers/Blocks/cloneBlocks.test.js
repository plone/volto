import { cloneDeep } from 'lodash-es';
import { cloneBlocks } from './cloneBlocks';

describe('cloneBlocks', () => {
  it('cloneBlocks - basic', () => {
    const blocksData = {
      blocks: {
        a: { '@type': 'slate', value: 1 },
        b: { '@type': 'slate', value: 2 },
      },
      blocks_layout: { items: ['a', 'b'] },
    };
    const result = cloneBlocks(blocksData);

    expect(result.blocks_layout.items[0]).not.toBe('a');
    expect(result.blocks[result.blocks_layout.items[0]]).toStrictEqual({
      '@type': 'slate',
      value: 1,
    });
  });

  it('cloneBlocks - nested', () => {
    const blocksData = {
      blocks: {
        a: { '@type': 'slate', value: 1 },
        b: { '@type': 'slate', value: 2 },
      },
      blocks_layout: { items: ['a', 'b'] },
    };
    blocksData.blocks.c = cloneDeep(blocksData);
    blocksData.blocks_layout.items.push('c');

    const result = cloneBlocks(blocksData);

    expect(result.blocks_layout.items[0]).not.toBe('a');
    expect(result.blocks[result.blocks_layout.items[0]]).toStrictEqual({
      '@type': 'slate',
      value: 1,
    });

    expect(
      result.blocks[result.blocks_layout.items[2]].blocks_layout.items[0],
    ).not.toBe('c');

    expect(
      result.blocks[result.blocks_layout.items[2]].blocks[
        result.blocks[result.blocks_layout.items[2]].blocks_layout.items[0]
      ],
    ).toStrictEqual({
      '@type': 'slate',
      value: 1,
    });
  });
});
