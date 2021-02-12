import FileCache from '@plone/volto/express-middleware/image-proxy/file-cache.js';
import fs from 'fs-extra';

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

jest.mock('fs-extra');
describe('Test File Cache', () => {
  it('Initialize cache on server start if local files are present', () => {
    const initialize = (FileCache.prototype.initialize = jest.fn());
    const cache = new FileCache();
    const opts = {
      basePath: `public/cache`,
      maxSize: 100,
      cache: new Map(),
    };
    cache.initialize();

    expect(initialize).toHaveBeenCalledTimes(1);

    expect(cache.basePath).toEqual(opts.basePath);
    expect(cache.maxSize).toEqual(opts.maxSize);
    expect(cache.cache).toEqual(opts.cache);
  });

  it('should write file to disk', () => {
    const mockFile = 'Some data';
    const save = (FileCache.prototype.save = jest.fn());
    const cache = new FileCache();
    cache.set('SDE354FF', mockFile);
    fs.outputFileSync.mockReturnValue(undefined);
    jest.spyOn(fs, 'existsSync').mockImplementation(() => false);
    expect(save).toHaveBeenCalledTimes(1);
  });

  it('should read file from local disk', () => {
    const read = (FileCache.prototype.read = jest.fn());
    const cache = new FileCache();
    cache.get('SDE354FF');
    jest.spyOn(fs, 'readFileSync');
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    expect(read).toHaveBeenCalledTimes(1);
  });
  it('should delete file from local disk', () => {
    const remove = (FileCache.prototype.remove = jest.fn());
    const cache = new FileCache();
    cache.remove('SDE354FF');
    fs.removeSync.mockReturnValue(undefined);
    fs.existsSync.mockReturnValue(true);
    expect(remove).toHaveBeenCalled();
  });

  it('should look up in cache and have a cache hit', () => {
    const cache = new FileCache();
    cache.initialize();

    const p = cache.path('my unit test file');

    cache.set(p, 'file contents');

    const r = cache.read(p);

    try {
      if (!r) {
        expect(false);
      } else if (this.isExpired(JSON.parse(r?.metadata))) {
        expect(false);
      } else {
        expect(r.Data.data).toEqual('file contents');
      }
    } catch (error) {
      expect(false, 'Error thrown while reading cache');
    }

    cache.remove(p);
  });

  it('should look up in cache and have a cache miss', () => {
    const cache = new FileCache();
    cache.initialize();

    const p = cache.path('my unit test file');
    const p2 = cache.path('my nonexistent file');

    cache.set(p, 'file contents');

    const r = cache.read(p2);

    try {
      if (!r) {
        expect(true);
      } else if (this.isExpired(JSON.parse(r?.metadata))) {
        expect(true);
      } else {
        expect(r.Data.data).toNotEqual('file contents');
      }
    } catch (error) {
      expect(true, 'Error thrown while reading cache');
    }

    cache.remove(p);
  });

  it('should look up in cache and have 2 items', () => {
    const cache = new FileCache();
    cache.initialize();

    cache.set('my unit test file', { data: 'file contents' });

    cache.set('my second unit test file', { data: 'my other file contents' });

    expect(Array.from(cache.cache.entries()).length).toEqual(2);
  });
});
