import { getLogger } from '@plone/volto/express-middleware/logger';
import serialize from 'serialize-javascript';
import fs from 'fs-extra';
import path from 'path';

const cache = new Map();
const debug = getLogger('image-proxy');

function save(key, value) {
  const filePath = key.split('/').pop();
  const { value: data } = JSON.parse(value);
  try {
    const dir = path.resolve(__dirname, `../public/cache/${filePath}`);
    fs.outputFileSync(dir, serialize(data));
    debug(`file written at ${dir}`);
  } catch (e) {
    throw Error(e);
  }
}
function read(key) {
  const filePath = key.split('/').pop();
  const dir = path.resolve(__dirname, `../public/cache/${filePath}`);
  debug(`file read ${dir}`);
  if (fs.existsSync(dir)) return fs.readFileSync(dir, 'utf8');
}

export default {
  has(key) {
    return cache.has(key);
  },

  set(key, value) {
    cache.set(key, [value, Date.now()]);
    save(key, value);
  },

  get(key) {
    if (cache.has(key)) return read(key);
    return;
  },

  delete(key) {
    return cache.delete(key);
  },

  clear() {
    return cache.clear();
  },
};
