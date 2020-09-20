EditComponent example source:

```jsx_ noeditor
import {StaticRouter} from 'react-router-dom';
import EditComponent from './Edit';

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
      <EditComponent
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
