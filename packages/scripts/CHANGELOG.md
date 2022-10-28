# Change Log

## 2.1.3 (unreleased)

### Breaking

### Feature

### Bugfix

### Internal

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

  See https://6.dev-docs.plone.org/volto/upgrade-guide/index.html for more information.

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
