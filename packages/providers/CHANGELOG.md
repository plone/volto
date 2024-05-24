# @plone/providers Release Notes

<!-- Do *NOT* add new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.docs.plone.org/contributing/index.html#contributing-change-log-label
-->

<!-- towncrier release notes start -->

## 1.0.0-alpha.1 (2024-05-23)

### Internal

- Cleanup imports in RouterLocation provider @pnicolli [#6029](https://github.com/plone/volto/issues/6029)

## 1.0.0-alpha.0 (2024-05-13)

### Feature

- Initial implementation @sneridagh [#5887](https://github.com/plone/volto/issues/5887)

### Internal

- Improvements to the monorepo setup with utilities, especially ESLint. Build cached option to speedup operations. @sneridagh [#5969](https://github.com/plone/volto/issues/5969)
- Saner defaults for building deps, switch default to cached, add `build:force` command @sneridagh [#5980](https://github.com/plone/volto/issues/5980)
