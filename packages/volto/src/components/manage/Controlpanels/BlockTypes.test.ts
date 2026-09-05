import { createIntl, createIntlCache } from 'react-intl';
import type { BlocksConfigData } from '@plone/types';
import { sortConfigBlocks } from './BlockTypes';

const intl = createIntl(
  { locale: 'en', messages: { Teaser: 'Destaque' } },
  createIntlCache(),
);

// `BlockConfigBase` types id and title as required, so a malformed entry
// cannot be expressed through it. That mismatch between the type and the
// configuration is the bug these tests cover, so the fixtures go around it.
const asBlocksConfig = (config: Record<string, unknown>) =>
  config as unknown as BlocksConfigData;

describe('sortConfigBlocks', () => {
  it('lists a registered block', () => {
    const blocks = sortConfigBlocks(
      asBlocksConfig({ image: { id: 'image', title: 'Image' } }),
      intl,
    );

    expect(blocks).toEqual([{ id: 'image', title: 'Image' }]);
  });

  it('translates the title', () => {
    const blocks = sortConfigBlocks(
      asBlocksConfig({ teaser: { id: 'teaser', title: 'Teaser' } }),
      intl,
    );

    expect(blocks[0].title).toEqual('Destaque');
  });

  it('sorts by the translated title, not by the config order', () => {
    const blocks = sortConfigBlocks(
      asBlocksConfig({
        zebra: { id: 'zebra', title: 'Zebra' },
        apple: { id: 'apple', title: 'Apple' },
        // 'Teaser' translates to 'Destaque', so it sorts before 'Zebra'.
        teaser: { id: 'teaser', title: 'Teaser' },
      }),
      intl,
    );

    expect(blocks.map((block) => block.title)).toEqual([
      'Apple',
      'Destaque',
      'Zebra',
    ]);
  });

  it('keeps the rest of the block config', () => {
    const blocks = sortConfigBlocks(
      asBlocksConfig({
        image: {
          id: 'image',
          title: 'Image',
          icon: 'image.svg',
          group: 'media',
        },
      }),
      intl,
    );

    expect(blocks[0]).toMatchObject({ icon: 'image.svg', group: 'media' });
  });

  describe('entries that are not blocks', () => {
    // An add-on that configures a block which was never registered leaves an
    // entry behind carrying only what it set. Listing it would link to a block
    // that does not exist, and a row with no id crashes the table.
    it('drops an entry with neither an id nor a title', () => {
      const blocks = sortConfigBlocks(
        asBlocksConfig({
          image: { id: 'image', title: 'Image' },
          accordion: { addPermission: [] },
        }),
        intl,
      );

      expect(blocks).toEqual([{ id: 'image', title: 'Image' }]);
    });

    it('drops an entry with an id but no title', () => {
      const blocks = sortConfigBlocks(
        asBlocksConfig({ accordion: { id: 'accordion' } }),
        intl,
      );

      expect(blocks).toEqual([]);
    });

    it('drops an entry with a title but no id', () => {
      const blocks = sortConfigBlocks(
        asBlocksConfig({ accordion: { title: 'Accordion' } }),
        intl,
      );

      expect(blocks).toEqual([]);
    });

    it('does not fall back to the config key for a missing id', () => {
      const blocks = sortConfigBlocks(
        asBlocksConfig({ accordion: { title: 'Accordion' } }),
        intl,
      );

      expect(blocks.map((block) => block.id)).not.toContain('accordion');
    });

    it('gives every listed block an id, so the table can key its rows', () => {
      const blocks = sortConfigBlocks(
        asBlocksConfig({
          image: { id: 'image', title: 'Image' },
          accordion: { addPermission: [] },
          teaser: { id: 'teaser' },
        }),
        intl,
      );

      expect(blocks.length).toBeGreaterThan(0);
      for (const block of blocks) {
        expect(block.id).toBeTruthy();
      }
    });
  });

  it('returns nothing when no block is configured', () => {
    expect(sortConfigBlocks(asBlocksConfig({}), intl)).toEqual([]);
  });
});
