import type { Content } from '@plone/types';
import { describe, expect, it, vi } from 'vitest';
import { createBlockEditorContextValue } from './useBlockEditorContextValue';

type Blocks = Content['blocks'];
type BlocksLayout = Content['blocks_layout'];

const createAtomSetter = <Value>(initialValue: Value) => {
  let currentValue = initialValue;
  const setter = vi.fn((updater: (previous: Value) => Value) => {
    currentValue = updater(currentValue);
  });

  return {
    setter,
    getValue: () => currentValue,
  };
};

const createBlocks = (): Blocks =>
  ({
    a: { '@type': 'text' },
    b: { '@type': 'text' },
    c: { '@type': 'text' },
  }) as Blocks;

const createLayout = (items: string[]): BlocksLayout =>
  ({
    items,
  }) as BlocksLayout;

describe('createBlockEditorContextValue', () => {
  it('moves blocks up within the layout', () => {
    const blocksSetter = createAtomSetter<Blocks>(createBlocks());
    const layoutSetter = createAtomSetter<BlocksLayout>(
      createLayout(['a', 'b', 'c']),
    );
    const onSelectBlock = vi.fn();

    const contextValue = createBlockEditorContextValue({
      setBlocks: blocksSetter.setter,
      setBlocksLayout: layoutSetter.setter,
      onSelectBlock,
    });

    contextValue.moveBlockUp('c');

    expect(layoutSetter.setter).toHaveBeenCalledTimes(1);
    expect(layoutSetter.getValue()?.items).toEqual(['a', 'c', 'b']);
    expect(blocksSetter.setter).not.toHaveBeenCalled();
    expect(onSelectBlock).not.toHaveBeenCalled();
  });

  it('moves blocks down within the layout', () => {
    const blocksSetter = createAtomSetter<Blocks>(createBlocks());
    const layoutSetter = createAtomSetter<BlocksLayout>(
      createLayout(['a', 'b', 'c']),
    );
    const onSelectBlock = vi.fn();

    const contextValue = createBlockEditorContextValue({
      setBlocks: blocksSetter.setter,
      setBlocksLayout: layoutSetter.setter,
      onSelectBlock,
    });

    contextValue.moveBlockDown('a');

    expect(layoutSetter.setter).toHaveBeenCalledTimes(1);
    expect(layoutSetter.getValue()?.items).toEqual(['b', 'a', 'c']);
    expect(blocksSetter.setter).not.toHaveBeenCalled();
    expect(onSelectBlock).not.toHaveBeenCalled();
  });

  it('deletes a block, updates layout, and selects the fallback block', () => {
    const blocksSetter = createAtomSetter<Blocks>(createBlocks());
    const layoutSetter = createAtomSetter<BlocksLayout>(
      createLayout(['a', 'b', 'c']),
    );
    const onSelectBlock = vi.fn();

    const contextValue = createBlockEditorContextValue({
      setBlocks: blocksSetter.setter,
      setBlocksLayout: layoutSetter.setter,
      onSelectBlock,
    });

    contextValue.deleteBlock('b');

    expect(blocksSetter.setter).toHaveBeenCalledTimes(1);
    expect(blocksSetter.getValue()).toMatchObject({ a: {}, c: {} });
    expect(layoutSetter.getValue()?.items).toEqual(['a', 'c']);
    expect(onSelectBlock).toHaveBeenCalledWith('c');
  });

  it('resets the selection to null when the last block is removed', () => {
    const blocksSetter = createAtomSetter<Blocks>({
      only: { '@type': 'text' },
    } as Blocks);
    const layoutSetter = createAtomSetter<BlocksLayout>(createLayout(['only']));
    const onSelectBlock = vi.fn();

    const contextValue = createBlockEditorContextValue({
      setBlocks: blocksSetter.setter,
      setBlocksLayout: layoutSetter.setter,
      onSelectBlock,
    });

    contextValue.deleteBlock('only');

    expect(layoutSetter.getValue()?.items).toEqual([]);
    expect(onSelectBlock).toHaveBeenCalledWith(null);
  });

  it('does nothing when deleting a block that does not exist', () => {
    const initialBlocks = createBlocks();
    const initialLayout = createLayout(['a', 'b']);
    const blocksSetter = createAtomSetter<Blocks>(initialBlocks);
    const layoutSetter = createAtomSetter<BlocksLayout>(initialLayout);
    const onSelectBlock = vi.fn();

    const contextValue = createBlockEditorContextValue({
      setBlocks: blocksSetter.setter,
      setBlocksLayout: layoutSetter.setter,
      onSelectBlock,
    });

    contextValue.deleteBlock('missing');

    expect(blocksSetter.getValue()).toEqual(initialBlocks);
    expect(layoutSetter.getValue()).toEqual(initialLayout);
    expect(onSelectBlock).not.toHaveBeenCalled();
  });
});
