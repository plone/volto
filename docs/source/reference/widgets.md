---
myst:
  html_meta:
    "description": "Volto widgets"
    "property=og:description": "Volto widgets"
    "property=og:title": "Volto widgets"
    "keywords": "Plone, Volto, widgets"
---

# Widgets

This chapter describes the set of widgets available in Volto.

## `ButtonsWidget`

`ButtonsWidget` is a helper component for building widgets that have a list of buttons which can be toggled, allowing the selection of a single value only.
It's a minimal, extensible base widget used by other widgets.
It renders a set of mutually exclusive toggle buttons, and functions similarly to a radio input.

With `ButtonsWidget`, you can do the following things.

-   Supply a configurable list of actions, including strings or style definitions.
-   Customize a per-action icon and label via the `actionsInfoMap` prop.
-   Filter out default actions with the `filterActions` prop.
-   Provide default and current values via `default` and `value` props.
-   Pass `disabled` or `isDisabled` props to prevent interaction.

The following code example demonstrates the complete options for `ButtonsWidget`.

```ts
type ActionInfo = [React.ReactElement<any>, string] | [string, string];

type ActionValue = string | Record<`--${string}`, string>;

export type ButtonsWidgetProps = {
  /**
   * Unique identifier for the widget.
   */
  id: string;

  /**
   * Callback function to handle changes.
   */
  onChange: (id: string, value: ActionValue) => void;

  /**
   * List of actions available for the widget.
   */
  actions?: Array<StyleDefinition | string>;

  /**
   * Map containing additional the information (icon and i18n string) for each action.
   */
  actionsInfoMap?: Record<string, ActionInfo>;

  /**
   * List of actions to be filtered out. In case that we don't want the default ones
   * we can filter them out.
   */
  filterActions?: string[];

  /**
   * Current value of the widget.
   */
  value?: ActionValue;

  /**
   * Default value of the widget.
   */
  default?: ActionValue;

  /**
   * Indicates if the widget is disabled.
   */
  disabled?: boolean;

  /**
   * Indicates if the widget is disabled (alternative flag for compatibility reasons).
   */
  isDisabled?: boolean;
};
```

## `blockWidth`

`blockWidth` is a widget to select a width from the defined `config.blocks.widths`.
It's based on the `ButtonsWidget`, so the actions and the styles to be applied are configurable.

````{card}
```{image} ../_static/blockWidth.png
:alt: blockWidth
:target: ../_static/blockWidth.png
```
+++
_`blockWidth`_
````

## `blockAlignment`

`blockAlignment` is a widget to select the block alignment, one of either `left`, `right`, or `center`.
It's based on the `ButtonsWidget`, so the actions and the styles to be applied are configurable.

````{card}
```{image} ../_static/blockAlignment.png
:alt: blockAlignment
:target: ../_static/blockAlignment.png
```
+++
_`blockAlignment`_
````

## `size`

`size` is a widget to select the block size from a default list of values, one of either `small`, `medium`, or `large`.
It's based on the `ButtonsWidget`, so the actions and the styles to be applied are configurable.

````{card}
```{image} ../_static/size.png
:alt: size
:target: ../_static/size.png
```
+++
_`size`_
````

## `object_list`

`object_list` edits a list of objects, each described by a schema, such as the social links of a site or the columns of a block.
It has two layouts, set with the `layout` option:

-   `accordion` (the default): each item is edited in place, in an accordion panel.
    Existing forms keep this layout and its behavior.
-   `table`: each item is a row with the chosen `columns`.
    Edit opens the item in a dialog that validates a draft and writes it back only on Save.
    Each row has a menu with Move up, Move down, Duplicate and Remove, and Remove asks for confirmation.
    In a narrow container, such as the block settings sidebar, the rows show as a list.

The value is a list of objects.
Each item has an `@id` unless `itemIds` is `false`.

The options are:

`schema`
:   The schema of an item, or a function called as `schema({ ...props, props, intl })` that returns it.
    The `title` of the schema names one item, and `addMessage` sets the label of the Add button.
    If `schemaName` names no registered utility, the item schema is empty and the rows still render.

`schemaName`
:   The name of a registered `schema` utility.
    It takes precedence over `schema`.

`schemaExtender`
:   A function `schemaExtender(schema, data, intl)` that returns the schema of one item, for example to add a field to it.
    It is set in code, and is not available in the backend `widgetProps`.

`layout`
:   `accordion` (default) or `table`.

`columns`
:   The names of the item fields shown in the `table` layout.
    The default is every field of the item schema.

`cells`
:   An object of functions, `{ [field]: (value, item) => node }`, that render a table cell in place of its text.
    It is set in code, and is not available in the backend `widgetProps`.

`itemTitle`
:   The name of the item field that names an item, or a function `(item, index) => string`.
    The name shows in the accordion title and in the dialog.
    If the item has no value for it, the schema title is used.
    `placeholderItemField` is accepted as an alias.

`maxItems`
:   The maximum number of items.
    At this number, Add and Duplicate are disabled.

`validateItem`
:   A function `validateItem(item, index, items)` that the dialog runs before Save.
    When it returns a message, Save is blocked and the message is shown in the dialog.
    The `items` are the list as it would be after Save.
    It is set in code, and is not available in the backend `widgetProps`.
    See {doc}`../configuration/validation`.

`itemIds`
:   Set it to `false` to write no `@id` to the items.
    The rows are then keyed by their content.
    Use it for a list of plain values, such as a list of strings.
    The default is `true`.

`fixedItems`
:   Set it to `true` to fix the list: its items cannot be added or removed.
    Add, Duplicate and Remove are hidden, in both layouts.
    The items stay editable and reorderable.
    The default is `false`.

`activeObject` and `setActiveObject`
:   Control the open item of the `accordion` layout, from the parent of the widget.
    They keep the Volto names, as `schemaExtender` does.

A backend schema sets the options in `frontendOptions`, with the item schema in `widgetProps`:

```python
from plone.autoform import directives
from plone.supermodel import model
from zope import schema


class ILink(model.Schema):
    directives.widget(
        "links",
        frontendOptions={
            "widget": "object_list",
            "widgetProps": {
                "layout": "table",
                "columns": ["title", "href"],
                "itemTitle": "title",
                "maxItems": 10,
                "schema": {
                    "title": "Link",
                    "addMessage": "Add link",
                    "fieldsets": [
                        {"id": "default", "title": "Default", "fields": ["title", "href"]}
                    ],
                    "properties": {
                        "title": {"title": "Title", "type": "string"},
                        "href": {"title": "Address", "type": "string"},
                    },
                    "required": ["title"],
                },
            },
        },
    )
    links = schema.List(
        title="Links",
        value_type=schema.Dict(),
        required=False,
    )
```

The `schema` in `widgetProps` is a JSON schema.
Use `schemaName` instead to name a schema registered in the frontend.
