const fs = require('fs-extra');
const path = require('path');
const cache = new Map();

function save(key, value) {
  const filePath = key.split('/').pop();
  const { value: data } = JSON.parse(value);
  try {
    const dir = path.resolve(__dirname, `../public/cache/${filePath}`);
    fs.outputFileSync(dir, data.data);
    console.log(`file written at ./public/cache/${filePath}`);
  } catch (e) {
    throw Error(e);
  }
}
function read(key) {
  const filePath = key.split('/').pop();
  const dir = path.resolve(__dirname, `../public/cache/${filePath}`);
  if (fs.existsSync(dir)) return fs.readFileSync(dir, 'utf8');
}

module.exports = {
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
