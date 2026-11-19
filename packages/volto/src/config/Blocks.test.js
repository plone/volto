import { createIntl, createIntlCache } from 'react-intl';
import { installDefaultBlocks } from './Blocks';

const intl = createIntl(
  { locale: 'en', messages: {}, onError: () => {} },
  createIntlCache(),
);

const getBlocksConfig = () => {
  const config = { blocks: {} };
  installDefaultBlocks(config);
  return config.blocks.blocksConfig;
};

describe('Core blocks blockSchema', () => {
  const blocksConfig = getBlocksConfig();

  it.each(['image', 'leadimage', 'maps', 'toc', 'html'])(
    'the %s block has a blockSchema that resolves without block data',
    (type) => {
      const { blockSchema } = blocksConfig[type];
      expect(typeof blockSchema).toBe('function');
      const data = { '@type': type };
      const schema = blockSchema({ data, intl, props: { data } });
      expect(schema.fieldsets.length).toBeGreaterThan(0);
      expect(Object.keys(schema.properties).length).toBeGreaterThan(0);
    },
  );

  it.each(['title', 'description'])(
    'the %s block has no blockSchema, since it stores no block data',
    (type) => {
      expect(blocksConfig[type].blockSchema).toBeUndefined();
    },
  );

  it('the toc block schema depends on the variation', () => {
    const { blockSchema } = blocksConfig.toc;
    const fields = (variation) =>
      blockSchema({ data: { '@type': 'toc', variation }, intl }).fieldsets[0]
        .fields;
    expect(fields('default')).toContain('ordered');
    expect(fields('horizontalMenu')).toContain('sticky');
  });

  it('the toc block uses the generic block settings schema', () => {
    expect(blocksConfig.toc.schema.title).toBe('Block settings');
  });

  it('the image block schema shows its fields once an image is set', () => {
    const { blockSchema } = blocksConfig.image;
    expect(
      blockSchema({ data: { '@type': 'image' }, intl }).fieldsets[0].fields,
    ).toEqual([]);
    expect(
      blockSchema({ formData: { '@type': 'image', url: '/image' }, intl })
        .fieldsets[0].fields,
    ).toEqual(['alt', 'align', 'size']);
  });
});
