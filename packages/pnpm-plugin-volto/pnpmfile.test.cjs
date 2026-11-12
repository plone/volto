const { test } = require('node:test');
const assert = require('node:assert/strict');
const { hooks } = require('./pnpmfile.cjs');
const settings = require('./settings.json');

test('adds the shared settings to an empty config', () => {
  const config = hooks.updateConfig({});
  assert.deepEqual(config.overrides, settings.overrides);
  assert.deepEqual(config.allowBuilds, settings.allowBuilds);
  assert.deepEqual(config.publicHoistPattern, settings.publicHoistPattern);
});

test("keeps the project's own values over the shared ones", () => {
  const config = hooks.updateConfig({
    overrides: { tinypool: '2.2.0', 'left-pad': '1.3.0' },
    allowBuilds: { cypress: false },
  });
  assert.equal(config.overrides.tinypool, '2.2.0');
  assert.equal(config.overrides['left-pad'], '1.3.0');
  assert.equal(config.overrides['react-refresh'], '^0.14.2');
  assert.equal(config.allowBuilds.cypress, false);
  assert.equal(config.allowBuilds.esbuild, true);
});

test('merges hoist patterns without duplicates', () => {
  const config = hooks.updateConfig({
    publicHoistPattern: ['*eslint*', '*types*'],
  });
  assert.deepEqual(config.publicHoistPattern, [
    '*eslint*',
    '*types*',
    ...settings.publicHoistPattern.filter((p) => p !== '*eslint*'),
  ]);
});
