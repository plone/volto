# Dynamic Volto Addons Configuration

There are some cases where defining the Volto addons your project is going to use is not enough, and you need more control over it. For example, when you have several builds under the umbrella of the same project that share the core of the code, but each build have special requirements, like other CSS, customizations, {term}`shadowing` or the features of other addons available.

There is a scapehatch `volto.config.js`. This module exports an object and can have arbitrary code depending on your needs:

```js
let addons = [];
if (process.env.MY_SPECIAL_CUSTOM_BUILD) {
  addons = ['volto-custom-addon'];
}

module.exports = {
  addons: addons,
};

```

In the case above, we delegate to the presence of an environment variable (MY_SPECIAL_CUSTOM_BUILD) the use of the list of addons specified.

This list, sums up to the one defined in `package.json` (it does not override it), and the addons added are placed at the end of the addons list, so the config in there is applied after the ones in the `package.json`.
