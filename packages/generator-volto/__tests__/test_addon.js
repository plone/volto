const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs-extra');

const base = path.join(__dirname, '../generators/addon');

let tmpDir;

const TEST_NAMES = ['package.json', 'Makefile', '.gitignore', 'src/index.js'];

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
    assert.file(
      TEST_NAMES.map((name) =>
        path.join(tmpDir, `src/addons/test-volto-addon/${name}`),
      ),
    );

    assert.file(path.join(tmpDir, `mrs.developer.json`));
  });

  it('addons key is added', () => {
    const packageJSON = JSON.parse(
      fs.readFileSync(path.join(tmpDir, 'package.json'), 'utf8'),
    );

    expect(packageJSON.addons).toStrictEqual(['test-volto-addon']);
  });

  it('mrs.developer key is added', () => {
    const mrsDeveloperJson = JSON.parse(
      fs.readFileSync(path.join(tmpDir, 'mrs.developer.json'), 'utf8'),
    );

    expect(mrsDeveloperJson).toStrictEqual({
      'test-volto-addon': { local: 'addons/test-volto-addon/src' },
    });
  });
});

describe('generator-create-volto-app:addon run in empty folder', () => {
  beforeAll(() => {
    return helpers
      .run(base)
      .inTmpDir(function (dir) {
        tmpDir = dir;
      })
      .withPrompts({
        addonName: 'test-volto-addon',
      });
  });

  it('creates files', () => {
    assert.file(TEST_NAMES);
  });
});

describe('generator-create-volto-app:addon can output to specific folder', () => {
  beforeAll(() => {
    return helpers
      .run(base)
      .inTmpDir(function (dir) {
        tmpDir = dir;
      })
      .withPrompts({
        addonName: 'test-volto-addon',
      })
      .withOptions({
        outputpath: 'dest',
      });
  });

  it('creates files', () => {
    assert.file(TEST_NAMES.map((name) => path.join(tmpDir, `dest/${name}`)));
  });
});
