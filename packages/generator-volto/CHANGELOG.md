# Volto Generator Release Notes

<!-- You should *NOT* be adding new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.dev-docs.plone.org/volto/developer-guidelines/contributing.html#create-a-pull-request
-->

<!-- towncrier release notes start -->

## 6.1.2 (2022-12-05)

### Bugfix

- Add `cypress.config.js` to generator templates @sneridagh [#4021](https://github.com/plone/volto/issues/4021)


## 6.1.1 (2022-11-24)

### Bugfix

- Updated reset fixture scripts for generator @sneridagh

## 6.1.0 (2022-11-24)

### Feature

- Refactor the `package.json` scripts, move all Cypress related to `Makefile` commands, remove the scripts that are obsolete as well. @sneridagh
- Update the default Plone Versions from the convenience docker images in `Makefile` @sneridagh

## 6.0.0 (2022-11-22)

### Internal

- Releasing final @sneridagh

## 6.0.0-alpha.4 (2022-11-20)

### Bugfix

- Generator is aware of `rc`, `beta` and `alphas` as possible releases for canary @sneridagh

## 6.0.0-alpha.3 (2022-11-16)

### Bugfix

- Add missing `"@plone/scripts": "^2.1.2"` devDependency to app template @sneridagh

## 6.0.0-alpha.2 (2022-11-15)

### Bugfix

- Missing `.yarnrc.yml` entry for the yarn 3 release @sneridagh

## 6.0.0-alpha.1 (2022-11-14)

### Feature

- Last bit and pieces of the yarn 3 upgrade @sneridagh

## 6.0.0-alpha.0 (2022-11-12)

### Breaking

- Upgrade to Yarn 3 @sneridagh

## 5.9.3 (2022-10-10)

### Internal

- Restrict only to `/cache` in `.gitignore` @sneridagh

## 5.9.2 (2022-10-10)

### Internal

- Add `cache` to `.gitignore` @sneridagh

## 5.9.1 (2022-10-03)

### Internal

- Missing `--noninteractive` for the generator @sneridagh

## 5.9.0 (2022-09-28)

### Feature

- Move the dependency on `@plone/scripts` of the add-on generator to `devDependencies`. @sneridagh

### Bugfix

- Add alias to ESlint config in project generator @sneridagh
- Add missing `moduleNameMapper`s to default app `package.json` jest config @sneridagh
- Fix storybook for Razzle 4 @sneridagh

## 5.8.0 (2022-07-28)

### Feature

- Adds canary option feature, if `--canary` is specified, then the latest alpha version is used @sneridagh

### Bugfix

- Remove yarn.lock from the app generator template (the generator fetches it from the latest volto version anyway). @davisagli

## 5.7.0 (2022-07-25)

### Feature

- Deprecate NodeJS 12 from package generators since it's out of LTS since April 30, 2022. @sneridagh
- Improvements to the addon generator: Now it wires up the addon automatically for immediate local development @sneridagh
- Add .editorconfig and .prettierignore to generated projects and addons. @ericof

### Bugfix

- Changed Cypress command generation to use the Cypress Commands from Volto core @JeffersonBledsoe #3271

## 5.6.3 (2022-04-29)

### Bugfix

- Fix `omelette` yarn script to avoid creating a bogus symlink inside the Volto sources convinience facility @sneridagh

## 5.6.2 (2022-04-25)

### Bugfix

- Fix `yarn lint` in Volto project generator scripts wasn't enforcing `--max-warnings=0` @sneridagh

## 5.6.1 (2022-04-21)

### Bugfix

- Fix build for the docker image 6.0.0a4 in the `Makefile` command @sneridagh

## 5.6.0 (2022-04-21)

### Feature

- Use `plone/plone-backend:6.0.0a4` in `Makefile` for new projects template for starting test backend @sneridagh

## 5.5.1 (2022-04-21)

### Bugfix

- Fix webpack-less-plugin import in storybook @nileshgulia1
- Remove useless import in storybook `main.js` @sneridagh

## 5.5.0 (2022-02-03)

### Added

- Add mrs-developer.json in template
- Fix app template Makefile @avoinea

## 5.4.0 (2021-12-29)

### Added

- Add further CI cypress commands and complimentary Makefile for app template @sneridagh

## 5.3.0 (2021-12-28)

### Added

- Add missing stylelint check script in project @sneridagh

## 5.2.0 (2021-12-28)

### Added

- Add Cypress testing infrastructure to addon generator @sneridagh
- Add `jest-addon.config.js` default in addon generator @sneridagh

## 5.1.0 (2021-12-24)

### Added

- Add Cypress testing infrastructure to app generator @sneridagh

### Changes

- Missing new stylelint config in app template @sneridagh

## 5.0.2 (2021-12-23)

### Changes

- Add missing public files from Volto 14 @sneridagh

## 5.0.1 (2021-12-22)

### Internal

- Refresh app generator template `yarn.lock` to match latest upgrades @sneridagh
- Fix Volto project template devDependencies @avoinea

## 5.0.0 (2021-12-20)

### Breaking

- Added new configuration for i18n using the new package `@plone/scripts`. 5.0.0 and onwards is supposed to work on Volto 14 and above. @sneridagh

### Added

- Support Node 16 @sneridagh
- Add prettier and lint scripts to generator @tisto

### Internal

- Add more exceptions to .gitignore @avoinea
- Addon add prompt now accept fallacy choices @nileshgulia1

## 5.0.0-alpha.2 (2021-12-20)

### Internal

- Add more exceptions to .gitignore @avoinea
- Addon add prompt now accept fallacy choices @nileshgulia1

## 5.0.0-alpha.1 (2021-10-29)

### Added

- Support Node 16 @sneridagh

## 5.0.0-alpha.0 (2021-09-26)

### Breaking

- Added new configuration for i18n using the new package `@plone/scripts`. 5.0.0 and onwards is supposed to work on Volto 14 and above. @sneridagh

### Added

- Add prettier and lint scripts to generator @tisto

### Changes

## 4.3.1 (2021-05-07)

### Changes

- Fix Jest testing environment. Changed to `--env=jest-environment-jsdom-sixteen` @avoinea

## 4.3.0 (2021-04-28)

### Added

- Ability to bootstrap a Volto project for the addon using a Makefile @tiberiuichim

## 4.2.0 (2021-04-05)

### Added

- Support for Github addon `--template` @avoinea

## 4.1.0 (2021-03-26)

### Added

- Default workspaces path @nileshgulia1
- Simplify interactive questions @avoinea
- Add addons also to dependencies @avoinea

## 4.0.1 (2021-03-26)

### Added

- Default workspaces path @nileshgulia1
- Simplify interactive questions @avoinea
- Add addons also to dependencies @avoinea

## 4.0.0 (2021-02-20)

### Breaking

- Upgrade to Volto 12.0.0 - This generator is only compatible with Volto 12 and above. @sneridagh

### Added

- Added command line option where you can specify the Volto version you want to use like: `yo @plone/volto --volto=12.0.0-alpha.0` @sneridagh

## 4.0.0-alpha.1 (2021-02-17)

- Released another major alpha accidentally, continuing with this major then :/
  (Volto 12.0.0 and above compatible)

### Added

- Add comment on where to place the project imports in `config.js` @sneridagh

## 4.0.0-alpha.0 (2021-02-17)

### Bug Fixes

- bug fix package.json of add-on generator: json format @ksuess

## 3.0.0-alpha.0 (2021-02-17)

### Breaking

- Upgrade to Volto 12.0.0 - This generator is only compatible with Volto 12 and above. @sneridagh

## 2.4.0 (2021-02-08)

### Added

- Added i18n for addons support @sneridagh

## 2.3.0 (2021-01-21)

### Added

- Add generator-volto missing locales: eu fr ro @avoinea

### Changes

- Fix addon routes in generator @sneridagh

## 2.2.0 (2021-01-09)

### Added

- Integrate update-notifier to app and addon generators @tiberiuichim

### Changes

- Fix generated Readme template with updated details on mrs-developer

## 2.1.0 (2020-11-26)

### Added

- Remove Razzle plugins patch @sneridagh

## 2.0.2 (2020-11-16)

### Added

Add recommended browserlist @sneridagh

## 2.0.1 (2020-11-15)

### Changes

- Proper `yarn.lock` @sneridagh

## 2.0.0 (2020-11-15)

### Breaking

- Upgrade config to use Volto 9 requirements @sneridagh

### Added

- Add addon template @avoinea

### Internal

- Use GitHub actions, deprecate Travis @sneridagh

## 1.1.1 (2020-11-08)

### Changes

- Add missing config for addonRoutes and addonReducers @avoinea

## 1.1.0 (2020-11-04)

### Added

- Support Node 14 @sneridagh

## 1.0.0 (2020-10-21)

### Added

- Add `--workspace` and `--skip-workspaces` @avoinea
- Add `--interactive`, `--no-interactive` @avoinea

## 1.0.0-alpha.1 (2020-10-15)

### Changes

- Add load-volto-addons to jest @tiberiuichim
- Improve `.eslintrc.js` to include the addon registry @tiberiuichim
- Add `create-sentry-release` @avoinea

## 1.0.0-alpha.0 (2020-10-14)

### Added

- First implementation of the generator, based mainly on `create-volto-app` boilerplate @tiberiuichim
- Ready for first version @sneridagh
