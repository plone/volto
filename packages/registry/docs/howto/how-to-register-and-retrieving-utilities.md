# How to register and retrieve utilities (Utility registry)

### Register utilities using `config.registerUtility`

You can register a utility using specific `name` and `type` arguments.

```js
config.registerUtility({
  name: 'url',
  type: 'validator',
  method: () => 'this is a simple validator utility',
});
```

For a same `type` you can register different `name` utilities.

```js
config.registerUtility({
  name: 'url',
  type: 'validator',
  method: () => 'this is a simple validator utility',
});

config.registerUtility({
  name: 'email',
  type: 'validator',
  method: () => 'this is a simple validator utility',
});
```

However, if you register two utilities under the same `name`, then the latter will override the former.
Thus you can override existing utilities in your add-ons.

```js
config.registerUtility({
  name: 'url',
  type: 'validator',
  method: () => 'this is a simple url validator utility',
});

config.registerUtility({
  name: 'url',
  type: 'validator',
  method: () => 'this registered url validator utility will prevail, as defined later',
});
```

### Register utilities using a `dependencies` object

It is possible to register utilities using a `dependencies` object.
This is useful to further specify the utility.

```js
config.registerUtility({
  name: 'email',
  type: 'validator',
  dependencies: { fieldType: 'email' },
  method: () => 'this is a validator utility with dependencies for email',
});
```

### Retrieve a utility from the utilities registry

You can retrieve one specific utility using `config.getUtility`, given the `name` and `type`.

```js
config.getUtility({ name: 'url', type: 'validator' }).method(),
```

You can do the same using a `dependencies` object:

```js
config.getUtility({
  name: 'email',
  dependencies: { fieldType: 'string' },
  type: 'validator',
}).method(),
```

### Retrieve all utilities of the same `type`

You can retrieve all utilities registered under the same `type`.

```js
config.getUtilities({ type: 'validator' })
```

You can do the same using a `dependencies` object:

```js
config.getUtilities({
  type: 'validator',
  dependencies: { fieldType: 'string' },
}).length,
```

This is useful when building pluggable systems, so you can query all the utilities present in the registry.
For example, retrieve all validator utilities for the `fieldType` `string`.
