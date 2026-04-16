# @plone/editor Release Notes

<!-- Do *NOT* add new change log entries to this file.
     Instead create a file in the news directory.
     For helpful instructions, see:
     https://6.docs.plone.org/contributing/index.html#change-log-entry
-->

<!-- towncrier release notes start -->

## 1.0.0-alpha.3 (2026-04-16)

### Breaking

- Remove output.css from @plone/plate and generation command. @sneridagh
  Remove Plate image plugin. @sneridagh [#8015](https://github.com/plone/volto/issues/8015)
- Refactored and re-thinked blockWidth feature. @sneridagh [#8053](https://github.com/plone/volto/issues/8053)
- Refactored and re-thinked slash menu plugin extensibility story. @sneridagh [#8054](https://github.com/plone/volto/issues/8054)
- Removed the h1 plugin from the general BasicBlocksKit configuration. @sneridagh [#8056](https://github.com/plone/volto/issues/8056)

### Feature

- Added detection of title block in Plate's table of contents plugin. @arybakov05
  Scroll to headings and highlight them after clicking a Plate table of contents entry in the static view. @arybakov05 [#6722](https://github.com/plone/volto/issues/6722)
- Somersault editor support. @sneridagh [#7921](https://github.com/plone/volto/issues/7921)
- Refactored runtime migrations to match the somersault editor, reorganize server config files. Fixed tests. @sneridagh [#8021](https://github.com/plone/volto/issues/8021)
- Add an always shown placeholder for the title if empty. @sneridagh [#8057](https://github.com/plone/volto/issues/8057)
- Added runtime migration for default blockWidths. @sneridagh [#8071](https://github.com/plone/volto/issues/8071)
- Improve implementation of the block widths, not normalizing on render every time in the block-width plugin, but tapping on block creation. @sneridagh [#8099](https://github.com/plone/volto/issues/8099)
- Fixed discussion kit render placement aboveNodes->belowNodes. @sneridagh [#8101](https://github.com/plone/volto/issues/8101)
- Fixed linting. @sneridagh [#8106](https://github.com/plone/volto/issues/8106)
- Added remaining block inner containers. @sneridagh 

### Bugfix

- Fixed block inner container CSS for seven styling. @sneridagh [#8076](https://github.com/plone/volto/issues/8076)
- Fixed SOMERSAULT_KEY constant, it is centralized now. @sneridagh [#8078](https://github.com/plone/volto/issues/8078)

### Internal

- Removed `react-player` from Plate's editable video node to drop the `dash.js` build dependency and its noisy build warning output. @sneridagh 
- Updated packages configuration for vite 8. @pnicolli 

## 1.0.0-alpha.2 (2026-02-03)

### Breaking

- Removed Cypress support.
  Added Playwright support. Move all existing Cypress tests to Playwright. @sneridagh [#7827](https://github.com/plone/volto/issues/7827)

## 1.0.0-alpha.1 (2025-12-23)

### Feature

- Upgrade to last version.
  New LegacyLinkPlugin that supports the legacy link data structure used in slate block
  Pluggable config system (initial, temptative one)
  Rendering using PlateStatic means, so it uses Plate internals (which are pluggable)
  Drop all things old slate
  More "ordered" files layout
  Reusable PlateEditor and PlateView from the outside, so you can taylor your own editor and renderer (eg. outside text block use case.) @sneridagh [#7393](https://github.com/plone/volto/issues/7393)
- Added ESlint Tailwind plugin for prettifying and wrapping up the classNames in components.
  Amended components classNames by applying the plugin. @sneridagh [#7434](https://github.com/plone/volto/issues/7434)
- On the fly legacy slate to plate converters. @sneridagh [#7650](https://github.com/plone/volto/issues/7650)
- Split editor from Plate feature. @sneridagh [#7653](https://github.com/plone/volto/issues/7653)
- Rename plugin to CypressPlugin. Removed support for using registry based `useBlocksAPI`, using the embedded editor instead. Removed dependency on `@platejs/playwright`. Added Cypress Plate helpers and documentation. @sneridagh [#7668](https://github.com/plone/volto/issues/7668)

### Bugfix

- Cleaned up translations. @pnicolli [#7410](https://github.com/plone/volto/issues/7410)
- Missing `React` imports from last ESlint cleanup. @sneridagh [#7458](https://github.com/plone/volto/issues/7458)

### Internal

- Fixed unused vars linting rule. Fixed all code that violated this rule. @sneridagh [#7395](https://github.com/plone/volto/issues/7395)
- Linting for remaining TW classNames under callees due to missconfiguration. @sneridagh [#7467](https://github.com/plone/volto/issues/7467)
- Removed for now the DnD plugin. @sneridagh 
- Support for volto-plate and React 18 fixes. @sneridagh 

### Documentation

- Added documentation on the legacy slate on the fly converters. @sneridagh [#7650](https://github.com/plone/volto/issues/7650)

## 1.0.0-alpha.0 (2025-09-29)

### Feature

- Initial work on the package. Initial implementation of the Plate integration. @sneridagh [#7346](https://github.com/plone/volto/issues/7346)

### Internal

- Add `@testing-library/react` to the catalog. @sneridagh [#7372](https://github.com/plone/volto/issues/7372)

## 1.0.0 (unreleased)
