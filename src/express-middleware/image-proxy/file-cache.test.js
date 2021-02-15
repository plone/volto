import FileCache from '@plone/volto/express-middleware/image-proxy/file-cache.js';
import fs from 'fs-extra';

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

jest.mock('fs-extra');
describe('Test File Cache', () => {
  it('Initialize cache on server start if local files are present', () => {
    const initialize = (FileCache.prototype.initialize = jest.fn());
    const cache = new FileCache();
    const opts = {
      basePath: `../public/cache`,
      maxSize: 100,
      cache: new Map(),
    };
    cache.initialize();

    expect(initialize).toHaveBeenCalledTimes(1);
    expect(cache).toEqual(opts);
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
  it('should expel least recent used item from cache', () => {
    const cache = new FileCache({ maxSize: 2, basePath: '../public/cache' });
    cache.initialize();

    cache.cache.set('my unit test file', 1);

    cache.cache.set('my second unit test file', 2);
    const entries = Array.from(cache.cache.entries());
    let count = entries[0];
    entries.forEach((item, ind) => {
      if (item[1] < count[1]) count = item;
    });
    cache.cache.delete(count[0]);

    expect(Array.from(cache.cache.entries()).length).toBeLessThan(
      cache.maxSize,
    );
  });
});
