# Change Log

## 1.3.1 (unreleased)

### Added

### Changes

- Fix the floating image problem in the Volto Editor @sneridagh

## 1.3.0 (2019-02-13)

### Added

 - Improve the definitions of the view/edit tiles components for better
   extensibility. This might be a BREAKING change if you have already used the
   old way to extend/add more tiles, please update to the new one @sneridagh

### Changes

 - Fix Travis unit testing false green @sneridagh
 - Fix bad Proptype for location in ScrollToTop component @sneridagh

## 1.2.1 (2019-02-04)

### Changes

 - Bring back the scroll to top on every route change feature @sneridagh
 - Loosen node version, allow LTS (v8 and v10) @sneridagh

## 1.2.0 (2019-01-22)

### Added

- be able to specify custom headers in actions @vangheem
- fix icons used in contents @vangheem
- be able to work with mr.developer @vangheem
- add alias `@plone/volto-original` and `@package` webpack aliases @vangheem
- add `errorViews` configuration @vangheem

### Changes

- Upgrade to Node 10.14.2 @nileshgulia1

## 1.1.0 (2018-12-24)

### Changes

- Fix edit on root @robgietema
- Fix sharing @robgietema
- Fix error on token renew @robgietema
- Fix layout fieldname @bloodbare
- First field in a form will get the focus @robgietema
- Fix download file links @mikejmets
- Fix HMR missbehaving on both server and client @sneridagh
- Upgrade to Node 8.14.0 @timo
- Relaxed node runtime constraints @sneridagh
- Update to latest LESS and Semantic UI version @sneridagh

## Added

- Add .gitattributes file to avoid most Changelog merge conflicts @pnicolli
- Buildout for Python 3 @pbauer
- Websockets support @robgietema
- Subrequests to search and get content actions @robgietema
- Add logos @sneridagh @albertcasado

## 1.0.0 (2018-10-31)

### Added

- Training documentation link @robgietema

## 0.9.5 (2018-10-24)

### Changes

- Fix API*PATH variable using RAZZLE* prefix instead @sneridagh
- Fix FUOC (flash of unstyled content) in production mode @sneridagh
- Fix missing buttons on RichText tiles @sneridagh
- Fix original external `overrides.css` position in the cascade was applied in
  the wrong order in site.overrides in Pastanaga theme @sneridagh
- Fatten widget config @robgietema

## 0.9.4 (2018-10-10)

### Changes

- Fix tags layout @robgietema @jaroel
- Fix imports of views, widgets and tiles @robgietema @jaroel

## 0.9.3 (2018-10-10)

### Changes

- Fix logo import path @robgietema @jaroel

## 0.9.2 (2018-10-10)

### Added

- Automatic customization imports for images @robgietema @jaroel

## 0.9.1 (2018-10-10)

### Added

- Automatic customization imports @robgietema @jaroel

## 0.9.0 (2018-10-04)

### Changes

- Renamed package to Volto @robgietema

## 0.8.3 (2018-10-03)

### Changes

- Fix i18n script for dependency @robgietema

## 0.8.2 (2018-10-03)

### Changes

- Move all dev dependencies to dependencies @robgietema

## 0.8.1 (2018-10-03)

### Changes

- Fix compiling when used as a library @robgietema
- Fix buildout security issue @robgietema

## 0.8.0 (2018-10-03)

### Added

- Move the webpack config to Razzle @sneridagh @robgietema
- Upgrade React to 16.5 @tisto
- Upgrade React to 16.4.2 to fix a server-side vulnerability @tisto
- Support for base url @bloodbare

### Changes

- Merged Guillotina and Plone robot tests @bloodbare
- Don't reset total and batching on pending search @robgietema

## 0.7.0 (2018-07-31)

### Added

- Add Pastanaga Icon System @sneridagh
- Support for nested schemas @robgietema
- New block on return in editor @robgietema
- Added 404 page on page not found @robgietema
- Custom tiles support @sneridagh
- Add full register/password reset views @sneridagh
- Make the list block types configurable @robgietema
- Add all missing German translations @tisto
- Add helper `BodyClass` for appending classes to the `body` tag from View components @sneridagh
- Add Tiles support for Guillotina CMS @bloodbare @sneridagh @robgietema

### Changes

- Pastanaga Editor look and feel improvements and polishment @sneridagh @albertcasado
- Refactor configuration of routes, views and widgets for extensibility @sneridagh @davilima6
- Fix view name class in body element @sneridagh @davilima6
- Refactor actions @robgietema
- Store text tile data in json @robgietema
- Fixed tile add menu @robgietema
- Change to use root import on all config calls @sneridagh
- Fix CSS on tile image view @sneridagh
- Fix broken CSS on alignments left/right @sneridagh
- Tile DE literals translations @sneridagh
- Pass location as prop to child views in main View component in case we require it in some views @sneridagh
- Fix computed displayName from add-display-name Babel plugin for connected components @sneridagh

## 0.6.0 (2018-07-14)

### Added

- Schema widget @robgietema
- User actions and reducers @robgietema
- Group actions and reducers @robgietema
- Roles actions and reducers @robgietema
- Move combineReducers to the store creation level. This will ease the extensibility of them in Plone-React apps. @sneridagh
- Upgrade node to 8.11.2 @sneridagh
- Basic user listing in users controlpanel @robgietema
- Add missing FileWidget import @sneridagh
- Option to delete tiles @robgietema
- Option to add tiles @robgietema
- Image tiles in editor @robgietema
- Align images in editor @robgietema
- Video tiles in editor @robgietema
- Video tiles in editor @robgietema
- Sitemap.xml.gz view @robgietema
- Upload image indicator @robgietema
- Video tile view @robgietema
- Option to reset image @robgietema
- Drag and drop to reorder tiles @robgietema
- Enhanced DraftJS AnchorLink Plugin @robgietema @sneridagh
- Added the configuration required in Webpack config to load CSS modules in the project, required by DraftJS AnchorLink plugin @sneridagh

### Changes

- Styled wysiwyg widget @robgietema
- Switch from accordion to tabs in forms @robgietema
- Upgrade to Node 8.11.1 @tisto
- Replace ExtractionTextCSSPlugin with the new mini-css-extract-plugin, adapt universal-webpack config @sneridagh
- Removed flow @robgietema
- Fix eslint prettier config @robgietema
- Refactor actions and reducers to match restapi docs naming @robgietema
- Fix site root api calls @robgietema
- Change visual editor to use the new tiles api @robgietema
- Fix bug with wrong order input @robgietema
- Fix several problems in the DraftJS AnchorLink plugin @sneridagh
- Replace DraftJS Toolbar plugin H1/H2 buttons for H2/H3 ones @sneridagh
- Sync i18n translations @sneridagh
- Fix CSS .input class scope intrusion on the project introduced by the AnchorLink plugin fork @sneridagh
- Improve search reducer by adding the batching property in the search store.
- Upgrade to Node 8.11.3 @sneridagh

## 0.5.0 (2018-03-23)

### Added

- Pastanaga theme package @jaroel, @robgietema
- Registry based controlpanels @robgietema
- Component documentation @robgietema
- Component documentation examples @VaysseB
- Folder listing view @cekk
- Prettier docs for SCA @nileshgulia1
- Comments, email notification and vocabularies reducers @robgietema
- Pastanaga theme @robgietema
- Pastanaga manage views @robgietema
- Pastanaga theme views @robgietema
- Callout styling to draftjs @robgietema
- Image, file and news item view @robgietema
- Social sharing @robgietema
- Commenting @robgietema
- Tags @robgietema
- Renew login token when almost expired @robgietema
- Cctions reducers @robgietema
- Error reporting with Sentry support on client (default ErrorBoundary), server and Redux middleware @sneridagh
- Tiles reducers @robgietema
- Context aware toolbar @robgietema
- Hamburger menu navigation on mobile @sneridagh
- Editor prototype @robgietema
- Support for null values when reseting a field value @sneridagh

### Changes

- Update plone api versions / bootstrap process @thet
- Fix textwidget proptypes @cekk
- Remove phantomjs @tulikavijay
- Upgrade to node 8 @robgietema
- Switched to draft js plugins editor @robgietema
- Fix paragraph styling in draftjs @robgietema
- Fixed summary and tabular views @robgietema
- Upgrade to React 16 @sneridagh
- Upgrade to Webpack 4 @sneridagh
- Review chunks policy. Keep it in sync with Webpack 4 policy with entrypoint bundles @sneridagh
- Merged block styling to inline toolbar @robgietema
- Actions aware toolbar @sneridagh
- Fix permissions on the toolbar display menu @sneridagh

## 0.4.0 (2017-05-03)

### Added

- Adding tiles @robgietema
- Handle different tiles @robgietema
- Resizing of tiles @robgietema
- Deletion of tiles @robgietema
- Drag and drop of tiles @robgietema
- Basic mosaic grid rendering @robgietema
- Form validation @robgietema
- Notification messages @robgietema

### Changes

- Updated to new history api @robgietema
- Deselect on click outside grid @robgietema

## 0.3.0 (2017-04-29)

### Added

- Personal information @robgietema
- Change password @robgietema
- Password widget @robgietema
- I18n support and translations @robgietema
- Personal preferences @robgietema
- Rename action @robgietema

### Changed

- Fixed favicon @robgietema

## 0.2.0 (2017-04-27)

### Added

- Batch state in folder contents @robgietema
- Batch properties in folder contents @robgietema
- Batch tags in folder contents @robgietema
- Batch rename in folder contents @robgietema
- Diff view @robgietema
- Add revert to version @robgietema
- Create view revision page @robgietema
- Create history list view @robgietema
- Sorting of items in folder contents @robgietema
- Upload files in folder contents @robgietema
- Ordering of columns in folder contents @robgietema
- Ordering of items in folder contents @robgietema
- Pagination in folder contents @robgietema
- Delete in folder contents @robgietema

### Changed

- Only show add and contents in the toolbar when folderish @robgietema
- Diff on words not chars @robgietema

## 0.1.0 (2017-04-20)

### Added

- Folder contents @robgietema
- Sharing menu and view @robgietema
- Display menu @robgietema
- Semantic UI integration @robgietema
- Basic Mosaic setup @robgietema
- Basic Server Side Rendering @robgietema
- Search view @robgietema
- Actions menu @robgietema
- Workflow menu @robgietema
- Add menu @robgietema
- Add and edit forms including widgets @robgietema
- Basic components (navigation, toolbar, breadcrumbs etc) @robgietema
- Authentication including login / logout @robgietema
- Setup build environment @robgietema
