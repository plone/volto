# @plone/client Release Notes

<!-- You should *NOT* be adding new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.docs.plone.org/volto/developer-guidelines/contributing.html#create-a-pull-request
-->

<!-- towncrier release notes start -->

## 1.0.0-alpha.17 (2024-09-13)

### Documentation

- Add documentation about optional `token` parameter for `ploneClient` initialization. @MAX-786 [#6076](https://github.com/plone/volto/pull/6076)

## 1.0.0-alpha.16 (2024-06-06)

### Bugfix

- Fixed querystring search query type @pnicolli [#6034](https://github.com/plone/volto/pull/6034)
- Fixed login mutation @sneridagh [#6053](https://github.com/plone/volto/pull/6053)

### Internal

- Remove custom test runner, using `vitest` config instead @sneridagh [#6056](https://github.com/plone/volto/pull/6056)

## 1.0.0-alpha.15 (2024-05-23)

### Breaking

- Provider has been moved to `@plone/providers` @sneridagh [#5887](https://github.com/plone/volto/pull/5887)

### Bugfix

- Update `vite` to 5.1.5. @davisagli [#5942](https://github.com/plone/volto/pull/5942)
- Fixed path search bug @pnicolli [#6029](https://github.com/plone/volto/pull/6029)

### Internal

- Sync TypeScript version @sneridagh [#5912](https://github.com/plone/volto/pull/5912)
- Improvements to the monorepo setup with utilities, especially ESLint. Build cached option to speedup operations. @sneridagh [#5969](https://github.com/plone/volto/pull/5969)
- Saner defaults for building deps, switch default to cached, add `build:force` command @sneridagh [#5980](https://github.com/plone/volto/pull/5980)
- Un-pin `@tanstack/react-query` dependency @sneridagh [#6045](https://github.com/plone/volto/pull/6045)

## 1.0.0-alpha.14 (2024-03-05)

### Internal

- Upgrade TSQ to latest @sneridagh [#5824](https://github.com/plone/volto/pull/5824)

## 1.0.0-alpha.13 (2024-03-02)

### Internal

- Update dependencies @sneridagh [#5815](https://github.com/plone/volto/pull/5815)

### Documentation

- Reorganize `README.md`, merging content into authoritative locations. Add `awesome_bot` to check links in all READMEs. @stevepiercy [#5437](https://github.com/plone/volto/pull/5437)

## 1.0.0-alpha.12 (2024-01-02)

### Internal

- Re-release alpha.11 as alpha.12 with fixed deps @sneridagh [#0](https://github.com/plone/volto/pull/0)

## 1.0.0-alpha.11 (2024-01-02)

### Internal

- Transfer @plone/client into the Volto monorepo @sneridagh [#5490](https://github.com/plone/volto/pull/5490)
- Move and unify Types under @plone/types @sneridagh [#5493](https://github.com/plone/volto/pull/5493)
- ESlint general improvements @sneridagh [#5548](https://github.com/plone/volto/pull/5548)

## 1.0.0-alpha.10 (2023-10-28)

### Bugfix

- Better interfaces for content expanders @sneridagh [#46](https://github.com/plone/plone.restapi-client/pull/46)

## 1.0.0-alpha.9 (2023-10-24)

### Bugfix

- Fix React `@types` dependencies @sneridagh [#45](https://github.com/plone/plone.restapi-client/pull/45)


## 1.0.0-alpha.8 (2023-10-23)

### Feature

- Add error handling and debug to APIRequest. Enhance expanders type. @sneridagh [#44](https://github.com/plone/plone.restapi-client/pull/44)


## 1.0.0-alpha.7 (2023-10-14)

### Feature

- Added React Provider and related hook. Fix build. @sneridagh [#43](https://github.com/plone/plone.restapi-client/pull/43)


## 1.0.0-alpha.6 (2023-08-31)

### Bugfix

- Fix library extensions, remove custom lib name @sneridagh [#41](https://github.com/plone/plone.restapi-client/pull/41)


## 1.0.0-alpha.5 (2023-08-30)

### Bugfix

- Fix build, add new externals, fix imports in index.ts @sneridagh [#40](https://github.com/plone/plone.restapi-client/pull/40)


## 1.0.0-alpha.4 (2023-08-29)

### Feature

- Add more services to restapi, namely addons and database along with their tests and associated types @hemant-hc [#21](https://github.com/plone/plone.restapi-client/pull/21)
- Add more services to restapi, namely groups, history and users along with their tests and associated types @hemant-hc [#25](https://github.com/plone/plone.restapi-client/pull/25)
- Add more services to restapi, namely navroot, querystring, types, vocabularies and workflow along with their tests and associated types @hemant-hc [#27](https://github.com/plone/plone.restapi-client/pull/27)
- Add more services to restapi, namely lock, registry and site along with their tests and associated types @hemant-hc [#28](https://github.com/plone/plone.restapi-client/pull/28)
- Add more services to restapi, namely workingcopy, principals and copymove along with their tests and associated types @hemant-hc [#29](https://github.com/plone/plone.restapi-client/pull/29)
- Add more services to restapi, namely linkintegrity, roles, system, transactions, upgrade and userschema along with their tests and associated types @hemant-hc [#30](https://github.com/plone/plone.restapi-client/pull/30)
- Add more services to restapi, namely controlpanel, querysources, sources, querystring-search, search, roles and relations along with their tests and associated types @hemant-hc [#31](https://github.com/plone/plone.restapi-client/pull/31)
- Add more services to restapi, namely comments, email notification, email send and translations along with their tests and associated types @hemant-hc [#32](https://github.com/plone/plone.restapi-client/pull/32)
- Add custom hooks for all the actions @hemant-hc [#33](https://github.com/plone/plone.restapi-client/pull/33)
- Add documentation for all the actions and misc functions @hemant-hc [#34](https://github.com/plone/plone.restapi-client/pull/34)
- Add custom hooks for login and revertHistoryMutation actions @hemant-hc [#35](https://github.com/plone/plone.restapi-client/pull/35)
- Add documentation for future improvements in @plone/client @hemant-hc [#38](https://github.com/plone/plone.restapi-client/pull/38)

### Bugfix

- Fixed naming convetions for actions and minor formatting changes @hemant-hc [#26](https://github.com/plone/plone.restapi-client/pull/26)
- Remove duplicate lines of code @hemant-hc [#36](https://github.com/plone/plone.restapi-client/pull/36)

### Documentation

- Amend documentation - Add deployment to RTD @sneridagh [#39](https://github.com/plone/plone.restapi-client/pull/39)


## 1.0.0-alpha.3 (2023-07-24)

### Feature

- Expanders support in getContent requests @sneridagh [#23](https://github.com/plone/plone.restapi-client/pull/23)


## 1.0.0-alpha.2 (2023-07-23)

### Feature

- Add more services to restapi, namely breadcrumbs, navigation and contextnavigation @hemant-hc [#15](https://github.com/plone/plone.restapi-client/pull/15)
- Add actions for actions and aliases services [#16](https://github.com/plone/plone.restapi-client/pull/16)

### Internal

- Refactoring plone client to use axios replacing superagent @hemant-hc [#22](https://github.com/plone/plone.restapi-client/pull/22)


## 1.0.0-alpha.1 (2023-07-13)

### Bugfix

- Expose ploneClient in index @sneridagh [#17](https://github.com/plone/plone.restapi-client/pull/17)


## 1.0.0-alpha.0 (2023-07-12)

### Feature

- Refactor some parts, folder reorder, content CRUD API @hemant-hc [#13](https://github.com/plone/plone.restapi-client/pull/13)
- Improve content CRUD Types @hemant-hc [#14](https://github.com/plone/plone.restapi-client/pull/14)
