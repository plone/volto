Register example source:

```jsx noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Register from './Register';
import StaticRouter from 'react-router-dom/StaticRouter';
const store = configureStore()({
  userSession: {
    login: {},
  },
  intl: {
    locale: 'en',
    messages: {},
  },
  users: {
    create: {
      loading: '',
    },
  },
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <StaticRouter>
      <Register />
    </StaticRouter>
  </Provider>
</div>;
```
