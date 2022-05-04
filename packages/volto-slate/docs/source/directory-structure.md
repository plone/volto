# Directory structure

The actual source code of this React-based Volto addon is inside the `src/` directory. Below is the directory structure:

```
cypress/ - Cypress integration tests
  ...
docs/ - The documentation that you are reading right now (the source + generated HTML pages)
  ...
src/
  actions/ - Redux action creators specific to volto-slate
  blocks/ - Here are the 2 Volto blocks made available by this Volto addon
    Table/ - A table whose cells are edited through the Text block below
    Text/ - React components such as TextBlockView and TextBlockEdit
      css/ - Image drag & drop styles used by the Text block editor
      extensions/ - Extensions which are used just with the TextBlockEdit component
      keyboard/ - Keyboard handlers used just in the TextBlockEdit component
  components/ElementEditor/ - Generic Edit & Remove mini-toolbar shown over Slate Elements of chosen types
  editor/ - The essence of volto-slate: the SlateEditor React component and some of its dependencies
    extensions/ - Extensions which are used with SlateEditor, including one used just in testing environment
    less/ - The LESS styles for the SlateEditor
    plugins/ - The currently 6 plugins that are used directly in the SlateEditor component
      Blockquote/ - Previously called Callout, it is an implemented Slate block element format
      Image/ - Image support (includes block emitter and paste support)
      Link/ - Link support (includes paste support and uses ElementEditor)
      Markdown/ - Little markdown support (e.g. making a list when typing '* ' at the beginning of a Slate Text block)
      StyleMenu/ - Customizable menu with custom block and inline styles for the current selection
      Table/ - Table support with table header, table footer, keyboard management, paste, table size picker under add-table button in toolbar
    ui/ - Some React components for Volto Slate toolbars
  hooks/ - Custom React hooks useful, used in other parts of volto-slate
  reducers/ - Redux reducers specific to volto-slate
  utils/ - Lots of functions used in all volto-slate (e.g. in the editor/ or blocks/Text/ directories) and grouped into 15 files
  widgets/ - Provides RichTextWidget (slate_richtext) and a CSS file loaded in it
```

Some directories in this list also contain a `Readme.md` file with more important info, so watch out for them.

There also are some unit tests near the files that they test and having the extension `.test.js`. The unit tests are created with Jest and the Jest snapshots are in directories called `__snapshots__`.

Each subdirectory of `src/` excepting:

1. `blocks`
2. `blocks/Text/css`
3. `editor/less`
4. `editor/plugins/Table/less`
5. `widgets`

contains an `index.js` file so that the directory can be imported from other JS files.

The `/src` directory directly contains the `index.js` file which configures the addon. This `index.js` file specifies, in this order:

1. import of the `SlateEditor` React component defined within volto-slate
2. imports of the two React components used as an intermediary between Volto and the `SlateEditor`:
    1. `TextBlockView` in `./blocks/Text`
    2. `TextBlockEdit` in `./blocks/Text`
4. import of the `slate_richtext` widget (`RichTextWidget`)
5. export of the configuration function that installs volto-slate which:
   1. sends the Volto config through all the above imports except the widget
   2. registers the addon reducers in `reducers/`
   3. registers the widget
6. definition of an exported function `asDefault` that:
    1. does a change of the default Volto block type to `slate`
    2. marks the two new block types as restricted
