Logo example source, with `intl` auto-injected.

```jsx static
<Logo />
```

Output:

[comment]: # (import statement babel-style are not supported)
```jsx noeditor
var IntlProvider = require('react-intl').IntlProvider;

<IntlProvider lang="en">
    <Logo />
</IntlProvider>
```
