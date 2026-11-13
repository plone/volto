/* eslint-disable */
// pnpm loads this file automatically because the package name matches
// `@*/pnpm-plugin-*`, when the package is listed under `configDependencies`
// in a project's `pnpm-workspace.yaml`.
//
// It adds the pnpm settings that every Volto project and add-on needs.
// The project's own settings always win, so a project can still change or
// remove any of them in its `pnpm-workspace.yaml`.
const settings = require('./settings.json');

function updateConfig(config) {
  config.overrides = { ...settings.overrides, ...config.overrides };
  config.allowBuilds = { ...settings.allowBuilds, ...config.allowBuilds };
  config.publicHoistPattern = [
    ...new Set([
      ...(config.publicHoistPattern ?? []),
      ...settings.publicHoistPattern,
    ]),
  ];
  return config;
}

module.exports = {
  hooks: {
    updateConfig,
  },
};
