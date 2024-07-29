---
myst:
  html_meta:
    "description": "Client side form field validation"
    "property=og:description": "Client side form field validation"
    "property=og:title": "Client side form field validation"
    "keywords": "Volto, Plone, frontend, React, configuration, form, fields, validation"
---

# Client side form field validation

Volto provides an extensible way to validate form field values.
This extensibility is based on the Volto registry.
It applies to content types, custom programatically generated forms, and blocks schema settings.
The mechanism serializes all of them according to the [JSON schema standard](https://json-schema.org/draft/2020-12/json-schema-validation).
Finally Volto generates the form from the serialization.


(voltos-default-validators-label)=

## Volto's default validators

Volto provides a set of validators by default:

### Strings
- minLength
- maxLength
- pattern

### Password
- minLength
- maxLength
- pattern

### Numbers
- isNumber
- minimum
- maximum

### Integers
- isInteger
- minimum
- maximum

### Arrays
- maxItems
- minItems
- uniqueItems

### Per widget
- email
- url

### Event content type
- event end date must be on or after its start date

You can find them in the module {file}`packages/volto/src/config/validators.ts`.


## Register a validator

You can register a validator using the `registerUtility` method in the registry API from your add-on configuration.


### Register and declare a simple validator

This section describes how to validate a field with a specific validator, a common use case.


#### Volto custom forms and block schema forms

When you define custom forms and block schema forms programatically, you can register a custom validator using the `format` property in your core using JSON schema.

The following example shows how to create the schema for a block.

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

You should register the `url` named validator as a Volto validator utility.
In the following example, the `urlValidator` method validator will be applied for the block field `customField` in the previous example.

```ts
config.registerUtility({
  type: 'validator',
  name: 'url',
  method: urlValidator,
})
```


#### Content types

You can also specify the `format` of content types using the schema hints in the backend using `frontendOptions`.

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

The response from `plone.restapi` will be something like the following.
It is slightly different from blocks JSON schema, but the validation engine will behave the same.
The `urlValidator` method validator will be applied for the content type field `customField` from the earlier example.

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


### Advanced scenarios

If, for some reason, you can't modify the existing implementation of the JSON schema definitions for existing content types, blocks, or forms, you can use the following advanced validator registrations.
These allow you to register validators according to whether it is a `field`, `widget`, `behaviorName` (for content types), or `blockType` (for blocks).

#### Field `type` validators

Field `type` validators are applied depending on the specified `type` of the field in the JSON schema from content types, forms, or blocks.

You should specify the `type` in the JSON schema of the block.
In a content type, it is included in the default serialization of the field.

If a field does not specify `type`, it assumes a `string` type as validator.

The next example shows how to define the JSON schema in a block.

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


#### Field `widget` validators

Field `widget` validators are applied depending on the specified `widget` of the field.
You should specify the `widget` either in the JSON schema of the block or as additional data in the content type definition.

The following example shows how to specify the `widget` in the JSON schema of the block.

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
    widget: 'phoneNumber',
  },
  method: phoneValidator,
})
```

The following example shows how to specify the `widget` in the content type definition in the schema hints in the backend using `frontendOptions`.
The validation engine will behave the same as in the JSON schema of the block, applying the `urlValidator` method validator for the content type field `customField` in the previous example.

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


#### Behavior and field name validators

Behavior and field name validators are applied depending on the behavior in combination with the name of the field.
These usually come from a content type definition.
This type of validator only applies to content type validators.
It takes the `behaviorName` and the `fieldName` as dependencies.

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


#### Block type and field name validators

Block type and field name validators are applied depending on the block type in combination with the name of the field in the block settings JSON schema.
This type of validator only applies to blocks.
It takes the `blockType` and the `fieldName` as dependencies.

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


### Override a validator

You can override a validator in your add-on in the same way as any other component defined in the registry.
You can redefine them using the same `dependencies` and provide your own validator.


## Signature of a validator

A validator has the following signature:

```ts
type Validator = {
  // The field value
  value: string;
  // The field schema definition object
  field: Record<string, any>;
  // The form data
  formData: any;
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

Using `formData`, you can perform validation checks using other field data as source.
This is useful when you want to validate two related fields, such as ensuring the end date of an event is after its start date.
You can create invariant validator types.
The following code snippet shows how to create a validator method that ensures the event content type's end date is after its start date.

```ts
export const startEventDateRangeValidator = ({
  value,
  field,
  formData,
  formatMessage,
}: Validator) => {
  const isValid =
    value && formData.end && new Date(value) < new Date(formData.end);
  return !isValid
    ? formatMessage(messages.startEventRange, {
        endDateValueOrEndFieldName: formData.end || 'end',
      })
    : null;
};
```
