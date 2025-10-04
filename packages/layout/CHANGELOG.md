# @plone/layout Release Notes

<!-- Do *NOT* add new change log entries to this file.
     Instead create a file in the news directory.
     For helpful instructions, see:
     https://6.docs.plone.org/contributing/index.html#change-log-entry
-->

<!-- towncrier release notes start -->

## 1.0.0-alpha.3 (2025-09-29)

### Feature

- Add Image component and use it in Teaser block. @avoinea [#6689](https://github.com/plone/volto/issues/6689)
- Added sitemap route. @ksuess [#6695](https://github.com/plone/volto/issues/6695)
- Added Breadcrumbs slot. @sneridagh [#7196](https://github.com/plone/volto/issues/7196)
- Separated publicui and cmsui styles. @pnicolli [#7225](https://github.com/plone/volto/issues/7225)
- Move `Pluggables` implementation to `@plone/layout` package. @sneridagh [#7228](https://github.com/plone/volto/issues/7228)
- Added Toast manager. @giuliaghisini [#7333](https://github.com/plone/volto/issues/7333)
- Improved `Tools` "edit" action implementation to support relative paths. @sneridagh [#7346](https://github.com/plone/volto/issues/7346)
- Added language switcher in Seven. @nileshgulia1 [#7352](https://github.com/plone/volto/issues/7352)

### Internal

- Rename `@plone/slots` to `@plone/layout`. @sneridagh [#7119](https://github.com/plone/volto/issues/7119)
- Adapt import to the rearrangement of the @plone/components package structure. @sneridagh [#7185](https://github.com/plone/volto/issues/7185)
- Unified CSS from main build in Storybook. @sneridagh [#7220](https://github.com/plone/volto/issues/7220)
- Update to latest versions. @sneridagh [#7298](https://github.com/plone/volto/issues/7298)
- Fix URL in README. @stevepiercy [#7360](https://github.com/plone/volto/issues/7360)
- Upgrade to Storybook 9. @sneridagh [#7371](https://github.com/plone/volto/issues/7371)
- Remove circular dependency on layout<->blocks. @sneridagh [#7372](https://github.com/plone/volto/issues/7372)
- Adjust peer dependencies and engine. @sneridagh

## 1.0.0-alpha.2 (2025-05-24)

### Feature

- 'Improved `Container` Tailwind component, added `width` variant. @sneridagh [#6927](https://github.com/plone/volto/issues/6927)
- Temporal convenience links in tools. @sneridagh [#7040](https://github.com/plone/volto/issues/7040)
- Make login/logout/edit convenince links RAC links with '@plone/components/tailwind' @ksuess [#7087](https://github.com/plone/volto/issues/7087)

### Internal

- Use ESlint 9, fix code. @sneridagh [#6775](https://github.com/plone/volto/issues/6775)
- Use `Container` Tailwind component in Header. @sneridagh [#6899](https://github.com/plone/volto/issues/6899)
- Added vitest config to not fail if no test is present. @sneridagh [#6916](https://github.com/plone/volto/issues/6916)

### Documentation

- Update Storybook. @sneridagh [#6940](https://github.com/plone/volto/issues/6940)

## 1.0.0-alpha.1 (2025-02-08)

### Breaking

- Move the styles to `./styles/main.css`. @sneridagh [#6636](https://github.com/plone/volto/issues/6636)

### Internal

- Update Storybook version. @sneridagh [#6640](https://github.com/plone/volto/issues/6640)
- Update internal `peerDependencies` to include React 19.
  Update TS version. @sneridagh [#6641](https://github.com/plone/volto/issues/6641)

## 1.0.0-alpha.0 (2025-01-24)

### Bugfix

- Unify the ESlint config. @sneridagh [#6599](https://github.com/plone/volto/issues/6599)

### Internal

- Initial commit, first steps. @sneridagh [#6409](https://github.com/plone/volto/issues/6409)
- Centralize `tsconfig`. @sneridagh [#6536](https://github.com/plone/volto/issues/6536)

## 1.0.0 (unreleased)
