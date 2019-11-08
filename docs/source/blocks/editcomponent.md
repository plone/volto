# Blocks - Edit components

The edit component part of a block anatomy is specially different to the view component because they have to support the UX for editing the block.
This UX can be very complex depending on the kind of block and the feature that it is trying to provide.
The project requirements will tell how far you should go with the UX story of each tile, and how complex it will become.
You can use all the props that the edit component is receiving to model the UX for the block and how it will render.

See the [complete list of props](anatomy.md#block-edit-component-props).

We have several UI/UX artifacts in order to model our block edit component UX.
The sidebar and the object browser are the main ones.

## Sidebar

We can use the new sidebar when building our blocks' edit components.
The sidebar is a new UI asset that is available in Volto 4.
You need to instantiate it this way:

```js
import { SidebarPortal } from '@plone/volto/components';

[...]

<SidebarPortal selected={this.props.selected}>
  ...
</SidebarPortal>
```

Everything that's inside the ``SidebarPortal`` component will be rendered in the sidebar.

## Object Browser

Volto 4 has a new object browser component that allows you to select an existing content object from the site.
It has the form of an HOC (High Order Component), so you have to wrap the component you want to be able to call the object browser from with it, like this:

```js
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';

[...]

export default withObjectBrowser(MyComponent)
```

The HOC component ``withObjectBrowser`` wraps your component by making available this props:

- isObjectBrowserOpen - (Bool) tells if the browser is currently open
- openObjectBrowser - handler for opening the browser
- closeObjectBrowser - handler for closing the browser

By default, it's enabled for all the component tree under the Blocks Editor, so it's available already for all the blocks in edit mode.
However, if you need to instantiate it somewhere else, you can do it anyways by wrapping your component with it.

!!! note
    The default image block in Volto features both the Sidebar and the object browser, take a look at its source code in case you need more context on how they work.

### openObjectBrowser handler API

If you want to open an `ObjectBrowser` from your Block, you need to call the `openObjectBrowser` function you'll find in the props of your block component.
This function has this signature:

```
@param {Object} object ObjectBrowser configuration.
@param {string} object.mode Quick mode, defaults to `image`.
@param {string} object.dataName Name of the block data property to write the selected item.
@param {string} object.onSelectItem Function that will be called on item selection.
```

These are some examples on how to use it:

```js
// Opens the browser in the `image` mode by default if no config object specified, so it saves the selection in the `url` data property.
this.props.openObjectBrowser();

// Opens the browser in the `link` mode, so it saves the selection in the `href` data property.
this.props.openObjectBrowser({mode: 'link'});

// Opens the browser defining which data property should save the selection using `dataName`
this.props.openObjectBrowser({
  dataName: 'myfancydatafield'
});

// Opens the browser defining the function that should be used to save the selection using `onSelectItem`
this.props.openObjectBrowser({
  onSelectItem: url =>
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      myfancydatafield: url,
    }),
  });
```
