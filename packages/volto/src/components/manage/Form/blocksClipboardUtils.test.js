import config from '@plone/volto/registry';
import { cloneBlocks } from './blocksClipboardUtils';

vi.mock(
  'uuid',
  () => {
    let nextId = 0;
    return { v4: vi.fn(() => `generated-${++nextId}`) };
  },
  { virtual: true },
);

const collectBlockIds = (blockData, ids = []) => {
  const blocks = blockData?.blocks || {};
  const layout = blockData?.blocks_layout?.items || [];

  layout.forEach((id) => {
    ids.push(id);
    collectBlockIds(blocks[id], ids);
  });

  return ids;
};

describe('cloneBlocks', () => {
  const originalBlocksConfig = config.blocks.blocksConfig;

  afterEach(() => {
    config.blocks.blocksConfig = originalBlocksConfig;
  });

  it('preserves layout order, uses child cloneData, and regenerates nested IDs', () => {
    const cloneSpecial = vi.fn((block) => [
      'cloned-special',
      { ...block, clonedByChildConfig: true },
    ]);
    const cloneParent = vi.fn();

    config.blocks.blocksConfig = {
      parent: { cloneData: cloneParent },
      special: { cloneData: cloneSpecial },
      nested: {},
      leaf: {},
    };

    const source = {
      '@type': 'parent',
      blocks: {
        'original-nested': {
          '@type': 'nested',
          title: 'First in object, second in layout',
          blocks: {
            'original-leaf': {
              '@type': 'leaf',
              title: 'Nested leaf',
            },
          },
          blocks_layout: { items: ['original-leaf'] },
        },
        'original-special': {
          '@type': 'special',
          title: 'Second in object, first in layout',
        },
      },
      blocks_layout: {
        items: ['original-special', 'original-nested'],
      },
    };
    const sourceSnapshot = JSON.parse(JSON.stringify(source));

    const cloned = cloneBlocks(source);
    const clonedIds = cloned.blocks_layout.items;
    const originalIds = collectBlockIds(source);
    const allClonedIds = collectBlockIds(cloned);

    expect(cloneSpecial).toHaveBeenCalledWith(
      source.blocks['original-special'],
    );
    expect(cloneParent).not.toHaveBeenCalled();
    expect(clonedIds[0]).toBe('cloned-special');
    expect(cloned.blocks[clonedIds[0]]).toMatchObject({
      title: 'Second in object, first in layout',
      clonedByChildConfig: true,
    });
    expect(cloned.blocks[clonedIds[1]]).toMatchObject({
      title: 'First in object, second in layout',
    });

    expect(new Set(allClonedIds).size).toBe(allClonedIds.length);
    allClonedIds.forEach((id) => expect(originalIds).not.toContain(id));
    expect(source).toEqual(sourceSnapshot);
  });

  it('omits children whose cloneData refuses copying without corrupting layout', () => {
    config.blocks.blocksConfig = {
      allowed: { cloneData: (block) => ['cloned-allowed', block] },
      refused: { cloneData: () => null },
    };

    const source = {
      blocks: {
        refused: { '@type': 'refused' },
        allowed: { '@type': 'allowed' },
      },
      blocks_layout: { items: ['refused', 'allowed'] },
    };

    expect(cloneBlocks(source)).toEqual({
      blocks: {
        'cloned-allowed': { '@type': 'allowed' },
      },
      blocks_layout: { items: ['cloned-allowed'] },
    });
  });
});
