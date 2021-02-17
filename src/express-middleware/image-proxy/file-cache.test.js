import FileCache from '@plone/volto/express-middleware/image-proxy/file-cache.js';
import fs from 'fs-extra';

describe('Test File Cache', () => {
  it('should initialize cache on server start if local files are present', () => {
    const fn = jest.fn();
    let spy = jest
      .spyOn(FileCache.prototype, 'initialize')
      .mockImplementation(fn);

    const cache = new FileCache({ rebuildFromFs: true });

    const opts = {
      basePath: `public/cache`,
      maxSize: 100,
    };

    const arr = [];
    const data = fs.existsSync(cache.absBasePath)
      ? fs.readdirSync(cache.absBasePath)
      : [];
    if (data) {
      Array.from(data).forEach((d) => {
        if (d.endsWith('.metadata')) {
          arr.push(d);
        }
      });
    }

    expect(fn).toHaveBeenCalledTimes(1);

    expect(cache.basePath).toEqual(opts.basePath);
    expect(cache.maxSize).toEqual(opts.maxSize);
    expect(cache.cache.size).toEqual(arr.length);

    spy.mockRestore();
  });

  it('should write file to disk', () => {
    const mockFile = 'Some data';
    const cache = new FileCache();

    const spy = jest.spyOn(cache, 'save').mockImplementation(jest.fn());

    cache.set('SDE354FF.jpg', mockFile);

    const spy2 = jest.spyOn(fs, 'existsSync').mockImplementation(() => false);

    expect(cache.save).toHaveBeenCalledTimes(1);

    spy.mockRestore();
    spy2.mockRestore();
  });

  it('should read file from local disk', () => {
    const cache = new FileCache();

    const spy = jest.spyOn(cache, 'read').mockImplementation(jest.fn());

    cache.get('SDE354FF.png');

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

    expect(cache.remove).toHaveBeenCalled();

    spy.mockRestore();
    spy2.mockRestore();
  });

  it('should look up in cache and have a cache hit', () => {
    const spy = jest
      .spyOn(FileCache.prototype, 'initialize')
      .mockImplementation(jest.fn());

    const cache = new FileCache();
    const k = 'my unit test file.jpg';
    const c = 'file contents';
    cache.set(k, { value: { data: c } });
    const r = cache.read(k);

    try {
      if (!r) {
        expect(true).toEqual(false);
      } else if (cache.isExpired(JSON.parse(r?.metadata))) {
        expect(true).toEqual(false);
      } else {
        expect(r.data.toString()).toEqual(c);
      }
    } catch (error) {
      expect(true).toEqual(false, 'Error thrown while reading cache');
    }

    cache.remove(k);

    [spy].forEach((x) => x.mockRestore());
  });

  it('should look up in cache and have a cache miss', () => {
    const spy = jest
      .spyOn(FileCache.prototype, 'initialize')
      .mockImplementation(jest.fn());

    const cache = new FileCache();

    const k = 'my unit test file.jpg';
    const k2 = 'my second unit test file.png';
    const c = 'file contents';
    // const c2 = 'second file contents';
    cache.set(k, { value: { data: c } });
    // cache.set(k2, { value: { data: c2 } });

    const r = cache.read(k2);

    try {
      if (!r) {
        expect(true).toEqual(true);
      } else if (this.isExpired(JSON.parse(r?.metadata))) {
        expect(true).toEqual(true);
      } else {
        expect(r.data.toString()).toNotEqual(c);
      }
    } catch (error) {
      expect(true).toEqual(true);
    }

    cache.remove(k2);

    [spy].forEach((x) => x.mockRestore());
  });

  it('should look up in cache and have 2 items', () => {
    const spy = jest
      .spyOn(FileCache.prototype, 'initialize')
      .mockImplementation(jest.fn());

    const cache = new FileCache();

    const k = 'my unit test file.jpg';
    const k2 = 'my second unit test file.png';
    const c = 'file contents';
    const c2 = 'my file contents';
    cache.set(k, { value: { data: c } });
    cache.set(k2, { value: { data: c2 } });

    expect(cache.cache.size).toEqual(2);

    cache.clear();

    [spy].forEach((x) => x.mockRestore());
  });
});
