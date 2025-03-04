# @plone/client Release Notes

<!-- You should *NOT* be adding new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.docs.plone.org/volto/developer-guidelines/contributing.html#create-a-pull-request
-->

<!-- towncrier release notes start -->

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
