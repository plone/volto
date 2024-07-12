---
myst:
  html_meta:
    "description": "Client side form field validation"
    "property=og:description": "Client side form field validation"
    "property=og:title": "Form fields validation"
    "keywords": "Volto, Plone, frontend, React, configuration, form, fields, validation"
---

# Client side form field validation

Volto provides a mechanism for providing form field validation in an extensible way.
This extensibility is based on the Volto component registry.

## Registering a validator

You can register a validator using the component registry API from your add-on configuration.
All validators are registered under the name `fieldValidator`.
The validators are registered using the `dependencies` array of the `registerComponent` API to differentiate the kind of validator to be registered.

### `default` validators

These validators are registered and applied to all fields.

```ts
config.registerComponent({
  name: 'fieldValidator',
  dependencies: ['default', 'minLength'],
  component: minLengthValidator,
});
```

They should be registered for the `name` `fieldValidator` and the dependency `default`.
It should have a second dependency item, to identify it.
In the case of the example, this other dependency is `minLenght`.
It can be any string.

### Per field `widget` or `type` validators

These validators are applied depending on the specified `widget` or the `type` of the field.
If both `widget` and `type` are specified, then only validators of the widget are applied.

```ts
config.registerComponent({
  name: 'fieldValidator',
  dependencies: ['integer', 'maximum'],
  component: maximumValidator,
});
```

### Specific validator using the `validator` key in the field

A final type of validator are applied to the field if the `validator` key is present in the JSON schema definition of the form field.

```ts
config.registerComponent({
  name: 'fieldValidator',
  dependencies: ['isURL'],
  component: urlValidator,
});
```

It does not need to be tied to any field `type` or `widget` definition.
It runs in addition to all the above, so it complements the normal validators, if any apply.

## Volto's default validators

Volto provide a set of validators by default, you can find them in this module: `packages/volto/src/config/validators.ts`

### How to override them

You can override them in your add-on as any other component defined in the registry, by redefining them using the same `dependencies`, and providing your own.
