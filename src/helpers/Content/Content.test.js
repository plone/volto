import { nestContent } from './Content';

describe('Content', () => {
  describe('nestContent', () => {
    it('can nest content', () => {
      expect(
        nestContent({
          title: 'Example',
          '@static_behaviors': [
            'guillotina_cms.interfaces.blocks.IBlocks',
            'guillotina_cms.interfaces.dublin_core.IDublinCore',
          ],
          'guillotina_cms.interfaces.blocks.IBlocks.blocks': 'blocks',
          'guillotina_cms.interfaces.blocks.IBlocks.blocks_layout':
            'blocks_layout',
          'guillotina_cms.interfaces.dublin_core.IDublinCore.creator':
            'creator',
        }),
      ).toEqual({
        title: 'Example',
        '@static_behaviors': [
          'guillotina_cms.interfaces.blocks.IBlocks',
          'guillotina_cms.interfaces.dublin_core.IDublinCore',
        ],
        'guillotina_cms.interfaces.blocks.IBlocks': {
          blocks: 'blocks',
          blocks_layout: 'blocks_layout',
        },
        'guillotina_cms.interfaces.dublin_core.IDublinCore': {
          creator: 'creator',
        },
      });
    });
  });
});
