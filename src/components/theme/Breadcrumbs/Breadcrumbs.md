Breadcrumbs example:

```jsx static
<Breadcrumbs />
```

Output:

```jsx noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;

const store = configureStore()({
  intl: {
    locale: 'en',
    messages: {},
  },

  breadcrumbs: {
    items: [''],
  },
  getBreadcrumbs: () => {},
  pathname: '',
});

<Provider store={store}>
  <Breadcrumbs />
</Provider>;
```
