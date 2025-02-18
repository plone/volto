Search example, with `intl` auto-injected:

```jsx static
<SearchWidget pathname="" />
```

Output:

```jsx noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
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
    <SearchWidget pathname="" />
  </Provider>
</div>;
```
