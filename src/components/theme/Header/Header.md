Header example: Header example, with `intl` auto-injected:

```jsx static
<Header pathname="" />
```

Output:

```jsx noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
const BrowserRouter = require('react-router-dom/BrowserRouter').default;
const store = configureStore()({
  userSession: {
    login: {},
  },
  intl: {
    locale: 'en',
    messages: {},
  },
  content: {
    ['@id']: 'http://localhost:8080/plone/front-page/@navigation',
  },
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <BrowserRouter>
      <Header
        pathname="/"
        content={{
          ['@id']: 'http://localhost:8080/plone/front-page/@navigation',
        }}
      />
    </BrowserRouter>
  </Provider>
</div>;
```
