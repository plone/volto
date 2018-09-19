import {
  getTilesFieldname,
  getTilesLayoutFieldname,
  hasTilesData,
} from './Tiles';

describe('Tiles', () => {
  describe('getTilesFieldname', () => {
    it('can get the tiles field name from formdata', () => {
      expect(getTilesFieldname({ title: 'Example', tiles: [] })).toBe('tiles');
    });

    it('can get the tiles field name from formdata of a nested schema', () => {
      expect(
        getTilesFieldname({
          title: 'Example',
          'guillotina_cms.interfaces.tiles.ITiles.tiles': [],
        }),
      ).toBe('guillotina_cms.interfaces.tiles.ITiles.tiles');
    });
  });

  describe('getTilesLayoutFieldname', () => {
    it('can get the tiles layout field name from formdata', () => {
      expect(
        getTilesLayoutFieldname({ title: 'Example', tiles_layout: [] }),
      ).toBe('tiles_layout');
    });

    it('can get the tiles layout field name from formdata of a nested schema', () => {
      expect(
        getTilesLayoutFieldname({
          title: 'Example',
          'guillotina_cms.interfaces.tiles.ITiles.tiles_layout': [],
        }),
      ).toBe('guillotina_cms.interfaces.tiles.ITiles.tiles_layout');
    });
  });

  describe('hasTilesData', () => {
    it('checks tiles data when there is none', () => {
      expect(hasTilesData({ title: 'Example' })).toBe(false);
    });

    it('checks tiles data in the root', () => {
      expect(hasTilesData({ title: 'Example', tiles: [] })).toBe(true);
    });

    it('checks tiles data in a nested schema', () => {
      expect(
        hasTilesData({
          title: 'Example',
          'guillotina_cms.interfaces.tiles.ITiles.tiles': [],
        }),
      ).toBe(true);
    });
  });
});
