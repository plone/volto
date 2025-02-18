---
myst:
  html_meta:
    "description": "How to register and retrieve utilities in @plone/registry"
    "property=og:description": "How to register and retrieve utilities in @plone/registry"
    "property=og:title": "Register and retrieve utilities"
    "keywords": "@plone/registry, registry, utilities, register, retrieve"
---

# Register and retrieve utilities

This section of the documentation describes how to register and retrieve utilities.


## Register utilities by `name` and `type`

You can register a utility using `config.registerUtility` by using its specific `name` and `type` arguments.

```js
config.registerUtility({
  name: 'url',
  type: 'validator',
  method: () => 'this is a simple validator utility',
});
```

For utilities of the same `type`, you can register different `name` utilities.

```js
config.registerUtility({
  name: 'url',
  type: 'validator',
  method: () => 'this is a simple URL validator utility',
});

config.registerUtility({
  name: 'email',
  type: 'validator',
  method: () => 'this is a simple email validator utility',
});
```

However, if you register two utilities under the same `name`, then the latter will override the former.
Thus you can override existing utilities in your add-ons.

```js
config.registerUtility({
  name: 'url',
  type: 'validator',
  method: () => 'this is a simple URL validator utility',
});

config.registerUtility({
  name: 'url',
  type: 'validator',
  method: () => 'this registered URL validator utility is the last defined, and therefore overrides all previous utilities with the same `name`',
});
```


## Register utilities using a `dependencies` object

It is possible to register utilities using a `dependencies` object.
This is useful to further specify the utility.

```js
config.registerUtility({
  name: 'email',
  type: 'validator',
  dependencies: { fieldType: 'email' },
  method: () => 'this is an email validator utility with dependencies for email',
});
```


## Retrieve a specific utility

You can retrieve one specific utility using `config.getUtility`, given the `name` and `type`.

```js
config.getUtility({ name: 'url', type: 'validator' }).method()
```

You can do the same using a `dependencies` object.

```js
config.getUtility({
  name: 'email',
  dependencies: { fieldType: 'string' },
  type: 'validator',
}).method()
```


### Retrieve groups of utilities

You can retrieve all utilities registered under the same `type`.

```js
config.getUtilities({ type: 'validator' })
```

You can do the same using a `dependencies` object.

```js
config.getUtilities({
  type: 'validator',
  dependencies: { fieldType: 'string' },
}).length
```

This is useful when building pluggable systems, so you can query all the utilities present in the registry.
For example, retrieve all validator utilities with the `fieldType` of `string`.
