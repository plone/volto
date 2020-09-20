Logout example source:

```jsx_ noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
import { LogoutComponent } from './Logout';
import {StaticRouter} from 'react-router-dom';
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
    <StaticRouter>
      <LogoutComponent
        error={(message = '')}
        token=""
        login={form => null}
        location={{}}
      />
    </StaticRouter>
  </Provider>
</div>;
```
