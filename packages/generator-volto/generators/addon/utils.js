const gitly = require('gitly');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

/*
 * Apply tplSettings on .tpl file
 */
const bootstrap = function (ofile, tplSettings) {
  fs.readFile(ofile, 'utf8', function (err, data) {
    if (err) {
      // eslint-disable-next-line no-console
      return console.error(err);
    }
    const result = ejs.render(data, { ...tplSettings });
    fs.writeFile(ofile, result, 'utf8', function (err) {
      if (err) {
        // eslint-disable-next-line no-console
        return console.error(err);
      }
    });
    if (ofile.includes('.tpl')) {
      const output = ofile.replace('.tpl', '');
      fs.rename(ofile, output, (err) => {
        if (err) {
          // eslint-disable-next-line no-console
          return console.error(err);
        }
      });
    }
  });
};

/*
 * Get github template and apply tplSettings on .tpl files
 */
async function githubTpl(source, destination, tplSettings) {
  await gitly.default(source, destination);
  fs.readdir(destination, { withFileTypes: true }, (err, dirents) => {
    if (err) {
      // eslint-disable-next-line no-console
      return console.error(err);
    }
    const files = dirents
      .filter((dirent) => dirent.isFile())
      .map((dirent) => dirent.name);
    files.forEach(function (file) {
      const file_path = path.join(destination, file);
      bootstrap(file_path, tplSettings);
    });
  });
}

module.exports = {
  githubTpl,
};
