# @plone/scripts Release Notes

<!-- You should *NOT* be adding new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.docs.plone.org/volto/developer-guidelines/contributing.html#create-a-pull-request
-->

<!-- towncrier release notes start -->

## 4.0.0-alpha.1 (2025-05-16)

### Feature

- Support not publishing a package on NPM if `plonePrePublish.publish` is set to false. @ericof [#7068](https://github.com/plone/volto/issues/7068)

## 4.0.0-alpha.0 (2025-03-27)

### Breaking

- Remove old, deprecated `addon` scripts helpers. @sneridagh [#6848](https://github.com/plone/volto/issues/6848)
- Remove ancient `changelogupdater` script. @sneridagh [#6848](https://github.com/plone/volto/issues/6848)
- Remove `volto-update-deps` script. @sneridagh [#6848](https://github.com/plone/volto/issues/6848)

### Feature

- Add `--dry-run` to prepublish script. @sneridagh [#6847](https://github.com/plone/volto/issues/6847)

## 3.8.2 (2025-02-08)

### Internal

- Test with Plone 6.1.0rc1. @sneridagh [#6682](https://github.com/plone/volto/issues/6682)

## 3.8.1 (2024-11-05)

### Internal

- Improve packaging. @sneridagh 

## 3.8.0 (2024-11-05)

### Internal

- Improve exports in `@plone/registry`. Adapt its detection in i18n script. @sneridagh [#6461](https://github.com/plone/volto/issues/6461)

## 3.7.0 (2024-10-27)

### Feature

- Support for the new `@plone/registry` ESM format. @sneridagh [#6399](https://github.com/plone/volto/issues/6399)

### Documentation

- Added the configuration for VSCode not to reformat Markdown and MyST files. @aadityaforwork [#6354](https://github.com/plone/volto/issues/6354)

## 3.6.2 (2024-06-06)

### Bugfix

- 'Fix `poToJson` script, making it support `volto.config.js` @sneridagh [#6073](https://github.com/plone/volto/issues/6073)

### Documentation

- Improve comments @sneridagh [#6072](https://github.com/plone/volto/issues/6072)

## 3.6.1 (2024-03-18)

### Bugfix

- Fix volto-update-deps script, remove `@plone` packages from the sync @sneridagh [#5889](https://github.com/plone/volto/issues/5889)

## 3.6.0 (2024-03-18)

### Feature

- Added project dependencies sync utility `volto-update-deps`. @sneridagh [#5879](https://github.com/plone/volto/issues/5879)

## 3.5.0 (2024-03-05)

### Feature

- Add `check_deployments.js` script - Test simple deployments setups when Cypress is too much @sneridagh [#5824](https://github.com/plone/volto/issues/5824)

### Documentation

- Improve wayfinding for various Volto audiences. @stevepiercy [#5730](https://github.com/plone/volto/issues/5730)

## 3.4.0 (2024-03-02)

### Feature

- New `lockhook.js` script for replacing `yarnhook` @sneridagh [#5815](https://github.com/plone/volto/issues/5815)

### Internal

- Update dependencies @sneridagh [#5815](https://github.com/plone/volto/issues/5815)

## 3.3.2 (2024-01-26)

### Bugfix

- handle addons that have not been migrated to the new structure of po files @erral [#5704](https://github.com/plone/volto/issues/5704)

## 3.3.1 (2024-01-23)

### Internal

- Fix `@plone/scripts` requires @sneridagh [#5687](https://github.com/plone/volto/issues/5687)

## 3.3.0 (2024-01-17)

### Internal

- Polish po file handling @erral [#5542](https://github.com/plone/volto/issues/5542)

## 3.2.1 (2024-01-11)

### Bugfix

- Fix the package to work with Volto 17 and below @sneridagh [#5613](https://github.com/plone/volto/issues/5613)

## 3.2.0 (2024-01-11)

### Feature

- Added support for TS/TSX files in i18n machinery. @sneridagh [#5585](https://github.com/plone/volto/issues/5585)

### Internal

- ESlint general improvements @sneridagh [#5548](https://github.com/plone/volto/issues/5548)
- Pin mrs.developer to an updated version, never to star. @sneridagh [#5593](https://github.com/plone/volto/issues/5593)

## 3.1.0 (2023-12-02)

### Feature

- Added a pre-publish plugin for release-it @sneridagh [#5473](https://github.com/plone/volto/issues/5473)
- Added script to add necessary VSCode `.vscode/settings.json` to detect ESlint projects inside the monorepo @sneridagh [#5483](https://github.com/plone/volto/issues/5483)

## 3.0.1 (2023-10-06)

### Bugfix

- Update `git-url-parse` dependency. @davisagli [#5098](https://github.com/plone/volto/issues/5098)
- Fix error ``no such file or directory, open 'addon-testing-project/jsconfig.json'`` in addon clone command. @wesleybl [#5239](https://github.com/plone/volto/issues/5239)


## 3.0.0 (2023-04-07)

### Breaking

- Remove dependency on `simple-git`. It is used by `mrs-developer` but not directly. @davisagli [#4546](https://github.com/plone/volto/issues/4546)

### Bugfix

- Fixed i18n script to avoid overwriting translations with an empty msgstr @danalvrz [#4316](https://github.com/plone/volto/issues/4316)


## 2.3.0 (2023-01-13)

### Feature

- The `consolidate` command includes Cypress folder @sneridagh [#4192](https://github.com/plone/volto/issues/4192)
- Add backport PR helper script @sneridagh [#4222](https://github.com/plone/volto/issues/4222)
- Improve consolidate and local clone copy files @sneridagh [#4253](https://github.com/plone/volto/issues/4253)


## 2.2.2 (2022-12-23)

### Internal

- Adjust npmignores, reissue package @sneridagh [#0](https://github.com/plone/volto/issues/0)


## 2.2.1 (2022-11-24)

### Bugfix

- Include `cypress` folder and `cypress.config.js` in the local clone command @sneridagh
- Fix the local clone command `execSync` @sneridagh

## 2.2.0 (2022-11-24)

### Feature

- Match the new layout for the Volto project generator for Cypress tests @sneridagh

## 2.1.5 (2022-11-24)

### Bugfix

- Remove `isCanary` amendment to differentiate 15/16 way of calling the test script @sneridagh

## 2.1.4 (2022-11-24)

### Bugfix

- Disable immutable installs in local package once created, so CI does not complain. We REALLY want to install something! @sneridagh

## 2.1.3 (2022-11-24)

### Bugfix

- Improve `execSync` call in addon script @sneridagh

## 2.1.2 (2022-10-26)

### Internal

- Add missing dependency @tiberiuichim

## 2.1.1 (2022-09-28)

### Bugfix

- Fix if `canary` selected, the tests should not include `--env=jest-environment-jsdom-sixteen` @sneridagh

## 2.1.0 (2022-09-28)

### Feature

- New `clone` to local command @sneridagh
- New `consolidate` command @sneridagh

## 2.0.0 (2022-09-27)

### Breaking

- Removed `Razzle` as dependency, leave only the `babel-preset-razzle` one which is enough.

  See https://6.docs.plone.org/volto/upgrade-guide/index.html for more information.

## 1.6.0 (2022-08-05)

### Feature

- Add support for recommended structure `frontend` folder using `CHANGELOG.md` in the parent folder. @sneridagh

## 1.5.0 (2022-07-28)

### Feature

- Add `--canary` option to use latest alpha in generator @sneridagh

## 1.4.1 (2022-02-24)

### Bugfix

- Fix `branch` option not getting into the `getAddonInfo` function @sneridagh

## 1.4.0 (2021-12-29)

### Feature

- Add custom `cypress:run` script for starting the right Cypress suite (in addon test environment) @sneridagh

## 1.3.0 (2021-12-28)

### Feature

- Add custom `test` script for getting the right `RAZZLE_JEST_CONFIG` (in addon test environment) @sneridagh

## 1.2.0 (2021-12-28)

### Feature

- Improved CLI for creating addon testing environments @sneridagh

## 1.1.0 (2021-12-24)

### Feature

- Initial version of the CLI for addon testing @sneridagh

## 1.0.3 (2021-10-01)

### Bugfix

- Fix defaults not getting in properly in i18n script @sneridagh

## 1.0.2 (2021-09-27)

### Bugfix

- Missing default interpreter for `chagelogupdater` script @sneridagh

## 1.0.1 (2021-09-27)

### Bugfix

- Missing `pofile` as dependency @sneridagh

## 1.0.0 (2021-09-25)

### Feature

- Volto i18n messages extractor and `react-intl` language .json generator script @sneridagh
- Changelog script @sneridagh

### Internal

- Initial release
