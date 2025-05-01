import { blocksToPlate, plateToBlocks } from './blocksToSlate';
import type { Content } from '@plone/types';

describe('plateToBlocks', () => {
  it('should convert an empty plateData array to empty blocks and blocks_layout', () => {
    const plateData: any[] = [];
    const result = plateToBlocks(plateData);
    expect(result).toEqual({
      blocks: {},
      blocks_layout: { items: [] },
    });
  });

  it('should convert a plate paragraph to a slate block', () => {
    const plateData = [
      {
        type: 'p',
        children: [{ text: 'Hello, world!' }],
        id: 'block-1',
        '@type': 'slate',
      },
    ];
    const result = plateToBlocks(plateData);
    expect(result).toEqual({
      blocks: {
        'block-1': {
          '@type': 'slate',
          value: [{ text: 'Hello, world!' }],
          type: 'p',
          children: [{ text: 'Hello, world!' }],
          id: 'block-1',
        },
      },
      blocks_layout: { items: ['block-1'] },
    });
  });

  it('should convert a plate image block to an image block', () => {
    const plateData = [
      {
        type: 'image',
        id: 'block-1',
        '@type': 'image',
      },
    ];
    const result = plateToBlocks(plateData);
    expect(result).toEqual({
      blocks: {
        'block-1': {
          '@type': 'image',
          type: 'image',
          id: 'block-1',
        },
      },
      blocks_layout: { items: ['block-1'] },
    });
  });

  it('should handle multiple blocks of different types', () => {
    const plateData = [
      {
        type: 'p',
        children: [{ text: 'Hello' }],
        id: 'block-1',
        '@type': 'slate',
      },
      {
        type: 'title',
        children: [{ text: 'My Title' }],
        id: 'block-2',
        '@type': 'slate',
      },
      {
        type: 'image',
        id: 'block-3',
        '@type': 'image',
      },
    ];
    const result = plateToBlocks(plateData);
    expect(result).toEqual({
      blocks: {
        'block-1': {
          '@type': 'slate',
          value: [{ text: 'Hello' }],
          type: 'p',
          children: [{ text: 'Hello' }],
          id: 'block-1',
        },
        'block-2': {
          '@type': 'slate',
          value: [{ text: 'My Title' }],
          type: 'title',
          children: [{ text: 'My Title' }],
          id: 'block-2',
        },
        'block-3': {
          '@type': 'image',
          type: 'image',
          id: 'block-3',
        },
      },
      blocks_layout: { items: ['block-1', 'block-2', 'block-3'] },
    });
  });
});

describe('blocksToPlate', () => {
  it('should handle an empty content object', () => {
    const content: Partial<Content> = {
      blocks: {},
      blocks_layout: { items: [] },
      title: '',
      '@id': '',
      '@type': '',
    };
    const result = blocksToPlate(content);
    expect(result).toEqual([
      {
        type: 'p',
        '@type': 'slate',
        children: [
          {
            text: '',
          },
        ],
      },
    ]);
  });

  it('should convert a slate block to a plate paragraph', () => {
    const content: Partial<Content> = {
      blocks: {
        'block-1': {
          '@type': 'slate',
          value: [{ text: 'Hello, world!' }],
        },
      },
      blocks_layout: { items: ['block-1'] },
      title: '',
      '@id': '',
      '@type': '',
    };
    const result = blocksToPlate(content);
    expect(result).toEqual([
      {
        type: 'p',
        children: [{ text: 'Hello, world!' }],
        id: 'block-1',
        '@type': 'slate',
        value: [{ text: 'Hello, world!' }],
      },
      {
        type: 'p',
        '@type': 'slate',
        children: [
          {
            text: '',
          },
        ],
      },
    ]);
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
      '@id': '',
      '@type': '',
    };
    const result = blocksToPlate(content);
    expect(result).toEqual([
      {
        type: 'title',
        children: [{ text: 'My Title' }],
        id: 'block-2',
        '@type': 'title',
      },
      {
        type: 'p',
        '@type': 'slate',
        children: [
          {
            text: '',
          },
        ],
      },
    ]);
  });

  it('should handle other block types by setting their children to an empty array', () => {
    const content: Partial<Content> = {
      blocks: {
        'block-3': {
          '@type': 'image',
        },
      },
      blocks_layout: { items: ['block-3'] },
      title: '',
      '@id': '',
      '@type': '',
    };
    const result = blocksToPlate(content);
    expect(result).toEqual([
      {
        type: 'image',
        children: [],
        id: 'block-3',
        '@type': 'image',
      },
      {
        type: 'p',
        '@type': 'slate',
        children: [
          {
            text: '',
          },
        ],
      },
    ]);
  });

  it('should handle multiple blocks of different types', () => {
    const content: Partial<Content> = {
      blocks: {
        'block-1': {
          '@type': 'slate',
          value: [{ text: 'Hello' }],
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
    const result = blocksToPlate(content);
    expect(result).toEqual([
      {
        type: 'p',
        children: [{ text: 'Hello' }],
        id: 'block-1',
        '@type': 'slate',
        value: [{ text: 'Hello' }],
      },
      {
        type: 'title',
        children: [{ text: 'My Title' }],
        id: 'block-2',
        '@type': 'title',
      },
      {
        type: 'image',
        children: [],
        id: 'block-3',
        '@type': 'image',
      },
      {
        type: 'p',
        '@type': 'slate',
        children: [
          {
            text: '',
          },
        ],
      },
    ]);
  });
});
