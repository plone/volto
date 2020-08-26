import {
  getBlocks,
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
  blockHasValue,
} from './Blocks';

describe('Blocks', () => {
  describe('getBlocksFieldname', () => {
    it('can get the blocks field name from formdata', () => {
      expect(getBlocksFieldname({ title: 'Example', blocks: [] })).toBe(
        'blocks',
      );
    });

    it('returns null if no blocks field name from formdata is present', () => {
      expect(getBlocksLayoutFieldname({ title: 'Example' })).toBe(null);
    });

    it('can get the blocks field name from formdata of a nested schema', () => {
      expect(
        getBlocksFieldname({
          title: 'Example',
          'guillotina_cms.interfaces.blocks.IBlocks.blocks': [],
        }),
      ).toBe('guillotina_cms.interfaces.blocks.IBlocks.blocks');
    });
  });

  describe('getBlocksLayoutFieldname', () => {
    it('can get the blocks layout field name from formdata', () => {
      expect(
        getBlocksLayoutFieldname({ title: 'Example', blocks_layout: [] }),
      ).toBe('blocks_layout');
    });

    it('returns null if no layout field name from formdata is present', () => {
      expect(getBlocksLayoutFieldname({ title: 'Example' })).toBe(null);
    });

    it('can get the blocks layout field name from formdata of a nested schema', () => {
      expect(
        getBlocksLayoutFieldname({
          title: 'Example',
          'guillotina_cms.interfaces.blocks.IBlocks.blocks_layout': [],
        }),
      ).toBe('guillotina_cms.interfaces.blocks.IBlocks.blocks_layout');
    });
  });

  describe('hasBlocksData', () => {
    it('checks blocks data when there is none', () => {
      expect(hasBlocksData({ title: 'Example' })).toBe(false);
    });

    it('checks blocks data in the root', () => {
      expect(hasBlocksData({ title: 'Example', blocks: [] })).toBe(true);
    });

    it('checks blocks data in a nested schema', () => {
      expect(
        hasBlocksData({
          title: 'Example',
          'guillotina_cms.interfaces.blocks.IBlocks.blocks': [],
        }),
      ).toBe(true);
    });

    describe('blockHasValue', () => {
      it('returns true when block checker is not defined', () => {
        expect(blockHasValue({ '@type': 'not-defined' })).toBe(true);
        // const consoleSpy = jest
        //   .spyOn(console, 'error')
        //   .mockImplementation(() => {});
        // expect(consoleSpy).toHaveBeenCalled();
      });

      it('returns true for text blocks with valid text', () => {
        const textBlock = {
          '@type': 'text',
          text: {
            blocks: [
              {
                data: {},
                depth: 0,
                entityRanges: [],
                inlineStyleRanges: [],
                key: 'cnh5c',
                text: 'The block text content',
                type: 'unstyled',
              },
            ],
          },
        };
        expect(blockHasValue(textBlock)).toBe(true);
      });

      it('returns false for text blocks with empty text', () => {
        const textBlock = {
          '@type': 'text',
          text: {
            blocks: [
              {
                data: {},
                depth: 0,
                entityRanges: [],
                inlineStyleRanges: [],
                key: 'cnh5c',
                text: '',
                type: 'unstyled',
              },
            ],
          },
        };
        expect(blockHasValue(textBlock)).toBe(false);
      });
    });
  });

  describe('getBlock', () => {
    it('returns empty when there is no block content and no items in layout', () => {
      expect(getBlocks({ blocks: {}, blocks_layout: {} })).toStrictEqual([]);
    });

    it('returns empty when there is no block content', () => {
      expect(
        getBlocks({ blocks: {}, blocks_layout: { items: [] } }),
      ).toStrictEqual([]);
    });

    it('returns ordered pairs', () => {
      expect(
        getBlocks({
          blocks: { a: { value: 1 }, b: { value: 2 } },
          blocks_layout: { items: ['a', 'b'] },
        }),
      ).toStrictEqual([
        ['a', { value: 1 }],
        ['b', { value: 2 }],
      ]);

      expect(
        getBlocks({
          blocks: { a: { value: 1 }, b: { value: 2 } },
          blocks_layout: { items: ['b', 'a'] },
        }),
      ).toStrictEqual([
        ['b', { value: 2 }],
        ['a', { value: 1 }],
      ]);
    });
  });
});
