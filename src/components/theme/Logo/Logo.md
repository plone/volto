Logo example source, with `intl` auto-injected.

```jsx static
<Logo />
```

Output:

```jsx noeditor
var IntlProvider = require('react-intl').IntlProvider;
import BrowserRouter from 'react-router-dom/BrowserRouter';

<div className={'rsg--pre-42'}>
<BrowserRouter>
    <IntlProvider locale="en">
        <Logo />
    </IntlProvider>
</BrowserRouter>
</div>
```
