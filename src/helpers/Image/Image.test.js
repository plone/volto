import { getSrcSet } from './Image';

describe('Image', () => {
  describe('getSrcSet', () => {
    it('returns srcset from scales', () => {
      expect(
        getSrcSet('http://localhost:8080/Plone/photo.png/@@images/image'),
      ).toEqual({
        srcSet:
          '/photo.png/@@images/image/large 768w, /photo.png/@@images/image/preview 400w, /photo.png/@@images/image/mini 200w, /photo.png/@@images/image/thumb 128w, /photo.png/@@images/image/tile 64w, /photo.png/@@images/image/icon 32w, /photo.png/@@images/image/listing 16w',
        sizes: null,
      });
    });

    it('returns srcset and sizes with minitature set', () => {
      expect(
        getSrcSet(
          'http://localhost:8080/Plone/photo.png/@@images/image',
          'preview',
        ),
      ).toEqual({
        srcSet:
          '/photo.png/@@images/image/preview 400w, /photo.png/@@images/image/mini 200w, /photo.png/@@images/image/thumb 128w, /photo.png/@@images/image/tile 64w, /photo.png/@@images/image/icon 32w, /photo.png/@@images/image/listing 16w',
        sizes: '400px',
      });
    });
  });
});
