import { getAllBlocks } from './blocks';

describe('Blocks utils', () => {
  describe('Get all blocks', () => {
    it('Basic empty test', () => {
      const metadata = {};
      const blocks = getAllBlocks(metadata, []);
      expect(blocks).toEqual([]);
    });

    it('Empty blocks', () => {
      const metadata = {
        blocks: {},
        blocks_layout: {},
      };
      const blocks = getAllBlocks(metadata, []);
      expect(blocks).toEqual([]);
    });

    it('Empty blocks with items', () => {
      const metadata = {
        blocks: {},
        blocks_layout: { items: [] },
      };
      const blocks = getAllBlocks(metadata, []);
      expect(blocks).toEqual([]);
    });

    it('One level of blocks', () => {
      const metadata = {
        blocks: { a: {} },
        blocks_layout: { items: ['a'] },
      };
      const blocks = getAllBlocks(metadata, []);
      expect(blocks).toEqual([{ id: 'a' }]);
    });

    it('Two level of blocks w/o data', () => {
      const metadata = {
        blocks: {
          a: {
            blocks: {
              b: { type: 'text' },
            },
            blocks_layout: {
              items: ['b'],
            },
          },
        },
        blocks_layout: {
          items: ['a'],
        },
      };
      const blocks = getAllBlocks(metadata, []);
      expect(blocks).toEqual([
        { id: 'b', ...metadata.blocks.a.blocks.b },
        { id: 'a', ...metadata.blocks.a },
      ]);
    });

    it('Two level of blocks w/ data', () => {
      const metadata = {
        blocks: {
          a: {
            data: {
              blocks: {
                b: { type: 'text' },
              },
              blocks_layout: {
                items: ['b'],
              },
            },
          },
        },
        blocks_layout: {
          items: ['a'],
        },
      };
      const blocks = getAllBlocks(metadata, []);
      expect(blocks).toEqual([
        { id: 'b', ...metadata.blocks.a.data.blocks.b },
        { id: 'a', ...metadata.blocks.a },
      ]);
    });

    it('Three level of blocks', () => {
      const metadata = {
        blocks: {
          a: {
            data: {
              blocks: {
                a1: { type: 'text' },
                a2: {
                  type: 'text',
                  blocks: {
                    a21: { type: 'image' },
                    a22: { type: 'image' },
                  },
                  blocks_layout: {
                    items: ['a21', 'a22'],
                  },
                },
              },
              blocks_layout: {
                items: ['a1', 'a2'],
              },
            },
          },
          b: {
            data: {
              blocks: {
                b1: { type: 'text' },
                b2: { type: 'text' },
              },
              blocks_layout: {
                items: ['b1', 'b2'],
              },
            },
          },
        },
        blocks_layout: {
          items: ['a', 'b'],
        },
      };
      const blocks = getAllBlocks(metadata, []);
      expect(blocks).toEqual([
        { id: 'a1', ...metadata.blocks.a.data.blocks.a1 },
        { id: 'a21', ...metadata.blocks.a.data.blocks.a2.blocks.a21 },
        { id: 'a22', ...metadata.blocks.a.data.blocks.a2.blocks.a22 },
        { id: 'a2', ...metadata.blocks.a.data.blocks.a2 },
        { id: 'a', ...metadata.blocks.a },
        { id: 'b1', ...metadata.blocks.b.data.blocks.b1 },
        { id: 'b2', ...metadata.blocks.b.data.blocks.b2 },
        { id: 'b', ...metadata.blocks.b },
      ]);
    });
  });
});
