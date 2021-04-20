const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-create-volto-app:addon', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/addon'))
      .withPrompts({
        addonName: 'test-volto-addon',
      });
  });

  it('creates files', () => {
    assert.file([
      'src/addons/test-volto-addon/package.json',
      'src/addons/test-volto-addon/.gitignore',
      'src/addons/test-volto-addon/src/index.js',
      'src/addons/test-volto-addon/src/i18n.js',
    ]);
  });
});
