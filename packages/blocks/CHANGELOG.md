# @plone/blocks Release Notes

<!-- You should *NOT* be adding new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.docs.plone.org/volto/contributing/index.html
-->

<!-- towncrier release notes start -->

## 1.0.0-alpha.5 (2025-09-29)

### Breaking

- Remove circular dependency on layout<->blocks.
  Breaking: The `RenderBlocks` set of components are now under `@plone/layout/blocks`.
  Adjust the imports accordingly. @sneridagh [#7372](https://github.com/plone/volto/pull/7372)

### Feature

- Implement the BMv3 changes from the blocks edit PR. @sneridagh [#6393](https://github.com/plone/volto/pull/6393)
- Add Image component and use it in Teaser block. @avoinea [#6689](https://github.com/plone/volto/pull/6689)
- Improve unified `BlockWrapper`, block model v3 compatible. @danalvrz @sneridagh [#7228](https://github.com/plone/volto/pull/7228)
- Order blocks config into the accepted "best practice" for it. @sneridagh [#7346](https://github.com/plone/volto/pull/7346)

### Internal

- Adapt import to the rearrangement of the @plone/components package structure. @sneridagh [#7185](https://github.com/plone/volto/pull/7185)
- Update to latest versions. @sneridagh [#7298](https://github.com/plone/volto/pull/7298)
- Adjust peer dependencies and engine. @sneridagh

## 1.0.0-alpha.4 (2025-05-24)

### Feature

- Make Slate text block links RAC links with '@plone/components/tailwind' @ksuess [#7087](https://github.com/plone/volto/pull/7087)

### Bugfix

- Fix image block so it goes through the ++api++ routing. @sneridagh [#6773](https://github.com/plone/volto/pull/6773)
- Fix image URL generation. @sneridagh [#6865](https://github.com/plone/volto/pull/6865)
- Adapt the images and teaser URL to the new images middleware. @sneridagh [#6908](https://github.com/plone/volto/pull/6908)

### Internal

- Use ESlint 9, fix code. @sneridagh [#6775](https://github.com/plone/volto/pull/6775)
- Added vitest config to not fail if no test is present. @sneridagh [#6916](https://github.com/plone/volto/pull/6916)

## 1.0.0-alpha.3 (2025-02-08)

### Internal

- Update internal `peerDependencies` to include React 19.
  Update TS version. @sneridagh [#6641](https://github.com/plone/volto/pull/6641)
- Update internal `peerDependencies` to include React 19, now for real. @sneridagh [#6728](https://github.com/plone/volto/pull/6728)

## 1.0.0-alpha.2 (2025-01-24)

### Feature

- Added more blocks. @sneridagh [#6409](https://github.com/plone/volto/pull/6409)

### Bugfix

- Fixed several typing errors and a map without key. @sneridagh [#6599](https://github.com/plone/volto/pull/6599)

### Internal

- Centralize `tsconfig`. @sneridagh [#6536](https://github.com/plone/volto/pull/6536)

## 1.0.0-alpha.1 (2024-07-26)

### Internal

- Initial release @sneridagh [#0](https://github.com/plone/volto/pull/0)
