App example:
This is our main Container Component.

```jsx static
<AppComponent />
```

Output:

```jsx_ noeditor
import configureStore from 'redux-mock-store';
import {BrowserRouter}  from 'react-router-dom');
import  AppComponent  from './App';

const { Provider } = require('react-intl-redux');
const { createBrowserHistory } = require('history');
const { Api } = require('../../../helpers');
const { ReduxAsyncConnect } = 'redux-connect';
const routes = require('../../../routes').default;

const api = new Api();
/*const initialState = {
  app: {
    name: 'Pizza Delivery',
  },
};*/
const store = configureStore()({
  intl: {
    locale: 'en',
    messages: {},
  },
  messages: '',
});

<Provider store={store}>
  <BrowserRouter>
    <AppComponent
      location={{
        key: 'ac3df4', // not with HashHistory!
        pathname: '/',
        search: '',
        hash: '#howdy',
        state: {
          fromDashboard: true,
        },
      }}
      route={routes}
      intl={{
        locale: 'en',
        messages: {},
      }}
      error={''}
    />
  </BrowserRouter>
</Provider>;
```
