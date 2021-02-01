import * as fs from 'fs-extra';
import path from 'path';
import { getLogger } from '@plone/volto/express-middleware/logger';
const debug = getLogger('file-cache');

export const defaultOpts = {
  basePath: `../public/cache`,
};

function isNumber(val) {
  return typeof val === 'number';
}

class FileCache {
  constructor(opts = defaultOpts) {
    this.ttlSupport = true;
    this.basePath = opts.basePath;
    this.ns = opts.ns; //namespace
    if (opts.extension) {
      this.extension = opts.extension;
    }
  }

  // /**
  //  * Generates the path to the cached files.
  //  * @param {string} key: The key of the cache item.
  //  * @return {string}.
  //  */
  // path(key) {
  //   if (!key) {
  //     throw new Error(`Path requires a cache key.`);
  //   }
  //   let name = key;
  //   if (this.ns) {
  //     name = `${this.ns}-${name}`;
  //   }
  //   if (this.extension) {
  //     name = `${name}.${this.extension.replace(/^\./, '')}`;
  //   }
  //   return `${this.basePath}/${name}`;
  // }

  read(key) {
    const filePath = key.split('/').pop();
    const dir = path.resolve(__dirname, `../public/cache/${filePath}`);
    debug(`file read ${dir}`);
    if (fs.existsSync(dir)) return fs.readFileSync(dir, 'utf8');
  }

  isExpired(data) {
    return isNumber(data.expire) && data.expire <= Date.now();
  }

  get(key) {
    try {
      const data = this.read(key);
      if (!data) {
        return;
      } else if (this.isExpired(data)) {
        return this.delete(key);
      } else {
        return data;
      }
    } catch (error) {
      debug(error);
    }
  }
  //get(key, defaultValue) { return getValueP(this.path(key), defaultValue); }

  has(key) {
    return typeof this.get(key) !== 'undefined';
  }

  save(key, value) {
    const filePath = key.split('/').pop();
    const { value: data } = JSON.parse(value);
    try {
      const dir = path.resolve(__dirname, `../public/cache/${filePath}`);
      fs.outputFileSync(dir, data.data);
      debug(`file written at ${dir}`);
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
    this.save(key, value);
  }

//   /**
//    * Removes the item from the file-system.
//    * @param {string} key: The key of the cache item.
//    * @return {Promise}
//    */
//   remove(key) {
//     return fs.removeFileP(key);
//   }

//   clear() {
//     return new Promise((resolve, reject) => {
//       fs.filePathsP(this.basePath, this.ns)
//         .then((paths) => {
//           const remove = (index) => {
//             const path = paths[index];
//             if (path) {
//               fs.removeFileP(path)
//                 .then(() => remove(index + 1)) // RECURSIVE Remove.
//                 .catch((err) => reject(err));
//             } else {
//               resolve(); // All files have been removed.
//             }
//           };
//           remove(0);
//         })
//         .catch((err) => reject(err));
//     });
//   }
// }

export default FileCache;
