DocumentView example source:

```jsx_ noeditor
const { Provider } = require('react-intl-redux');
const configureStore = require('redux-mock-store').default;
import DocumentView from './DocumentView';
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
  actions: {},
  content: { get: {} },
});

<div className={'rsg--pre-42'}>
  <Provider store={store}>
    <StaticRouter>
      <DocumentView content={[]} />
    </StaticRouter>
  </Provider>
</div>;
```
