const fs = require('fs-extra');
const path = require('path');

const cache = new Map();

function save(key, value) {
  const filePath = key.split('/').pop();
  fs.outputFileSync(path.resolve(__dirname, filePath), value);
}
function read(key) {
  const filePath = key.split('/').pop();
  return fs.readFileSync(filePath, 'utf8');
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
