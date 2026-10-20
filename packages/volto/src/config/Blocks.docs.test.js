import { createIntl } from 'react-intl';
import { blocksConfig } from '@plone/volto/config/Blocks';

const intl = createIntl({ locale: 'en', messages: {} });

const documented = Object.values(blocksConfig).filter((block) => block.docs);

const resolve = (block) =>
  typeof block.docs === 'function'
    ? block.docs({ blockConfig: block, intl })
    : block.docs;

describe('Core block docs', () => {
  it('documents the core blocks', () => {
    expect(documented.map((block) => block.id)).toEqual(
      expect.arrayContaining(['listing', 'search', 'teaser', 'gridBlock']),
    );
  });

  it.each(documented.map((block) => [block.id, block]))(
    '%s resolves to Markdown with valid JSON examples',
    (id, block) => {
      const markdown = resolve(block);
      expect(typeof markdown).toBe('string');
      expect(markdown.trim()).not.toBe('');

      const examples = [...markdown.matchAll(/```json\n([\s\S]*?)\n```/g)];
      expect(examples.length).toBeGreaterThan(0);
      for (const [, json] of examples) {
        expect(JSON.parse(json)['@type']).toBe(id);
      }
    },
  );

  it('builds the grid docs from its configuration', () => {
    const markdown = resolve({
      ...blocksConfig.gridBlock,
      allowedBlocks: ['teaser'],
      maxLength: 2,
    });
    expect(markdown).toContain('up to 2 blocks');
    expect(markdown).toContain('The allowed blocks are `teaser`.');
  });
});
