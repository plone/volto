import * as fs from 'fs-extra';
import path from 'path';
import { getLogger } from '@plone/volto/express-middleware/logger';
const debug = getLogger('file-cache');

export const defaultOpts = {
  basePath: `../public/cache`,
  extension: '.jpg',
  ns: 'main',
};

function isNumber(val) {
  return typeof val === 'number';
}

class FileCache {
  constructor(opts = defaultOpts) {
    this.ttlSupport = true;
    this.basePath = opts.basePath;
    this.ns = opts.ns; //namespace, we have a namespace from keyu-file
    if (opts.extension) {
      //optional, we can specify file extensions
      this.extension = opts.extension;
    }
  }

  /**
   * Generates the path to the cached files.
   * @param {string} key: The key of the cache item.
   * @return {string}.
   */
  path(key) {
    if (!key) {
      throw new Error(`Path requires a cache key.`);
    }
    let name = key
      .split('-')
      .slice(-1)[0]
      .replace(/[^a-zA-Z ]/g, '');

    if (this.ns) {
      name = `${this.ns}-${name}`;
    }
    if (this.extension) {
      name = `${name}.${this.extension.replace(/^\./, '')}`;
    }
    return `${this.basePath}/${name}`;
  }

  read(key) {
    const dir = path.join(__dirname, `${key}`);
    const metadataPath = `${dir.replace(path.extname(dir), '.metadata')}`;
    debug(`file read ${dir}`);
    debug(fs.existsSync(dir));
    if (fs.existsSync(dir))
      return {
        data: fs.readFileSync(dir, 'utf8'),
        metadata: fs.readFileSync(path.join(__dirname, metadataPath), 'utf8'),
      };
  }

  isExpired(data) {
    return isNumber(data.expire) && data.expire <= Date.now();
  }

  get(key) {
    try {
      const fileData = this.read(this.path(key));
      const metadata = JSON.parse(fileData.metadata);
      if (!fileData) {
        return;
      } else if (this.isExpired(fileData)) {
        return this.remove(key);
      } else {
        return {
          ...metadata,
          data: fileData.data,
        };
      }
    } catch (error) {
      debug(error);
    }
  }

  has(key) {
    return typeof this.get(key) !== 'undefined';
  }

  save(key, value) {
    const { value: data } = JSON.parse(value);
    try {
      const dir = path.join(__dirname, `${key}`);
      const metadataPath = `${dir.replace(path.extname(dir), '.metadata')}`;
      fs.outputFileSync(dir, data.data);
      debug(`file written at ${dir}`);
      fs.outputFileSync(metadataPath, JSON.stringify(data));
      debug(`metadata file written at ${metadataPath}`);
    } catch (e) {
      throw Error(e);
    }
  }
  /**
   *
   * @param key
   * @param value
   * @param ttl time-to-live, seconds
   */
  set(key, value, ttl) {
    if (ttl === 0) {
      ttl = undefined;
    }
    this.save(this.path(key), value);
  }

  /**
   * Removes the item from the file-system.
   * @param {string} key: The key of the cache item.
   * @return undefined
   */
  remove(key) {
    const filePath = key.split('/').pop();
    const dir = path.resolve(__dirname, `../public/cache/${filePath}`);
    return fs.removeSync(dir);
  }

  /**
   * Removes all items from the cache.
   * @return undefined
   */
  clear() {
    const dir = path.resolve(__dirname, `../public/cache/`);
    return fs.removeSync(dir);
  }
}

export default FileCache;
