# @plone/publicui Release Notes

<!-- Do *NOT* add new change log entries to this file.
     Instead create a file in the news directory.
     For helpful instructions, see:
     https://6.docs.plone.org/contributing/index.html#change-log-entry
-->

<!-- towncrier release notes start -->

## 1.0.0-alpha.0 (2025-09-29)

### Feature

- Added sitemap route. @ksuess [#6695](https://github.com/plone/volto/issues/6695)
- Moved public ui routes to a new add-on to allow for easier customization @pnicolli [#6896](https://github.com/plone/volto/issues/6896)
- Unified the `quanta` app into the `seven` app. @pnicolli [#6902](https://github.com/plone/volto/issues/6902)
- Prepare publicui layout route for react aria (link) components @ksuess [#7087](https://github.com/plone/volto/issues/7087)
- Separated publicui and cmsui styles. @pnicolli [#7225](https://github.com/plone/volto/issues/7225)
- Added Search Page route @SaraBianchi [#7349](https://github.com/plone/volto/issues/7349)

### Bugfix

- Fixed the load of the default layers ensuring they are on top, using a React 19 managed `<link>`. @sneridagh [#7365](https://github.com/plone/volto/issues/7365)

### Internal

- Added vitest config to not fail if no test is present. @sneridagh [#6916](https://github.com/plone/volto/issues/6916)
- Rename `@plone/slots` to `@plone/layout`. @sneridagh [#7119](https://github.com/plone/volto/issues/7119)
- Update to latest versions. @sneridagh [#7298](https://github.com/plone/volto/issues/7298)
- Add `@testing-library/react` to the catalog. @sneridagh [#7372](https://github.com/plone/volto/issues/7372)
- Adjust peer dependencies and engine. @sneridagh

## 1.0.0 (unreleased)
