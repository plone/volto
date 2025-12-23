# @plone/editor Release Notes

<!-- Do *NOT* add new change log entries to this file.
     Instead create a file in the news directory.
     For helpful instructions, see:
     https://6.docs.plone.org/contributing/index.html#change-log-entry
-->

<!-- towncrier release notes start -->

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
