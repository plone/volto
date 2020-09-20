DiffComponent example source:

```jsx_ noeditor
import DiffComponent from './Diff';
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
  content: { get: {}, data: {} },
  controlpanels: {},
  diff: {},
  history: [],
  schema: {},
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <StaticRouter>
      <DiffComponent
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
        history={[]}
      />
    </StaticRouter>
  </Provider>
</div>;
```
