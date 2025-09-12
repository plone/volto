import { blocksToPlate, plateToBlocks } from './conversions';
import type { Content } from '@plone/types';

describe('Blocks to Plate conversions', () => {
  it('should handle an empty content object', () => {
    const content: Partial<Content> = {
      blocks: {},
      blocks_layout: { items: [] },
      title: '',
      '@id': '',
      '@type': '',
    };
    // @ts-expect-error
    const plate = blocksToPlate(content);
    expect(plate).toEqual([]);

    const blocks = plateToBlocks(plate);
    expect(blocks).toEqual({
      blocks: {},
      blocks_layout: { items: [] },
    });
  });

  it('should convert a slate block to a plate paragraph', () => {
    const content: Partial<Content> = {
      blocks: {
        'block-1': {
          '@type': 'slate',
          value: [{ children: [{ text: 'Hello, world!' }], type: 'p' }],
        },
      },
      blocks_layout: { items: ['block-1'] },
    };
    // @ts-expect-error
    const plate = blocksToPlate(content);
    expect(plate).toEqual([
      {
        type: 'p',
        children: [{ text: 'Hello, world!' }],
        id: 'block-1',
      },
    ]);

    const blocks = plateToBlocks(plate);
    expect(blocks).toEqual(content);
  });

  it('should convert a title block to a plate title', () => {
    const content: Partial<Content> = {
      blocks: {
        'block-2': {
          '@type': 'title',
        },
      },
      blocks_layout: { items: ['block-2'] },
      title: 'My Title',
    };
    // @ts-expect-error
    const plate = blocksToPlate(content);
    expect(plate).toEqual([
      {
        type: 'title',
        children: [{ text: 'My Title' }],
        id: 'block-2',
        '@type': 'title',
      },
    ]);

    const blocks = plateToBlocks(plate);
    expect(blocks).toEqual({
      blocks: content.blocks,
      blocks_layout: content.blocks_layout,
    });
  });

  it('should handle an unknown block type as Slate unknown elements', () => {
    const content: Partial<Content> = {
      blocks: {
        'block-3': {
          '@type': 'image',
          align: 'left',
          caption: 'My Image',
          url: 'https://example.com/image.jpg',
        },
      },
      blocks_layout: { items: ['block-3'] },
    };
    // @ts-expect-error
    const plate = blocksToPlate(content);
    expect(plate).toEqual([
      {
        type: 'unknown',
        children: [
          {
            text: '',
          },
        ],
        align: 'left',
        caption: 'My Image',
        url: 'https://example.com/image.jpg',
        id: 'block-3',
        '@type': 'image',
      },
    ]);

    const blocks = plateToBlocks(plate);
    expect(blocks).toEqual(content);
  });

  it('should handle multiple blocks of different types', () => {
    const content: Partial<Content> = {
      blocks: {
        'block-1': {
          '@type': 'slate',
          value: [{ children: [{ text: 'Hello, world!' }], type: 'p' }],
        },
        'block-2': {
          '@type': 'title',
        },
        'block-3': {
          '@type': 'image',
        },
      },
      blocks_layout: { items: ['block-1', 'block-2', 'block-3'] },
      title: 'My Title',
      '@id': '',
      '@type': '',
    };
    // @ts-expect-error
    const plate = blocksToPlate(content);
    expect(plate).toEqual([
      {
        type: 'p',
        children: [{ text: 'Hello, world!' }],
        id: 'block-1',
      },
      {
        type: 'title',
        children: [{ text: 'My Title' }],
        id: 'block-2',
        '@type': 'title',
      },
      {
        type: 'unknown',
        children: [
          {
            text: '',
          },
        ],
        id: 'block-3',
        '@type': 'image',
      },
    ]);

    const blocks = plateToBlocks(plate);
    expect(blocks).toEqual({
      blocks: content.blocks,
      blocks_layout: content.blocks_layout,
    });
  });
});
