Search Widget, with `intl` auto-injected:

```jsx static
<SearchWidget pathname="" />
```

Output:

```jsx noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
import StaticRouter from 'react-router-dom/StaticRouter';
const store = configureStore()({
  userSession: {
    login: {},
  },
  intl: {
    locale: 'en',
    messages: {},
  },
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <StaticRouter>
      <SearchWidget pathname="" />
    </StaticRouter>
  </Provider>
</div>;
```
