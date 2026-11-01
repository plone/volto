// eslint-disable-next-line import/no-unresolved
import blocksDocs from 'load-blocks-docs';
import { blocksConfig } from '@plone/volto/config/Blocks';
import { fillPlaceholders } from '@plone/volto/express-middleware/blocks-schema';

const FRONTMATTER = /^---\n[\s\S]*?\n---\n/;
const markdownOf = ({ markdown }) => markdown.replace(FRONTMATTER, '').trim();
const blockDocs = blocksDocs.filter((file) => file.block);

describe('Core block docs', () => {
  it('collects the *.block.md files of core and volto-slate', () => {
    expect(blocksDocs.map((file) => file.block)).toEqual(
      expect.arrayContaining([
        'listing',
        'search',
        'teaser',
        'gridBlock',
        'slate',
        'detachedSlate',
      ]),
    );
  });

  it('only documents blocks that exist', () => {
    const known = [...Object.keys(blocksConfig), 'slate', 'detachedSlate'];
    for (const file of blockDocs) {
      expect(known).toContain(file.block);
    }
  });

  it.each(blockDocs.map((file) => [file.block, file]))(
    '%s has Markdown whose JSON examples are valid block data',
    (block, file) => {
      const markdown = markdownOf(file);
      expect(markdown).not.toBe('');

      const examples = [...markdown.matchAll(/```json\n([\s\S]*?)\n```/g)];
      for (const [, json] of examples) {
        expect(JSON.parse(json)['@type']).toBe(block);
      }
    },
  );

  it('documents the plone.blocks document model with a valid example', () => {
    const file = blocksDocs.find(
      (item) => item.document_model === 'plone.blocks',
    );
    const [, json] = markdownOf(file).match(/```json\n([\s\S]*?)\n```/);
    const { blocks, blocks_layout } = JSON.parse(json);

    expect(blocks_layout.items).toEqual(Object.keys(blocks));
    for (const block of Object.values(blocks)) {
      expect([...Object.keys(blocksConfig), 'slate']).toContain(block['@type']);
    }
  });

  it('fills the grid docs from its configuration', () => {
    const grid = blocksDocs.find((file) => file.block === 'gridBlock');
    const markdown = fillPlaceholders(markdownOf(grid), blocksConfig.gridBlock);

    expect(markdown).toContain(
      `It holds up to ${blocksConfig.gridBlock.maxLength} blocks.`,
    );
    expect(markdown).toContain(
      `The allowed blocks are ${blocksConfig.gridBlock.allowedBlocks
        .map((id) => `\`${id}\``)
        .join(', ')}.`,
    );
    expect(markdown).not.toContain('{{');
  });
});
