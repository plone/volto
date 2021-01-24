import { Image } from '@plone/volto/express-middleware/image-proxy/Image.js';

describe('Images are represented by the Image class', () => {
  it('Is constructed from a request with an image path', () => {
    expect(() => {
      new Image({ path: '/a/b' });
    }).toThrow(new TypeError("Cannot read property 'split' of undefined"));

    const img = new Image({ path: '/a/@@images/image' });

    expect(img.path).toBe('/a/@@images/image');
    expect(img.fieldName).toBe('image');
    expect(img.thumbSize).toBe('');
    expect(img.contextUrl).toBe('/a');
    expect(img.fullImagePath).toBe('/a/@@images/image');
  });

  it('Can handle thumbnail paths', () => {
    const img = new Image({ path: '/a/@@images/image/mini' });

    expect(img.path).toBe('/a/@@images/image/mini');
    expect(img.fieldName).toBe('image');
    expect(img.thumbSize).toBe('mini');
    expect(img.contextUrl).toBe('/a');
    expect(img.fullImagePath).toBe('/a/@@images/image');
  });

  it('Can handle any image field', () => {
    const img = new Image({ path: '/a/@@images/logo/mini' });

    expect(img.path).toBe('/a/@@images/logo/mini');
    expect(img.thumbSize).toBe('mini');
    expect(img.fieldName).toBe('logo');
    expect(img.contextUrl).toBe('/a');
    expect(img.fullImagePath).toBe('/a/@@images/logo');
  });

  it('Computes a cacheKey for the provided URL', () => {
    const img = new Image({ path: '/a/@@images/logo/mini' });
    img.metadata['last-modified'] = '-timestamp-';

    expect(img.cacheKey()).toBe('/a/@@images/logo/mini--timestamp-');
  });

  it('Computes a cacheKey for the original field URL', () => {
    const img = new Image({ path: '/a/@@images/logo/mini' });
    img.metadata['last-modified'] = '-timestamp-';

    expect(img.cacheKeyOriginal()).toBe('/a/@@images/logo--timestamp-');
  });

  it('It knows if the image is a resize', () => {
    let img = new Image({ path: '/a/@@images/logo/mini' });
    expect(img.isThumbnail()).toBe(true);

    img = new Image({ path: '/a/@@images/logo' });
    expect(img.isThumbnail()).toBe(false);
  });
});
