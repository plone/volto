---
myst:
  html_meta:
    "description": "An explanation of fields, controls, widgets, and widget adapters in Seven forms"
    "property=og:description": "An explanation of fields, controls, widgets, and widget adapters in Seven forms"
    "property=og:title": "Form fields, controls, and widgets"
    "keywords": "Seven, forms, fields, controls, widgets, @tanstack/form, @plone/cmsui"
---

(form-fields-controls-and-widgets-label)=

# Form fields, controls, and widgets

Seven forms are schema-driven.
A content schema describes metadata fields, and the CMS UI turns those fields into interactive form elements.
This process is intentionally split into several concepts: fields, controls, widgets, and adapters.
The distinction matters because not every visual input component can be registered directly as a CMS widget.

## Field

A field is the form-level representation of one piece of content data.
It has a name, a current value, validation state, and schema metadata.
In a content form, a field usually comes from a Plone schema property.
For example, `title`, `description`, `effective`, and `is_folderish` are fields when the form renders them as editable metadata.

A field belongs to the form system.
It participates in form state, validation, submission, and synchronization with the content object.
In Seven, `@tanstack/react-form` owns this part of the model.
The CMS UI field component connects TanStack Form state to the widget registry and to any additional state that the editing UI needs.

A field is not just the visible input.
It also includes the surrounding form concerns that make the input meaningful in a CMS.
These concerns include the label, required state, error state, default value, field path, schema hints, choices, vocabulary, and widget options.

## Control

A control is a lower-level interactive component.
It is usually part of a design system.
Examples include a text input, checkbox, select, date picker, button, or segmented control.

A control knows how to render and manage a specific interaction pattern.
It does not necessarily know anything about Plone schemas, content fields, fieldsets, vocabularies, submission, or validation messages.
It may also expose a prop API that reflects the accessibility library or design system that implements it.

For example, a React Aria checkbox uses checkbox-specific concepts such as `isSelected`, `defaultSelected`, and `onChange(isSelected)`.
That is a good API for a checkbox control.
It is not automatically the right API for a CMS widget, because a schema-driven form passes a normalized field value, a field name, label text, required state, and validation state.

## Widget

A widget is a CMS-level field renderer.
It receives a field-oriented prop contract and renders the appropriate control or group of controls.
It is the component that the widget registry returns when the form resolves a schema field.

A widget is responsible for adapting the field model to the visual controls that implement the interaction.
It should render the field label, expose the current value, report changes with a normalized `onChange(value)` callback, and display validation state.
It should also preserve common field semantics such as required, disabled, read-only, description, and placeholder when those semantics apply.

This makes a widget larger in scope than a control.
A text field widget may be a thin wrapper around a text input control.
An image widget may combine an object browser, upload button, link input, preview, clear action, and validation message.
Both are widgets if they satisfy the same field contract from the form generator.

## Adapter

An adapter is a wrapper that turns a control into a widget.
It maps the form field contract to the control contract.
This is the right place to translate names, normalize values, and convert validation metadata into the shape expected by the control.

For example, a boolean widget can adapt a checkbox control by mapping `value` to `isSelected` and by mapping `onChange(value)` to the checkbox's selected state callback.

```tsx
import type { FormWidgetProps } from '@plone/types';

function BooleanWidget({
  value,
  defaultValue,
  onChange,
  onBlur,
  label,
  required,
  disabled,
  readOnly,
  className,
}: FormWidgetProps<boolean>) {
  return (
    <Checkbox
      className={className}
      isSelected={!!value}
      defaultSelected={!!defaultValue}
      isRequired={required}
      isDisabled={disabled || readOnly}
      onChange={onChange}
      onBlur={onBlur}
    >
      {label}
    </Checkbox>
  );
}
```

The adapter keeps the registry contract stable.
It also lets design-system controls evolve without forcing schema-driven forms to learn every control-specific API.

## Minimum widget contract

A registered CMS widget should accept a small common contract.
The essential props are `name`, `value`, `onChange`, `label`, `required`, and validation state.
Other props are contextual, but they let the widget behave consistently across the CMS.

```ts
import type { FormWidget, FormWidgetProps } from '@plone/types';
```

`FormWidgetProps` describes the props that a widget receives from the form generator.
Use it when you implement a widget or adapter.

```tsx
function BooleanWidget(props: FormWidgetProps<boolean>) {
  return null;
}
```

`FormWidget` describes the widget component itself.
Use it when you want to type a variable, registry entry, or exported component as a form-compatible widget.

```tsx
const BooleanWidget: FormWidget<boolean> = (props) => {
  return null;
};
```

The contract is intentionally value-oriented.
The form generator should not need to know whether a widget uses an HTML input, a React Aria component, a modal picker, or several controls working together.
The form only needs to provide the current value and receive the next value.

## Why raw controls should not usually be registered

Raw controls often use APIs that are correct for their interaction pattern but incomplete for CMS forms.
A checkbox control may use `isSelected` instead of `value`.
A date picker may emit a date object while the content API expects an ISO string.
A select control may know about option labels but not about Plone vocabularies.
An object browser may need content context, selectable type constraints, and a normalized relation value.

Registering those controls directly makes the form generator depend on many incompatible prop conventions.
That weakens the registry because the registry can no longer promise what a widget receives or returns.
Adapters keep the boundary explicit.

## Field resolution

The widget registry answers a different question than the form state system.
The form state system asks, "What is the value and validation state of this field?"
The widget registry asks, "Which widget should render this field?"

Seven can resolve a widget from several schema hints.
The field id, explicit widget name, choices, vocabulary, factory, and type can all influence the result.
This lets the same schema-driven form render very different field experiences without hard-coding every field in the form component.

The resolved widget still receives the same field contract.
That consistency is what lets the form generator stay generic.

## Practical boundary

Use this boundary when evaluating a component:

`Control`
:   A reusable visual interaction component that exposes a control-specific API.

`Widget`
:   A CMS field renderer that accepts the form field contract and emits normalized field values.

`Adapter`
:   A wrapper that maps between the two.

A component can be both a control and a widget only when its prop API already matches the form field contract.
Text inputs often come close to this shape.
Checkboxes, date pickers, object browsers, image pickers, and rich editors usually need adapters.

## Design implications

The form generator should stay boring.
It should resolve widgets, pass normalized field props, and connect changes back to form state.
It should not contain special cases for checkbox selection state, date serialization, upload workflows, relation values, or vocabulary fetching.

Widgets should own those differences.
That keeps each widget testable in isolation and keeps the schema-driven form renderer understandable.
It also makes the registry safer for add-ons, because add-ons can register widgets against one documented contract instead of reverse-engineering the current form implementation.
