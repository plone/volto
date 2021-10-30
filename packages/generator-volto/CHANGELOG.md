# Change Log

## 5.0.0 (unreleased)

### Added

### Changes

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
