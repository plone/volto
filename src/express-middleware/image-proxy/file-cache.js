import * as fs from 'fs-extra';
import path from 'path';
import { getLogger } from '@plone/volto/express-middleware/logger';
const debug = getLogger('file-cache');

export const defaultOpts = {
  basePath: `../public/cache`,
  maxSize: 100,
  extension: '.jpg',
  ns: 'main',
};

function isNumber(val) {
  return typeof val === 'number';
}

class FileCache {
  constructor(opts = defaultOpts) {
    this.basePath = opts.basePath;
    this.maxSize = opts.maxSize;
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
    let name = key.replace(/[^a-zA-Z0-9 ]/g, '');
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
    if (fs.existsSync(dir)) {
      return {
        data: fs.readFileSync(dir, { encoding: null }),
        metadata: fs.readFileSync(metadataPath),
      };
    }
  }

  isExpired(data) {
    return isNumber(data.expire) && data.expire <= Date.now();
  }

  get(key) {
    try {
      const fileData = this.read(this.path(key));
      if (!fileData) {
        return;
      } else if (this.isExpired(fileData)) {
        return this.remove(this.path(key));
      } else {
        const metadata = JSON.parse(fileData?.metadata);
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

  save(key, data) {
    const { value } = data;
    try {
      const dir = path.join(__dirname, `${key}`);
      const metadataPath = `${dir.replace(path.extname(dir), '.metadata')}`;
      if (
        !fs.existsSync(path.join(__dirname, this.basePath)) ||
        fs.readdirSync(path.join(__dirname, this.basePath)).length <
          this.maxSize
      ) {
        fs.outputFileSync(dir, value.data, { encoding: null });
        debug(`file written at ${dir}`);
        fs.outputFileSync(metadataPath, JSON.stringify(data));
        debug(`metadata file written at ${metadataPath}`);
      } else {
        debug('Directory size reached max limit');
      }
    } catch (e) {
      throw Error(e);
    }
  }
  /**
   *
   * @param key
   * @param value
   */
  set(key, value) {
    this.save(this.path(key), value);
  }

  /**
   * Removes the item from the file-system.
   * @param {string} key: The key of the cache item.
   * @return undefined
   */
  remove(key) {
    const dir = path.join(__dirname, `${key}`);
    return fs.removeSync(dir);
  }

  /**
   * Removes all items from the cache.
   * @return undefined
   */
  clear() {
    const dir = path.resolve(__dirname, this.basePath);
    return fs.removeSync(dir);
  }
}

export default FileCache;
