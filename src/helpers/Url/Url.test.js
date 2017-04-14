import { getBaseUrl, getView } from './Url';

describe('Url', () => {
  describe('getBaseUrl', () => {
    it('can remove a view name from the url', () => {
      expect(getBaseUrl('http://localhost/edit')).toBe('http://localhost');
    });
  });

  describe('getView', () => {
    it('can get the edit view from the url', () => {
      expect(getView('http://localhost/edit')).toBe('edit');
    });

    it('can get the view view from the url', () => {
      expect(getView('http://localhost/my-blog')).toBe('view');
    });
  });
});
