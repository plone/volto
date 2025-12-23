# @plone/providers Release Notes

<!-- Do *NOT* add new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.docs.plone.org/contributing/index.html#contributing-change-log-label
-->

<!-- towncrier release notes start -->

## 2.0.0-alpha.2 (2025-12-23)

### Internal

- Fixed unused vars linting rule. Fixed all code that violated this rule. @sneridagh [#7395](https://github.com/plone/volto/issues/7395)

## 2.0.0-alpha.1 (2025-09-29)

### Internal

- Moved auth helpers to the react-router package. @pnicolli [#7134](https://github.com/plone/volto/issues/7134)
- Update to latest versions. @sneridagh [#7298](https://github.com/plone/volto/issues/7298)

## 2.0.0-alpha.0 (2025-05-24)

### Feature

- Support for prefix routes in `getAddonRoutesConfig`. @sneridagh [#6796](https://github.com/plone/volto/issues/6796)
- Added console warning when cookie secret is not set in production mode. @pnicolli [#6972](https://github.com/plone/volto/issues/6972)

### Bugfix

- Fixed routes generation @pnicolli [#6907](https://github.com/plone/volto/issues/6907)
- Fixed route generation. @pnicolli [#6908](https://github.com/plone/volto/issues/6908)

### Internal

- Use ESlint 9, fix code. @sneridagh [#6775](https://github.com/plone/volto/issues/6775)
- Update react-router version to match the catalog one. @sneridagh [#6777](https://github.com/plone/volto/issues/6777)

## 1.0.1 (2025-02-08)

### Internal

- Update internal `peerDependencies` to include React 19.
  Update TS version. @sneridagh [#6641](https://github.com/plone/volto/issues/6641)

## 1.0.0 (2025-01-24)

### Bugfix

- Initial implementation.
  Added `getAddonRoutesConfig` for configuring routes in add-ons. @sneridagh [#6599](https://github.com/plone/volto/issues/6599)

## 1.0.0-alpha.6 (2024-11-21)

### Feature

- Update RAC to 1.5.0 @sneridagh [#6498](https://github.com/plone/volto/issues/6498)

## 1.0.0-alpha.5 (2024-11-05)

### Internal

- Improve packaging. @sneridagh 

## 1.0.0-alpha.4 (2024-11-05)

### Internal

- Bump local `typescript` version. @sneridagh [#6461](https://github.com/plone/volto/issues/6461)
- Replace `parcel` with `tsup`. Better types, better tsconfig. Move to ESM. @sneridagh [#6468](https://github.com/plone/volto/issues/6468)

## 1.0.0-alpha.3 (2024-10-18)

## 1.0.0-alpha.2 (2024-10-18)

### Breaking

- Improve and group providers. @sneridagh
  Breaking:
    - The interface of the providers has changed. Please check the new one, and adapt your apps accordingly. [#6069](https://github.com/plone/volto/issues/6069)

### Internal

- Update typescript and vitest everywhere @sneridagh [#6407](https://github.com/plone/volto/issues/6407)

## 1.0.0-alpha.1 (2024-05-23)

### Internal

- Cleanup imports in RouterLocation provider @pnicolli [#6029](https://github.com/plone/volto/issues/6029)

## 1.0.0-alpha.0 (2024-05-13)

### Feature

- Initial implementation @sneridagh [#5887](https://github.com/plone/volto/issues/5887)

### Internal

- Improvements to the monorepo setup with utilities, especially ESLint. Build cached option to speedup operations. @sneridagh [#5969](https://github.com/plone/volto/issues/5969)
- Saner defaults for building deps, switch default to cached, add `build:force` command @sneridagh [#5980](https://github.com/plone/volto/issues/5980)
