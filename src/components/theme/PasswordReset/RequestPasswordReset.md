Password reset example source:

```jsx_ noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
import RequestPasswordReset from './RequestPasswordReset';
import {StaticRouter} from 'react-router-dom';
const store = configureStore()({
  userSession: {
    login: {},
  },
  intl: {
    locale: 'en',
    messages: {},
  },
  users: {
    reset: {
      loading: '',
    },
  },
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <StaticRouter>
      <RequestPasswordReset
        loading={true}
        loaded={false}
        resetPassword={() => {}}
      />
    </StaticRouter>
  </Provider>
</div>;
```
