---
myst:
  html_meta:
    "description": "Client side form field validation"
    "property=og:description": "Client side form field validation"
    "property=og:title": "Form fields validation"
    "keywords": "Volto, Plone, frontend, React, configuration, form, fields, validation"
---

# Client side form field validation

Volto provides a mechanism for delivering form field validation in an extensible way.
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

It takes two `dependencies`.
The first element should be the `default` identifier, and the second you can set it up to identify the validator.
In the case of the example, this other dependency is `minLength`.
It can be any string.

### Per field `type` validators

These validators are applied depending on the specified `type` of the field.

```ts
config.registerComponent({
  name: 'fieldValidator',
  dependencies: ['integer', 'maximum'],
  component: maximumValidator,
});
```

It takes two `dependencies` since we can potentially have several validators for the same `type`.
The first element should be the `type`, and the second you can set it up to identify the validator.
You should specify the `type` in the JSON schema of the block (in a content type, this is included in the default serialization of the field).
The next example is for the use case of a block JSON schema:

```ts
let blockSchema = {
  properties: {
    ...schema.properties,
    customField: {
      title: 'My custom field',
      description: '',
      type: 'integer'
    },
  },
  required: [],
};
```

### Per field `widget` validators

These validators are applied depending on the specified `widget` of the field.

```ts
config.registerComponent({
  name: 'fieldValidator',
  dependencies: ['myCustomURLWidget', 'maximum'],
  component: maximumValidator,
});
```

It takes two `dependencies` since we can potentially have several validators for the same `widget`.
The first element should be the `widget`, and the second you can set it up to identify the validator.
You should specify the `widget` in the JSON schema of the block (or as additional data in the content type definition).
The next example is for the use case of a block JSON schema:

```ts
let blockSchema = {
  properties: {
    ...schema.properties,
    customField: {
      title: 'My custom field',
      description: '',
      widget: 'myCustomURLWidget',
    },
  },
  required: [],
};
```

### Per behavior and field name validator

These validators are applied depending on the behavior (usually coming from a content type definition) in combination with the name of the field.

```ts
config.registerComponent({
  name: 'fieldValidator',
  dependencies: ['plone.eventbasic', 'start'],
  component: urlValidator,
});
```
The first dependency should be the name of the behavior, and the second the name (`id`) of the field.
This type of validator only applies to content-type validators.

### Per block type and field name validator

These validators are applied depending on the block type in combination with the name of the field in the block settings JSON schema.

```ts
config.registerComponent({
  name: 'fieldValidator',
  dependencies: ['slider', 'url'],
  component: urlValidator,
});
```
The first dependency should be the `id` of the block, and the second the `id` of the field.
This type of validator only applies to blocks.

### Specific validator using the `validator` key in the field

A final type of validator is applied to the field if the `validator` key is present in the JSON schema definition of the form field.

```ts
config.registerComponent({
  name: 'fieldValidator',
  dependencies: ['isURL'],
  component: urlValidator,
});
```

The dependencies take one single name, in this case, the name of the validator.
You should specify the validator in the JSON schema of the block (or as additional data in the content type definition).

```ts
let blockSchema = {
  properties: {
    ...schema.properties,
    customField: {
      title: 'Default field',
      description: '',
      validator: 'isURL',
    },
  },
  required: [],
};
```

It does not need to be tied to any field `type` or `widget` definition.
It runs in addition to all the above, so it complements the normal validators if any apply.

## Volto's default validators

Volto provides a set of validators by default, you can find them in this module: `packages/volto/src/config/validators.ts`

### How to override them

You can override them in your add-on as any other component defined in the registry, by redefining them using the same `dependencies`, and providing your own.

## Signature of a validator

A validator has the following signature:

```ts
type Validator = {
  // The field value
  value: string;
  // The field schema definition object
  field: Record<string, any>;
  // The form data
  formData?: any;
  // The intl formatMessage function
  formatMessage: Function;
};
```

This is an example of an `isNumber` validator:

```ts
export const isNumber = ({ value, formatMessage }: Validator) => {
  const floatRegex = /^[+-]?\d+(\.\d+)?$/;
  const isValid =
    typeof value === 'number' && !isNaN(value) && floatRegex.test(value);
  return !isValid ? formatMessage(messages.isNumber) : null;
};
```

Using the `formData` you can perform validation checks using other field data as source.
This is interesting in the case that two fields are related, like `start` and `end` dates.
