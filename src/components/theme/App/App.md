App example:

```jsx static
<AppComponent />
```

Output:

```jsx noeditor
const { Provider } = require('react-redux');
const configureStore = require('../../../store.js').default;
const { createBrowserHistory } = require('history');
const BrowserRouter = require('react-router-dom/BrowserRouter').default;
const { Api } = require('../../../helpers');
const { ReduxAsyncConnect } = 'redux-connect';
const AppComponent = require('./App').default;
const routes = require('../../../routes').default;
const { ConnectedRouter } = require('connected-react-router');

const api = new Api();
const initialState = {
  app: {
    name: 'Pizza Delivery',
  },
};
function purgeMessage() {
  return '';
}
const history = createBrowserHistory();
const store = configureStore(initialState, history, api);
<Provider store={store}>
  <ConnectedRouter history={history}>
    <BrowserRouter>
      <AppComponent />
    </BrowserRouter>
  </ConnectedRouter>
</Provider>;
```
