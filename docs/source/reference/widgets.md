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
