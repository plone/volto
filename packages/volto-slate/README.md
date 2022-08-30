# volto-slate

TODO: fill in

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

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-slate/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
