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
This extensibility is based on the Volto registry.
It applies to content types, custom programatically generated forms and blocks schema settings.
All of them are serialized using JSON schema standard and then Volto generates the resultant form out of it.

## Registering a validator

You can register a validator using the registry API from your add-on configuration.
The validators are registered using the `registerUtility` API method.

### Registering and declaring a simple validator

The most common thing is to have a field that you want to validate with a specific validator.
Volto provide some default validators, see at the end of this chapter for more information.

#### For Volto custom forms and block schema forms

When you define them programatically, in your core, using JSON schema, you can register a custom validator using the `format` property.
This is the case of creating the schema for a block:

```ts
let blockSchema = {
  // ... fieldset definition in here
  properties: {
    ...schema.properties,
    customField: {
      title: 'My custom URL field',
      description: '',
      format: 'url'
    },
  },
  required: [],
};
```

`url` named validator should be registered by this name as a Volto validator utility:

```ts
config.registerUtility({
  type: 'validator',
  name: 'url',
  method: urlValidator,
})
```

In this case, the `urlValidator` method validator will be applied for the block field `customField`.

#### For content types

Content types also can specify the `format` using the schema hints in the backend in the `frontendOptions`:

```python
from plone.supermodel import model
from zope import schema

class IMyContent(model.Schema):
    directives.widget(
        "customField",
        frontendOptions={
            "format": "url",
        },
    )
    customField = schema.TextLine(
        title="Custom URL field",
        required=False,
    )
    # Rest of your content type definition
```

For the record, the resultant `plone.restapi` response will be something like the following, a bit different than in blocks JSON schema.
But the validation engine will take care too:

```json
{
  "properties": {
    "customField": {
      "title": "Custom URL field",
      "widgetOptions": {
        "frontendOptions": {
          "format": "url"
        }
      }
    }
  }
}
```

and the `urlValidator` method validator will be applied for the content type field `customField`.

### Advanced scenarios

In case you need more granularity and you don't have access to modify the existing implementation of the JSON schema definitions for existing content types, blocks or forms (might be in third party add-ons), you can use the following advanced validator registrations, using `field`, `widget`, `behaviorName` or `blockType` validator registrations.

#### Per field `type` validators

These validators are applied depending on the specified `type` of the field in the JSON schema from content types, forms or blocks.
The next example is for the use case of JSON schema defined in a block:

```ts
let blockSchema = {
  // ... fieldset definition in here
  properties: {
    ...schema.properties,
    customField: {
      title: 'My custom field',
      description: '',
      type: 'integer',
      maximum: 30
    },
  },
  required: [],
};
```

```ts
config.registerUtility({
  type: 'validator',
  name: 'maximum',
  dependencies: {
    fieldType: 'integer',
  },
  method: maximumValidator,
})
```

You should specify the `type` in the JSON schema of the block (in a content type, it is included in the default serialization of the field).
If a field does not specify type, it assumes a `string` type as validator.

#### Per field `widget` validators

These validators are applied depending on the specified `widget` of the field.

```ts
let blockSchema = {
  // ... fieldset definition in here
  properties: {
    ...schema.properties,
    customField: {
      title: 'My custom field',
      description: '',
      widget: 'phoneNumber',
    },
  },
  required: [],
};
```

```ts
config.registerUtility({
  type: 'validator',
  name: 'phoneNumber',
  dependencies: {
    widgetName: 'phoneNumber',
  },
  method: phoneValidator,
})
```


You should specify the `widget` in the JSON schema of the block, or as additional data in the content type definition.
Content types also can specify the `widget` to be used using the schema hints in the backend in the `frontendOptions`:


```python
from plone.supermodel import model
from zope import schema

class IMyContent(model.Schema):
    directives.widget(
        "customField",
        frontendOptions={
            "widget": "url",
        },
    )
    customField = schema.TextLine(
        title="Custom URL field",
        required=False,
    )
    # Rest of your content type definition
```

the validation engine will take care too, and the `urlValidator` method validator will be applied for the content type field `customField`.

#### Per behavior and field name validator

These validators are applied depending on the behavior (usually coming from a content type definition) in combination with the name of the field.

```ts
config.registerUtility({
  type: 'validator',
  name: 'dateRange',
  dependencies: {
    behaviorName: 'plone.eventbasic',
    fieldName: 'start'
  },
  method: startEventDateRangeValidator,
})
```

It takes the `behaviorName` and the `fieldName` as dependencies.
This type of validator only applies to content type validators.

#### Per block type and field name validator

These validators are applied depending on the block type in combination with the name of the field in the block settings JSON schema.

```ts
config.registerUtility({
  type: 'validator',
  name: 'url',
  dependencies: {
    blockType: 'slider',
    fieldName: 'url'
  },
  method: urlValidator,
})
```

It takes the `blockType` and the `fieldName` as dependencies.
This type of validator only applies to blocks.

## Volto's default validators

Volto provides a set of validators by default, you can find them in this module: `packages/volto/src/config/validators.ts`

### How to override a validator

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

## Invariants

Using the `formData` you can perform validation checks using other field data as source.
This is interesting in the case that two fields are related, like `start` and `end` dates.
You can create invariant type of validators thanks to this.
