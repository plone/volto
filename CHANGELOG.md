# Change Log

## 0.7.0 (unreleased)

### Added

* Add Pastanaga Icon System @sneridagh
* Support for nested schemas @robgietema
* New block on return in editor @robgietema
* Added 404 page on page not found @robgietema
* Custom tiles support @sneridagh
* Add full register/password reset views @sneridagh
* Make the list block types configurable @robgietema
* Add helper `BodyClass` for appending classes to the `body` tag from View components @sneridagh

### Changes

* Pastanaga Editor look and feel improvements and polishment @sneridagh @albertcasado
* Refactor configuration of routes, views and widgets for extensibility @sneridagh @davilima6
* Fix view name class in body element @sneridagh @davilima6
* Refactor actions @robgietema
* Store text tile data in json @robgietema
* Fixed tile add menu @robgietema
* Change to use root import on all config calls @sneridagh
* Fix CSS on tile image view @sneridagh
* Fix broken CSS on alignments left/right @sneridagh
* Tile DE literals translations @sneridagh
* Pass location as prop to child views in main View component in case we require it in some views @sneridagh

## 0.6.0 (2018-07-14)

### Added

* Schema widget @robgietema
* User actions and reducers @robgietema
* Group actions and reducers @robgietema
* Roles actions and reducers @robgietema
* Move combineReducers to the store creation level. This will ease the extensibility of them in Plone-React apps. @sneridagh
* Upgrade node to 8.11.2 @sneridagh
* Basic user listing in users controlpanel @robgietema
* Add missing FileWidget import @sneridagh
* Option to delete tiles @robgietema
* Option to add tiles @robgietema
* Image tiles in editor @robgietema
* Align images in editor @robgietema
* Video tiles in editor @robgietema
* Video tiles in editor @robgietema
* Sitemap.xml.gz view @robgietema
* Upload image indicator @robgietema
* Video tile view @robgietema
* Option to reset image @robgietema
* Drag and drop to reorder tiles @robgietema
* Enhanced DraftJS AnchorLink Plugin @robgietema @sneridagh
* Added the configuration required in Webpack config to load CSS modules in the project, required by DraftJS AnchorLink plugin @sneridagh

### Changes

* Styled wysiwyg widget @robgietema
* Switch from accordion to tabs in forms @robgietema
* Upgrade to Node 8.11.1 @tisto
* Replace ExtractionTextCSSPlugin with the new mini-css-extract-plugin, adapt universal-webpack config @sneridagh
* Removed flow @robgietema
* Fix eslint prettier config @robgietema
* Refactor actions and reducers to match restapi docs naming @robgietema
* Fix site root api calls @robgietema
* Change visual editor to use the new tiles api @robgietema
* Fix bug with wrong order input @robgietema
* Fix several problems in the DraftJS AnchorLink plugin @sneridagh
* Replace DraftJS Toolbar plugin H1/H2 buttons for H2/H3 ones @sneridagh
* Sync i18n translations @sneridagh
* Fix CSS .input class scope intrusion on the project introduced by the AnchorLink plugin fork @sneridagh
* Improve search reducer by adding the batching property in the search store.
* Upgrade to Node 8.11.3 @sneridagh

## 0.5.0 (2018-03-23)

### Added

* Pastanaga theme package @jaroel, @robgietema
* Registry based controlpanels @robgietema
* Component documentation @robgietema
* Component documentation examples @VaysseB
* Folder listing view @cekk
* Prettier docs for SCA @nileshgulia1
* Comments, email notification and vocabularies reducers @robgietema
* Pastanaga theme @robgietema
* Pastanaga manage views @robgietema
* Pastanaga theme views @robgietema
* Callout styling to draftjs @robgietema
* Image, file and news item view @robgietema
* Social sharing @robgietema
* Commenting @robgietema
* Tags @robgietema
* Renew login token when almost expired @robgietema
* Cctions reducers @robgietema
* Error reporting with Sentry support on client (default ErrorBoundary), server and Redux middleware @sneridagh
* Tiles reducers @robgietema
* Context aware toolbar @robgietema
* Hamburger menu navigation on mobile @sneridagh
* Editor prototype @robgietema
* Support for null values when reseting a field value @sneridagh

### Changes

* Update plone api versions / bootstrap process @thet
* Fix textwidget proptypes @cekk
* Remove phantomjs @tulikavijay
* Upgrade to node 8 @robgietema
* Switched to draft js plugins editor @robgietema
* Fix paragraph styling in draftjs @robgietema
* Fixed summary and tabular views @robgietema
* Upgrade to React 16 @sneridagh
* Upgrade to Webpack 4 @sneridagh
* Review chunks policy. Keep it in sync with Webpack 4 policy with entrypoint bundles @sneridagh
* Merged block styling to inline toolbar @robgietema
* Actions aware toolbar @sneridagh
* Fix permissions on the toolbar display menu @sneridagh

## 0.4.0 (2017-05-03)

### Added

* Adding tiles @robgietema
* Handle different tiles @robgietema
* Resizing of tiles @robgietema
* Deletion of tiles @robgietema
* Drag and drop of tiles @robgietema
* Basic mosaic grid rendering @robgietema
* Form validation @robgietema
* Notification messages @robgietema

### Changes

* Updated to new history api @robgietema
* Deselect on click outside grid @robgietema

## 0.3.0 (2017-04-29)

### Added

* Personal information @robgietema
* Change password @robgietema
* Password widget @robgietema
* I18n support and translations @robgietema
* Personal preferences @robgietema
* Rename action @robgietema

### Changed

* Fixed favicon @robgietema

## 0.2.0 (2017-04-27)

### Added

* Batch state in folder contents @robgietema
* Batch properties in folder contents @robgietema
* Batch tags in folder contents @robgietema
* Batch rename in folder contents @robgietema
* Diff view @robgietema
* Add revert to version @robgietema
* Create view revision page @robgietema
* Create history list view @robgietema
* Sorting of items in folder contents @robgietema
* Upload files in folder contents @robgietema
* Ordering of columns in folder contents @robgietema
* Ordering of items in folder contents @robgietema
* Pagination in folder contents @robgietema
* Delete in folder contents @robgietema

### Changed

* Only show add and contents in the toolbar when folderish @robgietema
* Diff on words not chars @robgietema

## 0.1.0 (2017-04-20)

### Added

* Folder contents @robgietema
* Sharing menu and view @robgietema
* Display menu @robgietema
* Semantic UI integration @robgietema
* Basic Mosaic setup @robgietema
* Basic Server Side Rendering @robgietema
* Search view @robgietema
* Actions menu @robgietema
* Workflow menu @robgietema
* Add menu @robgietema
* Add and edit forms including widgets @robgietema
* Basic components (navigation, toolbar, breadcrumbs etc) @robgietema
* Authentication including login / logout @robgietema
* Setup build environment @robgietema
