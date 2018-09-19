import { nestContent } from './Content';

describe('Content', () => {
  describe('nestContent', () => {
    it('can nest content', () => {
      expect(
        nestContent({
          title: 'Example',
          '@static_behaviors': [
            'guillotina_cms.interfaces.tiles.ITiles',
            'guillotina_cms.interfaces.dublin_core.IDublinCore',
          ],
          'guillotina_cms.interfaces.tiles.ITiles.tiles': 'tiles',
          'guillotina_cms.interfaces.tiles.ITiles.tiles_layout': 'tiles_layout',
          'guillotina_cms.interfaces.dublin_core.IDublinCore.creator':
            'creator',
        }),
      ).toEqual({
        title: 'Example',
        '@static_behaviors': [
          'guillotina_cms.interfaces.tiles.ITiles',
          'guillotina_cms.interfaces.dublin_core.IDublinCore',
        ],
        'guillotina_cms.interfaces.tiles.ITiles': {
          tiles: 'tiles',
          tiles_layout: 'tiles_layout',
        },
        'guillotina_cms.interfaces.dublin_core.IDublinCore': {
          creator: 'creator',
        },
      });
    });
  });
});
