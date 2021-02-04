import * as fs from 'fs-extra';
import path from 'path';
import { getLogger } from '@plone/volto/express-middleware/logger';
const debug = getLogger('file-cache');

export const defaultOpts = {
  basePath: `../public/cache`,
  maxSize: 100,
};

function isNumber(val) {
  return typeof val === 'number';
}

class FileCache {
  constructor(opts = defaultOpts) {
    this.basePath = opts.basePath;
    this.maxSize = opts.maxSize;
    this.cache = new Map(); //for keeping count of how many times the file is read
    this.clear();
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
    const ext = key.substr(key.indexOf('.') + 1).split('/')[0]; //append the extension
    let name = Buffer.from(key).toString('base64');
    return `${this.basePath}/${name}.${ext}`;
  }

  read(key) {
    const dir = path.join(__dirname, `${key}`);
    const metadataPath = `${dir.replace(path.extname(dir), '.metadata')}`;
    debug(`file read ${dir}`);
    if (fs.existsSync(dir)) {
      let count = this.cache.get(key);
      this.cache.set(key, ++count);
      debug(this.cache.get(key));
      return {
        data: fs.readFileSync(dir, { encoding: null }),
        metadata: fs.readFileSync(metadataPath),
      };
    }
  }

  isExpired(data) {
    return isNumber(data.expires) && data.expires <= Date.now();
  }

  get(key) {
    try {
      const fileData = this.read(this.path(key));
      if (!fileData) {
        return;
      } else if (this.isExpired(JSON.parse(fileData?.metadata))) {
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
        this.cache.set(key, 0);
      } else {
        debug(
          'Directory size reached max limit, Removing least recent used element...',
        );
        //TODO: add max age condition
        const entries = Array.from(this.cache.entries());
        let count = entries[0];
        entries.forEach((item, ind) => {
          if (item[1] < count[1]) count = item;
        });
        this.remove(count[0]);
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
    const metadataPath = `${dir.replace(path.extname(dir), '.metadata')}`;
    fs.removeSync(dir);
    fs.removeSync(metadataPath);
    this.cache.delete(key);
    return;
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
