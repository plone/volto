Header example:

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
        messages: {}
    },
});

<div className={'rsg--pre-42'}>
    <Provider store={store}>
    <BrowserRouter>
        <Header pathname="" />
    </BrowserRouter>
    </Provider>
</div>
```
