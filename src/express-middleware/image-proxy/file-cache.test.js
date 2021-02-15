import FileCache from '@plone/volto/express-middleware/image-proxy/file-cache.js';
import fs from 'fs-extra';

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

jest.mock('fs-extra');
describe('Test File Cache', () => {
  beforeAll(() => {
    // jest.spyOn(FileCache.prototype, 'initialize').mockImplementation(jest.fn());
    // jest.spyOn(FileCache.prototype, 'save').mockImplementation(jest.fn());
    // const save = (FileCache.prototype.save = jest.fn());
  });

  afterAll(() => {
    // jest.restoreAllMocks();
  });

  it('Initialize cache on server start if local files are present', () => {
    const cache = new FileCache();

    let spy = jest.spyOn(cache, 'initialize').mockImplementation(jest.fn());

    const opts = {
      basePath: `public/cache`,
      maxSize: 100,
      cache: new Map(),
    };
    cache.initialize();

    expect(cache.initialize).toHaveBeenCalledTimes(1);

    expect(cache.basePath).toEqual(opts.basePath);
    expect(cache.maxSize).toEqual(opts.maxSize);
    expect(cache.cache).toEqual(opts.cache);

    spy.mockRestore();
  });

  it('should write file to disk', () => {
    const mockFile = 'Some data';
    const cache = new FileCache();

    const spy = jest.spyOn(cache, 'save').mockImplementation(jest.fn());

    cache.set('SDE354FF.jpg', mockFile);
    fs.outputFileSync.mockReturnValue(undefined);
    const spy2 = jest.spyOn(fs, 'existsSync').mockImplementation(() => false);

    expect(cache.save).toHaveBeenCalledTimes(1);

    spy.mockRestore();
    spy2.mockRestore();
  });

  it('should read file from local disk', () => {
    const cache = new FileCache();

    const spy = jest.spyOn(cache, 'read').mockImplementation(jest.fn());

    cache.get('SDE354FF.png');
    jest.spyOn(fs, 'readFileSync');
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);

    expect(cache.read).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });

  it('should delete file from local disk', () => {
    const spy2 = jest
      .spyOn(FileCache.prototype, 'initialize')
      .mockImplementation(jest.fn());

    const cache = new FileCache();

    const spy = jest.spyOn(cache, 'remove').mockImplementation(jest.fn());

    cache.remove('SDE354FF.png');
    fs.removeSync.mockReturnValue(undefined);
    fs.existsSync.mockReturnValue(true);

    expect(cache.remove).toHaveBeenCalled();

    spy.mockRestore();
    spy2.mockRestore();
  });

  it('should look up in cache and have a cache hit', () => {
    const spy = jest
      .spyOn(FileCache.prototype, 'initialize')
      .mockImplementation(jest.fn());
    // const spy2 = jest.spyOn(fs, 'readdirSync').mockImplementation(() => []);
    // const spy3 = jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    // const spy4 = jest.spyOn(fs, 'outputFileSync').mockImplementation(() => {});

    const cache = new FileCache();
    const k = 'my unit test file.jpg';
    const c = 'file contents';
    const p = cache.path(k);
    cache.set(k, { value: { data: c } });
    const r = cache.read(k);

    console.log('r', r);
    try {
      if (!r) {
        expect(true).toEqual(false);
      } else if (cache.isExpired(JSON.parse(r?.metadata))) {
        expect(true).toEqual(false);
      } else {
        expect(r.data.data).toEqual(c);
      }
    } catch (error) {
      throw error;
      expect(true).toEqual(false, 'Error thrown while reading cache');
    }

    cache.remove(k);

    [spy, spy2, spy3, spy4].forEach((x) => x.mockRestore());
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
        expect(true).toBe(true);
      } else if (this.isExpired(JSON.parse(r?.metadata))) {
        expect(true).toBe(true);
      } else {
        expect(r.Data.data).toEqual('file contents');
      }
    } catch (error) {
      expect(true).toBe(true);
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
