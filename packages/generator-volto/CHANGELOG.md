# Volto Generator Release Notes

<!-- You should *NOT* be adding new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.docs.plone.org/volto/developer-guidelines/contributing.html#create-a-pull-request
-->

<!-- towncrier release notes start -->

## 9.0.0-alpha.18 (2024-10-04)

### Breaking

- Updated `razzle.config.js` to accommodate new argument `paths` passed down to `customModifyWebpackConfig`. @sneridagh [#6368](https://github.com/plone/volto/issues/6368)

## 9.0.0-alpha.17 (2024-06-28)

### Bugfix

- Rename test-setup-config.js to test-setup-config.jsx, otherwise jest tests will eventually fail @tomschall [#6133](https://github.com/plone/volto/issues/6133)

## 9.0.0-alpha.16 (2024-05-15)

### Bugfix

- Disable `jsx-a11y/label-has-associated-control` so that we can use `eslint-plugin-jsx-a11y` version 6.8.0 if it's pulled by other dependencies. @ichim-david [#5785](https://github.com/plone/volto/issues/5785)

## 9.0.0-alpha.15 (2024-05-02)

### Internal

- Flexibilize the pins for all ESlint deps, in Volto and generators @sneridagh [#5991](https://github.com/plone/volto/issues/5991)

## 9.0.0-alpha.14 (2024-03-24)

### Internal

- Fix StoryBook for project generator in Volto 18 @sneridagh [#5911](https://github.com/plone/volto/issues/5911)
- Update project template to use Storybook 8. @sneridagh [#5912](https://github.com/plone/volto/issues/5912)

## 9.0.0-alpha.13 (2024-03-18)

### Bugfix

- Improve the generator by getting the `@plone/types` version from GH @sneridagh [#5889](https://github.com/plone/volto/issues/5889)

## 9.0.0-alpha.12 (2024-03-18)

### Feature

- Copy over the `dependencies` and `devDependencies` from Volto in the generated project given the version provided @sneridagh [#5879](https://github.com/plone/volto/issues/5879)

### Internal

- Bump @plone/scripts and @plone/types to latests @sneridagh [#5888](https://github.com/plone/volto/issues/5888)

## 9.0.0-alpha.11 (2024-03-14)

### Bugfix

- Upgrade all versions in generator templates @sneridagh [#5844](https://github.com/plone/volto/issues/5844)
- Improve deps in project generator. @sneridagh @wesleybl [#5870](https://github.com/plone/volto/issues/5870)

## 9.0.0-alpha.10 (2024-03-05)

### Bugfix

- Add new forced resolutions to projects too @sneridagh [#5839](https://github.com/plone/volto/issues/5839)

## 9.0.0-alpha.9 (2024-03-05)

### Bugfix

- Ensure hidden files get added to new addon projects in generator-volto @instification [#5719](https://github.com/plone/volto/issues/5719)

## 9.0.0-alpha.8 (2024-03-02)

### Internal

- Update dependencies @sneridagh [#5815](https://github.com/plone/volto/issues/5815)

## 9.0.0-alpha.7 (2024-03-01)

### Bugfix

- Switch peerDependencies to Volto 18 for generator-volto alpha's/latest. [#5780](https://github.com/plone/volto/issues/5780)

## 9.0.0-alpha.6 (2024-02-18)

### Bugfix

- Fix @plone/volto-slate path in moduleNameMapper. @wesleybl [#5743](https://github.com/plone/volto/issues/5743)

## 9.0.0-alpha.5 (2024-02-06)

### Bugfix

- Fix tests in projects that involves TS files @sneridagh [#5738](https://github.com/plone/volto/issues/5738)

### Documentation

- Reorganize `README.md`, merging content into authoritative locations. Add `awesome_bot` to check links in all READMEs. @stevepiercy [#5437](https://github.com/plone/volto/issues/5437)

## 9.0.0-alpha.4 (2024-02-02)

### Bugfix

- Clarify the default value of `--defaultAddonName`. @ichim-david
  Clarify that the default add-on is always added when a project is generated. @ichim-david
  Added note about how `--defaultAddonName` affects the always added theme add-on on project generation. @ichim-david [#5439](https://github.com/plone/volto/issues/5439)

## 9.0.0-alpha.3 (2024-01-15)

### Internal

- ESlint general improvements @sneridagh [#5548](https://github.com/plone/volto/issues/5548)
- Pin mrs.developer to an updated version, never to star. @sneridagh [#5593](https://github.com/plone/volto/issues/5593)

### Documentation

- Fix redirects. @stevepiercy [#5563](https://github.com/plone/volto/issues/5563)

## 9.0.0-alpha.2 (2023-12-14)

### Bugfix

- Fixed the project generator's ESLint configuration, added code quality checks to the CI to ensure a generated project can run these checks, and added documentation for how to reconfigure ESLint in projects. @sneridagh [#5530](https://github.com/plone/volto/issues/5530)

## 9.0.0-alpha.1 (2023-12-02)

### Bugfix

- Fix the generator for add-ons when killing the backend if CTRL+C while developing with the docker approach @sneridagh [#5474](https://github.com/plone/volto/issues/5474)

### Documentation

- Replaced table with link to documentation for compatibility section in README. @stevepiercy [#5480](https://github.com/plone/volto/issues/5480)

## 9.0.0-alpha.0 (2023-12-01)

### Breaking

- Release an alpha version only compatible with Volto 18. @sneridagh [#5468](https://github.com/plone/volto/issues/5468)

## 8.0.3 (2023-11-25)

### Bugfix

- Bring back deprecated Yeoman install method used for running yarnInstall @ichim-david [#5436](https://github.com/plone/volto/issues/5436)

## 8.0.2 (2023-11-16)

### Bugfix

- Added `postcss-less` package to the default add-on, since the builds were complaining @sneridagh [#5408](https://github.com/plone/volto/issues/5408)

## 8.0.1 (2023-11-15)

### Bugfix

- Update `yeoman-generator` to match changes in latest `yo` breaking version @sneridagh
  This fixes the errors in the generator if a fresh version of yo (5) is installed [#5406](https://github.com/plone/volto/issues/5406)

## 8.0.0 (2023-11-06)

### Breaking

- Clean up the generator boilerplate in favor of the recommended add-on driven approach, and add documentation for how to develop a Volto project as an add-on. @sneridagh [#5297](https://github.com/plone/volto/issues/5297)

## 7.0.1 (2023-09-30)

### Internal

- Update to volto-testing final in generator @sneridagh [#5248](https://github.com/plone/volto/issues/5248)


## 7.0.0 (2023-09-30)

### Feature

- Update generators to Volto 17 final. @sneridagh [#5247](https://github.com/plone/volto/issues/5247)


## 7.0.0-alpha.12 (2023-09-30)

### Feature

- Update Plone and Volto versions in generators @sneridagh [#5246](https://github.com/plone/volto/issues/5246)


## 7.0.0-alpha.11 (2023-09-29)

### Bugfix

- Fix ESlint parser in addon generator boilerplate @sneridagh [#5243](https://github.com/plone/volto/issues/5243)


## 7.0.0-alpha.10 (2023-09-27)

### Breaking

- Update the generators dependencies for linters @sneridagh [#5216](https://github.com/plone/volto/issues/5216)

### Feature

- Add ignores in addon generator and workspaces info @sneridagh [#5235](https://github.com/plone/volto/issues/5235)


## 7.0.0-alpha.9 (2023-09-20)

### Bugfix

- Remove JSON files from being linted by ESlint, since it's not its purpose @sneridagh [#5194](https://github.com/plone/volto/issues/5194)


## 7.0.0-alpha.8 (2023-09-18)

### Bugfix

- Add missing empty lock to acceptance generator addon folder @sneridagh [#5193](https://github.com/plone/volto/issues/5193)


## 7.0.0-alpha.7 (2023-09-18)

### Feature

- TypeScript support in core @sneridagh @ninanoleto [#4462](https://github.com/plone/volto/issues/4462)

### Bugfix

- Fix addon i18n local command when executed outside the scope of a Volto project. @sneridagh [#5181](https://github.com/plone/volto/issues/5181)


## 7.0.0-alpha.6 (2023-09-14)

### Bugfix

- Fix addon i18n local command when executed outside the scope of a Volto project. @sneridagh [#5181](https://github.com/plone/volto/issues/5181)


## 7.0.0-alpha.5 (2023-09-13)

### Feature

- Add dockerized approach to add-on generator @sneridagh [#5167](https://github.com/plone/volto/issues/5167)

### Bugfix

- Fix whitespace in empty locales created by the generator. @davisagli [#4737](https://github.com/plone/volto/issues/4737)


## 7.0.0-alpha.4 (2023-04-13)

### Bugfix

- Force the resolution of the `react-error-overlay` package to `6.0.9` @sneridagh [#4687](https://github.com/plone/volto/issues/4687)


## 7.0.0-alpha.3 (2023-04-03)

### Bugfix

- Update to latest Razzle - needed since #3997. This fixes the duplicated Razzles issue @sneridagh [#4640](https://github.com/plone/volto/issues/4640)


## 7.0.0-alpha.2 (2023-03-05)

### Feature

- Improve stylelint config in generator, include scss support @sneridagh [#4469](https://github.com/plone/volto/issues/4469)


## 7.0.0-alpha.1 (2023-03-04)

### Bugfix

- Fix ESlint failure for the generator @sneridagh [#4465](https://github.com/plone/volto/issues/4465)


## 7.0.0-alpha.0 (2023-03-04)

### Breaking

- Volto 17 compliant version @davisagli [#4089](https://github.com/plone/volto/issues/4089)


## 6.2.5 (2023-03-02)

### Internal

- Get the App component from the registry. This makes it possible to add wrappers over the App@tiberiuichim [#4413](https://github.com/plone/volto/issues/4413)


## 6.2.4 (2023-03-02)

### Bugfix

- Fix generator adding the jest config for @plone/volto-slate @sneridagh [#4453](https://github.com/plone/volto/issues/4453)

### Internal

- made razzle.config.js in project template easier to extend @akshatgarg12 [#3424](https://github.com/plone/volto/issues/3424)


## 6.2.3 (2023-01-16)

### Bugfix

- Add scss to stylelint config in package.json script @sneridagh [#4259](https://github.com/plone/volto/issues/4259)


## 6.2.2 (2022-12-23)

### Bugfix

- Update docker image used in Makefile for addons @sneridagh [#4184](https://github.com/plone/volto/issues/4184)


## 6.2.1 (2022-12-23)

### Bugfix

- Update docker image used in Makefile for addons @sneridagh [#4175](https://github.com/plone/volto/issues/4175)


## 6.2.0 (2022-12-15)

### Feature

- Allow passing a Github branch or tag as Volto version (ex: `--volto=plone/volto#16.3.0`) @tiberiuichim [#4073](https://github.com/plone/volto/issues/4073)

### Bugfix

- Use semver to identify latest package when using the `--canary` flag @tiberiuichim @avoinea [#4074](https://github.com/plone/volto/issues/4074)
- Fix cypress support filename @sneridagh [#4129](https://github.com/plone/volto/issues/4129)


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
