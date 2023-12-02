# @plone/registry Release Notes

<!-- Do *NOT* add new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.docs.plone.org/contributing/index.html#contributing-change-log-label
-->

<!-- towncrier release notes start -->

## 1.0.1 (2023-12-02)

### Bugfix

- Initialize only the development addons present in `compilerOptions.paths` filtered by the add-ons registered @sneridagh [#5463](https://github.com/plone/volto/issues/5463)

### Internal

- Cleaned up Registry and renamed `packagesFolderAddons` to `coreAddons`. @sneridagh [#5456](https://github.com/plone/volto/issues/5456)
- Moved @plone/types to `devDependencies` @sneridagh [#5485](https://github.com/plone/volto/issues/5485)

## 1.0.0 (2023-11-05)

### Feature

- Moved add-on registry to its own package. @sneridagh
  Initial Release @sneridagh [#4949](https://github.com/plone/volto/issues/4949)
