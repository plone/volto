Contact form example source:

```jsx noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
const store = configureStore()({
  emailNotification: {
    error: {},
    loading: false,
    loaded: false,
  },
  intl: {
    locale: 'en',
    messages: {},
  },
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <ContactForm error={(message = '')} loading={false} loaded={false} />
  </Provider>
</div>;
```
