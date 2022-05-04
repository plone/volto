# volto-slate

[![Releases](https://img.shields.io/github/v/release/eea/volto-slate)](https://github.com/eea/volto-slate/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-slate%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-slate/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-slate-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-slate-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-slate-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-slate-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-slate-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-slate-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-slate-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-slate-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-slate%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-slate/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-slate-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-slate-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-slate-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-slate-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-slate-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-slate-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-slate-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-slate-develop)


[Watch a 5 minutes "elevator pitch" for volto-slate](https://www.youtube.com/watch?v=SOz-rk5e4_w)

An alternative text editor for Volto, capable of completely replacing the
default richtext editor while offering enhanced functionality and behavior. We
believe that, in order to succeed, Volto's richtext form editor (the Volto
Composite Page editor) needs strong integration between the rich text
capabilities and the rest of the Volto blocks. Some examples of the kind of
strong integration we have in mind:

- Pasting complex documents inside a volto-slate text block will create
  multiple Volto blocks: images will be converted to Volto Image blocks, tables
  will be converted to Volto Table blocks, etc.
- The text block accepts drag&drop images and it will upload them as Volto Image blocks.
- volto-slate has a Table button with the familiar size input, but it create a Table block

While this addon is still in an early alpha stage, we've solved most of the big
issues, the API starts to stabilize and we've already started several addons
based on it: https://github.com/eea/volto-slate-metadata-mentions/ and
https://github.com/eea/volto-slate-zotero

## Why

Some of the main reasons that drove us to create volto-slate instead of
enhancing Volto's draftjs implementation:

- Volto's draftjs implementation depends on draft-js-plugins, a third-party
  project that introduces its own set of bugs and maintanance issues
- Slate has a modern, developer-friendly api that makes developing plugins
  something easy to do. Getting the editor in a plugin is as easy as `const editor = useSlate()`, overriding core functionality is something that's built
  in as pluggable, directly in Slate.

- Volto's draft based implementation depends on Redraft for its final output,
  which comes with its own bugs and issues. While it is nice to have view-mode
  components, this is something that volto-slate implements just as well.
- Because Slate's internal storage uses a tree modeled on the DOM pattern, its
  final rendered output is very clean. Note: The Slate editor value is a JSON
  object, similar to the Draftjs based implementation.

## Upgrades

### Upgrade to 4.x.x

- Namespace the plugins [#156](https://github.com/eea/volto-slate/pull/156):
  - Make sure you upgrade your slate plugins to use the new slate namespaced plugin ids.
    See for example `volto-slate-footnote` [#23](https://github.com/eea/volto-slate-footnote/pull/23/commits/efdc07041097a6edf608b377141fba15fbee65cf)
- `asDefault` profile makes the volto-slate as the default Editor for `blocks` and `richtext`.
  - If you're not ready for this, yet, switch to `volto-slate:asDefaultBlock`

### Upgrade to 3.x.x

- Removed all deprecated, already in Volto Core, `futurevolto` components:
  - `SidebarPopup`
  - `ObjectWidget`
  - `ObjectBrowserWidget`
  - `helpers/Blocks`
- Table `inline button` and `copy&paste` support is not installed by default anymore.
  You'll need to explicitly import the `tableButton` profile like:
  - `volto:asDefault,tableButton`
  - `volto-slate:minimalDefault,simpleLink,tableButton`

## Available profiles.

volto-slate provides several optional configuration:

- `asDefault` - makes the volto-slate as the default Editor for `blocks` and `richtext`
- `asDefaultBlock` - makes volto-slate the default Editor for `blocks`
- `asDefaultRichText` - makes volto-slate the default Editor for `richtext` widget
- `minimalDefault`, same as the above, but uses a set of toolbar buttons similar to Volto
- `simpleLink` reuses Volto's link plugin and makes for a better replacement of Volto's rich text editor.
- `tableButton` adds table button to Slate toolbar in order to easily insert Table block after.

## Features

#### 1. Hovering (floating) toolbar that shows up on selection

![Screen Recording](https://raw.githubusercontent.com/eea/volto-slate/master/docs/source/images/1.gif)

#### 2. Optional expanded (fixed) toolbar

![Screen Recording](https://raw.githubusercontent.com/eea/volto-slate/master/docs/source/images/2.gif)

#### 3. Working with links (internal, external, email)

![Screen Recording](https://raw.githubusercontent.com/eea/volto-slate/master/docs/source/images/3.gif)

#### 4. Removing links

![Screen Recording](https://raw.githubusercontent.com/eea/volto-slate/master/docs/source/images/4.gif)

#### 5. Editing links

![Screen Recording](https://raw.githubusercontent.com/eea/volto-slate/master/docs/source/images/5.gif)

#### 6. Block-quotes

![Screen Recording](https://raw.githubusercontent.com/eea/volto-slate/master/docs/source/images/6.gif)

#### 7. Split paragraph block in two with `Enter` key and join them back with `Backspace` key

![Screen Recording](https://raw.githubusercontent.com/eea/volto-slate/master/docs/source/images/7.gif)

#### 8. Breaking and joining list items

![Screen Recording](https://raw.githubusercontent.com/eea/volto-slate/master/docs/source/images/8.gif)

#### 9. Breaking (with expanded selection) and joining list items

![Screen Recording](https://raw.githubusercontent.com/eea/volto-slate/master/docs/source/images/9.gif)

#### 10. Inserting a new list item at the end

![Screen Recording](https://raw.githubusercontent.com/eea/volto-slate/master/docs/source/images/10.gif)

#### 11. Two `Enter` key presses in the last empty list item creates a new list

![Screen Recording](https://raw.githubusercontent.com/eea/volto-slate/master/docs/source/images/11.gif)

#### 12. Using `Up` and `Down` keys to go through the blocks in both directions

![Screen Recording](https://raw.githubusercontent.com/eea/volto-slate/master/docs/source/images/12.gif)

#### 13. Changing indent level of list items using `Tab` and `Shift-Tab` keys

![Screen Recording](https://raw.githubusercontent.com/eea/volto-slate/master/docs/source/images/13.gif)

#### 14. Splitting a list block with `Enter` into two list blocks

![Screen Recording](https://raw.githubusercontent.com/eea/volto-slate/master/docs/source/images/14.gif)

#### 15. Support for markdown bulleted lists with `*`, `-` and `+`

![Screen Recording](https://raw.githubusercontent.com/eea/volto-slate/master/docs/source/images/15.gif)

#### 16. Support for markdown numbered lists with `1.` - `9.`

![Screen Recording](https://raw.githubusercontent.com/eea/volto-slate/master/docs/source/images/16.gif)

#### 17. `Backspace` with cursor on first position inside a list with just one item converts the list to a paragraph

![Screen Recording](https://raw.githubusercontent.com/eea/volto-slate/master/docs/source/images/17.gif)

#### 18. Creating a new text block with `Enter` at the end of a text block and removing it with `Backspace`

![Screen Recording](https://raw.githubusercontent.com/eea/volto-slate/master/docs/source/images/18.gif)

#### 19. Switching the list type (numbered list to/from bulleted list)

![Screen Recording](https://raw.githubusercontent.com/eea/volto-slate/master/docs/source/images/19.gif)

## Getting started

### Try volto-slate with Docker

1. Get the latest Docker images

   ```
   docker pull plone
   docker pull plone/volto
   ```

1. Start Plone backend

   ```
   docker run -d --name plone -p 8080:8080 -e SITE=Plone -e PROFILES="profile-plone.restapi:blocks" plone
   ```

1. Start Volto frontend

   ```
   docker run -it --rm -p 3000:3000 --link plone -e ADDONS="volto-slate:asDefault" plone/volto
   ```

1. Go to http://localhost:3000

1. Login with **admin:admin**

1. Create a new **Page** and add a new **Text** block.

### Add volto-slate to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

1. Start Volto frontend

- If you already have a Volto project, just update `package.json`:

  ```JSON
  "addons": [
      "volto-slate:asDefault"
  ],

  "dependencies": {
      "volto-slate": "*"
  }
  ```

- If not, create one:

  ```
  npm install -g yo @plone/generator-volto
  yo @plone/volto my-volto-project --addon volto-slate:asDefault
  cd my-volto-project
  ```

- Install new add-ons and restart Volto:

  ```
  yarn install
  yarn start
  ```

1. Go to http://localhost:3000

1. Happy editing!

## Plugins

To write a new plugin, please refer [plugins](https://github.com/eea/volto-slate/tree/master/docs/source/volto-slate-plugins.md)

## Cypress

We aim to achieve a good coverage for cypress. Please refer to commands listed [here](https://github.com/eea/volto-slate/tree/master/docs/source/testing.md) to ease the process of writing new tests.

## Release

### Automatic release using Jenkins

*  The automatic release is started by creating a [Pull Request](../../compare/master...develop) from `develop` to `master`. The pull request status checks correlated to the branch and PR Jenkins jobs need to be processed successfully. 1 review from a github user with rights is mandatory.
* It runs on every commit on `master` branch, which is protected from direct commits, only allowing pull request merge commits.
* The automatic release is done by [Jenkins](https://ci.eionet.europa.eu). The status of the release job can be seen both in the Readme.md badges and the green check/red cross/yellow circle near the last commit information. If you click on the icon, you will have the list of checks that were run. The `continuous-integration/jenkins/branch` link goes to the Jenkins job execution webpage.
* Automated release scripts are located in the `eeacms/gitflow` docker image, specifically [js-release.sh](https://github.com/eea/eea.docker.gitflow/blob/master/src/js-release.sh) script. It  uses the `release-it` tool.
* As long as a PR request is open from develop to master, the PR Jenkins job will automatically re-create the CHANGELOG.md and package.json files to be production-ready.
* The version format must be MAJOR.MINOR.PATCH. By default, next release is set to next minor version (with patch 0).
* You can manually change the version in `package.json`.  The new version must not be already present in the tags/releases of the repository, otherwise it will be automatically increased by the script. Any changes to the version will trigger a `CHANGELOG.md` re-generation.
* Automated commits and commits with [JENKINS] or [YARN] in the commit log are excluded from `CHANGELOG.md` file.

### Manual release from the develop branch ( beta release )

#### Installation and configuration of release-it

You need to first install the [release-it](https://github.com/release-it/release-it)  client.

   ```
   npm install -g release-it
   ```

Release-it uses the configuration written in the [`.release-it.json`](./.release-it.json) file located in the root of the repository.

Release-it is a tool that automates 4 important steps in the release process:

1. Version increase in `package.json` ( increased from the current version in `package.json`)
2. `CHANGELOG.md` automatic generation from commit messages ( grouped by releases )
3. GitHub release on the commit with the changelog and package.json modification on the develop branch
4. NPM release ( by default it's disabled, but can be enabled in the configuration file )

To configure the authentification, you need to export GITHUB_TOKEN for [GitHub](https://github.com/settings/tokens)

   ```
   export GITHUB_TOKEN=XXX-XXXXXXXXXXXXXXXXXXXXXX
   ```

 To configure npm, you can use the `npm login` command or use a configuration file with a TOKEN :

   ```
   echo "//registry.npmjs.org/:_authToken=YYYYYYYYYYYYYYYYYYYYYYYYYYYYYY" > .npmrc
   ```

#### Using release-it tool

There are 3 yarn scripts that can be run to do the release

##### yarn release-beta

Automatically calculates and presents 3 beta versions - patch, minor and major for you to choose ( or Other for manual input).

```
? Select increment (next version):
❯ prepatch (0.1.1-beta.0)
  preminor (0.2.0-beta.0)
  premajor (1.0.0-beta.0)
  Other, please specify...
```

##### yarn release-major-beta

Same as `yarn release-beta`, but with premajor version pre-selected.

##### yarn release

Generic command, does not automatically add the `beta` to version, but you can still manually write it if you choose Other.

#### Important notes

> Do not use release-it tool on master branch, the commit on CHANGELOG.md file and the version increase in the package.json file can't be done without a PULL REQUEST.

> Do not keep Pull Requests from develop to master branches open when you are doing beta releases from the develop branch. As long as a PR to master is open, an automatic script will run on every commit and will update both the version and the changelog to a production-ready state - ( MAJOR.MINOR.PATCH mandatory format for version).


## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-slate/blob/master/DEVELOP.md).

## Credit

A lot of inspiration from the great [Slate Plugins repository](https://github.com/udecode/slate-plugins/), especially the autoformat handlers.

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-slate/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
