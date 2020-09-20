Logo example source, with `intl` auto-injected.

```jsx static
<Logo />
```

Output:

```jsx noeditor
var IntlProvider = require('react-intl').IntlProvider;
import BrowserRouter from 'react-router-dom/BrowserRouter';
const { Provider } = require('react-intl-redux');
import StaticRouter from 'react-router-dom/StaticRouter';
const configureStore = require('redux-mock-store').default;

const store = configureStore()({
  userSession: {
    login: {},
  },
  intl: {
    locale: 'en',
    messages: {},
  },
  users: {
    reset: {
      loading: '',
    },
  },
  actions: {},
  content: { get: {} },
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <StaticRouter>
      <IntlProvider locale="en">
        <Logo />
      </IntlProvider>
    </StaticRouter>
  </Provider>
</div>;
```
