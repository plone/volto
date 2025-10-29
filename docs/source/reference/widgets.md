---
myst:
  html_meta:
    "description": "Volto provides a set of widgets that provide structural features."
    "property=og:description": "Volto provides a set of widgets that provide structural features."
    "property=og:title": "Volto widgets"
    "keywords": "Plone, Volto, widgets"
---

# Widgets

This chapter describes the set of widgets that provide structural features in Volto.

## `ButtonsWidget`

This component is a helper for building widgets that have a list of buttons that can be toggled similar to a radio input, allowing the selection of a single value only.
It is not a widget on itself, but it allows other widgets to build up using its base functionality.
You can pass as props a configurable list of buttons, with a configurable list of actions that each button has assigned.
You can configure the icons and the i18n message used for each button as well.

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
```{image} ../_static/BlockAlignment.png
:alt: BlockAlignment
:target: ../_static/BlockAlignment.png
```
+++
_`BlockAlignment`_
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
