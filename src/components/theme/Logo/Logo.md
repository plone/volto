Logo example source, with `intl` auto-injected.

```jsx static
<Logo />
```

Output:

```jsx noeditor
var IntlProvider = require('react-intl').IntlProvider;

<div className={'rsg--pre-42'}>
    <IntlProvider locale="en">
        <Logo />
    </IntlProvider>
</div>
```
