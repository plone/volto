const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs-extra');

const base = path.join(__dirname, '../generators/addon');

let tmpDir;

const p = (name) => path.join(tmpDir, name);

describe('generator-create-volto-app:addon run in Volto project', () => {
  beforeAll(() => {
    return helpers
      .run(base)
      .inTmpDir(function (dir) {
        // we need a dummy package.json
        fs.copySync(
          path.join(__dirname, '../package.json'),
          path.join(dir, 'package.json'),
        );
        tmpDir = dir;
      })
      .withPrompts({
        addonName: 'test-volto-addon',
      });
  });

  it('creates files', () => {
    assert.file([
      p('src/addons/test-volto-addon/package.json'),
      p('src/addons/test-volto-addon/Makefile'),
      // p('src/addons/test-volto-addon/.gitignore'),
      p('src/addons/test-volto-addon/src/index.js'),
      p('src/addons/test-volto-addon/src/i18n.js'),
    ]);
  });
});

describe('generator-create-volto-app:addon run in empty folder', () => {
  beforeAll(() => {
    return helpers.run(base).withPrompts({
      addonName: 'test-volto-addon',
    });
  });

  it('creates files', () => {
    assert.file([
      './package.json',
      './Makefile',
      // p('src/addons/test-volto-addon/.gitignore'),
      './src/index.js',
      './src/i18n.js',
    ]);
  });
});
