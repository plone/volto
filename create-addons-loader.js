const fs = require('fs');
const tmp = require('tmp');

const titleCase = (w) => w.slice(0, 1).toUpperCase() + w.slice(1, w.length);

/*
 * Transforms a package name to javascript variable name
 */
function nameFromPackage(name) {
  return name
    .split('-')
    .map((w, i) => (i > 0 ? titleCase(w) : w))
    .join('');
}

/*
 * Creates a static file with code necessary to load the addons configuration
 *
 */
function getAddonsLoaderCode(addons = []) {
  let buf = '';
  let configsToLoad = [];

  addons.forEach((addonConfigString) => {
    let extras;
    const addonConfigLoadInfo = addonConfigString.split(':');
    const pkgName = addonConfigLoadInfo[0];
    const defaultImport = nameFromPackage(pkgName);
    if (addonConfigLoadInfo.length > 1) {
      extras = addonConfigLoadInfo[1].split(',');
    }
    const line = `import ${defaultImport}${
      extras ? `, { ${extras.join(', ')} }` : ''
    } from '${pkgName}';\n`;
    buf += line;
    configsToLoad = [...configsToLoad, defaultImport, ...(extras || [])];
  });

  buf += `
export default(config) => {
  const addonLoaders = [${configsToLoad.join(', ')}];
  return addonLoaders.reduce((acc, apply) => apply(acc), config)
}
`;

  return buf;
}

module.exports = (addons) => {
  const io = tmp.fileSync({ postfix: '.js' });
  const addonsLoaderPath = io.name;
  const code = getAddonsLoaderCode(addons);
  fs.writeSync(io.fd, new Buffer.from(code));
  return addonsLoaderPath;
};

module.exports.getAddonsLoaderCode = getAddonsLoaderCode;
module.exports.nameFromPackage = nameFromPackage;
