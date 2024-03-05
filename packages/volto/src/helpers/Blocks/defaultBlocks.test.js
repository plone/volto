import { getSimpleDefaultBlocks, getDefaultBlocks } from './defaultBlocks';

describe('Initial Blocks helpers', () => {
  describe('getSimpleDefaultBlocks', () => {
    it('Get the simple (legacy) default blocks from the local config', () => {
      const initialBlocksConfig = {
        Document: ['leadImage', 'title', 'slate'],
      };
      const [blocks, blocks_layout] = getSimpleDefaultBlocks(
        initialBlocksConfig['Document'],
      );

      expect(blocks[blocks_layout[0]]['@type']).toBe('leadImage');
      expect(blocks[blocks_layout[1]]['@type']).toBe('title');
      expect(blocks[blocks_layout[2]]['@type']).toBe('slate');
    });
  });

  describe('getDefaultBlocks', () => {
    it('Get the default blocks from the local config', () => {
      const initialBlocksConfig = {
        Document: [
          { '@type': 'leadImage', fixed: true, required: true },
          { '@type': 'title' },
          { '@type': 'slate' },
        ],
      };
      const [blocks, blocks_layout] = getDefaultBlocks(
        initialBlocksConfig['Document'],
      );

      expect(blocks[blocks_layout[0]]['@type']).toBe('leadImage');
      expect(blocks[blocks_layout[0]].fixed).toBe(true);
      expect(blocks[blocks_layout[0]].required).toBe(true);
      expect(blocks[blocks_layout[1]]['@type']).toBe('title');
      expect(blocks[blocks_layout[2]]['@type']).toBe('slate');
    });
  });
});
