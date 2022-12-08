const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs-extra');
const { getLatestCanaryVoltoVersion } = require('../generators/app/utils');

let tmpDir;

describe('generator-create-volto-app:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .inTmpDir(function (dir) {
        tmpDir = dir;
      })
      .withPrompts({
        projectName: 'test-volto',
        useAddons: false,
      });
  });

  it('creates files', () => {
    assert.file([
      'test-volto/package.json',
      'test-volto/yarn.lock',
      'test-volto/.gitignore',
    ]);
  });

  it('default gets latest (non canary) version', () => {
    const packageJSON = JSON.parse(
      fs.readFileSync(path.join(tmpDir, 'test-volto/package.json'), 'utf8'),
    );

    expect(packageJSON.dependencies['@plone/volto']).not.toContain('alpha');
  });
});

describe('generator-create-volto-app:app with canary option', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .inTmpDir(function (dir) {
        tmpDir = dir;
      })
      .withPrompts({
        projectName: 'test-volto',
        useAddons: false,
      })
      .withOptions({
        canary: true,
      });
  });

  it('creates files', () => {
    assert.file([
      'test-volto/package.json',
      'test-volto/yarn.lock',
      'test-volto/.gitignore',
    ]);
  });

  it('canary option gets latest Volto version, including alphas', () => {
    const packageJSON = JSON.parse(
      fs.readFileSync(path.join(tmpDir, 'test-volto/package.json'), 'utf8'),
    );

    getLatestCanaryVoltoVersion().then((version) => {
      expect(packageJSON.dependencies['@plone/volto']).toBe(version);
    });
  });
});
