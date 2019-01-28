Anontools example:

```jsx static
<Anontools token="" content=""/>
```

Output:

```jsx noeditor
const { Provider } = require('react-redux');
const configureStore= require('../../../store.js').default;
const { createBrowserHistory } = require('history');
const BrowserRouter = require('react-router-dom/BrowserRouter').default;
const {Api} = require('../../../helpers');

const api = new Api();
const initialState = {
  app: {
    name: 'Pizza Delivery'
  }
};

const store = configureStore( initialState, createBrowserHistory(), api );<Provider store={store}>
<BrowserRouter>
  <Anontools token="" content=""/>
</BrowserRouter>
</Provider>

```