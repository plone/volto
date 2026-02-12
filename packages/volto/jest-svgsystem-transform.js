const path = require('path');

module.exports = {
  process(src, filename) {
    if (filename.includes('src/icons')) {
      return `module.exports = { attributes: { xmlns: '', viewBox: ''}}`;
    }
    return `module.exports = ${JSON.stringify(path.basename(filename))}`;
  },
};
