NotFound example source:

```jsx noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
import BrowserRouter from 'react-router-dom/BrowserRouter';
import NotFound from './NotFound';
import StaticRouter from 'react-router-dom/StaticRouter';

const store = configureStore()({
  userSession: {
    login: {},
  },
  intl: {
    locale: 'en',
    messages: {},
  },
  navigation: {
    items: [],
  },
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <StaticRouter>
      <NotFound />
    </StaticRouter>
  </Provider>
</div>;
```
