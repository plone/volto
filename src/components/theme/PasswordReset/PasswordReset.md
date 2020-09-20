Password reset example source:

```jsx_ noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
import PasswordResetComponent from './PasswordReset';
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
    initial: {
      loading: '',
    },
  },
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <StaticRouter>
      <PasswordResetComponent
        loading={true}
        loaded={false}
        token={''}
        setInitialPassword={() => {}}
      />
    </StaticRouter>
  </Provider>
</div>;
```
