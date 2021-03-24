const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-create-volto-app:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      projectName: 'test-volto',
      useAddons: 'no',
    });
  });

  it('creates files', () => {
    assert.file([
      'test-volto/package.json',
      'test-volto/yarn.lock',
      'test-volto/.gitignore',
    ]);
  });
});
