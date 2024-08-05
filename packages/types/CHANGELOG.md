# @plone/volto-types Release Notes

<!-- Do *NOT* add new change log entries to this file.
     Instead create a file in the news directory.
     For helpful instructions, see:
     https://6.docs.plone.org/contributing/index.html#change-log-entry
-->

<!-- towncrier release notes start -->

## 1.0.0-alpha.19 (2024-07-30)

### Feature

- Added `errors` shape to the `BlockEditProps`.
  Added typings for `Utilities` registry. @sneridagh [#6161](https://github.com/plone/volto/issues/6161)

## 1.0.0-alpha.18 (2024-07-26)

### Feature

- Change the types in `common.d.ts` to interfaces, to make them extendable. @tomschall [#6191](https://github.com/plone/volto/issues/6191)

## 1.0.0-alpha.17 (2024-06-27)

### Internal

- Upgrade `react-intl` to maximum 3.x series to fix a bundling issue.
  Rename missing js file that must be jsx. @sneridagh [#6128](https://github.com/plone/volto/issues/6128)

## 1.0.0-alpha.16 (2024-06-13)

### Breaking

- Remove unused `config.settings.containerBlockTypes` @sneridagh [#6099](https://github.com/plone/volto/issues/6099)

## 1.0.0-alpha.15 (2024-06-13)

### Bugfix

- Better `styleClassNameExtenders` typings @sneridagh [#6095](https://github.com/plone/volto/issues/6095)

## 1.0.0-alpha.14 (2024-06-06)

### Breaking

- The `GetSlotArgs` type no longer supports `pathname` as a key, instead using `location`. @sneridagh [#6063](https://github.com/plone/volto/issues/6063)

### Bugfix

- BlockExtension as Interface @sneridagh [#6049](https://github.com/plone/volto/issues/6049)
- Improved image typings @pnicolli [#6064](https://github.com/plone/volto/issues/6064)

## 1.0.0-alpha.13 (2024-05-23)

### Feature

- New Brain type and new ArrayElement utility @pnicolli [#6029](https://github.com/plone/volto/issues/6029)

## 1.0.0-alpha.12 (2024-05-15)

### Bugfix

- Fixed some type definitions @sneridagh [#6014](https://github.com/plone/volto/issues/6014)

## 1.0.0-alpha.11 (2024-04-26)

### Bugfix

- Better BlocksData definitions @sneridagh [#5979](https://github.com/plone/volto/issues/5979)

### Internal

- Saner defaults for building deps, switch default to cached, add `build:force` command @sneridagh [#5980](https://github.com/plone/volto/issues/5980)

## 1.0.0-alpha.10 (2024-04-05)

### Bugfix

- Split widgets type definitions into their own interfaces so they are extendable @sneridagh [#5948](https://github.com/plone/volto/issues/5948)

## 1.0.0-alpha.9 (2024-04-03)

### Bugfix

- Fix experimental settings and new button type @sneridagh [#5921](https://github.com/plone/volto/issues/5921)

## 1.0.0-alpha.8 (2024-03-25)

### Bugfix

- Improve APIExpanders Types, export all @sneridagh [#5918](https://github.com/plone/volto/issues/5918)

### Internal

- Sync TypeScript version @sneridagh [#5912](https://github.com/plone/volto/issues/5912)

## 1.0.0-alpha.7 (2024-03-18)

### Feature

- Improve @plone/types - Block*Props and Widgets @sneridagh [#5876](https://github.com/plone/volto/issues/5876)

## 1.0.0-alpha.6 (2024-03-14)

### Internal

- Cleanup deps @sneridagh [#5846](https://github.com/plone/volto/issues/5846)

## 1.0.0-alpha.5 (2024-03-01)

### Feature

- Upgrade Volto core to use React 18.2.0 @sneridagh [#3221](https://github.com/plone/volto/issues/3221)

## 1.0.0-alpha.4 (2024-03-01)

### Feature

- Support for slots @sneridagh [#5775](https://github.com/plone/volto/issues/5775)

## 1.0.0-alpha.3 (2024-02-02)

### Bugfix

- Enhance the `initialBlocks` typings @sneridagh [#5718](https://github.com/plone/volto/issues/5718)

## 1.0.0-alpha.2 (2024-01-15)

### Feature

- Complete missing types, fix some other that were wrong. @sneridagh [#5624](https://github.com/plone/volto/issues/5624)

## 1.0.0-alpha.1 (2024-01-02)

### Feature

- Improve exports, include the main ConfigData definition from registry @sneridagh [#5587](https://github.com/plone/volto/issues/5587)

### Bugfix

- Fixed `blocks_layout` in `Content` interface @sneridagh [#5544](https://github.com/plone/volto/issues/5544)

## 1.0.0-alpha.0 (2023-12-13)

### Feature

- Fist release of @plone/types @sneridagh [#1](https://github.com/plone/volto/issues/1)
