# @plone/registry Release Notes

<!-- Do *NOT* add new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.docs.plone.org/contributing/index.html#contributing-change-log-label
-->

<!-- towncrier release notes start -->

## 1.8.0 (2024-07-30)

### Feature

- Added `Utilities` registry for `registerUtility`, `getUtility`, and `getUtilities`. @sneridagh [#6161](https://github.com/plone/volto/issues/6161)

### Documentation

- Changed a few typos within documentation, README's and comments. @FritzHoing [#6109](https://github.com/plone/volto/issues/6109)

## 1.7.0 (2024-06-26)

### Feature

- Improve shadowing by including the support for js->jsx extensions in old shadows. This allow support for upcoming renaming of files that should be jsx and are js. @sneridagh [#6113](https://github.com/plone/volto/issues/6113)

## 1.6.0 (2024-06-13)

### Feature

- Add support for reading the add-ons `tsconfig.json` paths and add them to the build resolve aliases @sneridagh [#6096](https://github.com/plone/volto/issues/6096)

## 1.5.7 (2024-05-15)

### Bugfix

- Fix type for component registry components @sneridagh [#6002](https://github.com/plone/volto/issues/6002)

### Internal

- Saner defaults for building deps, switch default to cached, add `build:force` command @sneridagh [#5980](https://github.com/plone/volto/issues/5980)

## 1.5.6 (2024-04-23)

### Bugfix

- Remove `parcel-optimizer-react-client` plugin @sneridagh [#5887](https://github.com/plone/volto/issues/5887)

### Internal

- Improvements to the monorepo setup with utilities, especially ESLint. Build cached option to speedup operations. @sneridagh [#5969](https://github.com/plone/volto/issues/5969)

## 1.5.5 (2024-04-03)

### Bugfix

- Fix registry wrong default primitive type @sneridagh [#5925](https://github.com/plone/volto/issues/5925)

### Internal

- Sync TypeScript version @sneridagh [#5912](https://github.com/plone/volto/issues/5912)

## 1.5.4 (2024-03-21)

### Bugfix

- - Fix slots reordering function for "before" and "after" keyword @steffenri [#5840](https://github.com/plone/volto/issues/5840)

## 1.5.3 (2024-03-19)

### Bugfix

- Cross-package manager Volto path resolver in `webpack-relative-resolver` @sneridagh [#5893](https://github.com/plone/volto/issues/5893)

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
