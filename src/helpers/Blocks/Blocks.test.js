import {
  addBlock,
  blockHasValue,
  changeBlock,
  deleteBlock,
  emptyBlocksForm,
  getBlocks,
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
  insertBlock,
  moveBlock,
  mutateBlock,
  nextBlockId,
  previousBlockId,
  visitBlocks,
} from './Blocks';

import config from '@plone/volto/registry';

config.blocks.blocksConfig.text = {
  id: 'text',
  title: 'Text',
  group: 'text',
  restricted: false,
  mostUsed: false,
  blockHasOwnFocusManagement: true,
  blockHasValue: (data) => {
    const isEmpty =
      !data.text ||
      (data.text?.blocks?.length === 1 && data.text.blocks[0].text === '');
    return !isEmpty;
  },
};

config.settings.defaultBlockType = 'text';

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

  describe('getBlocks', () => {
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

  describe('addBlock', () => {
    it('add new block within formdata', () => {
      const [newId, form] = addBlock(
        {
          blocks: { a: { value: 1 }, b: { value: 2 } },
          blocks_layout: { items: ['a', 'b'] },
        },
        'text',
        1,
      );
      expect(form.blocks_layout.items).toStrictEqual(['a', newId, 'b']);
    });
  });

  describe('moveBlock', () => {
    it('Move block within formdata', () => {
      const form = moveBlock(
        {
          blocks: { a: { value: 1 }, b: { value: 2 } },
          blocks_layout: { items: ['a', 'b'] },
        },
        0,
        1,
      );
      expect(form.blocks_layout.items).toStrictEqual(['b', 'a']);
    });
  });

  describe('changeBlock', () => {
    it('change block within formdata', () => {
      expect(
        changeBlock(
          {
            blocks: { a: { value: 1 }, b: { value: 2 } },
            blocks_layout: { items: ['a', 'b'] },
          },
          'a',
          { value: 2 },
        )['blocks']['a'],
      ).toStrictEqual({ value: 2 });
    });
  });

  describe('mutateBlock', () => {
    it('mutate block within formdata and add new one after', () => {
      const form = mutateBlock(
        {
          blocks: { a: { value: 1 }, b: { value: 2 } },
          blocks_layout: { items: ['a', 'b'] },
        },
        'a',
        { value: 3 },
      );
      const newId = form.blocks_layout.items[1];
      expect(form.blocks.a).toStrictEqual({ value: 3 });
      expect(form.blocks[newId]).toStrictEqual({ '@type': 'text' });
      expect(form.blocks_layout.items).toStrictEqual(['a', newId, 'b']);
    });
  });

  describe('insertBlock', () => {
    it('insert new block within formdata before given block id', () => {
      const [newId, form] = insertBlock(
        {
          blocks: { a: { value: 1 }, b: { value: 2 } },
          blocks_layout: { items: ['a', 'b'] },
        },
        'b',
        { value: 3 },
      );
      expect(form.blocks_layout.items).toStrictEqual(['a', newId, 'b']);
    });
  });

  describe('deleteBlock', () => {
    it('delete block by id', () => {
      const form = deleteBlock(
        {
          blocks: { a: { value: 1 }, b: { value: 2 } },
          blocks_layout: { items: ['a', 'b'] },
        },
        'b',
      );
      expect(form.blocks_layout.items).toStrictEqual(['a']);
    });
  });

  describe('emptyBlocksForm', () => {
    it('generates new empty blocks form with one block', () => {
      const form = emptyBlocksForm();
      const uid = form['blocks_layout']['items'][0];
      expect(form['blocks'][uid]).toStrictEqual({ '@type': 'text' });
    });
  });

  describe('previousBlockId', () => {
    it('get previous block id', () => {
      expect(
        previousBlockId(
          {
            blocks_layout: { items: ['a', 'b'] },
          },
          'b',
        ),
      ).toBe('a');
    });
  });

  describe('nextBlockId', () => {
    it('get next block id', () => {
      expect(
        nextBlockId(
          {
            blocks_layout: { items: ['a', 'b'] },
          },
          'a',
        ),
      ).toBe('b');
    });
  });

  describe('visitBlocks', () => {
    it('visit blocks', () => {
      const d = {
        data: {
          blocks: {
            '1': {
              blocks: {
                '2': {},
                '3': {
                  data: {
                    blocks: {
                      '11': {},
                      '12': {},
                      '13': {},
                    },
                    blocks_layout: {
                      items: ['11', '12', '13'],
                    },
                  },
                },
                '7': {
                  blocks: {
                    '8': {},
                    '9': {},
                    '10': {},
                  },
                  blocks_layout: {
                    items: ['8', '9', '10'],
                  },
                },
              },
              blocks_layout: {
                items: ['2', '3', '7'],
              },
            },
            '4': {
              blocks: {
                '5': {},
                '6': {},
              },
              blocks_layout: {
                items: ['5', '6'],
              },
            },
          },
          blocks_layout: {
            items: ['1', '4'],
          },
        },
      };

      const a = [];
      visitBlocks(d.data, (x) => {
        a.push(x);
      });

      expect(a.length).toBe(13);
    });
  });
});
