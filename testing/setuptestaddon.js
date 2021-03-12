const packagejson = require('../package.json');
const fs = require('fs');

packagejson.addons = ['@plone/test-addon'];
packagejson.workspaces = ['packages/test-addon'];
packagejson.private = true;

fs.writeFile(
  '../package.json',
  JSON.stringify(packagejson, null, 2),
  { encoding: 'utf8' },
  (err) => {
    if (err) throw err;

    // eslint-disable-next-line no-console
    console.log('Successful patched package.json');
  },
);

const jsconfig = {
  compilerOptions: {
    paths: {
      '@plone/test-addon': ['@plone/test-addon/src'],
    },
    baseUrl: 'node_modules',
  },
};

fs.writeFile(
  '../jsconfig.json',
  JSON.stringify(jsconfig, null, 2),
  { encoding: 'utf8' },
  (err) => {
    if (err) throw err;

    // eslint-disable-next-line no-console
    console.log('Sucessful creation of jsconfig.json');
  },
);
