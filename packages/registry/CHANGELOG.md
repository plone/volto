# @plone/registry Release Notes

<!-- Do *NOT* add new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.docs.plone.org/contributing/index.html#contributing-change-log-label
-->

<!-- towncrier release notes start -->

## 1.5.2 (2024-03-05)

### Bugfix

- Fix issue with HMR and register the same predicate-less component again @sneridagh [#5832](https://github.com/plone/volto/issues/5832)

## 1.5.1 (2024-03-02)

### Bugfix

- Upgrade parcel @sneridagh [#5822](https://github.com/plone/volto/issues/5822)

## 1.5.0 (2024-03-01)

### Feature

- Upgrade Volto core to use React 18.2.0 @sneridagh [#3221](https://github.com/plone/volto/issues/3221)

## 1.4.0 (2024-03-01)

### Feature

- Support for slots @tiberiuichim @sneridagh [#5775](https://github.com/plone/volto/issues/5775)

## 1.3.1 (2024-02-20)

### Bugfix

- Export ConfigType @sneridagh [#5774](https://github.com/plone/volto/issues/5774)

## 1.3.0 (2024-02-18)

### Feature

- Add `VOLTOCONFIG` environment variable. @sneridagh [#5752](https://github.com/plone/volto/issues/5752)

## 1.2.2 (2024-02-02)

### Bugfix

- Remove `lodash` as a dependency @sneridagh [#5726](https://github.com/plone/volto/issues/5726)

## 1.2.1 (2024-01-17)

### Bugfix

- Fix order of preference in addons-registry for the theme definition (THEME, volto.config.js, package.json) @sneridagh [#5649](https://github.com/plone/volto/issues/5649)

## 1.2.0 (2024-01-02)

### Feature

- Support for cross-JS/TS aliases in the add-on registry aliases generator @sneridagh [#5532](https://github.com/plone/volto/issues/5532)

### Internal

- ESlint general improvements @sneridagh [#5548](https://github.com/plone/volto/issues/5548)

## 1.1.0 (2023-12-13)

### Internal

- Move and unify Types under @plone/types @sneridagh [#5493](https://github.com/plone/volto/issues/5493)

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
