Display example source:

```jsx_ noeditor
import Display from './Display';
import {StaticRouter} from 'react-router-dom';

const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;

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
  actions: {},
  content: { get: {}, update: {} },
  schema: {},
  controlpanels: {},
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <StaticRouter>
      <Display
        deleteContent={() => {}}
        getContent={() => {}}
        deleteRequest={{
          loading: true,
          loaded: false,
        }}
        pathname="/"
        content={{
          title: 'PLone',
        }}
        returnUrl="/"
      />
    </StaticRouter>
  </Provider>
</div>;
```
