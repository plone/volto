import FileCache from '@plone/volto/express-middleware/image-proxy/file-cache.js';
import fs from 'fs-extra';

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
    jest.spyOn(fs, 'outputFileSync');
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
});
