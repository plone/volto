const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs-extra');

let tmpDir;

jest.mock('https', () => ({
  ...jest.requireActual('https'),
  get: jest.fn().mockImplementation((url, headers, cb) => {
    const Stream = require('stream');
    let streamStream = new Stream();
    cb(streamStream);
    let json;
    if (!url.includes('packages/volto/package.json')) {
      json = JSON.stringify({
        name: '@plone/volto',
        'dist-tags': {
          latest: '16.3.0',
          alpha: '16.0.0-alpha.53',
          rc: '16.0.0-rc.3',
        },
      });
    } else {
      json = JSON.stringify({
        dependencies: {},
        devDependencies: {},
      });
    }

    streamStream.emit('data', json);
    streamStream.emit('end');
  }),
}));

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
    expect(packageJSON.theme).toBe('volto-test-volto');
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
    expect(packageJSON.dependencies['@plone/volto']).toBe('16.3.0');
    expect(packageJSON.theme).toBe('volto-test-volto');
  });
});

describe('generator-create-volto-app:app with volto from Github branch', () => {
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
        volto: 'plone/volto#16.3.0',
      });
  });

  it('creates files', () => {
    assert.file([
      'test-volto/package.json',
      'test-volto/yarn.lock',
      'test-volto/.gitignore',
    ]);
  });

  it('Volto is at custom version', () => {
    const packageJSON = JSON.parse(
      fs.readFileSync(path.join(tmpDir, 'test-volto/package.json'), 'utf8'),
    );

    expect(packageJSON.dependencies['@plone/volto']).toBe('plone/volto#16.3.0');
    expect(packageJSON.theme).toBe('volto-test-volto');
  });
});
