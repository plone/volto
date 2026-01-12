# @plone/types Release Notes

<!-- Do *NOT* add new change log entries to this file.
     Instead create a file in the news directory.
     For helpful instructions, see:
     https://6.docs.plone.org/contributing/index.html#change-log-entry
-->

<!-- towncrier release notes start -->

## 1.6.0 (2026-01-12)

### Feature

- Enhance registry utilities type definitions with typed method signatures. @ompharate @sneridagh [#7652](https://github.com/plone/volto/issues/7652)

## 1.5.1 (2025-12-02)

### Bugfix

- Better `BlockViewProps` typings, include `isEditMode`. @sneridagh [#7560](https://github.com/plone/volto/issues/7560)
- Fixed types for SchemaEnhancers, export new `SchemaEnhancerArgs`. @sneridagh [#7627](https://github.com/plone/volto/issues/7627)

## 1.5.0 (2025-10-31)

### Feature

- Complete expanders typings, include `translations`. @sneridagh [#7531](https://github.com/plone/volto/issues/7531)

## 1.4.5 (2025-05-16)

### Bugfix

- Fix image scales typings.
  Added `dataAdapter` key in `BlockConfigBase`.
  `category` as optional in `BlockConfigBase`. @sneridagh [#7079](https://github.com/plone/volto/issues/7079)

## 1.4.4 (2025-05-08)

### Bugfix

- Improve typings of brains and objectBrowser references. @sneridagh [#7047](https://github.com/plone/volto/issues/7047)

## 1.4.3 (2025-04-30)

### Bugfix

- `blockModel` should be optional. @sneridagh [#7033](https://github.com/plone/volto/issues/7033)

## 1.4.2 (2025-04-30)

### Bugfix

- Fixed `groupBlocksOrder` typing. @sneridagh [#7029](https://github.com/plone/volto/issues/7029)

## 1.4.1 (2025-04-25)

### Bugfix

- Better typing for `apiExpandersType` introduced in #7012. @sneridagh [#7016](https://github.com/plone/volto/issues/7016)

## 1.4.0 (2025-04-22)

### Feature

- Better Site extender and endpoint typings, add it to the default extenders typings. @sneridagh [#7007](https://github.com/plone/volto/issues/7007)

## 1.3.3 (2025-04-15)

### Bugfix

- Fix boolean in blocks edit config BlockEditProps in key selected type. @sneridagh [#6994](https://github.com/plone/volto/issues/6994)

## 1.3.2 (2025-02-08)

### Internal

- Update TS version. @sneridagh [#6641](https://github.com/plone/volto/issues/6641)
- Remove hard dependencies on react-intl and history in @plone/types @sneridagh [#6728](https://github.com/plone/volto/issues/6728)

## 1.3.1 (2025-01-31)

### Bugfix

- Remove `hasWorkingCopySupport` setting. @davisagli [#6393](https://github.com/plone/volto/issues/6393)

## 1.3.0 (2025-01-24)

### Feature

- Added typings for the route registry. @sneridagh [#6600](https://github.com/plone/volto/issues/6600)

## 1.2.0 (2024-12-17)

### Feature

- Added the typing for the new `cssLayers` configuration object setting. @sneridagh [#6539](https://github.com/plone/volto/issues/6539)

## 1.1.0 (2024-12-12)

### Feature

- Added block category type. @sneridagh [#6409](https://github.com/plone/volto/issues/6409)

## 1.0.0 (2024-10-31)

### Internal

- Release 1.0.0 @sneridagh

## 1.0.0-alpha.22 (2024-10-30)

### Feature

- `StyleDefinitions` in types. @sneridagh [#6445](https://github.com/plone/volto/issues/6445)

## 1.0.0-alpha.21 (2024-10-18)

### Bugfix

- Some improvements and fixes in blocks and settings types. @sneridagh [#6412](https://github.com/plone/volto/issues/6412)

### Internal

- Update typescript and vitest everywhere @sneridagh [#6407](https://github.com/plone/volto/issues/6407)

## 1.0.0-alpha.20 (2024-10-08)

### Bugfix

- Fixed types for image fields and BlocksFormData @pnicolli @deodorhunter [#6382](https://github.com/plone/volto/issues/6382)

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
