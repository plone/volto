import React from 'react';
import superagent from 'superagent';
import { Image } from '@plone/volto/express-middleware/image-proxy/Image.js';
import * as helpers from '@plone/volto/helpers';

jest.mock('superagent');
jest.mock('@plone/volto/helpers');

jest.mock('~/config', () => ({
  settings: {
    nonContentRoutes: [],
    supportedLanguages: ['en'],
    navDepth: 1,
  },
  views: {
    errorViews: {
      ECONNREFUSED: () => <div className="ECONNREFUSED" />,
    },
  },
}));

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

  it('Fetches metadata with a HEAD call', async () => {
    const resp = { headers: { 'last-modified': 1, eta: 2 } };
    superagent.head.mockResolvedValue(resp);

    let img = new Image({ path: '/a/@@images/logo/mini' });
    await img.syncMetadataFromBackend();

    expect(img.metadata).toEqual(resp.headers);
  });

  it('Fetches holds references to a cache', () => {
    const cache = { processed: {}, unprocessed: {} };

    let img = new Image({ path: '/a/@@images/logo/mini' }, cache);

    expect(img.cache).toEqual(cache);
  });

  it('Gets data from caches', async () => {
    const cache = {
      processed: {
        get(key) {
          return new Promise((resolve) => resolve('from processed'));
        },
      },
      unprocessed: {
        get(key) {
          return new Promise((resolve) => resolve('from unprocessed'));
        },
      },
    };

    let img = new Image({ path: '/a/@@images/logo/mini' }, cache);

    expect(await img.getFromProcessedCache()).toEqual('from processed');
    expect(await img.getFromUnprocessedCache()).toEqual('from unprocessed');
  });

  it('Can fetch an original image from backend', async () => {
    const cache = {
      processed: {
        get(key) {
          return new Promise((resolve) => resolve('from processed'));
        },
        set(key, value) {
          this._k = key;
          this._v = value;
        },
      },
      unprocessed: {
        set(key, value) {
          this._k = key;
          this._v = value;
        },
        get(key) {
          return new Promise((resolve) => resolve('from unprocessed'));
        },
      },
    };

    let img = new Image({ path: '/a/@@images/logo/mini' }, cache);

    const resp = {
      body: 'body',
      headers: {
        'content-type': 'image/png',
        'last-modified': '1',
        etag: '2',
      },
    };
    helpers.getAPIResourceWithAuth.mockResolvedValue(resp);
    const container = await img.fetchOriginalFromBackend();
    expect(container).toEqual({
      data: 'body',
      format: 'png',
      headers: { 'content-disposition': undefined, 'cache-control': undefined },
    });
  });

  it('Can optimize original while preserving format', async () => {
    //
  });
});
