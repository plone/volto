import * as fs from 'fs-extra';
import path from 'path';
import { getLogger } from '@plone/volto/express-middleware/logger';
import md5 from 'md5';
const debug = getLogger('file-cache');

export const defaultOpts = {
  basePath: 'public/cache',
  maxSize: 100,
};

function isNumber(val) {
  return typeof val === 'number';
}

class FileCache {
  constructor(opts = defaultOpts) {
    this.basePath = process.env.VOLTO_FILE_CACHE_BASE_PATH || opts.basePath;
    this.absBasePath = path.resolve(process.cwd(), this.basePath);
    this.maxSize = opts.maxSize;
    this.cache = new Map(); // keeping count of how many times the file is accessed
    if (__SERVER__ && fs.existsSync(this.absBasePath)) {
      this.initialize(this.absBasePath);
    }
  }

  /**
   * Initialize the cache.
   * @param {string} dirPath: The base directory.
   * @return {undefined}
   */
  initialize(dirPath) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      // if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      //   //if we move each file in a directory in future.
      //   this.initialize(dirPath + '/' + file);
      // } else
      if (!file.includes('.metadata')) {
        this.cache.set(file, 0);
      }
    });
  }
  /**
   * Generates the path to the cached files.
   * @param {string} key: The key of the cache item.
   * @return {string}
   */
  path(key) {
    if (!key) {
      throw new Error(`Path requires a cache key.`);
    }
    const ext = key.substr(key.indexOf('.') + 1).split('/')[0]; // append the extension
    let name = md5(key);
    return `${this.absBasePath}/${name}.${ext}`;
  }

  /**
   * @param {string} key
   */
  incrementForKey = (key) => {
    let count = this.cache.get(key);
    this.cache.set(key, ++count);
    debug(this.cache.get(key));
  };

  /**
   * @param {string} key
   */
  read(key) {
    const filePath = this.path(key);
    const metadataPath = `${filePath.replace(
      path.extname(filePath),
      '.metadata',
    )}`;
    debug(`file read ${filePath}`);
    if (fs.existsSync(filePath)) {
      this.incrementForKey(key);
      return {
        data: fs.readFileSync(filePath, { encoding: null }),
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
      const filePath = this.path(key);
      const metadataPath = `${filePath.replace(
        path.extname(filePath),
        '.metadata',
      )}`;
      if (
        !fs.existsSync(this.absBasePath) ||
        fs.readdirSync(this.absBasePath).length < this.maxSize
      ) {
        fs.outputFileSync(filePath, value.data, { encoding: null });
        debug(`file written at ${filePath}`);
        fs.outputFileSync(metadataPath, JSON.stringify(data));
        debug(`metadata file written at ${metadataPath}`);
        this.cache.set(key, 0);
      } else {
        debug(
          'Directory size reached max limit, Removing least recent used element...',
        );
        //TODO: add max age condition
        const entries = Array.from(this.cache.entries());
        let anchorEntry = entries[0];
        entries.forEach((crtEntry /*, ind */) => {
          if (crtEntry[1] < anchorEntry[1]) anchorEntry = crtEntry;
        });
        this.remove(anchorEntry[0]);
      }
    } catch (e) {
      throw Error(e);
    }
  }
  /**
   *
   * @param {string} key
   * @param {number} value
   */
  set(key, value) {
    this.save(key, value);
  }

  /**
   * Removes the item from the file-system.
   * @param {string} key The key of the cache item.
   * @return undefined
   */
  remove(key) {
    const filePath = this.path(key);
    const metadataPath = `${filePath.replace(
      path.extname(filePath),
      '.metadata',
    )}`;
    fs.removeSync(filePath);
    fs.removeSync(metadataPath);
    this.cache.delete(key);
    return;
  }

  /**
   * Removes all items from the cache.
   * @return undefined
   */
  clear() {
    const dir = this.absBasePath;
    return fs.removeSync(dir);
  }
}

export default FileCache;
