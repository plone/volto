Login example source:

```jsx noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { LoginComponent } from './Login';
const store = configureStore()({
  userSession: {
    login: {},
  },
  intl: {
    locale: 'en',
    messages: {},
  },
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <BrowserRouter>
      <LoginComponent
        error={(message = '')}
        token=""
        login={form => null}
        location={{}}
      />
    </BrowserRouter>
  </Provider>
</div>;
```
