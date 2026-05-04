# @plone/razzle Release Notes

<!-- Do *NOT* add new change log entries to this file.
     Instead create a file in the news directory.
     For helpful instructions, see:
     https://6.docs.plone.org/contributing/index.html#change-log-entry
-->

<!-- towncrier release notes start -->

## 1.0.0-alpha.5 (2026-05-04)

### Internal

- Replace dependency `inquirer` with `@inquirer/confirm` to prompt for build
  confirmation. @davisagli 

### Documentation

- Added package-specific `AGENTS.md` contributor guidance for `@plone/razzle` maintainers. 

## 1.0.0-alpha.4 (2026-04-27)

### Internal

- Update dependencies: `html-webpack-plugin` 5.6.7,
  `mini-css-extract-plugin` 2.10.2, `css-minimizer-webpack-plugin` 8.0.0,
  `terser-webpack-plugin` 5.4.0. @davisagli 
- Update dependencies: `postcss` 8.5.10, `postcss-load-config` 6.0.1,
  `postcss-scss` 8.2.1. @davisagli 

## 1.0.0-alpha.3 (2026-04-09)

### Breaking

- Update to webpack-dev-server 5. Drop support for webpack 4 and webpack-dev-server 4. @davisagli 

### Internal

- Update devDependency: release-it 19.2.4. @davisagli 

## 1.0.0-alpha.2 (2026-03-31)

### Breaking

- Fork `razzle-dev-utils` into `@plone/razzle-dev-utils`. @wesleybl [#7973](https://github.com/plone/volto/issues/7973)

### Internal

- Update copy-webpack-plugin to v14.0.0. @wesleybl [#7969](https://github.com/plone/volto/issues/7969)
- Update dependencies: file-loader 6.2.0, url-loader 4.1.1, webpack-manifest-plugin 4.1.1. @davisagli 
- Update dependency: react-dev-utils 12.0.1. @davisagli 
- Update devDependency: jsdom 28.1.0. @davisagli 

## 1.0.0-alpha.1 (2026-03-02)

### Internal

- Update css-minimizer-webpack-plugin to v7. @wesleybl [#7934](https://github.com/plone/volto/issues/7934)
