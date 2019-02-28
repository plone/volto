Icon example:

```jsx static
<Icon name={} />
```

Output:

```jsx noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
const BrowserRouter = require('react-router-dom/BrowserRouter').default;
const store = configureStore()({
  intl: {
    locale: 'en',
    messages: {},
  },
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <BrowserRouter>
      <Icon
        name={{
          xmlns: '',
          viewBox: '',
          content: '',
          attributes: '',
        }}
        size={'10px'}
        color={'#bbbbbb'}
        title={'This is SVG'}
      />
    </BrowserRouter>
  </Provider>
</div>;
```
