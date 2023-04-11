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
  applyBlockDefaults,
  applySchemaDefaults,
  buildStyleClassNamesFromData,
  buildStyleClassNamesExtenders,
  getPreviousNextBlock,
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
  blockSchema: ({ data }) => ({
    fieldsets: [
      {
        id: 'default',
        fields: ['title', 'description', 'nonDefault', 'booleanField'],
        title: 'Default',
      },
    ],
    properties: {
      title: {
        default: 'Default title',
      },
      description: {
        default: 'Default description',
      },
      nonDefault: {
        title: 'Non default',
      },
      booleanField: {
        title: 'BooleanField',
        default: false,
      },
    },
  }),
};

config.blocks.blocksConfig.enhancedBlock = {
  id: 'enhancedBlock',
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
  schemaEnhancer: ({ schema, formData }) => {
    schema.fieldsets[0].fields.push('extra');
    schema.properties.extra = { default: 'Extra value' };
    return schema;
  },
  variations: [
    {
      id: 'firstVariation',
      schemaEnhancer: ({ schema, formData }) => {
        schema.fieldsets[0].fields.push('extraVariationField');
        schema.properties['extraVariationField'] = {
          default: 'Extra variation field',
        };
        return schema;
      },
    },
  ],
  blockSchema: ({ data }) => ({
    fieldsets: [
      {
        id: 'default',
        fields: ['title', 'description', 'nonDefault'],
        title: 'Default',
      },
    ],
    properties: {
      title: {
        default: 'Default title',
      },
      description: {
        default: 'Default description',
      },
      nonDefault: {
        title: 'Non default',
      },
    },
  }),
};

config.blocks.blocksConfig.enhancedBlockCase2 = {
  id: 'enhancedBlockCase2',
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
  schemaEnhancer: ({ schema, formData }) => {
    schema.fieldsets[0].fields.push('extra');
    schema.properties.extra = {
      default: 'Extra value from block schema enhancer',
    };
    return schema;
  },
  variations: [
    {
      id: 'firstVariation',
      schemaEnhancer: ({ schema, formData }) => {
        schema.properties['extra'] = {
          default: 'Extra variation field',
        };
        return schema;
      },
    },
  ],
  blockSchema: ({ data }) => ({
    fieldsets: [
      {
        id: 'default',
        fields: ['title', 'description', 'nonDefault'],
        title: 'Default',
      },
    ],
    properties: {
      title: {
        default: 'Default title',
      },
      description: {
        default: 'Default description',
      },
      nonDefault: {
        title: 'Non default',
      },
    },
  }),
};

const itemSchema = (props) => {
  return {
    title: 'Item',
    addMessage: 'Add',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'href',
          'title',
          'description',
          'preview_image',
          'extraDefault',
        ],
      },
    ],

    properties: {
      href: {
        title: 'Source',
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: [
          'Title',
          'Description',
          'hasPreviewImage',
          'headtitle',
        ],
        allowExternals: true,
      },
      title: {
        title: 'title',
      },
      description: {
        title: 'description',
      },
      preview_image: {
        title: 'Image Override',
        widget: 'object_browser',
        mode: 'image',
        allowExternals: true,
      },
      extraDefault: {
        title: 'Extra',
        default: 'Extra default',
      },
    },
    required: [],
  };
};

config.blocks.blocksConfig.slider = {
  id: 'slider',
  title: 'Slider',
  group: 'Special',
  restricted: false,
  mostUsed: false,
  blockHasOwnFocusManagement: true,
  blockSchema: (props) => ({
    title: 'slider',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'slides',
          'fieldAfterObjectList',
          'href',
          'firstWithDefault',
          'style',
          'anotherWithDefault',
          'yetAnotherWithDefault',
        ],
      },
    ],
    properties: {
      slides: {
        widget: 'object_list',
        schema: itemSchema,
        default: [
          {
            '@id': 'asdasdasd-qweqwe-zxczxc',
            extraDefault:
              'Extra default (Manual in parent slider widget default)',
          },
        ],
      },
      fieldAfterObjectList: {
        title: 'Field after OL',
      },
      href: {
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: [
          'Title',
          'Description',
          'hasPreviewImage',
          'headtitle',
        ],
        allowExternals: true,
      },
      firstWithDefault: {
        title: 'Field with default',
        default: 'Some default value',
      },
      style: {
        widget: 'object',
        schema: {
          title: 'Style',
          fieldsets: [
            {
              id: 'default',
              fields: ['color', 'theme'],
              title: 'Default',
            },
          ],
          properties: {
            color: {
              title: 'Color',
              default: 'red',
            },
            theme: {
              title: 'Theme',
              default: 'primary',
            },
          },
          required: [],
        },
      },
      anotherWithDefault: {
        title: 'Field with default 2',
        default: 2,
        type: 'number',
      },
      yetAnotherWithDefault: {
        title: 'Field with default 3',
        default: ['one', 'two'],
        type: 'array',
      },
    },
    required: [],
  }),
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

  describe('applySchemaDefaults', () => {
    it('Sets data according to schema default values', () => {
      const data = {
        '@type': 'text',
        description: 'already filled',
      };
      const schema = config.blocks.blocksConfig.text.blockSchema({ data });
      expect(applySchemaDefaults({ schema, data })).toEqual({
        '@type': 'text',
        booleanField: false,
        title: 'Default title',
        description: 'already filled',
      });
    });
    it('Sets data according to schema default values, top level and styling wrapper object field', () => {
      const data = {
        '@type': 'slider',
      };
      const schema = config.blocks.blocksConfig.slider.blockSchema({ data });

      // if you don't pass down intl, the ObjectWidget defaults are not applied
      expect(applySchemaDefaults({ schema, data })).toEqual({
        '@type': 'slider',
        anotherWithDefault: 2,
        slides: [
          {
            '@id': 'asdasdasd-qweqwe-zxczxc',
            extraDefault:
              'Extra default (Manual in parent slider widget default)',
          },
        ],
        firstWithDefault: 'Some default value',
        yetAnotherWithDefault: ['one', 'two'],
      });

      expect(applySchemaDefaults({ schema, data, intl: {} })).toEqual({
        '@type': 'slider',
        anotherWithDefault: 2,
        slides: [
          {
            '@id': 'asdasdasd-qweqwe-zxczxc',
            extraDefault:
              'Extra default (Manual in parent slider widget default)',
          },
        ],
        firstWithDefault: 'Some default value',
        style: {
          color: 'red',
          theme: 'primary',
        },
        yetAnotherWithDefault: ['one', 'two'],
      });
    });

    it('Sets data according to schema default values, keeps existing data', () => {
      const schema = {
        properties: {
          style: {
            widget: 'object',
            schema: {
              title: 'Style',
              fieldsets: [
                {
                  id: 'default',
                  fields: ['color', 'theme'],
                  title: 'Default',
                },
              ],
              properties: {
                color: {
                  title: 'Color',
                  default: 'red',
                },
                theme: {
                  title: 'Theme',
                  default: 'primary',
                },
              },
              required: [],
            },
          },
        },
      };

      expect(
        applySchemaDefaults({
          schema,
          data: {
            '@type': 'slider',
            style: {
              theme: 'secondary',
            },
          },
          intl: {},
        }),
      ).toEqual({
        '@type': 'slider',
        style: {
          color: 'red',
          theme: 'secondary',
        },
      });
    });

    it('Sets data according to schema default values, keeps existing data', () => {
      const schema = {
        properties: {
          style: {
            widget: 'object',
            schema: {
              title: 'Style',
              fieldsets: [
                {
                  id: 'default',
                  fields: ['color', 'theme'],
                  title: 'Default',
                },
              ],
              properties: {
                color: {
                  title: 'Color',
                  default: 'red',
                },
                theme: {
                  title: 'Theme',
                  default: 'primary',
                },
              },
              required: [],
            },
          },
        },
      };

      expect(
        applySchemaDefaults({
          schema,
          data: {
            '@type': 'slider',
            style: {
              theme: 'secondary',
            },
          },
          intl: {},
        }),
      ).toEqual({
        '@type': 'slider',
        style: {
          color: 'red',
          theme: 'secondary',
        },
      });
    });
  });

  describe('applyBlockDefaults', () => {
    it('Sets data according to schema default values', () => {
      const data = {
        '@type': 'text',
        description: 'already filled',
      };
      expect(applyBlockDefaults({ data })).toEqual({
        '@type': 'text',
        booleanField: false,
        title: 'Default title',
        description: 'already filled',
      });
    });

    it('Does not do anything if there is no schema for block', () => {
      const data = {
        '@type': 'missing',
        description: 'already filled',
      };
      expect(applyBlockDefaults({ data })).toEqual({
        '@type': 'missing',
        description: 'already filled',
      });
    });

    it('Supports block schema enhancers', () => {
      const data = {
        '@type': 'enhancedBlock',
        description: 'already filled',
        // variation: 'firstVariation',
      };
      expect(applyBlockDefaults({ data })).toEqual({
        '@type': 'enhancedBlock',
        title: 'Default title',
        description: 'already filled',
        extra: 'Extra value',
      });
    });

    it('Supports block schema enhancers coming from variations', () => {
      const data = {
        '@type': 'enhancedBlock',
        description: 'already filled',
        variation: 'firstVariation',
      };
      expect(applyBlockDefaults({ data })).toEqual({
        '@type': 'enhancedBlock',
        title: 'Default title',
        description: 'already filled',
        extra: 'Extra value',
        extraVariationField: 'Extra variation field',
        variation: 'firstVariation',
      });
    });

    it('Block schema enhancers override variations', () => {
      const data = {
        '@type': 'enhancedBlockCase2',
        description: 'already filled',
        variation: 'firstVariation',
      };
      expect(applyBlockDefaults({ data })).toEqual({
        '@type': 'enhancedBlockCase2',
        title: 'Default title',
        description: 'already filled',
        extra: 'Extra value from block schema enhancer',
        variation: 'firstVariation',
      });
    });

    it('Tolerates a missing (invalid) block', () => {
      const data = {};
      expect(applyBlockDefaults({ data })).toEqual({});
    });
  });

  describe('buildStyleClassNamesFromData', () => {
    it('Sets styles classname array according to style values', () => {
      const styles = {
        color: 'red',
        backgroundColor: '#AABBCC',
      };
      expect(buildStyleClassNamesFromData(styles)).toEqual([
        'has--color--red',
        'has--backgroundColor--AABBCC',
      ]);
    });

    it('Sets styles classname array according to style values with nested', () => {
      const styles = {
        color: 'red',
        backgroundColor: '#AABBCC',
        nested: {
          foo: 'white',
          bar: 'black',
        },
      };
      expect(buildStyleClassNamesFromData(styles)).toEqual([
        'has--color--red',
        'has--backgroundColor--AABBCC',
        'has--nested--foo--white',
        'has--nested--bar--black',
      ]);
    });

    it('Sets styles classname array according to style values with nested and colors', () => {
      const styles = {
        color: 'red',
        backgroundColor: '#AABBCC',
        nested: {
          foo: '#fff',
          bar: '#000',
        },
      };
      expect(buildStyleClassNamesFromData(styles)).toEqual([
        'has--color--red',
        'has--backgroundColor--AABBCC',
        'has--nested--foo--fff',
        'has--nested--bar--000',
      ]);
    });

    it('Supports multiple nested level', () => {
      const styles = {
        color: 'red',
        backgroundColor: '#AABBCC',
        nested: {
          l1: 'white',
          level2: {
            foo: '#fff',
            bar: '#000',
          },
        },
      };
      expect(buildStyleClassNamesFromData(styles)).toEqual([
        'has--color--red',
        'has--backgroundColor--AABBCC',
        'has--nested--l1--white',
        'has--nested--level2--foo--fff',
        'has--nested--level2--bar--000',
      ]);
    });

    it('Sets styles classname array according to style values with int values', () => {
      const styles = {
        color: 'red',
        borderRadius: 8,
      };
      expect(buildStyleClassNamesFromData(styles)).toEqual([
        'has--color--red',
        'has--borderRadius--8',
      ]);
    });

    it('Understands noprefix converter for style values', () => {
      const styles = {
        color: 'red',
        'theme:noprefix': 'primary',
      };
      expect(buildStyleClassNamesFromData(styles)).toEqual([
        'has--color--red',
        'primary',
      ]);
    });

    it('Understands bool converter for trueish value', () => {
      const styles = {
        color: 'red',
        'inverted:bool': true,
      };
      expect(buildStyleClassNamesFromData(styles)).toEqual([
        'has--color--red',
        'inverted',
      ]);
    });

    it('Understands bool converter for false value', () => {
      const styles = {
        color: 'red',
        'inverted:bool': false,
      };
      expect(buildStyleClassNamesFromData(styles)).toEqual(['has--color--red']);
    });

    it('Ugly edge cases', () => {
      const styles = {
        color: undefined,
        nested: {
          l1: {},
        },
      };
      expect(buildStyleClassNamesFromData(styles)).toEqual([]);
    });
  });

  describe('getPreviousNextBlock', () => {
    it('basic functionality', () => {
      const content = {
        blocks: {
          1: {
            '@type': 'slate',
            styles: {
              backgroundColor: 'grey',
            },
          },
          2: {
            '@type': 'slate',
          },
          3: {
            '@type': 'slate',
            styles: {
              backgroundColor: 'grey',
            },
          },
        },
        blocks_layout: {
          items: [1, 2, 3],
        },
      };
      const block = 2;
      const [previousBlock, nextBlock] = getPreviousNextBlock({
        content,
        block,
      });
      expect(previousBlock).toEqual({
        '@type': 'slate',
        styles: {
          backgroundColor: 'grey',
        },
      });
      expect(nextBlock).toEqual({
        '@type': 'slate',
        styles: {
          backgroundColor: 'grey',
        },
      });
    });
  });

  describe('buildStyleClassNamesExtenders', () => {
    beforeAll(() => {
      // Example styleClassNameExtenders
      config.settings.styleClassNameExtenders = [
        ({ block, content, data, classNames }) => {
          let styles = [];
          const [previousBlock, nextBlock] = getPreviousNextBlock({
            content,
            block,
          });

          if (nextBlock?.['@type']) {
            styles.push(`next--is--${nextBlock['@type']}`);
          }

          if (data?.['@type'] === previousBlock?.['@type']) {
            styles.push('previous--is--same--block-type');
          }

          if (data?.['@type'] === nextBlock?.['@type']) {
            styles.push('next--is--same--block-type');
          }

          if (data?.['@type'] !== previousBlock?.['@type']) {
            styles.push('is--first--of--block-type');
          }

          if (data?.['@type'] !== nextBlock?.['@type']) {
            styles.push('is--last--of--block-type');
          }

          const previousColor =
            previousBlock?.styles?.backgroundColor ?? 'transparent';
          const currentColor = data?.styles?.backgroundColor ?? 'transparent';
          const nextColor = nextBlock?.styles?.backgroundColor ?? 'transparent';

          if (currentColor === previousColor) {
            styles.push('previous--has--same--backgroundColor');
          } else if (currentColor !== previousColor) {
            styles.push('previous--has--different--backgroundColor');
          }

          if (currentColor === nextColor) {
            styles.push('next--has--same--backgroundColor');
          } else if (currentColor !== nextColor) {
            styles.push('next--has--different--backgroundColor');
          }

          return [...classNames, ...styles];
        },
      ];
    });

    it('slate grey + slate + slate grey ', () => {
      const content = {
        blocks: {
          1: {
            '@type': 'slate',
            styles: {
              backgroundColor: 'grey',
            },
          },
          2: {
            '@type': 'slate',
          },
          3: {
            '@type': 'slate',
            styles: {
              backgroundColor: 'grey',
            },
          },
        },
        blocks_layout: {
          items: [1, 2, 3],
        },
      };
      const block = 2;
      const data = content['blocks'][2];
      const classNames = [];
      expect(
        buildStyleClassNamesExtenders({ block, content, data, classNames }),
      ).toStrictEqual([
        'next--is--slate',
        'previous--is--same--block-type',
        'next--is--same--block-type',
        'previous--has--different--backgroundColor',
        'next--has--different--backgroundColor',
      ]);
    });

    it('slate grey + slate grey + slate grey ', () => {
      const content = {
        blocks: {
          1: {
            '@type': 'slate',
            styles: {
              backgroundColor: 'grey',
            },
          },
          2: {
            '@type': 'slate',
            styles: {
              backgroundColor: 'grey',
            },
          },
          3: {
            '@type': 'slate',
            styles: {
              backgroundColor: 'grey',
            },
          },
        },
        blocks_layout: {
          items: [1, 2, 3],
        },
      };
      const block = 2;
      const data = content['blocks'][2];
      const classNames = [];

      expect(
        buildStyleClassNamesExtenders({ block, content, data, classNames }),
      ).toStrictEqual([
        'next--is--slate',
        'previous--is--same--block-type',
        'next--is--same--block-type',
        'previous--has--same--backgroundColor',
        'next--has--same--backgroundColor',
      ]);
    });

    it('grid + slate grey + slate grey ', () => {
      const content = {
        blocks: {
          1: {
            '@type': '__grid',
          },
          2: {
            '@type': 'slate',
            styles: {
              backgroundColor: 'grey',
            },
          },
          3: {
            '@type': 'slate',
            styles: {
              backgroundColor: 'grey',
            },
          },
        },
        blocks_layout: {
          items: [1, 2, 3],
        },
      };
      const block = 2;
      const data = content['blocks'][2];
      const classNames = [];

      expect(
        buildStyleClassNamesExtenders({ block, content, data, classNames }),
      ).toStrictEqual([
        'next--is--slate',
        'next--is--same--block-type',
        'is--first--of--block-type',
        'previous--has--different--backgroundColor',
        'next--has--same--backgroundColor',
      ]);
    });

    it('grid + grid + slate grey ', () => {
      const content = {
        blocks: {
          1: {
            '@type': '__grid',
          },
          2: {
            '@type': '__grid',
          },
          3: {
            '@type': 'slate',
            styles: {
              backgroundColor: 'grey',
            },
          },
        },
        blocks_layout: {
          items: [1, 2, 3],
        },
      };
      const block = 2;
      const data = content['blocks'][2];
      const classNames = [];

      expect(
        buildStyleClassNamesExtenders({ block, content, data, classNames }),
      ).toStrictEqual([
        'next--is--slate',
        'previous--is--same--block-type',
        'is--last--of--block-type',
        'previous--has--same--backgroundColor',
        'next--has--different--backgroundColor',
      ]);
    });

    it('grid + grid + slate grey - with existing classNames list', () => {
      const content = {
        blocks: {
          1: {
            '@type': '__grid',
          },
          2: {
            '@type': '__grid',
          },
          3: {
            '@type': 'slate',
            styles: {
              backgroundColor: 'grey',
            },
          },
        },
        blocks_layout: {
          items: [1, 2, 3],
        },
      };
      const block = 2;
      const data = content['blocks'][2];
      const classNames = ['has--align--center'];

      expect(
        buildStyleClassNamesExtenders({ block, content, data, classNames }),
      ).toStrictEqual([
        'has--align--center',
        'next--is--slate',
        'previous--is--same--block-type',
        'is--last--of--block-type',
        'previous--has--same--backgroundColor',
        'next--has--different--backgroundColor',
      ]);
    });
  });
});
