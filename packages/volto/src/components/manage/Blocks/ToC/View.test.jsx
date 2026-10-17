import config from '@plone/volto/registry';
import { getBlocksTocEntries } from './View';

const properties = {
  blocks: {
    'block-1': { '@type': 'heading', text: 'Everything is not okay' },
    'block-2': { '@type': 'heading', text: 'No anchor here' },
  },
  blocks_layout: { items: ['block-1', 'block-2'] },
};

beforeAll(() => {
  config.blocks.blocksConfig.heading = {
    id: 'heading',
    title: 'Heading',
    tocEntry: (block = {}) =>
      block.text === 'Everything is not okay'
        ? [2, block.text, 'everything-is-not-okay']
        : [2, block.text],
  };
});

test('passes the anchor provided by the block to the table of contents entry', () => {
  const { tocEntries } = getBlocksTocEntries(properties, {});

  expect(tocEntries['block-1-0'].anchor).toBe('everything-is-not-okay');
});

test('leaves the anchor undefined for blocks that do not provide one', () => {
  const { tocEntries } = getBlocksTocEntries(properties, {});

  expect(tocEntries['block-2-0'].anchor).toBeUndefined();
});
